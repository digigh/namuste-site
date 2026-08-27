"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PhoneOff,
  MessageSquare,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  CheckCircle2,
  Volume2,
  VolumeX,
  Stethoscope,
  Scale,
  Calculator,
  Briefcase,
  Compass,
  Building2,
  GraduationCap,
  Truck,
  Code2,
  Check,
  Radio,
  User,
  Calendar,
  Clock,
  Sparkles,
  Copy,
  ChevronDown,
  ChevronUp,
  Sprout,
  FlaskConical,
  Globe,
} from "lucide-react";
import { INDUSTRY_FLOWS, IndustryFlow, IndustryMessage } from "@/data/industryFlows";

const ICON_MAP: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={16} />,
  Scale: <Scale size={16} />,
  Calculator: <Calculator size={16} />,
  Briefcase: <Briefcase size={16} />,
  Compass: <Compass size={16} />,
  Building2: <Building2 size={16} />,
  GraduationCap: <GraduationCap size={16} />,
  Truck: <Truck size={16} />,
  Sprout: <Sprout size={16} />,
  FlaskConical: <FlaskConical size={16} />,
};

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = (reader.result as string) || "";
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const VOICE_PERSONAS = [
  { id: "ritu", label: "Ritu", gender: "Female", desc: "Warm & Natural" },
  { id: "priya", label: "Priya", gender: "Female", desc: "Corporate Receptionist" },
  { id: "shubh", label: "Shubh", gender: "Male", desc: "Calm & Articulate" },
  { id: "aditya", label: "Aditya", gender: "Male", desc: "Business Executive" },
];

interface AIVoiceChatbotEngineProps {
  initialIndustryId?: string;
  lockedIndustryId?: string;
  hideIndustrySelector?: boolean;
}

export default function AIVoiceChatbotEngine({
  initialIndustryId,
  lockedIndustryId,
  hideIndustrySelector = false,
}: AIVoiceChatbotEngineProps = {}) {
  const effectiveIndustry = lockedIndustryId || initialIndustryId || "doctors-clinics";
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(effectiveIndustry);
  const [channel, setChannel] = useState<"voice" | "chat">("voice");

  // Call & Audio states
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [speechStatusText, setSpeechStatusText] = useState<string>("Click to start voice call");
  const [liveUserTranscript, setLiveUserTranscript] = useState<string>("");
  const [currentLanguageCode, setCurrentLanguageCode] = useState<string>("en-IN");
  const [speechLanguageMode, setSpeechLanguageMode] = useState<string>("auto");
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("ritu");
  const [showJsonPayload, setShowJsonPayload] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  // Conversation state
  const [conversationHistory, setConversationHistory] = useState<IndustryMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Extracted Lead & Webhook Data
  const [extractedData, setExtractedData] = useState<{
    name?: string;
    mobile?: string;
    dob?: string;
    department?: string;
    doctor?: string;
    slot?: string;
    intent?: string;
    summary?: string;
    appointment_id?: string;
    appointment_status?: string;
    confirmed?: boolean;
  }>({});
  const [webhookSent, setWebhookSent] = useState<boolean>(false);
  // Guards against duplicate webhook dispatch for the same call. A ref (not
  // just the `webhookSent` state) because it must block a second dispatch
  // synchronously, before React has re-rendered with the updated state — the
  // backend can legitimately report isComplete:true again on a later turn
  // (e.g. GPT re-confirming after the booking), and without this the n8n
  // webhook — and the WhatsApp message it triggers — fired more than once.
  const webhookSentRef = useRef<boolean>(false);

  // References for live async callbacks
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const conversationHistoryRef = useRef<IndustryMessage[]>([]);
  const extractedDataRef = useRef<any>({});
  const selectedSpeakerRef = useRef<string>("ritu");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // MediaRecorder + amplitude-VAD mic capture (replaces browser SpeechRecognition)
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const vadRafRef = useRef<number | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const speechDetectedRef = useRef<boolean>(false);
  const pendingFinalizeRef = useRef<boolean>(false);
  // "" = auto-detect language every turn; "hi-IN"/"en-IN" = user manually forced it via the language toggle
  const manualLanguageHintRef = useRef<string>("");
  // Mirror isCallActive/isMuted into refs so async STT callbacks (which outlive
  // a single render) always check current state instead of a stale closure.
  const isCallActiveRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);
  // Auto-hangup after a confirmed booking: armed once the AI's confirmation
  // reply finishes and listening resumes, cleared if the caller starts
  // speaking again (they get a real grace window, not a hard cutoff).
  const autoEndCallTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndustry: IndustryFlow = INDUSTRY_FLOWS[selectedIndustryId] || INDUSTRY_FLOWS["doctors-clinics"];

  useEffect(() => {
    conversationHistoryRef.current = conversationHistory;
  }, [conversationHistory]);

  useEffect(() => {
    extractedDataRef.current = extractedData;
  }, [extractedData]);

  useEffect(() => {
    selectedSpeakerRef.current = selectedSpeaker;
  }, [selectedSpeaker]);

  useEffect(() => {
    isCallActiveRef.current = isCallActive;
  }, [isCallActive]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (channel === "chat" && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationHistory, channel]);

  const stopCurrentAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsAiSpeaking(false);
  }, []);

  // Stops any in-progress capture and DISCARDS it (does not transcribe/send).
  // Used whenever we need to cut the mic immediately — e.g. before the AI
  // starts speaking, or when the call ends. The VAD-triggered finalize path
  // (see startLiveListening) sets pendingFinalizeRef itself before calling
  // recorder.stop(), so a plain stopLiveListening() here never accidentally
  // sends a still-buffering recording.
  const stopLiveListening = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (vadRafRef.current) {
      cancelAnimationFrame(vadRafRef.current);
      vadRafRef.current = null;
    }
    pendingFinalizeRef.current = false;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try { mediaRecorderRef.current.stop(); } catch (_) {}
    }
    mediaRecorderRef.current = null;
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (_) {}
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    recordedChunksRef.current = [];
    speechDetectedRef.current = false;
    setIsUserSpeaking(false);
  }, []);

  // ─── AI-speech watchdog ──────────────────────────────────────────────────
  // The mic is meant to auto-resume the instant AI audio finishes (via the
  // audio/utterance "ended" event). In practice that event occasionally never
  // fires — a decode hiccup, a browser TTS voice-loading quirk, etc. — which
  // silently strands the call: no error, just a mic that never comes back on
  // until the user manually hits the "Speak" button. This watchdog guarantees
  // the resume callback fires exactly once no matter what the audio/browser
  // does, closing that gap without needing to diagnose every possible failure
  // mode individually.
  const aiSpeechWatchdogRef = useRef<NodeJS.Timeout | null>(null);
  const aiSpeechResolvedRef = useRef<boolean>(true);

  const armAiSpeechWatchdog = useCallback((onDone: () => void, ms = 12000) => {
    aiSpeechResolvedRef.current = false;
    if (aiSpeechWatchdogRef.current) clearTimeout(aiSpeechWatchdogRef.current);
    aiSpeechWatchdogRef.current = setTimeout(() => {
      if (!aiSpeechResolvedRef.current) {
        aiSpeechResolvedRef.current = true;
        console.warn("AI speech watchdog fired — 'ended' event never arrived, forcing mic resume.");
        onDone();
      }
    }, ms);
  }, []);

  const resolveAiSpeech = useCallback((onDone: () => void) => {
    if (aiSpeechResolvedRef.current) return; // already resolved (watchdog or a duplicate event) — don't double-fire
    aiSpeechResolvedRef.current = true;
    if (aiSpeechWatchdogRef.current) {
      clearTimeout(aiSpeechWatchdogRef.current);
      aiSpeechWatchdogRef.current = null;
    }
    onDone();
  }, []);

  // Web Speech Fallback
  const fallbackBrowserSpeech = useCallback((text: string, langCode = "en-IN", onEndedCallback?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEndedCallback) onEndedCallback();
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~`[\]()•]/g, " ").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode || "en-IN";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsAiSpeaking(true);
      setSpeechStatusText("AI speaking...");
      armAiSpeechWatchdog(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
        setIsAiSpeaking(false);
        setSpeechStatusText("Listening to you...");
        if (onEndedCallback) onEndedCallback();
      });
    };
    utterance.onend = () => {
      resolveAiSpeech(() => {
        setIsAiSpeaking(false);
        setSpeechStatusText("Listening to you...");
        if (onEndedCallback) onEndedCallback();
      });
    };
    utterance.onerror = () => {
      resolveAiSpeech(() => {
        setIsAiSpeaking(false);
        if (onEndedCallback) onEndedCallback();
      });
    };
    window.speechSynthesis.speak(utterance);
  }, [armAiSpeechWatchdog, resolveAiSpeech]);

  // Audible Speech Engine (Sarvam bulbul:v3 with fallback)
  const speakTextAudible = useCallback(async (text: string, langCode = "en-IN", onEndedCallback?: () => void, tone: string = "neutral") => {
    if (!isSpeakerOn) {
      if (onEndedCallback) onEndedCallback();
      return;
    }

    stopCurrentAudio();
    stopLiveListening();
    setIsAiSpeaking(true);
    setSpeechStatusText("AI speaking...");

    try {
      const res = await fetch("/api/ai-demo/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "tts",
          text,
          languageCode: langCode || "en-IN",
          speaker: selectedSpeakerRef.current || selectedSpeaker || "ritu",
          tone,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          currentAudioRef.current = audio;
          const resumeAfterAudio = () => {
            stopCurrentAudio();
            setIsAiSpeaking(false);
            setSpeechStatusText("Listening to you...");
            if (onEndedCallback) onEndedCallback();
          };
          audio.onended = () => resolveAiSpeech(resumeAfterAudio);
          audio.onerror = () => {
            resolveAiSpeech(() => fallbackBrowserSpeech(text, langCode, onEndedCallback));
          };
          audio.onloadedmetadata = () => {
            // Once the real duration is known, stop guessing — the watchdog
            // only needs to outlive actual playback by a small buffer, not a
            // blind worst-case timeout.
            if (isFinite(audio.duration) && audio.duration > 0) {
              armAiSpeechWatchdog(resumeAfterAudio, audio.duration * 1000 + 800);
            }
          };
          armAiSpeechWatchdog(resumeAfterAudio); // coarse ceiling until duration is known
          await audio.play();
          return;
        }
      }
    } catch (e) {
      console.warn("Sarvam TTS error fallback:", e);
    }

    fallbackBrowserSpeech(text, langCode, onEndedCallback);
  }, [armAiSpeechWatchdog, fallbackBrowserSpeech, isSpeakerOn, resolveAiSpeech, selectedSpeaker, stopCurrentAudio, stopLiveListening]);

  // Dispatch Webhook
  const triggerWebhookDispatch = useCallback(async (payloadExtracted: any, history: IndustryMessage[]) => {
    try {
      const webhookPayload = {
        event: "namuste.ai_demo.lead_captured",
        timestamp: new Date().toISOString(),
        industry: {
          id: activeIndustry.id,
          name: activeIndustry.name,
          brand: activeIndustry.brandName,
        },
        lead: {
          name: payloadExtracted.name || "Unknown Patient/Client",
          mobile: payloadExtracted.mobile || "Unknown Number",
          dob: payloadExtracted.dob || "Not Provided",
          department: payloadExtracted.department || "General Consultation",
          assignedDoctorOrLead: payloadExtracted.doctor || "General Specialist",
          confirmedSlot: payloadExtracted.slot || "Requested",
          intent: payloadExtracted.intent || "Appointment Booking",
          summary: payloadExtracted.summary || "Full intake completed via Namuste AI",
          referenceId: payloadExtracted.appointment_id || "",
        },
        transcript: history.map((m) => `[${m.speaker.toUpperCase()}]: ${m.text}`),
        metadata: {
          channel: "voice-ai-telephony",
          durationSeconds: callDuration,
          token: "CCH-014",
        },
      };

      const res = await fetch("/api/ai-demo/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });

      if (res.ok) {
        setWebhookSent(true);
      }
    } catch (err) {
      console.warn("Webhook dispatch warning:", err);
    }
  }, [activeIndustry, callDuration]);

  // ─── processConversationTurn: accepts optional authoritative Sarvam language code ───
  const processConversationTurn = useCallback(async (rawText: string, sarvamLang = "", sttLanguageProbability: number | null = null) => {
    if (!rawText || rawText.trim() === "" || isProcessing) return;

    const userText = rawText.trim();
    setIsProcessing(true);
    stopCurrentAudio();
    stopLiveListening();

    const currentHistory = conversationHistoryRef.current;
    const currentExt = extractedDataRef.current;

    const userMsg: IndustryMessage = {
      speaker: "user",
      text: userText,
      langLabel: "You",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updatedHistoryWithUser = [...currentHistory, userMsg];
    setConversationHistory(updatedHistoryWithUser);
    conversationHistoryRef.current = updatedHistoryWithUser;
    setLiveUserTranscript("");

    const isVoiceTurn = channel === "voice" || isCallActive;
    let failureReason = "";

    try {
      const res = await fetch("/api/ai-demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industryId: selectedIndustryId,
          messages: updatedHistoryWithUser,
          userMessage: userText,
          currentExtracted: currentExt,
          generateAudio: isVoiceTurn && isSpeakerOn,
          speaker: selectedSpeakerRef.current || selectedSpeaker || "ritu",
          sarvamLanguageCode: sarvamLang, // Authoritative language from Sarvam STT
          sttLanguageProbability, // Sarvam STT's confidence in that language claim — drives language stickiness server-side
        }),
      });

      if (!res.ok) {
        failureReason = res.status === 429
          ? "Too many requests — please wait a moment and try again."
          : `Server error (${res.status}). Please try again.`;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          const aiMsg: IndustryMessage = {
            speaker: "ai",
            text: data.reply,
            langLabel: (
              data.languageCode?.startsWith("hi") ? "Hindi" :
              data.languageCode?.startsWith("ta") ? "Tamil" :
              data.languageCode?.startsWith("te") ? "Telugu" :
              data.languageCode?.startsWith("bn") ? "Bengali" :
              data.languageCode?.startsWith("ml") ? "Malayalam" :
              data.languageCode?.startsWith("kn") ? "Kannada" :
              data.languageCode?.startsWith("pa") ? "Punjabi" :
              data.languageCode?.startsWith("gu") ? "Gujarati" :
              data.languageCode?.startsWith("or") ? "Odia" : "English"
            ),
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };

          const finalHistory = [...updatedHistoryWithUser, aiMsg];
          setConversationHistory(finalHistory);
          conversationHistoryRef.current = finalHistory;

          if (data.extracted) {
            setExtractedData(data.extracted);
            extractedDataRef.current = data.extracted;
          }
          if (data.languageCode) {
            setCurrentLanguageCode(data.languageCode);
          }

          // Only the turn where the booking is actually confirmed sets
          // isComplete — NOT merely having a slot filled in (that's true on
          // every turn from the confirmation step onward, so it fired the
          // webhook, and the WhatsApp message it triggers via n8n, on every
          // follow-up message too). The ref guard additionally caps it to
          // once per call even if isComplete comes back true again later.
          if (data.isComplete && !webhookSentRef.current) {
            webhookSentRef.current = true;
            triggerWebhookDispatch(data.extracted || currentExt, finalHistory);
          }

          setIsProcessing(false);

          const bookingJustCompleted = !!data.isComplete;
          const callEnded = !!data.callEnded;
          const resumeListeningAfterTurn = () => {
            // Caller said bye/goodbye/hang up — end the call right away instead
            // of reopening the mic or waiting on the post-booking grace timer.
            if (callEnded) {
              if (isCallActiveRef.current) handleEndCall();
              return;
            }
            if (isCallActiveRef.current && !isMutedRef.current) {
              startLiveListening();
              if (bookingJustCompleted) armAutoEndCall();
            }
          };

          // ── Audio Playback: Sarvam TTS → instant Browser TTS fallback ─────────
          if (isVoiceTurn && isSpeakerOn) {
            if (data.audioBase64) {
              // Sarvam returned audio — play it directly
              stopCurrentAudio();
              setIsAiSpeaking(true);
              setSpeechStatusText("AI speaking...");
              try {
                const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
                currentAudioRef.current = audio;
                const resumeAfterAudio = () => {
                  stopCurrentAudio();
                  setIsAiSpeaking(false);
                  if (!bookingJustCompleted) setSpeechStatusText("Listening to you...");
                  resumeListeningAfterTurn();
                };
                audio.onended = () => resolveAiSpeech(resumeAfterAudio);
                audio.onerror = () => {
                  // Audio decode error — immediately fall back to browser TTS
                  resolveAiSpeech(() => {
                    speakTextAudible(data.reply, data.languageCode, resumeListeningAfterTurn, data.tone);
                  });
                };
                audio.onloadedmetadata = () => {
                  if (isFinite(audio.duration) && audio.duration > 0) {
                    armAiSpeechWatchdog(resumeAfterAudio, audio.duration * 1000 + 800);
                  }
                };
                armAiSpeechWatchdog(resumeAfterAudio); // coarse ceiling until duration is known
                await audio.play();
                return;
              } catch (audioErr) {
                console.warn("Sarvam audio play error, falling to browser TTS:", audioErr);
              }
            }

            // Sarvam returned null or failed — immediately use browser TTS (zero extra wait)
            speakTextAudible(data.reply, data.languageCode, resumeListeningAfterTurn, data.tone);
          } else if (callEnded && isCallActiveRef.current) {
            // No audio playback path taken (speaker off / text channel) —
            // still honor the farewell and end the call.
            handleEndCall();
          }
          return;
        }
        // Response was ok but didn't carry a usable reply — treat as a failure below
        failureReason = failureReason || "The assistant didn't return a valid reply. Please try again.";
      }
    } catch (e) {
      console.warn("Turn processing error fallback:", e);
      failureReason = "Connection error — please try again.";
    }

    // A prior implementation fell through to here silently on ANY failure —
    // no visible error, and critically no resumption of listening, so a live
    // call would just go dead with zero feedback. Surface the failure and
    // keep the conversation loop alive instead.
    setIsProcessing(false);
    setSpeechStatusText(`Error: ${failureReason || "Something went wrong. Please try again."}`);
    if (isVoiceTurn && isCallActiveRef.current && !isMutedRef.current) {
      startLiveListening();
    }
  }, [armAiSpeechWatchdog, channel, isCallActive, isMuted, isProcessing, isSpeakerOn, resolveAiSpeech, selectedIndustryId, selectedSpeaker, speakTextAudible, stopCurrentAudio, stopLiveListening, triggerWebhookDispatch]);


  // Mic capture via MediaRecorder + amplitude-based voice activity detection (VAD).
  // Replaces the browser's native SpeechRecognition, which (a) only supports
  // whatever language/dialect quality the OS engine ships with — poor for
  // Hindi/regional languages — and (b) locked recognition.lang to *last
  // turn's* detected language, so a mid-call language switch was always one
  // turn late. Recording is sent to /api/ai-demo/speech (Whisper STT) once
  // the VAD detects ~700ms of silence after speech, and Whisper's own
  // detected language becomes the authoritative signal passed into
  // processConversationTurn — closing both gaps at once.
  const startLiveListening = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setSpeechStatusText("Error: Microphone capture not supported in this browser. Use chat mode.");
      return;
    }

    // Discard any stale in-progress capture before starting a fresh one.
    stopLiveListening();

    try {
      // getUserMedia can hang indefinitely — neither resolving nor rejecting —
      // if the OS mic device hasn't fully released from a just-ended recording
      // session. Without a hard timeout, that hang is completely invisible:
      // no error, mic just never comes back. Race it against a timeout so a
      // stuck acquisition always surfaces as a real, catchable error instead.
      const stream = await Promise.race([
        navigator.mediaDevices.getUserMedia({
          // Browser/OS-level noise suppression, echo cancellation, and gain
          // normalization — these are standard, well-supported constraints
          // that meaningfully cut background noise before it ever reaches
          // the VAD or STT, rather than trying to filter it after the fact.
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("getUserMedia timed out after 6s — mic device may be stuck busy from the previous turn")), 6000)
        ),
      ]);
      mediaStreamRef.current = stream;

      const AudioContextCtor = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioContext: AudioContext = new AudioContextCtor();
      audioContextRef.current = audioContext;
      if (audioContext.state === "suspended") {
        try { await audioContext.resume(); } catch (_) {}
      }
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;
      recordedChunksRef.current = [];
      speechDetectedRef.current = false;
      pendingFinalizeRef.current = false;

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const shouldFinalize = pendingFinalizeRef.current;
        pendingFinalizeRef.current = false;
        const chunks = recordedChunksRef.current;
        recordedChunksRef.current = [];

        stream.getTracks().forEach((t) => t.stop());
        if (mediaStreamRef.current === stream) mediaStreamRef.current = null;
        if (audioContextRef.current === audioContext) {
          try { await audioContext.close(); } catch (_) {}
          audioContextRef.current = null;
        }

        if (!shouldFinalize || chunks.length === 0) return;

        const blob = new Blob(chunks, { type: mimeType || "audio/webm" });
        if (blob.size < 2000) {
          // Too short to be meaningful speech (VAD false-positive on noise) — just resume listening
          if (isCallActiveRef.current && !isMutedRef.current) startLiveListening();
          return;
        }

        setSpeechStatusText("Transcribing...");
        try {
          const base64Audio = await blobToBase64(blob);
          const res = await fetch("/api/ai-demo/speech", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "stt",
              audioBase64: base64Audio,
              languageCode: manualLanguageHintRef.current,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.transcript && data.transcript.trim()) {
              setLiveUserTranscript(data.transcript.trim());
              processConversationTurn(
                data.transcript.trim(),
                data.detectedLanguageCode || "",
                typeof data.languageProbability === "number" ? data.languageProbability : null
              );
              return;
            }
          }
        } catch (err) {
          console.warn("STT request failed:", err);
        }

        // No usable transcript came back — resume listening rather than hanging silently
        if (isCallActiveRef.current && !isMutedRef.current) {
          setSpeechStatusText("Didn't catch that — listening again...");
          startLiveListening();
        }
      };

      recorder.start(250); // flush chunks every 250ms so short utterances still have data on stop()

      setIsUserSpeaking(false);
      setSpeechStatusText("Listening to you... (Speak naturally)");

      const dataArray = new Uint8Array(analyser.fftSize);
      // Raised from 0.02, and now paired with a sustained-frames requirement
      // below — a single loud frame (a door, a cough, distant noise) used to
      // be enough to start capturing a "turn" and send it to STT as if the
      // caller had spoken, which is exactly what was corrupting the
      // conversation with background noise.
      const SPEECH_RMS_THRESHOLD = 0.028;
      // Require ~150ms of continuous energy above threshold before treating
      // it as the caller actually starting to talk, not just a brief blip.
      const REQUIRED_CONSECUTIVE_SPEECH_FRAMES = 9;
      // Raised from 700ms — that was cutting people off during completely
      // normal mid-sentence pauses (recalling a number, a breath, an "umm").
      // The timer already correctly cancels and lets recording continue the
      // instant speech resumes (see the rms > threshold branch above), so
      // this only controls how long a genuine pause has to last before it's
      // treated as "done talking" — 1100ms gives real breathing room while
      // still being far snappier than the original fixed 2200ms wait.
      const SILENCE_MS = 1100;
      const MAX_RECORDING_MS = 20000;
      const startedAt = Date.now();
      let consecutiveSpeechFrames = 0;

      const vadTick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArray);

        let sumSquares = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const normalized = (dataArray[i] - 128) / 128;
          sumSquares += normalized * normalized;
        }
        const rms = Math.sqrt(sumSquares / dataArray.length);

        if (rms > SPEECH_RMS_THRESHOLD) {
          consecutiveSpeechFrames++;
          if (!speechDetectedRef.current && consecutiveSpeechFrames >= REQUIRED_CONSECUTIVE_SPEECH_FRAMES) {
            speechDetectedRef.current = true;
            setIsUserSpeaking(true);
            // Caller is speaking again after a confirmed booking — they get
            // to finish, not get cut off by the auto-hangup timer.
            if (autoEndCallTimeoutRef.current) {
              clearTimeout(autoEndCallTimeoutRef.current);
              autoEndCallTimeoutRef.current = null;
            }
          }
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
          }
        } else {
          // Energy dropped — a blip that didn't sustain long enough resets
          // the counter instead of slowly accumulating across noise gaps.
          consecutiveSpeechFrames = 0;
        }

        if (!(rms > SPEECH_RMS_THRESHOLD) && speechDetectedRef.current && !silenceTimeoutRef.current) {
          silenceTimeoutRef.current = setTimeout(() => {
            pendingFinalizeRef.current = true;
            setIsUserSpeaking(false);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
              try { mediaRecorderRef.current.stop(); } catch (_) {}
            }
          }, SILENCE_MS);
        }

        if (Date.now() - startedAt > MAX_RECORDING_MS) {
          pendingFinalizeRef.current = speechDetectedRef.current;
          if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            try { mediaRecorderRef.current.stop(); } catch (_) {}
          }
          return;
        }

        vadRafRef.current = requestAnimationFrame(vadTick);
      };
      vadRafRef.current = requestAnimationFrame(vadTick);
    } catch (err: any) {
      console.warn("Could not start microphone capture:", err);
      // Surface the ACTUAL error instead of a hardcoded guess — a previous
      // version always said "permission denied" here even when the real cause
      // was something else entirely (e.g. a stuck device, or the new 6s
      // timeout above), which actively hid what was really happening.
      const name = err?.name || "";
      const friendly =
        name === "NotAllowedError" ? "Microphone permission denied. Use chat mode instead."
        : name === "NotFoundError" ? "No microphone found on this device."
        : name === "NotReadableError" ? "Microphone is busy or unavailable (may be in use by another app/tab)."
        : err?.message?.includes("timed out") ? "Microphone didn't respond in time — device may still be busy from the previous turn. Retrying..."
        : `Microphone error: ${err?.message || name || "unknown"}.`;
      setSpeechStatusText(`Error: ${friendly}`);
      setIsUserSpeaking(false);

      // A stuck/busy device is often transient — retry once automatically
      // instead of leaving the call permanently dead on a timeout.
      if (err?.message?.includes("timed out") && isCallActiveRef.current && !isMutedRef.current) {
        setTimeout(() => {
          if (isCallActiveRef.current && !isMutedRef.current) startLiveListening();
        }, 1000);
      }
    }
  }, [processConversationTurn, stopLiveListening]);


  const handleStartCall = async () => {
    setIsConnecting(true);
    setSpeechStatusText("Connecting to AI Receptionist...");
    setCallDuration(0);
    setLiveUserTranscript("");
    setIsMuted(false);
    webhookSentRef.current = false;
    setWebhookSent(false);

    await new Promise((r) => setTimeout(r, 600));

    setIsCallActive(true);
    setIsConnecting(false);

    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    const welcomeMsg: IndustryMessage = {
      speaker: "ai",
      text: activeIndustry.initialGreetingEnglish,
      langLabel: "English",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const initialHistory = [welcomeMsg];
    setConversationHistory(initialHistory);
    conversationHistoryRef.current = initialHistory;

    speakTextAudible(activeIndustry.initialGreetingEnglish, "en-IN", () => {
      startLiveListening();
    }, "greeting");
  };

  const handleEndCall = () => {
    if (autoEndCallTimeoutRef.current) {
      clearTimeout(autoEndCallTimeoutRef.current);
      autoEndCallTimeoutRef.current = null;
    }
    stopCurrentAudio();
    stopLiveListening();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsCallActive(false);
    setSpeechStatusText("Call ended. Click to call again.");
  };

  // ─── Auto-hangup after a confirmed booking ──────────────────────────────
  // Once the AI reports isComplete (booking confirmed / webhook dispatched),
  // the call doesn't need to stay open indefinitely — but hanging up the
  // instant the confirmation audio ends would cut off a caller who wanted to
  // ask one more thing. Instead: keep listening as normal, but arm a timer
  // that ends the call automatically if nothing more is said. Any real
  // speech detected before it fires cancels it — see the VAD tick's
  // speechDetectedRef transition in startLiveListening.
  const AUTO_END_CALL_DELAY_MS = 8000;

  const cancelAutoEndCall = useCallback(() => {
    if (autoEndCallTimeoutRef.current) {
      clearTimeout(autoEndCallTimeoutRef.current);
      autoEndCallTimeoutRef.current = null;
    }
  }, []);

  const armAutoEndCall = useCallback(() => {
    cancelAutoEndCall();
    setSpeechStatusText("Booking confirmed — call will end automatically shortly. Speak now to continue.");
    autoEndCallTimeoutRef.current = setTimeout(() => {
      autoEndCallTimeoutRef.current = null;
      handleEndCall();
    }, AUTO_END_CALL_DELAY_MS);
  }, [cancelAutoEndCall]);

  const handleReset = () => {
    handleEndCall();
    setConversationHistory([]);
    conversationHistoryRef.current = [];
    setExtractedData({});
    extractedDataRef.current = {};
    webhookSentRef.current = false;
    setWebhookSent(false);
    setLiveUserTranscript("");
    setChatInput("");
    setSpeechStatusText("Click to start voice call");
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const copyPayloadToClipboard = () => {
    const payload = JSON.stringify({
      lead: extractedData,
      transcriptCount: conversationHistory.length,
      industry: activeIndustry.name,
      status: webhookSent ? "Dispatched" : "In Progress",
    }, null, 2);
    navigator.clipboard.writeText(payload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  // Preset quick prompt samples dynamically tailored to the selected industry
  const getIndustrySamplePrompts = (ind: IndustryFlow) => {
    switch (ind.id) {
      case "lawyers":
        return [
          { label: "Intake (English)", text: "Hi, I am Priya Sen, contact 9811223344. Need legal consultation for property dispute." },
          { label: "Ask Practice Areas", text: "What legal practice areas and consultation formats do you offer?" },
          { label: "Confirm Video Call", text: "Yes, Thursday 4:00 PM video consultation works for me." },
        ];
      case "chartered-accountants":
        return [
          { label: "Intake (Hinglish)", text: "Amit Patel, mobile 9900112233. Private Limited GST return aur audit filing consult karna tha." },
          { label: "Ask Audit Scope", text: "What are your corporate tax audit and ITR filing charges?" },
          { label: "Lock Review Slot", text: "Kal 2:30 PM ka review call schedule kar dijiye." },
        ];
      case "consultants":
        return [
          { label: "Intake (English)", text: "Karan Malhotra, Founder at TechNova, phone 9765432100. Looking for B2B SaaS GTM strategy." },
          { label: "Ask Advisory Scope", text: "Can you explain your growth strategy and scaling frameworks?" },
          { label: "Book Strategy Session", text: "Friday 11:00 AM discovery slot works perfectly." },
        ];
      case "architects":
        return [
          { label: "Intake (English)", text: "Neha Kapoor, phone 9820011223. We have a 3BHK in Indiranagar for interior renovation." },
          { label: "Ask Portfolio", text: "What is your typical interior design budget and site inspection process?" },
          { label: "Schedule Inspection", text: "Saturday 3:00 PM site inspection works for me." },
        ];
      case "real-estate":
        return [
          { label: "Intake (Hinglish)", text: "Sunita Roy, 9845012345. Looking for a 3 BHK luxury flat in 1.5 Cr budget." },
          { label: "Ask Pricing & Layout", text: "What configurations, carpet area and pricing sheets are available?" },
          { label: "Issue VIP Tour Pass", text: "Haan, Sunday 11:30 AM model flat tour book kar dijiye." },
        ];
      case "education":
        return [
          { label: "Student Intake", text: "Student name is Rohan Gupta, parent mobile 9711002233. Target is JEE 2026." },
          { label: "Provide DOB/Grade", text: "DOB 12th June 2008, currently in Grade 11." },
          { label: "Register Demo Class", text: "Yes, register him for Saturday 10:00 AM demo masterclass." },
        ];
      case "distributors":
        return [
          { label: "Dealer Intake", text: "Sri Krishna Traders, Manoj Kumar, phone 9888776655. Electrical fittings SKU #8420 stock chahiye." },
          { label: "Check Stock & Dispatch", text: "How many units of SKU #8420 are in stock for tomorrow morning dispatch?" },
          { label: "Lock 100 Boxes", text: "Haan, 100 boxes reserve karke pro-forma invoice bhej do." },
        ];
      case "agriculture":
        return [
          { label: "Farmer Intake", text: "Mera naam Rameshwar Yadav hai, Hooghly district. Dhaan ki fasal ke liye khad ka schedule chahiye. Phone 9431098765." },
          { label: "Ask Nearest Dealer", text: "Hooghly mandi mein kaun se dealer ke paas stock available hai?" },
          { label: "Dispatch Advisory", text: "Haan, poora advisory schedule WhatsApp aur SMS par bhej dijiye." },
        ];
      case "research":
        return [
          { label: "Cohort Intake", text: "Dr. Ananya Ray, mobile 9830055443. Enquiring about the Cardiology cohort study." },
          { label: "Verify DOB & Hospital", text: "DOB 24 November 1988, Apollo Gleneagles Hospital." },
          { label: "Qualify & Dispatch Protocol", text: "Eligible for Cohort C-104! Please send IRB consent form." },
        ];
      default:
        return [
          { label: "Hindi Intake", text: "Mera naam Rahul Verma hai aur mobile number 9812345678 hai" },
          { label: "English Intake", text: "My name is Ankush Sharma and my contact is 9876543210" },
          { label: "Provide DOB", text: "Meri date of birth 14 August 1992 hai" },
          { label: "Ask Services & Timings", text: "What departments and OPD timings are available?" },
          { label: "Book 10:30 (Conflict)", text: "Kal subah 10:30 AM ka appointment chahiye" },
          { label: "Confirm 11:45 AM", text: "Tomorrow 11:45 AM slot works for me" },
        ];
    }
  };

  const samplePrompts = getIndustrySamplePrompts(activeIndustry);

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: "0", boxSizing: "border-box", overflow: "hidden" }}>
      {/* 1. TOP INDUSTRY NAVIGATION CAROUSEL (Horizontal Swipe Carousel) */}
      {!hideIndustrySelector && !lockedIndustryId && (
        <div
          className="touch-scroll"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            overflowX: "auto",
            paddingBottom: "8px",
            marginBottom: "10px",
            width: "100%",
            boxSizing: "border-box",
            scrollSnapType: "x mandatory",
          }}
        >
          {Object.values(INDUSTRY_FLOWS).map((ind) => {
            const isSelected = selectedIndustryId === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  if (ind.id !== selectedIndustryId) {
                    setSelectedIndustryId(ind.id);
                    handleReset();
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "11.5px",
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${isSelected ? "#9BEA16" : "rgba(255, 255, 255, 0.08)"}`,
                  color: isSelected ? "#9BEA16" : "#A1A1AA",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  {ICON_MAP[ind.iconName] || <Briefcase size={12} />}
                </span>
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2. UNIFIED INDUSTRY HEADER CARD & 4-STEP CONVERSATION FLOW */}
      <div
        className="industry-header-card"
        style={{
          borderRadius: "20px",
          background: "linear-gradient(180deg, rgba(26, 26, 30, 0.85) 0%, rgba(14, 14, 16, 0.95) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "16px",
          marginBottom: "16px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div
          className="header-top-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          {/* Brand Info with Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: 1 }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "rgba(155, 234, 22, 0.12)",
                border: "1px solid rgba(155, 234, 22, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9BEA16",
                flexShrink: 0,
              }}
            >
              {ICON_MAP[activeIndustry.iconName] || <Sparkles size={18} />}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#F5F5F0", whiteSpace: "nowrap" }}>
                  {activeIndustry.brandName}
                </span>
                <span
                  style={{
                    fontSize: "9.5px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: "rgba(255, 255, 255, 0.06)",
                    color: "#8E8E93",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activeIndustry.requiresDob ? "Name + Phone + DOB" : "Name + Phone"}
                </span>
              </div>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "11.5px",
                  color: "#8E8E93",
                  lineHeight: 1.35,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {activeIndustry.tagline}
              </p>
            </div>
          </div>

          {/* Mode Switcher & Reset Button */}
          <div className="header-action-controls" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                background: "rgba(0, 0, 0, 0.4)",
                padding: "2px",
                borderRadius: "999px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <button
                onClick={() => setChannel("voice")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: channel === "voice" ? "#9BEA16" : "transparent",
                  color: channel === "voice" ? "#000000" : "#A1A1AA",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Phone size={11} />
                <span>Voice</span>
              </button>
              <button
                onClick={() => setChannel("chat")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: channel === "chat" ? "#9BEA16" : "transparent",
                  color: channel === "chat" ? "#000000" : "#A1A1AA",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <MessageSquare size={11} />
                <span>Chat</span>
              </button>
            </div>

            <button
              onClick={handleReset}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "5px 10px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#8E8E93",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 4-Step Intake Micro-Stepper */}
        <div
          className="stepper-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "6px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {[
            { step: 1, label: "1. Greeting", done: conversationHistory.length >= 1 },
            { step: 2, label: "2. Intake", done: !!extractedData.name && !!extractedData.mobile },
            { step: 3, label: "3. Slots", done: conversationHistory.length >= 3 },
            { step: 4, label: "4. Sync", done: webhookSent || !!extractedData.slot },
          ].map((s) => (
            <div
              key={s.step}
              style={{
                padding: "5px 6px",
                borderRadius: "8px",
                background: s.done ? "rgba(155, 234, 22, 0.12)" : "rgba(255, 255, 255, 0.02)",
                border: `1px solid ${s.done ? "rgba(155, 234, 22, 0.4)" : "rgba(255, 255, 255, 0.05)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                textAlign: "center",
                boxSizing: "border-box",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: s.done ? "#9BEA16" : "rgba(255,255,255,0.1)",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {s.done ? "✓" : s.step}
              </div>
              <span
                style={{
                  fontSize: "10.5px",
                  color: s.done ? "#F5F5F0" : "#8E8E93",
                  fontWeight: s.done ? 600 : 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DUAL-TERMINAL SQUARE CONSOLE GRID */}
      <div
        className="demo-main-grid"
        style={{
          display: "grid",
          gap: "16px",
          alignItems: "stretch",
          justifyContent: "center",
          maxWidth: "980px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT SQUARE CONSOLE: HERO VOICE / CHAT TERMINAL */}
        <div
          className="demo-call-card square-console"
          style={{
            borderRadius: "26px",
            background: "linear-gradient(180deg, rgba(22, 22, 26, 0.92) 0%, rgba(10, 10, 12, 0.98) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "18px 16px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {channel === "voice" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                gap: "8px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Call Status Header & Voice Selector (100% visible & bounded) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBottom: "8px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  flexWrap: "wrap",
                  gap: "6px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: isCallActive ? "rgba(34, 197, 94, 0.15)" : isConnecting ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${isCallActive ? "rgba(34, 197, 94, 0.4)" : isConnecting ? "rgba(245, 158, 11, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                    fontSize: "10.5px",
                    fontWeight: 600,
                    color: isCallActive ? "#4ADE80" : isConnecting ? "#FBBF24" : "#8E8E93",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: isCallActive ? "#4ADE80" : isConnecting ? "#FBBF24" : "#8E8E93",
                    }}
                  />
                  <span>
                    {isConnecting ? "Connecting..." : isCallActive ? `Live • ${formatDuration(callDuration)}` : "Live Voice"}
                  </span>
                </div>

                {/* Voice Persona & Language Mode Selectors */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {/* Language Mode Selector — covers all 9 supported languages, not just
                      Hindi/English. Auto-detection is measurably weaker for the
                      lower-resource ones (Punjabi especially), so forcing the language
                      explicitly here also passes a hint straight to Whisper, which
                      meaningfully improves accuracy for exactly the languages that
                      needed it most. */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                      overflowX: "auto",
                      maxWidth: "100%",
                      scrollSnapType: "x mandatory",
                    }}
                  >
                    <Globe size={10} style={{ color: "#8E8E93", marginRight: "1px", flexShrink: 0 }} />
                    {[
                      { id: "auto", label: "Auto 🌐" },
                      { id: "hi-IN", label: "हिन्दी" },
                      { id: "en-IN", label: "English" },
                      { id: "pa-IN", label: "ਪੰਜਾਬੀ" },
                      { id: "ta-IN", label: "தமிழ்" },
                      { id: "te-IN", label: "తెలుగు" },
                      { id: "bn-IN", label: "বাংলা" },
                      { id: "ml-IN", label: "മലയാളം" },
                      { id: "kn-IN", label: "ಕನ್ನಡ" },
                      { id: "gu-IN", label: "ગુજરાતી" },
                      { id: "or-IN", label: "ଓଡ଼ିଆ" },
                    ].map((l) => {
                      const isSelected = speechLanguageMode === l.id;
                      return (
                        <button
                          key={l.id}
                          onClick={() => {
                            setSpeechLanguageMode(l.id);
                            // "auto" clears the hint so Whisper's own detection drives the
                            // language every turn; any specific code forces that language
                            // explicitly, including passing it to Whisper as a hint.
                            manualLanguageHintRef.current = l.id === "auto" ? "" : l.id;
                            if (l.id !== "auto") setCurrentLanguageCode(l.id);
                          }}
                          style={{
                            padding: "2px 6px",
                            borderRadius: "999px",
                            fontSize: "9.5px",
                            fontWeight: isSelected ? 700 : 500,
                            background: isSelected ? "rgba(155, 234, 22, 0.18)" : "rgba(255, 255, 255, 0.04)",
                            border: `1px solid ${isSelected ? "#9BEA16" : "rgba(255, 255, 255, 0.08)"}`,
                            color: isSelected ? "#9BEA16" : "#A1A1AA",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            scrollSnapAlign: "start",
                          }}
                        >
                          {l.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Voice Persona Selector */}
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <span style={{ fontSize: "10px", color: "#8E8E93", marginRight: "2px" }}>Voice:</span>
                    {VOICE_PERSONAS.map((vp) => {
                      const isSelected = selectedSpeaker === vp.id;
                      return (
                        <button
                          key={vp.id}
                          onClick={() => setSelectedSpeaker(vp.id)}
                          style={{
                            padding: "2px 6px",
                            borderRadius: "999px",
                            fontSize: "9.5px",
                            fontWeight: isSelected ? 700 : 500,
                            background: isSelected ? "rgba(155, 234, 22, 0.18)" : "rgba(255, 255, 255, 0.04)",
                            border: `1px solid ${isSelected ? "#9BEA16" : "rgba(255, 255, 255, 0.08)"}`,
                            color: isSelected ? "#9BEA16" : "#A1A1AA",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {vp.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mathematically Centered Acoustic Orb Visualizer */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 0 8px",
                  width: "100%",
                }}
              >
                {/* Central Orb with Anchored Centered Radar Rings */}
                <div
                  style={{
                    position: "relative",
                    width: "115px",
                    height: "115px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {/* Concentric Pulsing Radar Rings */}
                  {!isCallActive && (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.45, 1.85],
                          opacity: [0.55, 0.2, 0],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: "1.5px solid rgba(155, 234, 22, 0.4)",
                          pointerEvents: "none",
                        }}
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1.6],
                          opacity: [0.75, 0.35, 0],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          delay: 1.2,
                          ease: "easeOut",
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: "1.5px solid rgba(155, 234, 22, 0.3)",
                          pointerEvents: "none",
                        }}
                      />
                    </>
                  )}

                  {/* Central Interactive Orb */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={!isCallActive ? handleStartCall : undefined}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      cursor: !isCallActive ? "pointer" : "default",
                      background: isAiSpeaking
                        ? "radial-gradient(circle, rgba(155, 234, 22, 0.35) 0%, rgba(0, 0, 0, 0.85) 75%)"
                        : isUserSpeaking
                        ? "radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(0, 0, 0, 0.85) 75%)"
                        : "radial-gradient(circle, rgba(155, 234, 22, 0.2) 0%, rgba(18, 18, 20, 0.9) 75%)",
                      border: `1.5px solid ${isAiSpeaking ? "rgba(155, 234, 22, 0.8)" : isUserSpeaking ? "rgba(56, 189, 248, 0.8)" : "rgba(155, 234, 22, 0.45)"}`,
                      boxShadow: isAiSpeaking
                        ? "0 0 40px rgba(155, 234, 22, 0.5), 0 0 80px rgba(155, 234, 22, 0.2)"
                        : isUserSpeaking
                        ? "0 0 40px rgba(56, 189, 248, 0.5), 0 0 80px rgba(56, 189, 248, 0.2)"
                        : "0 0 35px rgba(155, 234, 22, 0.35), 0 0 70px rgba(155, 234, 22, 0.15)",
                      transition: "all 0.35s ease",
                      zIndex: 2,
                    }}
                  >
                    <motion.div
                      animate={
                        !isCallActive
                          ? {
                              scale: [1, 1.06, 1],
                              boxShadow: [
                                "0 0 16px rgba(155, 234, 22, 0.4)",
                                "0 0 30px rgba(155, 234, 22, 0.7)",
                                "0 0 16px rgba(155, 234, 22, 0.4)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "50%",
                        background: isAiSpeaking ? "#9BEA16" : isUserSpeaking ? "#38BDF8" : "#9BEA16",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#000000",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Phone size={24} strokeWidth={2.4} />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Equalizer bars */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", height: "18px", marginTop: "10px" }}>
                  {[30, 60, 90, 100, 75, 45, 80, 95, 60, 35].map((h, i) => {
                    const dynamicH = isAiSpeaking || isUserSpeaking ? Math.max(25, (h * ((callDuration % 4) + 2)) % 100) : 18;
                    return (
                      <div
                        key={i}
                        style={{
                          width: "2.5px",
                          height: `${dynamicH}%`,
                          background: isUserSpeaking ? "#38BDF8" : isAiSpeaking ? "#9BEA16" : "rgba(255, 255, 255, 0.15)",
                          borderRadius: "2px",
                          transition: "height 0.2s ease",
                        }}
                      />
                    );
                  })}
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: isAiSpeaking ? "#9BEA16" : isUserSpeaking ? "#38BDF8" : isCallActive ? "#4ADE80" : "#9BEA16",
                    marginTop: "6px",
                    textAlign: "center",
                  }}
                >
                  {isAiSpeaking ? "AI Speaking (Click to interrupt)" : isUserSpeaking ? "Listening to you..." : isCallActive ? "Connected • Speak naturally" : "Tap Orb or Button to Start Voice Call"}
                </span>

                {/* Surfaces mic/STT/chat-API errors that were previously tracked in
                    speechStatusText but never rendered anywhere — any failure in the
                    voice pipeline looked identical to a normal, working call. */}
                {isCallActive && (() => {
                  const isError = speechStatusText.startsWith("Error:");
                  const isNeutral = speechStatusText.includes("Transcribing") || speechStatusText.includes("Didn't catch") || speechStatusText.includes("will end automatically");
                  if (!isError && !isNeutral) return null;
                  return (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: isError ? "#F87171" : "#A1A1AA",
                        marginTop: "3px",
                        textAlign: "center",
                      }}
                    >
                      {speechStatusText}
                    </span>
                  );
                })()}
              </div>

              {/* Real-time Subtitle & Transcription Bubble (ONLY SHOWN WHEN CONVERSATION/SPEECH EXISTS - RED MARKED INACTIVE BOX REMOVED) */}
              {(liveUserTranscript || conversationHistory.length > 0) && (
                <div
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(0, 0, 0, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    minHeight: "50px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {liveUserTranscript ? (
                    <div>
                      <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#38BDF8", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
                        🔴 You are speaking
                      </span>
                      <p style={{ margin: 0, fontSize: "13px", color: "#38BDF8", fontWeight: 600, lineHeight: 1.35 }}>
                        &ldquo;{liveUserTranscript}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: conversationHistory[conversationHistory.length - 1].speaker === "ai" ? "#9BEA16" : "#38BDF8",
                          display: "block",
                          marginBottom: "2px",
                        }}
                      >
                        {conversationHistory[conversationHistory.length - 1].speaker === "ai" ? `${activeIndustry.brandName} Receptionist` : "You (Caller)"}
                      </span>
                      <p style={{ margin: 0, fontSize: "12.5px", color: "#F5F5F0", lineHeight: 1.4 }}>
                        &ldquo;{conversationHistory[conversationHistory.length - 1].text}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 1-Click Test Prompts Carousel (100% within card boundaries, no overflow clipping) */}
              <div style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "10.5px", color: "#8E8E93", fontWeight: 500 }}>
                    💡 1-Click Prompts (Instant Audio):
                  </span>
                  <span style={{ fontSize: "10px", color: "#71717A" }}>Swipe ➔</span>
                </div>
                <div
                  className="touch-scroll"
                  style={{
                    display: "flex",
                    gap: "6px",
                    overflowX: "auto",
                    padding: "2px 2px 6px 2px",
                    scrollSnapType: "x mandatory",
                    width: "100%",
                  }}
                >
                  {samplePrompts.slice(0, 5).map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isCallActive) {
                          handleStartCall();
                        }
                        processConversationTurn(p.text);
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#D4D4D8",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        scrollSnapAlign: "start",
                        transition: "all 0.2s ease",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(155, 234, 22, 0.5)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)")}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Action Controls with Magnetic Glowing CTA */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", justifyContent: "center", paddingTop: "4px" }}>
                {!isCallActive ? (
                  <motion.button
                    onClick={handleStartCall}
                    disabled={isConnecting}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(155, 234, 22, 0.8)" }}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      boxShadow: [
                        "0 0 16px rgba(155, 234, 22, 0.45)",
                        "0 0 30px rgba(155, 234, 22, 0.75)",
                        "0 0 16px rgba(155, 234, 22, 0.45)",
                      ],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "13px 32px",
                      borderRadius: "999px",
                      background: "#9BEA16",
                      color: "#000000",
                      fontSize: "14px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      position: "relative",
                    }}
                  >
                    <motion.span
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Phone size={16} strokeWidth={2.4} />
                    </motion.span>
                    <span>Start Voice Call</span>
                  </motion.button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        stopCurrentAudio();
                        startLiveListening();
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "10px 16px",
                        borderRadius: "999px",
                        background: isUserSpeaking ? "#38BDF8" : "rgba(155, 234, 22, 0.15)",
                        color: isUserSpeaking ? "#000000" : "#9BEA16",
                        border: `1px solid ${isUserSpeaking ? "#38BDF8" : "rgba(155, 234, 22, 0.4)"}`,
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <Radio size={13} />
                      <span>{isAiSpeaking ? "Interrupt" : isUserSpeaking ? "Listening..." : "🎙️ Speak"}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!isMuted) {
                          stopLiveListening();
                          setIsMuted(true);
                        } else {
                          setIsMuted(false);
                          startLiveListening();
                        }
                      }}
                      title={isMuted ? "Unmute" : "Mute"}
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                        background: isMuted ? "#F87171" : "rgba(255, 255, 255, 0.08)",
                        color: isMuted ? "#000000" : "#F5F5F0",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
                    </button>

                    <button
                      onClick={() => {
                        setIsSpeakerOn(!isSpeakerOn);
                        if (isSpeakerOn) stopCurrentAudio();
                      }}
                      title={isSpeakerOn ? "Mute Speaker" : "Unmute Speaker"}
                      style={{
                        padding: "10px",
                        borderRadius: "50%",
                        background: !isSpeakerOn ? "#FBBF24" : "rgba(255, 255, 255, 0.08)",
                        color: !isSpeakerOn ? "#000000" : "#F5F5F0",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isSpeakerOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
                    </button>

                    <button
                      onClick={handleEndCall}
                      title="End Call"
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        background: "#EF4444",
                        color: "#FFFFFF",
                        border: "none",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <PhoneOff size={14} />
                      <span>End Call</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* CHATBOT CHANNEL INTERFACE */
            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
              {/* Message Thread */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  paddingRight: "8px",
                  maxHeight: "400px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                {conversationHistory.map((msg, index) => {
                  const isAi = msg.speaker === "ai";
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: isAi ? "flex-start" : "flex-end",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "82%",
                          padding: "12px 16px",
                          borderRadius: isAi ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                          background: isAi ? "rgba(255, 255, 255, 0.06)" : "#9BEA16",
                          color: isAi ? "#F5F5F0" : "#000000",
                          border: isAi ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                          fontSize: "13.5px",
                          lineHeight: 1.45,
                        }}
                      >
                        <p style={{ margin: 0 }}>{msg.text}</p>
                        <span
                          style={{
                            fontSize: "10px",
                            color: isAi ? "#8E8E93" : "rgba(0,0,0,0.6)",
                            marginTop: "4px",
                            display: "block",
                            textAlign: isAi ? "left" : "right",
                          }}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick suggestions */}
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "8px", marginBottom: "8px" }}>
                {samplePrompts.slice(0, 4).map((p, i) => (
                  <button
                    key={i}
                    onClick={() => processConversationTurn(p.text)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#A1A1AA",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (chatInput.trim()) {
                    processConversationTurn(chatInput);
                    setChatInput("");
                  }
                }}
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Message ${activeIndustry.brandName}...`}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "rgba(0, 0, 0, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#F5F5F0",
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={isProcessing || !chatInput.trim()}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "12px",
                    background: "#9BEA16",
                    color: "#000000",
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: LIVE CUSTOMER INTAKE & WEBHOOK CRM DISPATCH */}
        <div
          className="square-console"
          style={{
            borderRadius: "28px",
            background: "linear-gradient(180deg, rgba(20, 20, 24, 0.92) 0%, rgba(10, 10, 12, 0.98) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "22px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <div>
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={16} color="#9BEA16" />
                <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#F5F5F0" }}>
                  Live Customer Record
                </span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: webhookSent ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.05)",
                  color: webhookSent ? "#9BEA16" : "#A1A1AA",
                  border: `1px solid ${webhookSent ? "rgba(155, 234, 22, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                  fontWeight: 600,
                }}
              >
                {webhookSent ? "Webhook Dispatched" : "Awaiting Call Sync"}
              </span>
            </div>

            {/* Extracted Entity Fields - 5 Dedicated Structured Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginBottom: "14px",
              }}
            >
              {/* 1. Name */}
              <div
                style={{
                  padding: "9px 12px",
                  borderRadius: "10px",
                  background: extractedData.name ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.name ? "rgba(155, 234, 22, 0.35)" : "rgba(255, 255, 255, 0.06)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#8E8E93" }}>
                    <User size={11} color={extractedData.name ? "#9BEA16" : "#71717A"} />
                    <span>Caller Name</span>
                  </div>
                  {extractedData.name && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: extractedData.name ? "#F5F5F0" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.name || "—"}
                </div>
              </div>

              {/* 2. Phone */}
              <div
                style={{
                  padding: "9px 12px",
                  borderRadius: "10px",
                  background: extractedData.mobile ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.mobile ? "rgba(155, 234, 22, 0.35)" : "rgba(255, 255, 255, 0.06)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#8E8E93" }}>
                    <Phone size={11} color={extractedData.mobile ? "#9BEA16" : "#71717A"} />
                    <span>Mobile Contact</span>
                  </div>
                  {extractedData.mobile && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: extractedData.mobile ? "#F5F5F0" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.mobile || "—"}
                </div>
              </div>

              {/* 3. Dedicated Age / DOB Card */}
              <div
                style={{
                  padding: "9px 12px",
                  borderRadius: "10px",
                  background: extractedData.dob ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.dob ? "rgba(155, 234, 22, 0.35)" : "rgba(255, 255, 255, 0.06)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#8E8E93" }}>
                    <Calendar size={11} color={extractedData.dob ? "#9BEA16" : "#71717A"} />
                    <span>Age / DOB</span>
                  </div>
                  {extractedData.dob && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: extractedData.dob ? "#F5F5F0" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.dob || (activeIndustry.requiresDob ? "Pending Intake" : "Not Required")}
                </div>
              </div>

              {/* 4. Department & Assigned Doctor */}
              <div
                style={{
                  padding: "9px 12px",
                  borderRadius: "10px",
                  background: (extractedData.department || extractedData.doctor) ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${(extractedData.department || extractedData.doctor) ? "rgba(155, 234, 22, 0.35)" : "rgba(255, 255, 255, 0.06)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#8E8E93" }}>
                    <Stethoscope size={11} color={(extractedData.department || extractedData.doctor) ? "#9BEA16" : "#71717A"} />
                    <span>Department / Doctor</span>
                  </div>
                  {(extractedData.department || extractedData.doctor) && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: (extractedData.department || extractedData.doctor) ? "#F5F5F0" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.department
                    ? (extractedData.doctor ? `${extractedData.department} • ${extractedData.doctor}` : extractedData.department)
                    : (extractedData.doctor || "Awaiting Selection")}
                </div>
              </div>

              {/* 5. Booking Slot (Spanning Full Width) */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: extractedData.slot ? "rgba(155, 234, 22, 0.12)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.slot ? "#9BEA16" : "rgba(255, 255, 255, 0.06)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", color: "#8E8E93", marginBottom: "2px" }}>
                    <Clock size={11} color={extractedData.slot ? "#9BEA16" : "#71717A"} />
                    <span>Confirmed Booking Slot</span>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: extractedData.slot ? "#9BEA16" : "#52525B" }}>
                    {extractedData.slot || "Awaiting Slot Selection"}
                  </div>
                </div>
                {extractedData.slot && (
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "999px",
                      background: "rgba(155, 234, 22, 0.2)",
                      color: "#9BEA16",
                      border: "1px solid rgba(155, 234, 22, 0.4)",
                    }}
                  >
                    CONFIRMED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Webhook JSON Payload Preview Section */}
          <div style={{ marginTop: "18px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <button
                onClick={() => setShowJsonPayload(!showJsonPayload)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#A1A1AA",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: 0,
                }}
              >
                <Code2 size={13} />
                <span>{showJsonPayload ? "Hide Webhook JSON" : "View Webhook JSON"}</span>
                {showJsonPayload ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              <button
                onClick={copyPayloadToClipboard}
                title="Copy Payload"
                style={{
                  background: "transparent",
                  border: "none",
                  color: copiedPayload ? "#9BEA16" : "#8E8E93",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Copy size={12} />
                <span>{copiedPayload ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {showJsonPayload && (
              <pre
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  fontSize: "10.5px",
                  color: "#9BEA16",
                  maxHeight: "130px",
                  overflowY: "auto",
                  margin: 0,
                  fontFamily: "monospace",
                }}
              >
                {JSON.stringify(
                  {
                    event: "clinic.appointment.booked",
                    appointment_id: extractedData.appointment_id || "ABC-88421",
                    patient_name: extractedData.name || "—",
                    mobile_number: extractedData.mobile || "—",
                    age: extractedData.dob || "—",
                    intent: extractedData.intent || "Doctor Appointment",
                    appointment_type: "Doctor Appointment",
                    department: extractedData.department || "Cardiology",
                    doctor: extractedData.doctor || "—",
                    preferred_date: "Tomorrow",
                    preferred_time: extractedData.slot || "10:30 AM",
                    confirmed: webhookSent || !!extractedData.slot,
                    appointment_status: webhookSent ? "CONFIRMED" : (extractedData.slot ? "CONFIRMED" : "PENDING_INTAKE"),
                  },
                  null,
                  2
                )}
              </pre>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
              <CheckCircle2 size={13} color={webhookSent ? "#9BEA16" : "#8E8E93"} />
              <span style={{ fontSize: "11px", color: "#8E8E93" }}>
                {webhookSent
                  ? "✓ Realtime webhook payload delivered with Token CCH-014"
                  : "Automatic CRM dispatch on appointment confirmation"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .demo-main-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          max-width: 980px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
        .square-console {
          min-height: 460px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 960px) {
          .demo-main-grid {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 auto !important;
            gap: 16px !important;
          }
          .square-console {
            min-height: auto !important;
            padding: 16px 12px !important;
            border-radius: 24px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
        }
        @media (max-width: 640px) {
          .header-top-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .header-action-controls {
            justifyContent: space-between !important;
            width: 100% !important;
          }
        }
        @media (max-width: 500px) {
          .demo-main-grid {
            max-width: 100% !important;
            width: 100% !important;
          }
          .square-console {
            min-height: auto !important;
            padding: 14px 10px !important;
            border-radius: 20px !important;
          }
          .stepper-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 3px !important;
            width: 100% !important;
          }
          .stepper-grid > div {
            padding: 4px 3px !important;
            gap: 2px !important;
          }
          .stepper-grid span {
            font-size: 9px !important;
          }
        }
      `}</style>
    </div>
  );
}
