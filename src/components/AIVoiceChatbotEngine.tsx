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
  Briefcase,
  Building2,
  Code2,
  Check,
  CheckCheck,
  Smile,
  Paperclip,
  Sparkles,
  Copy,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Globe,
  Calendar,
  Clock,
  User,
  Tag,
  Activity,
  Languages,
  Loader2,
  Lightbulb,
  Cake,
} from "lucide-react";
import { INDUSTRY_FLOWS, IndustryFlow, IndustryMessage } from "@/data/industryFlows";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedOrb from "./AnimatedOrb";
import { SpeechWaveform } from "./SpeechWaveform";
import { ComingSoonPanel } from "./ComingSoonPanel";
import { ICON_MAP, VOICE_PERSONAS, LANGUAGE_OPTIONS } from "@/data/voiceWidgetConstants";
import { readNdjsonLines, stampTime, formatDuration, getQuickPrompts, splitSlot } from "@/lib/voiceWidgetHelpers";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { useMicCapture } from "@/hooks/use-mic-capture";
import { logVoiceEvent, resetVoiceTrace } from "@/lib/voiceWidgetTelemetry";

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
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [speechStatusText, setSpeechStatusText] = useState<string>("Click to start voice call");
  const [currentLanguageCode, setCurrentLanguageCode] = useState<string>("en-IN");
  const [speechLanguageMode, setSpeechLanguageMode] = useState<string>("auto");
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("ritu");
  const [showJsonPayload, setShowJsonPayload] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  // Language & voice pickers — shadcn/ui Popover (Radix underneath) handles
  // outside-click, ESC-to-close, and focus trapping natively, replacing the
  // hand-rolled click-outside effect this used to need.
  const [languagePopoverOpen, setLanguagePopoverOpen] = useState<boolean>(false);
  const [voicePopoverOpen, setVoicePopoverOpen] = useState<boolean>(false);
  const [industryPopoverOpen, setIndustryPopoverOpen] = useState<boolean>(false);
  // Whether the Tool Activity panel shows its full history or just the
  // latest few rows — purely presentational.
  const [activityExpanded, setActivityExpanded] = useState<boolean>(false);

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

  // A real, event-driven activity log for the dashboard's "Tool Activity"
  // panel — one entry per genuine backend milestone (a field the extraction
  // pipeline just filled, a slot the calendar check found, the webhook
  // dispatch), not a decorative timer. Derived below from actual state
  // transitions, never randomly generated.
  type ToolActivityEntry = { id: string; time: string; label: string; status: "processing" | "completed" };
  const [toolActivity, setToolActivity] = useState<ToolActivityEntry[]>([]);
  const prevExtractedForActivityRef = useRef<Record<string, unknown>>({});
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Guards against duplicate webhook dispatch for the same call. A ref (not
  // just the `webhookSent` state) because it must block a second dispatch
  // synchronously, before React has re-rendered with the updated state — the
  // backend can legitimately report isComplete:true again on a later turn
  // (e.g. GPT re-confirming after the booking), and without this the n8n
  // webhook — and the WhatsApp message it triggers — fired more than once.
  const webhookSentRef = useRef<boolean>(false);

  // References for live async callbacks
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const conversationHistoryRef = useRef<IndustryMessage[]>([]);
  const extractedDataRef = useRef<any>({});
  const selectedSpeakerRef = useRef<string>("ritu");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // "" = auto-detect language every turn; "hi-IN"/"en-IN" = user manually forced it via the language toggle
  const manualLanguageHintRef = useRef<string>("");
  // Mirrors currentLanguageCode for the same stale-closure reason as the refs
  // below — used to hint Sarvam's STT with whatever language is already
  // established in Auto mode (see startLiveListening) instead of sending
  // "unknown" on every single turn, which forces Sarvam to blind-guess even
  // deep into a call where the language is already obvious from context.
  // Verified live: Sarvam's STT can transcribe a short, unhinted utterance
  // ("Ankush") into a COMPLETELY different script/language (Kannada, 96%
  // claimed confidence) — not just mislabel it — so a hint that narrows what
  // it's listening for is the real fix, not just filtering its output after.
  const currentLanguageCodeRef = useRef<string>("en-IN");
  // Mirror isCallActive/isMuted into refs so async STT callbacks (which outlive
  // a single render) always check current state instead of a stale closure.
  const isCallActiveRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);
  // Auto-hangup after a confirmed booking: armed once the AI's confirmation
  // reply finishes and listening resumes, cleared if the caller starts
  // speaking again (they get a real grace window, not a hard cutoff).
  const autoEndCallTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndustry: IndustryFlow = INDUSTRY_FLOWS[selectedIndustryId] || INDUSTRY_FLOWS["doctors-clinics"];
  // Only "doctors-clinics" has real deterministic backend support today
  // (clinicEngine.ts + clinicTemplates.ts + DOCTOR_ROSTER) — every other
  // vertical falls through to an ungated raw GPT call. Rather than let
  // visitors reach that silently, every comingSoon-flagged industry (see
  // industryFlows.ts) renders the ComingSoonPanel below instead of the
  // live console.
  const isComingSoon = !!activeIndustry.comingSoon;

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
    currentLanguageCodeRef.current = currentLanguageCode;
  }, [currentLanguageCode]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Appends one "completed" activity entry per real field the extraction
  // pipeline has just filled in — a genuine log of what the backend did this
  // turn, not a fabricated timeline.
  useEffect(() => {
    const prev = prevExtractedForActivityRef.current;
    const curr = extractedData as Record<string, unknown>;
    const additions: ToolActivityEntry[] = [];
    const pushIfNew = (key: string, label: string) => {
      if (curr[key] && curr[key] !== prev[key]) {
        additions.push({ id: `${key}-${Date.now()}`, time: stampTime(), label, status: "completed" });
      }
    };
    pushIfNew("name", "crm.identifyCaller()");
    pushIfNew("mobile", "crm.verifyContact()");
    pushIfNew("department", "clinic.lookupDepartment()");
    pushIfNew("doctor", "clinic.assignDoctor()");
    pushIfNew("slot", "calendar.checkAvailability()");
    if (curr.confirmed && !prev.confirmed) {
      additions.push({ id: `confirmed-${Date.now()}`, time: stampTime(), label: "calendar.bookSlot()", status: "completed" });
    }
    if (additions.length) {
      setToolActivity((list) => [...list, ...additions].slice(-12));
    }
    prevExtractedForActivityRef.current = curr;
  }, [extractedData]);

  // The transient "preparing response" row — present exactly while a turn is
  // in flight, marked completed the moment it resolves.
  useEffect(() => {
    if (isProcessing) {
      setToolActivity((list) => [
        ...list.filter((e) => e.label !== "ai.prepareResponse()"),
        { id: `prep-${Date.now()}`, time: stampTime(), label: "ai.prepareResponse()", status: "processing" as const },
      ].slice(-12));
    } else {
      setToolActivity((list) => list.map((e) => (e.label === "ai.prepareResponse()" ? { ...e, status: "completed" as const } : e)));
    }
  }, [isProcessing]);

  useEffect(() => {
    if (webhookSent) {
      setToolActivity((list) => [...list, { id: `webhook-${Date.now()}`, time: stampTime(), label: "webhook.dispatchConfirmation()", status: "completed" as const }].slice(-12));
    }
  }, [webhookSent]);

  useEffect(() => {
    if (channel === "chat" && chatBottomRef.current && conversationHistory.length > 0) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [conversationHistory, channel]);

  // ─── Mic capture + AI audio playback ─────────────────────────────────────
  // Split into their own hooks (see src/hooks/use-mic-capture.ts and
  // use-audio-playback.ts) — destructured here under their original names
  // so every other call site below (processConversationTurn,
  // handleStartCall/handleEndCall, the mute toggle, the JSX waveform) needs
  // zero changes. useMicCapture must be called first: useAudioPlayback needs
  // its stopLiveListening (playing AI speech and listening are mutually
  // exclusive). onTranscriptReady/onSpeechResumed reference
  // processConversationTurn/cancelAutoEndCall, both declared further down
  // this same component — safe because neither runs until actually invoked,
  // well after the whole component body (and thus those consts) has
  // finished evaluating this render, exactly like this file's existing
  // forward-references (e.g. processConversationTurn calling
  // startLiveListening below).
  const {
    isUserSpeaking,
    liveUserTranscript,
    setLiveUserTranscript,
    analyserRef,
    startLiveListening,
    stopLiveListening,
  } = useMicCapture({
    isCallActiveRef,
    isMutedRef,
    manualLanguageHintRef,
    currentLanguageCodeRef,
    onSpeechResumed: () => cancelAutoEndCall(),
    onTranscriptReady: (transcript, detectedLanguageCode, languageProbability) =>
      processConversationTurn(transcript, detectedLanguageCode, languageProbability),
    setSpeechStatusText,
  });

  const {
    isAiSpeaking,
    setIsAiSpeaking,
    aiAnalyserRef,
    currentAudioRef,
    stopCurrentAudio,
    attachAiAnalyser,
    armAiSpeechWatchdog,
    resolveAiSpeech,
    speakTextAudible,
    resetAudioStreamState,
    enqueueAudioChunk,
    finishAudioStream,
  } = useAudioPlayback({
    isSpeakerOn,
    selectedSpeaker,
    selectedSpeakerRef,
    stopLiveListening,
    setSpeechStatusText,
  });

  // Dispatch Webhook
  const triggerWebhookDispatch = useCallback(async (payloadExtracted: any, history: IndustryMessage[]) => {
    try {
      const currentExt = extractedDataRef.current || {};
      const merged = { ...currentExt, ...payloadExtracted };
      const fallbackRefId = merged.appointment_id || `SUN-${Math.floor(10000 + Math.random() * 90000)}`;

      const webhookPayload = {
        event: "namuste.ai_demo.lead_captured",
        timestamp: new Date().toISOString(),
        industry: {
          id: activeIndustry.id,
          name: activeIndustry.name,
          brand: activeIndustry.brandName,
        },
        lead: {
          name: merged.name || "Patient",
          mobile: merged.mobile || "Unknown Number",
          dob: merged.dob || "Not Provided",
          department: merged.department || "Dermatology",
          assignedDoctorOrLead: merged.doctor || (merged.department === "Dermatology" ? "Dr. Pooja Gupta" : "General Specialist"),
          confirmedSlot: merged.slot || "Upcoming",
          intent: merged.intent || "Appointment Booking",
          summary: merged.summary || "Full intake completed via Namuste AI",
          referenceId: fallbackRefId,
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
      logVoiceEvent("reasoning", "chat:request-start", { userTextLength: userText.length, isVoiceTurn });
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
      logVoiceEvent("reasoning", "chat:response-headers-received", { status: res.status, ok: res.ok });

      if (!res.ok) {
        failureReason = res.status === 429
          ? "Too many requests — please wait a moment and try again."
          : `Server error (${res.status}). Please try again.`;
      }

      if (res.ok) {
        // Applies the reply's text/history/CRM/webhook side effects. Shared by
        // both response shapes below — a single complete JSON reply, or the
        // "text" event of a streamed reply — so behavior is identical either
        // way, this just runs the instant the reply text is known rather than
        // waiting for its audio too.
        const applyReplyData = (data: any) => {
          const aiMsg: IndustryMessage = {
            speaker: "ai",
            text: data.reply,
            // The authoritative language this turn was generated in — stored
            // so a later turn's language-stickiness check can read it
            // directly instead of re-guessing from the stored text. That
            // re-guess used to be the ONLY option, matching the reply against
            // a fixed ~60-word Hinglish keyword list — but GPT's romanized
            // Hindi replies vary in phrasing and routinely use common words
            // ("hai", "hain", "kar", "mein", "raha") that aren't on that
            // list, so a perfectly genuine Hindi reply could silently be
            // misread as English, breaking stickiness for the very next turn.
            language: data.languageCode || "",
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

          // Trigger webhook dispatch when booking is confirmed / completed
          const bookingJustCompleted = !!(data.isComplete || data.step === "confirmation_complete" || data.extracted?.confirmed);
          if (bookingJustCompleted && !webhookSentRef.current) {
            webhookSentRef.current = true;
            triggerWebhookDispatch({ ...currentExt, ...(data.extracted || {}) }, finalHistory);
          }

          setIsProcessing(false);
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

          return { bookingJustCompleted, callEnded, resumeListeningAfterTurn };
        };

        // Plays exactly one complete reply audio clip → instant Browser TTS
        // fallback. Unchanged logic from before streaming existed — used as-is
        // for every non-streamed response (every industry other than
        // doctors-clinics, and any doctors-clinics turn without audio).
        const playSingleAudioAndContinue = async (data: any, resumeListeningAfterTurn: () => void) => {
          if (isVoiceTurn && isSpeakerOn) {
            if (data.audioBase64) {
              stopCurrentAudio();
              setIsAiSpeaking(true);
              setSpeechStatusText("AI speaking...");
              try {
                const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
                attachAiAnalyser(audio);
                currentAudioRef.current = audio;
                const resumeAfterAudio = () => {
                  stopCurrentAudio();
                  setIsAiSpeaking(false);
                  const bookingJustCompleted = !!(data.isComplete || data.step === "confirmation_complete" || data.extracted?.confirmed);
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
          } else if (data.callEnded && isCallActiveRef.current) {
            // No audio playback path taken (speaker off / text channel) —
            // still honor the farewell and end the call.
            handleEndCall();
          }
        };

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("x-ndjson")) {
          // ── Streamed reply (doctors-clinics voice turns only) ───────────────
          // Text/CRM/webhook side effects apply the instant the "text" event
          // arrives — before any audio is ready — via the exact same
          // applyReplyData() the non-streaming path uses below. Each
          // "audio_chunk" plays as soon as it's synthesized instead of
          // waiting for the whole reply's audio.
          resetAudioStreamState();
          let replyApplied = false;
          let resumeListeningAfterTurn: (() => void) | null = null;

          await readNdjsonLines(res, (evt) => {
            if (evt.type === "text") {
              replyApplied = true;
              const result = applyReplyData(evt);
              resumeListeningAfterTurn = result.resumeListeningAfterTurn;
              if (!(isVoiceTurn && isSpeakerOn)) {
                // No audio will follow (text mode / speaker off) — finish now,
                // matching playSingleAudioAndContinue's non-audio branch.
                if (evt.callEnded && isCallActiveRef.current) {
                  handleEndCall();
                } else {
                  resumeListeningAfterTurn();
                }
              }
            } else if (evt.type === "audio_chunk" && evt.audioBase64 && isVoiceTurn && isSpeakerOn) {
              enqueueAudioChunk(evt.audioBase64);
            } else if (evt.type === "done" && isVoiceTurn && isSpeakerOn && resumeListeningAfterTurn) {
              const resume = resumeListeningAfterTurn;
              finishAudioStream(() => {
                stopCurrentAudio();
                setIsAiSpeaking(false);
                resume();
              });
            }
          });

          if (!replyApplied) {
            failureReason = failureReason || "The assistant didn't return a valid reply. Please try again.";
          } else {
            return;
          }
        } else {
          const data = await res.json();
          if (data.success && data.reply) {
            const { resumeListeningAfterTurn } = applyReplyData(data);
            await playSingleAudioAndContinue(data, resumeListeningAfterTurn);
            return;
          }
          // Response was ok but didn't carry a usable reply — treat as a failure below
          failureReason = failureReason || "The assistant didn't return a valid reply. Please try again.";
        }
      }
    } catch (e) {
      logVoiceEvent("reasoning", "chat:request-failed", { error: String(e) });
      console.warn("Turn processing error fallback:", e);
      failureReason = "Connection error — please try again.";
    }

    // A prior implementation fell through to here silently on ANY failure —
    // no visible error, and critically no resumption of listening, so a live
    // call would just go dead with zero feedback. Surface the failure and
    // keep the conversation loop alive instead.
    if (failureReason) logVoiceEvent("reasoning", "chat:turn-failed", { failureReason });
    setIsProcessing(false);
    setSpeechStatusText(`Error: ${failureReason || "Something went wrong. Please try again."}`);
    if (isVoiceTurn && isCallActiveRef.current && !isMutedRef.current) {
      startLiveListening();
    }
  }, [armAiSpeechWatchdog, attachAiAnalyser, channel, enqueueAudioChunk, finishAudioStream, isCallActive, isMuted, isProcessing, isSpeakerOn, resetAudioStreamState, resolveAiSpeech, selectedIndustryId, selectedSpeaker, speakTextAudible, stopCurrentAudio, stopLiveListening, triggerWebhookDispatch]);



  const handleStartCall = async () => {
    resetVoiceTrace();
    logVoiceEvent("capture", "call:start-requested");
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
    setToolActivity([]);
    prevExtractedForActivityRef.current = {};
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

  const quickPrompts = getQuickPrompts(activeIndustry);

  // A real subset of the languages this engine actually speaks (LANGUAGE_OPTIONS
  // above) — shown as pills in the AI Agent panel. Never lists a language the
  // backend can't actually detect/speak.
  const languagesSupported = LANGUAGE_OPTIONS.filter((l) => l.id !== "auto").slice(0, 6);

  const { date: extractedDate, time: extractedTime } = splitSlot(extractedData.slot);

  // The Live Actions panel's Status row — reflects genuine pipeline state
  // (a turn in flight, a confirmed booking, a slot on hold, or still
  // gathering details) rather than a static label.
  const liveStatusLabel = isProcessing
    ? "Checking availability…"
    : extractedData.confirmed
    ? (extractedData.appointment_status || "Confirmed")
    : extractedData.slot
    ? "Slot held — awaiting confirmation"
    : isCallActive || conversationHistory.length > 0
    ? "Gathering details…"
    : "Awaiting call";

  const liveActionRows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Tag size={14} />, label: "Intent", value: extractedData.intent || "—" },
    { icon: <User size={14} />, label: "Customer", value: extractedData.name || "New patient" },
    { icon: <Phone size={14} />, label: "Mobile", value: extractedData.mobile || "—" },
    { icon: <Cake size={14} />, label: "Age / DOB", value: extractedData.dob || "—" },
    { icon: <Building2 size={14} />, label: "Department", value: extractedData.department || "—" },
    { icon: <Calendar size={14} />, label: "Date", value: extractedDate },
    { icon: <Clock size={14} />, label: "Time", value: extractedTime },
    { icon: <Activity size={14} />, label: "Status", value: liveStatusLabel },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: "0", boxSizing: "border-box" }}>
      {isComingSoon ? (
        <ComingSoonPanel industry={activeIndustry} />
      ) : (
        <div className="ai-dash">
          {/* Top bar — business/language/channel controls. No title of its own:
              every page embedding this widget already renders its own tailored
              "Test the X Assistant" headline immediately above it, so a second
              one here was pure duplication. */}
          <div className="ai-dash-topbar">
            <div className="ai-dash-fields">
              <div className="ai-dash-field">
                <span className="ai-dash-field-label">Business</span>
                {!hideIndustrySelector && !lockedIndustryId ? (
                  <Popover open={industryPopoverOpen} onOpenChange={setIndustryPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="ai-dash-select">
                        <span className="ai-dash-select-icon">{ICON_MAP[activeIndustry.iconName] || <Briefcase size={13} />}</span>
                        <span>{activeIndustry.name}</span>
                        <ChevronDown size={12} style={{ transform: industryPopoverOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" sideOffset={8} className="flex w-[240px] flex-col gap-[3px] rounded-[14px] p-2">
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
                              setIndustryPopoverOpen(false);
                            }}
                            className="ai-popover-row"
                            style={{
                              background: isSelected ? "var(--green-glow)" : "transparent",
                              border: `1px solid ${isSelected ? "var(--border-green)" : "transparent"}`,
                            }}
                          >
                            <span style={{ color: isSelected ? "var(--green)" : "var(--text-muted)", display: "flex" }}>{ICON_MAP[ind.iconName] || <Briefcase size={14} />}</span>
                            <span style={{ flex: 1, color: isSelected ? "var(--green)" : "var(--text-ivory)", fontWeight: 600, fontSize: "12.5px" }}>{ind.name}</span>
                            {ind.comingSoon && <Badge variant="secondary" className="ai-soon-badge">Soon</Badge>}
                          </button>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <div className="ai-dash-select ai-dash-select-static">
                    <span className="ai-dash-select-icon">{ICON_MAP[activeIndustry.iconName] || <Briefcase size={13} />}</span>
                    <span>{activeIndustry.name}</span>
                  </div>
                )}
              </div>

              <div className="ai-dash-field">
                <span className="ai-dash-field-label">Language</span>
                <Popover
                  open={languagePopoverOpen}
                  onOpenChange={(open) => { setLanguagePopoverOpen(open); if (open) setVoicePopoverOpen(false); }}
                >
                  <PopoverTrigger asChild>
                    <button className="ai-dash-select">
                      <Globe size={13} />
                      <span>{speechLanguageMode === "auto" ? "Auto Detect" : LANGUAGE_OPTIONS.find((l) => l.id === speechLanguageMode)?.english || "Auto Detect"}</span>
                      <ChevronDown size={12} style={{ transform: languagePopoverOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" sideOffset={8} className="grid w-[260px] grid-cols-2 gap-1 rounded-[14px] p-2.5">
                    {LANGUAGE_OPTIONS.map((l) => {
                      const isSelected = speechLanguageMode === l.id;
                      return (
                        <button
                          key={l.id}
                          onClick={() => {
                            setSpeechLanguageMode(l.id);
                            manualLanguageHintRef.current = l.id === "auto" ? "" : l.id;
                            if (l.id !== "auto") setCurrentLanguageCode(l.id);
                            setLanguagePopoverOpen(false);
                          }}
                          className="ai-popover-row"
                          style={{
                            background: isSelected ? "var(--green-glow)" : "transparent",
                            border: `1px solid ${isSelected ? "var(--border-green)" : "transparent"}`,
                          }}
                        >
                          <span style={{ flex: 1, textAlign: "left" }}>
                            <span style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: isSelected ? "var(--green)" : "var(--text-ivory)" }}>{l.native}</span>
                            <span style={{ display: "block", fontSize: "9.5px", color: "var(--text-muted)" }}>{l.english}</span>
                          </span>
                          {isSelected && <Check size={13} color="var(--green)" />}
                        </button>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="ai-dash-actions">
              <Tabs value={channel} onValueChange={(v) => setChannel(v as "voice" | "chat")}>
                <TabsList
                  variant="line"
                  className="!h-auto !gap-0 !rounded-full !border !p-[3px]"
                  style={{ borderColor: "var(--border2)", background: "var(--overlay-2)" }}
                >
                  <TabsTrigger
                    value="voice"
                    className="!rounded-full !border-0 !px-4 !py-[8px] !text-[12px] !font-semibold data-active:!bg-[var(--green-luminous)] data-active:!text-black data-active:after:!opacity-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Phone size={12} />
                    <span>Voice</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="!rounded-full !border-0 !px-4 !py-[8px] !text-[12px] !font-semibold data-active:!bg-[var(--green-luminous)] data-active:!text-black data-active:after:!opacity-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <MessageSquare size={12} />
                    <span>Chat</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <button onClick={handleReset} className="ai-dash-reset">
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Three-panel dashboard */}
          <div className="ai-dash-grid">
            {/* LEFT — AI Agent */}
            <Card className="ai-panel">
              <CardContent className="ai-panel-body">
                <div className="ai-panel-head">
                  <span>AI Agent</span>
                  <Badge className="ai-badge-active"><span className="ai-live-dot" /> Active</Badge>
                </div>

                <div className="ai-agent-card">
                  <span className="ai-agent-icon">{ICON_MAP[activeIndustry.iconName] || <Sparkles size={16} />}</span>
                  <div style={{ minWidth: 0 }}>
                    <div className="ai-agent-name">{activeIndustry.brandName}</div>
                    <div className="ai-agent-role">Virtual Receptionist</div>
                    <div className="ai-agent-sub">{activeIndustry.tagline}</div>
                  </div>
                </div>

                <Popover
                  open={voicePopoverOpen}
                  onOpenChange={(open) => { setVoicePopoverOpen(open); if (open) setLanguagePopoverOpen(false); }}
                >
                  <PopoverTrigger asChild>
                    <button className="ai-agent-card ai-persona-card">
                      <span className="ai-persona-avatar"><AnimatedOrb size={36} /></span>
                      <div style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
                        <div className="ai-agent-name">{VOICE_PERSONAS.find((v) => v.id === selectedSpeaker)?.label || "Ritu"}</div>
                        <div className="ai-agent-role">AI Receptionist</div>
                      </div>
                      <span className="ai-persona-wave">
                        <SpeechWaveform
                          state={isAiSpeaking ? "ai" : "idle"}
                          userAnalyserRef={analyserRef}
                          aiAnalyserRef={aiAnalyserRef}
                          barCount={5}
                          barColor="var(--green)"
                        />
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" sideOffset={8} className="flex w-[230px] flex-col gap-[3px] rounded-[14px] p-2">
                    {VOICE_PERSONAS.map((vp) => {
                      const isSelected = selectedSpeaker === vp.id;
                      return (
                        <button
                          key={vp.id}
                          onClick={() => { setSelectedSpeaker(vp.id); setVoicePopoverOpen(false); }}
                          className="ai-popover-row"
                          style={{
                            background: isSelected ? "var(--green-glow)" : "transparent",
                            border: `1px solid ${isSelected ? "var(--border-green)" : "transparent"}`,
                          }}
                        >
                          <span className="ai-persona-initial">{vp.label.charAt(0)}</span>
                          <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                            <span style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: isSelected ? "var(--green)" : "var(--text-ivory)" }}>{vp.label}</span>
                            <span style={{ display: "block", fontSize: "10px", color: "var(--text-muted)" }}>{vp.gender} · {vp.desc}</span>
                          </span>
                          {isSelected && <Check size={13} color="var(--green)" style={{ flexShrink: 0 }} />}
                        </button>
                      );
                    })}
                  </PopoverContent>
                </Popover>

                <div className="ai-panel-subhead"><Languages size={12} /> Languages Supported</div>
                <div className="ai-lang-pills">
                  {languagesSupported.map((l) => (
                    <span key={l.id} className="ai-lang-pill">{l.english}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="ai-try-cta"
                  onClick={() => {
                    if (channel === "voice") {
                      if (!isCallActive) handleStartCall();
                    } else {
                      chatInputRef.current?.focus();
                    }
                  }}
                >
                  <span className="ai-try-cta-icon"><Sparkles size={14} /></span>
                  <span className="ai-try-cta-text">
                    <span className="ai-try-cta-title">Try it now</span>
                    <span className="ai-try-cta-sub">
                      {channel === "voice" ? "Start a real voice call below" : "Send a message below"}
                    </span>
                  </span>
                  <ChevronRight size={14} className="ai-try-cta-arrow" />
                </button>

                <div className="ai-tip-box">
                  <Sparkles size={14} />
                  <span>Handles accents, context and code-switching across {Object.keys(INDUSTRY_FLOWS).length} business verticals.</span>
                </div>
              </CardContent>
            </Card>

            {/* CENTER — Live Conversation */}
            <Card className={`ai-panel ai-panel-center${channel === "chat" ? " is-whatsapp" : ""}`}>
              <CardContent className="ai-panel-body ai-center-body">
                {channel === "chat" ? (
                  <div className="ai-wa-header">
                    <span className="ai-wa-avatar">{ICON_MAP[activeIndustry.iconName] || <Sparkles size={16} />}</span>
                    <div className="ai-wa-header-text">
                      <span className="ai-wa-name">{activeIndustry.brandName}</span>
                      <span className="ai-wa-status">{isProcessing ? "typing…" : "online"}</span>
                    </div>
                    {conversationHistory.length > 0 && (
                      <Badge variant="secondary" className="ai-wa-detected">
                        <Globe size={11} />
                        {LANGUAGE_OPTIONS.find((l) => l.id === currentLanguageCode)?.english || "English"}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="ai-panel-head">
                    <span className="ai-live-title"><span className="ai-live-dot" /> Live Conversation</span>
                    {(isCallActive || callDuration > 0) && <span className="ai-timer">{formatDuration(callDuration)}</span>}
                    {conversationHistory.length > 0 && (
                      <Badge variant="secondary" className="ai-detected-badge">
                        <Globe size={11} />
                        Detected: {LANGUAGE_OPTIONS.find((l) => l.id === currentLanguageCode)?.english || "English"}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="ai-transcript">
                  {conversationHistory.length === 0 && !isProcessing ? (
                    <div className="ai-transcript-empty">
                      <div className="ai-empty-orb-wrap">
                        <motion.span
                          className="ai-empty-orb-ring"
                          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.span
                          className="ai-empty-orb-ring"
                          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
                        />
                        <motion.div className="ai-empty-orbit" animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }}>
                          <span className="ai-empty-orbit-dot" style={{ background: "#22D3EE", boxShadow: "0 0 10px #22D3EE" }} />
                        </motion.div>
                        <motion.div className="ai-empty-orbit" animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                          <span className="ai-empty-orbit-dot ai-empty-orbit-dot-b" style={{ background: "#9BEA16", boxShadow: "0 0 10px #9BEA16" }} />
                        </motion.div>
                        <AnimatedOrb size={104} />
                      </div>
                      <p className="ai-empty-title">Ready when you are.</p>
                      <p className="ai-empty-sub">{channel === "voice" ? "Tap “Start Voice Call” below to begin." : "Send a message below to begin."}</p>
                      <motion.span
                        className="ai-empty-nudge"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      {conversationHistory.map((msg, index) => {
                        const isAi = msg.speaker === "ai";
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`ai-msg ${isAi ? "is-ai" : "is-user"}`}
                          >
                            <span className="ai-msg-avatar">{isAi ? <Sparkles size={12} /> : <User size={12} />}</span>
                            <div className="ai-msg-bubble">
                              <div className="ai-msg-from">{isAi ? activeIndustry.brandName.split(" ")[0] + " AI" : "You"}</div>
                              <p>{msg.text}</p>
                              {msg.timestamp && (
                                <span className="ai-msg-time">
                                  {msg.timestamp}
                                  {channel === "chat" && !isAi && <CheckCheck size={14} className="ai-wa-check" />}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  )}
                  {liveUserTranscript && (
                    <div className="ai-msg is-user">
                      <span className="ai-msg-avatar"><User size={12} /></span>
                      <div className="ai-msg-bubble ai-msg-live">
                        <div className="ai-msg-from">You · live</div>
                        <p>{liveUserTranscript}</p>
                      </div>
                    </div>
                  )}
                  {isProcessing && (
                    <div className="ai-msg is-ai">
                      <span className="ai-msg-avatar"><Sparkles size={12} /></span>
                      <div className="ai-msg-bubble ai-typing">
                        <span className="ai-typing-dot" />
                        <span className="ai-typing-dot" />
                        <span className="ai-typing-dot" />
                        <span className="ai-typing-text">Checking availability…</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {channel === "voice" ? (
                  <div className="ai-call-bar">
                    {!isCallActive ? (
                      <div className="ai-call-cta-wrap">
                        <motion.span
                          className="ai-call-pulse-ring"
                          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.button
                          onClick={handleStartCall}
                          disabled={isConnecting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="ai-call-start"
                        >
                          <span className="ai-call-start-shine" />
                          <motion.span
                            style={{ display: "inline-flex" }}
                            animate={{ scale: [1, 1.18, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Phone size={16} />
                          </motion.span>
                          <span>{isConnecting ? "Connecting…" : "Start Voice Call"}</span>
                        </motion.button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            if (!isMuted) { stopLiveListening(); setIsMuted(true); }
                            else { setIsMuted(false); startLiveListening(); }
                          }}
                          className="ai-ctrl-btn"
                        >
                          {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
                          <span>Mute</span>
                        </button>

                        <div className="ai-call-wave">
                          <SpeechWaveform
                            state={isAiSpeaking ? "ai" : isUserSpeaking ? "user" : "idle"}
                            userAnalyserRef={analyserRef}
                            aiAnalyserRef={aiAnalyserRef}
                            barCount={32}
                            barColor={isAiSpeaking ? "var(--green)" : isUserSpeaking ? "#0EA5E9" : "var(--text-dim)"}
                          />
                          <span className={`ai-call-wave-label${speechStatusText.startsWith("Error:") ? " is-error" : ""}`}>
                            {speechStatusText.startsWith("Error:")
                              ? speechStatusText
                              : isAiSpeaking
                              ? `${VOICE_PERSONAS.find((v) => v.id === selectedSpeaker)?.label || "Ritu"} is speaking…`
                              : isUserSpeaking
                              ? "Listening…"
                              : `On call · ${formatDuration(callDuration)}`}
                          </span>
                        </div>

                        <button onClick={handleEndCall} className="ai-ctrl-btn ai-ctrl-end">
                          <PhoneOff size={15} />
                          <span>End call</span>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (chatInput.trim()) {
                        processConversationTurn(chatInput);
                        setChatInput("");
                      }
                    }}
                    className="ai-chat-form"
                  >
                    <span className="ai-wa-input-icon"><Smile size={21} /></span>
                    <input
                      ref={chatInputRef}
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message"
                    />
                    <span className="ai-wa-input-icon"><Paperclip size={19} /></span>
                    <button type="submit" disabled={isProcessing || !chatInput.trim()}>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* RIGHT — Live Actions */}
            <Card className="ai-panel">
              <CardContent className="ai-panel-body">
                <div className="ai-panel-head">
                  <span className="ai-live-title"><Activity size={13} /> Live Actions</span>
                  <Badge className={isProcessing ? "ai-badge-processing" : "ai-badge-active"}>
                    {isProcessing && <Loader2 size={10} className="ai-spin" />}
                    {isProcessing ? "Processing" : "Ready"}
                  </Badge>
                </div>

                <ul className="ai-actions-list">
                  {liveActionRows.map((row) => (
                    <li key={row.label}>
                      <span className="ai-action-icon">{row.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div className="ai-action-label">{row.label}</div>
                        <div className="ai-action-value">{row.value}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="ai-panel-subhead-row">
                  <span><Tag size={12} /> Tool Activity</span>
                  {toolActivity.length > 3 && (
                    <button onClick={() => setActivityExpanded(!activityExpanded)} className="ai-see-all">
                      {activityExpanded ? "Show less" : "See all"} <ChevronRight size={11} />
                    </button>
                  )}
                </div>
                <div className="ai-activity-list">
                  {toolActivity.length === 0 ? (
                    <div className="ai-activity-empty">No activity yet — start a call or chat.</div>
                  ) : (
                    [...(activityExpanded ? toolActivity : toolActivity.slice(-3))].reverse().map((entry) => (
                      <div className="ai-activity-row" key={entry.id}>
                        <span className={`ai-activity-dot ${entry.status}`} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div className="ai-activity-label">{entry.label}</div>
                          <div className="ai-activity-time">{entry.time}</div>
                        </div>
                        <span className={`ai-activity-status ${entry.status}`}>
                          {entry.status === "processing" ? <Loader2 size={10} className="ai-spin" /> : <Check size={10} strokeWidth={3} />}
                          {entry.status === "processing" ? "Processing" : "Completed"}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="ai-tip-box ai-tip-box-accent">
                  <Lightbulb size={14} />
                  <div style={{ minWidth: 0 }}>
                    <div className="ai-tip-title">Need to try something?</div>
                    <div className="ai-quick-prompts">
                      {quickPrompts.map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            if (channel === "voice" && !isCallActive) { handleStartCall(); return; }
                            processConversationTurn(p);
                          }}
                        >
                          &ldquo;{p}&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dev-only webhook payload viewer — tucked away, not part of the
              visible product surface. */}
          <div className="ai-dev-toggle">
            <button onClick={() => setShowJsonPayload(!showJsonPayload)}>
              <Code2 size={12} />
              <span>{showJsonPayload ? "Hide webhook JSON" : "View webhook JSON"}</span>
              {showJsonPayload ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {showJsonPayload && (
              <>
                <button onClick={copyPayloadToClipboard} className="ai-dev-copy">
                  <Copy size={12} />
                  <span>{copiedPayload ? "Copied!" : "Copy"}</span>
                </button>
                <motion.pre
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                >
                  {JSON.stringify(
                    {
                      event: "clinic.appointment.booked",
                      appointment_id: extractedData.appointment_id || "—",
                      patient_name: extractedData.name || "—",
                      mobile_number: extractedData.mobile || "—",
                      age: extractedData.dob || "—",
                      intent: extractedData.intent || "—",
                      department: extractedData.department || "—",
                      doctor: extractedData.doctor || "—",
                      slot: extractedData.slot || "—",
                      confirmed: !!extractedData.confirmed,
                      appointment_status: extractedData.appointment_status || "PENDING_INTAKE",
                    },
                    null,
                    2
                  )}
                </motion.pre>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .ai-dash { display: flex; flex-direction: column; gap: 20px; }

        .ai-dash-topbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          padding: 14px 18px; border-radius: 16px;
          background: var(--surface); border: 1px solid var(--border);
          box-shadow: 0 1px 0 var(--overlay-1);
        }
        .ai-dash-fields { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .ai-dash-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ai-dash-field { display: flex; align-items: center; gap: 8px; }
        .ai-dash-field-label { font-size: 11px; font-weight: 600; color: var(--text-dim); white-space: nowrap; }
        .ai-dash-select {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 14px; border-radius: 10px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text-ivory); font-size: 12.5px; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .ai-dash-select:hover { border-color: var(--border-green); background: var(--green-glow); }
        .ai-dash-select-static { cursor: default; opacity: 0.85; }
        .ai-dash-select-static:hover { border-color: var(--border); background: var(--surface2); }
        .ai-dash-select-icon { color: var(--green); display: flex; }
        .ai-dash-reset {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 14px; border-radius: 10px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text-muted); font-size: 12px; font-weight: 600; cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .ai-dash-reset:hover { border-color: var(--border2); color: var(--text-ivory); }
        .ai-popover-row {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 9px; cursor: pointer; width: 100%; box-sizing: border-box;
        }
        .ai-soon-badge { font-size: 9px; }

        .ai-dash-grid { display: grid; grid-template-columns: 0.85fr 1.3fr 0.95fr; gap: 16px; align-items: stretch; }
        .ai-panel { height: 100%; }
        .ai-panel-body { display: flex; flex-direction: column; gap: 14px; height: 100%; }
        .ai-panel-center { display: flex; }
        .ai-center-body { flex: 1; }

        .ai-panel-head { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 700; color: var(--text-ivory); flex-wrap: wrap; }
        .ai-live-title { display: inline-flex; align-items: center; gap: 7px; }
        .ai-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); flex-shrink: 0; animation: aiPulse 1.6s ease-in-out infinite; }
        @keyframes aiPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .ai-badge-active { background: var(--green-glow); color: var(--green); margin-left: auto; }
        .ai-badge-processing { background: var(--coral-bg); color: var(--coral); margin-left: auto; display: inline-flex; align-items: center; gap: 4px; }
        .ai-timer { font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; color: var(--text-dim); margin-left: auto; }
        .ai-detected-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; }
        .ai-spin { animation: aiSpin 0.9s linear infinite; }
        @keyframes aiSpin { to { transform: rotate(360deg); } }

        .ai-agent-card {
          display: flex; align-items: center; gap: 12px;
          padding: 12px; border-radius: 12px;
          background: var(--surface2); border: 1px solid var(--border);
          text-align: left; cursor: default; width: 100%; box-sizing: border-box;
        }
        .ai-persona-card { cursor: pointer; transition: border-color 0.15s ease; }
        .ai-persona-card:hover { border-color: var(--border-green); }
        .ai-agent-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .ai-persona-avatar { width: 36px; height: 36px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
        .ai-persona-initial {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-luminous); color: #052015; font-size: 12px; font-weight: 700;
        }
        .ai-persona-wave { width: 34px; height: 16px; position: relative; flex-shrink: 0; }
        .ai-agent-name { font-size: 14px; font-weight: 700; color: var(--text-ivory); }
        .ai-agent-role { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; }
        .ai-agent-sub { font-size: 10.5px; color: var(--text-dim); margin-top: 2px; }

        .ai-panel-subhead {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.02em; color: var(--text-ivory);
          margin-top: 2px;
        }
        .ai-panel-subhead-row { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
        .ai-panel-subhead-row span { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: var(--text-ivory); }
        .ai-see-all { display: inline-flex; align-items: center; gap: 2px; background: none; border: none; color: var(--green); font-size: 10.5px; font-weight: 600; cursor: pointer; }

        .ai-lang-pills { display: flex; flex-wrap: wrap; gap: 6px; }
        .ai-lang-pill {
          padding: 5px 11px; border-radius: 999px; font-size: 11px; font-weight: 600;
          background: var(--overlay-1); border: 1px solid var(--border); color: var(--text-muted);
        }

        .ai-try-cta {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 12px;
          background: linear-gradient(135deg, var(--green-glow), var(--green-glow-strong));
          border: 1px solid var(--border-green);
          cursor: pointer; width: 100%; box-sizing: border-box; text-align: left;
          font: inherit; transition: transform 0.15s ease;
          animation: aiTryPulse 2.6s ease-in-out infinite;
        }
        @keyframes aiTryPulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--green-glow); }
          50% { box-shadow: 0 10px 22px -6px var(--green-glow-strong); }
        }
        .ai-try-cta:hover { transform: translateY(-1px); }
        .ai-try-cta-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green); color: #052015;
        }
        .ai-try-cta-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
        .ai-try-cta-title { font-size: 13px; font-weight: 700; color: var(--text-ivory); }
        .ai-try-cta-sub { font-size: 10.5px; color: var(--text-muted); }
        .ai-try-cta-arrow { color: var(--green); flex-shrink: 0; transition: transform 0.15s ease; }
        .ai-try-cta:hover .ai-try-cta-arrow { transform: translateX(2px); }

        .ai-tip-box {
          display: flex; align-items: flex-start; gap: 9px;
          padding: 12px 13px; border-radius: 12px; margin-top: auto;
          background: var(--green-glow); border: 1px solid var(--border-green);
          font-size: 11.5px; color: var(--text-muted); line-height: 1.45;
        }
        .ai-tip-box svg { color: var(--green); flex-shrink: 0; margin-top: 1px; }
        .ai-tip-box-accent { background: var(--overlay-1); border-color: var(--border); }
        .ai-tip-box-accent svg { color: var(--text-muted); }
        .ai-tip-title { font-size: 12px; font-weight: 700; color: var(--text-ivory); margin-bottom: 8px; }
        .ai-quick-prompts { display: flex; flex-direction: column; gap: 6px; }
        .ai-quick-prompts button {
          text-align: left; background: var(--surface); border: 1px solid var(--border);
          border-radius: 9px; padding: 7px 10px; font-size: 11.5px; color: var(--text-ivory);
          cursor: pointer; font-style: italic;
        }
        .ai-quick-prompts button:hover { border-color: var(--border-green); }

        .ai-transcript {
          flex: 1; min-height: 220px; max-height: 420px; overflow-y: auto;
          display: flex; flex-direction: column; gap: 12px;
          padding: 4px 4px 4px 0;
        }
        .ai-transcript-empty {
          position: relative;
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; color: var(--text-dim); text-align: center; padding: 40px 20px;
          border-radius: 18px; overflow: hidden;
          background: radial-gradient(circle at 50% 32%, rgba(118, 192, 67, 0.18), rgba(34, 211, 238, 0.09) 42%, transparent 70%);
        }
        .ai-empty-orb-wrap { position: relative; width: 112px; height: 112px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .ai-empty-orb-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--green); }
        .ai-empty-orbit { position: absolute; inset: -6px; }
        .ai-empty-orbit-dot { position: absolute; top: 0; left: 50%; width: 7px; height: 7px; border-radius: 50%; margin-left: -3.5px; }
        .ai-empty-orbit-dot-b { top: auto; bottom: 0; }
        .ai-empty-title {
          position: relative; font-size: 18px; font-weight: 800; margin: 0; letter-spacing: -0.01em;
          background: linear-gradient(90deg, var(--text-ivory) 30%, var(--green));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ai-empty-sub { position: relative; font-size: 13px; color: var(--text-muted); margin: 4px 0 0; }
        .ai-empty-nudge { position: relative; color: var(--green); margin-top: 10px; display: inline-flex; }
        .ai-msg { display: flex; gap: 8px; align-items: flex-start; }
        .ai-msg.is-user { flex-direction: row-reverse; }
        .ai-msg-avatar {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .ai-msg.is-user .ai-msg-avatar { background: var(--overlay-2); color: var(--text-muted); }
        .ai-msg-bubble {
          max-width: 78%; padding: 9px 13px; border-radius: 13px;
          background: var(--surface2); border: 1px solid var(--border);
        }
        .ai-msg.is-user .ai-msg-bubble { background: var(--overlay-1); }
        .ai-msg-bubble p { margin: 2px 0 0; font-size: 13.5px; color: var(--text-ivory); line-height: 1.5; }
        .ai-msg-from { font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--green); }
        .ai-msg.is-user .ai-msg-from { color: var(--text-dim); }
        .ai-msg-time { display: block; font-family: 'SF Mono', 'Menlo', monospace; font-size: 9px; color: var(--text-dim); margin-top: 4px; }
        .ai-msg-live .ai-msg-from { color: #0EA5E9; }
        .ai-typing { display: flex; align-items: center; gap: 6px; }
        .ai-typing-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-dim); animation: aiTyping 1.2s ease-in-out infinite; }
        .ai-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .ai-typing-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes aiTyping { 0%, 60%, 100% { opacity: 0.3; } 30% { opacity: 1; } }
        .ai-typing-text { font-size: 11.5px; color: var(--text-muted); margin-left: 4px; }

        .ai-call-bar {
          display: flex; align-items: center; gap: 12px;
          border-top: 1px solid var(--border); padding-top: 16px; margin-top: 4px;
        }
        .ai-call-cta-wrap { position: relative; flex: 1; display: flex; }
        .ai-call-pulse-ring {
          position: absolute; inset: -4px; border-radius: 16px;
          border: 2.5px solid var(--green-luminous); pointer-events: none;
        }
        .ai-call-start {
          position: relative; overflow: hidden;
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          padding: 16px; border-radius: 13px;
          background: linear-gradient(135deg, var(--green), var(--green-luminous));
          color: #052015;
          font-size: 14.5px; font-weight: 800; border: none; cursor: pointer;
          box-shadow: 0 14px 30px -10px var(--green-glow-strong);
        }
        .ai-call-start-shine {
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: aiShine 2.6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes aiShine {
          0% { left: -60%; }
          50% { left: 130%; }
          100% { left: 130%; }
        }
        .ai-ctrl-btn {
          display: inline-flex; flex-direction: column; align-items: center; gap: 4px;
          background: none; border: none; color: var(--text-muted); font-size: 10.5px; font-weight: 600; cursor: pointer;
        }
        .ai-ctrl-btn svg { width: 34px; height: 34px; padding: 9px; border-radius: 50%; background: var(--overlay-2); box-sizing: border-box; color: var(--text-ivory); }
        .ai-ctrl-end svg { background: var(--coral); color: #fff; }
        .ai-call-wave { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 0; }
        .ai-call-wave > div { width: 100%; height: 28px; position: relative; }
        .ai-call-wave-label { font-size: 11px; color: var(--text-muted); font-weight: 600; }
        .ai-call-wave-label.is-error { color: var(--coral); }

        .ai-chat-form {
          display: flex; gap: 10px; align-items: center;
          border-top: 1px solid var(--border); padding-top: 14px; margin-top: 4px;
        }
        .ai-chat-form input {
          flex: 1; padding: 10px 14px; border-radius: 999px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text-ivory); font-size: 13.5px; outline: none; box-sizing: border-box;
        }
        .ai-chat-form button {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          background: var(--green-luminous); color: #052015; border: none; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .ai-chat-form button:disabled { opacity: 0.5; }

        /* WhatsApp-style skin for chat mode — visual only, reuses the same
           conversationHistory/state as voice mode. Real WhatsApp colors on
           purpose (not the site's green brand tokens) since the point is to
           read as the actual app, in both light and dark theme. */
        .is-whatsapp {
          --wa-header-bg: #075E54; --wa-header-text: #E9EDEF;
          --wa-chat-bg: #ECE5DD; --wa-incoming-bg: #FFFFFF; --wa-outgoing-bg: #D9FDD3;
          --wa-text: #111B21; --wa-meta: #667781; --wa-check-blue: #53BDEB;
          --wa-input-bg: #F0F2F5; --wa-accent: #00A884;
        }
        .dark .is-whatsapp {
          --wa-header-bg: #202C33; --wa-header-text: #E9EDEF;
          --wa-chat-bg: #0B141A; --wa-incoming-bg: #202C33; --wa-outgoing-bg: #005C4B;
          --wa-text: #E9EDEF; --wa-meta: #8696A0; --wa-check-blue: #53BDEB;
          --wa-input-bg: #202C33; --wa-accent: #00A884;
        }
        .is-whatsapp .ai-panel-body { gap: 0; }

        .ai-wa-header {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px; margin: calc(-1 * var(--card-spacing, 1rem)) calc(-1 * var(--card-spacing, 1rem)) 0;
          background: var(--wa-header-bg);
        }
        .ai-wa-avatar {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255, 255, 255, 0.16); color: #fff;
        }
        .ai-wa-header-text { display: flex; flex-direction: column; min-width: 0; flex: 1; }
        .ai-wa-name { font-size: 14px; font-weight: 600; color: var(--wa-header-text); }
        .ai-wa-status { font-size: 11.5px; color: rgba(255, 255, 255, 0.72); }
        .ai-wa-detected {
          background: rgba(255, 255, 255, 0.16) !important; color: #fff !important;
          border: none !important; font-size: 10px !important;
          display: inline-flex; align-items: center; gap: 5px;
        }

        .is-whatsapp .ai-transcript {
          margin: 0 calc(-1 * var(--card-spacing, 1rem));
          padding: 14px 16px;
          background-color: var(--wa-chat-bg);
          background-image: url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.035'%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='55' cy='35' r='2'/%3E%3Ccircle cx='35' cy='65' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E");
        }
        .dark .is-whatsapp .ai-transcript {
          background-image: url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.035'%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='55' cy='35' r='2'/%3E%3Ccircle cx='35' cy='65' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E");
        }
        .is-whatsapp .ai-msg-avatar, .is-whatsapp .ai-msg-from { display: none; }
        .is-whatsapp .ai-msg { gap: 0; }
        .is-whatsapp .ai-msg-bubble {
          position: relative; max-width: 75%;
          padding: 7px 9px 8px; border-radius: 2px 8px 8px 8px;
          background: var(--wa-incoming-bg); border: none;
          box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
        }
        .is-whatsapp .ai-msg-bubble::before {
          content: ""; position: absolute; top: 0; left: -7px; width: 0; height: 0;
          border-top: 8px solid var(--wa-incoming-bg); border-left: 8px solid transparent;
        }
        .is-whatsapp .ai-msg.is-user .ai-msg-bubble {
          background: var(--wa-outgoing-bg); border-radius: 8px 2px 8px 8px; margin-left: auto;
        }
        .is-whatsapp .ai-msg.is-user .ai-msg-bubble::before {
          left: auto; right: -7px;
          border-top: 8px solid var(--wa-outgoing-bg); border-left: none; border-right: 8px solid transparent;
        }
        .is-whatsapp .ai-msg-bubble p { margin: 0; font-size: 14px; color: var(--wa-text); line-height: 1.4; }
        .is-whatsapp .ai-msg-time {
          display: flex; align-items: center; justify-content: flex-end; gap: 3px;
          font-family: inherit; font-size: 10.5px; color: var(--wa-meta); margin-top: 3px;
        }
        .is-whatsapp .ai-wa-check { color: var(--wa-check-blue); flex-shrink: 0; }
        .is-whatsapp .ai-msg-bubble.ai-typing { flex-direction: row; align-items: center; gap: 6px; }
        .is-whatsapp .ai-typing-text { color: var(--wa-meta); }

        .is-whatsapp .ai-chat-form {
          margin: 0 calc(-1 * var(--card-spacing, 1rem)) calc(-1 * var(--card-spacing, 1rem));
          padding: 10px 16px; background: var(--wa-input-bg); border-top: none;
        }
        .ai-wa-input-icon { display: inline-flex; align-items: center; justify-content: center; color: var(--wa-meta, var(--text-dim)); flex-shrink: 0; }
        .is-whatsapp .ai-chat-form input {
          background: var(--wa-incoming-bg); border: none; color: var(--wa-text);
        }
        .is-whatsapp .ai-chat-form input::placeholder { color: var(--wa-meta); }
        .is-whatsapp .ai-chat-form button { background: var(--wa-accent); color: #fff; }

        .ai-actions-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .ai-actions-list li { display: flex; align-items: center; gap: 10px; }
        .ai-action-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .ai-action-label { font-size: 10px; font-weight: 600; letter-spacing: 0.03em; color: var(--text-dim); text-transform: uppercase; }
        .ai-action-value { font-size: 13px; font-weight: 600; color: var(--text-ivory); margin-top: 1px; }

        .ai-activity-list { display: flex; flex-direction: column; gap: 8px; }
        .ai-activity-empty { font-size: 11.5px; color: var(--text-dim); padding: 8px 0; }
        .ai-activity-row { display: flex; align-items: center; gap: 9px; padding: 8px 0; border-bottom: 1px solid var(--border); }
        .ai-activity-row:last-child { border-bottom: none; }
        .ai-activity-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; background: var(--text-dim); }
        .ai-activity-dot.completed { background: var(--green); }
        .ai-activity-dot.processing { background: #F59E0B; }
        .ai-activity-label { font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; color: var(--text-ivory); }
        .ai-activity-time { font-family: 'SF Mono', 'Menlo', monospace; font-size: 9.5px; color: var(--text-dim); margin-top: 1px; }
        .ai-activity-status {
          display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;
          font-size: 9.5px; font-weight: 700; padding: 3px 8px; border-radius: 999px;
          background: var(--overlay-1); color: var(--text-dim);
        }
        .ai-activity-status.completed { background: var(--green-glow); color: var(--green); }
        .ai-activity-status.processing { background: rgba(245, 158, 11, 0.12); color: #F59E0B; }

        .ai-dev-toggle { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .ai-dev-toggle > button {
          background: transparent; border: none; color: var(--text-dim);
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 10.5px; font-weight: 600; cursor: pointer;
          display: inline-flex; align-items: center; gap: 4px; padding: 0;
        }
        .ai-dev-copy { color: var(--text-dim); }
        .ai-dev-toggle pre {
          width: 100%; margin: 0; background: var(--overlay-1); border: 1px solid var(--border2);
          padding: 12px 14px; border-radius: 12px; font-size: 10.5px; color: var(--text-muted);
          max-height: 130px; overflow-y: auto; box-sizing: border-box; font-family: 'SF Mono', 'Menlo', monospace;
        }

        @media (max-width: 1100px) {
          .ai-dash-grid { grid-template-columns: 1fr 1fr; }
          .ai-panel-center { grid-column: span 2; }
        }
        @media (max-width: 760px) {
          .ai-dash-grid { grid-template-columns: 1fr; }
          .ai-panel-center { grid-column: auto; }
          .ai-dash-topbar { flex-direction: column; align-items: stretch; }
          .ai-dash-fields { justify-content: space-between; }
          .ai-dash-actions { justify-content: space-between; }
        }
      `}</style>
    </div>
  );
}
