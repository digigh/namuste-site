"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
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
};

export default function AIVoiceChatbotEngine() {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>("doctors-clinics");
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
  }>({});
  const [webhookSent, setWebhookSent] = useState<boolean>(false);
  const [showJsonPayload, setShowJsonPayload] = useState<boolean>(false);

  // PERSISTENT MEMORY REFS (Eliminates async React stale closure bugs)
  const conversationHistoryRef = useRef<IndustryMessage[]>([]);
  const extractedDataRef = useRef<{
    name?: string;
    mobile?: string;
    dob?: string;
    department?: string;
    doctor?: string;
    slot?: string;
    intent?: string;
    summary?: string;
  }>({});

  const activeIndustry: IndustryFlow = INDUSTRY_FLOWS[selectedIndustryId] || INDUSTRY_FLOWS["doctors-clinics"];
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const accumulatedSpeechRef = useRef<string>("");
  const shouldKeepListeningRef = useRef<boolean>(false);

  // Keep refs synchronized with state
  useEffect(() => {
    conversationHistoryRef.current = conversationHistory;
  }, [conversationHistory]);

  useEffect(() => {
    extractedDataRef.current = extractedData;
  }, [extractedData]);



  const stopCurrentAudio = useCallback(() => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch {}
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setIsAiSpeaking(false);
  }, []);

  const stopLiveListening = useCallback(() => {
    shouldKeepListeningRef.current = false;
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsUserSpeaking(false);
    setLiveUserTranscript("");
  }, []);

  const resetSession = useCallback((industryId = selectedIndustryId) => {
    stopCurrentAudio();
    stopLiveListening();
    setIsCallActive(false);
    setIsProcessing(false);
    setWebhookSent(false);
    setExtractedData({});
    extractedDataRef.current = {};
    setConversationHistory([]);
    conversationHistoryRef.current = [];
    setCurrentLanguageCode("en-IN");
    setSpeechStatusText("Click to start voice call");
    accumulatedSpeechRef.current = "";
  }, [selectedIndustryId, stopCurrentAudio, stopLiveListening]);

  // Reset when industry changes
  useEffect(() => {
    resetSession(selectedIndustryId);
  }, [selectedIndustryId, resetSession]);

  // Handle call duration timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCallActive]);

  // Auto-scroll chat stream
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [conversationHistory, isProcessing]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Browser SpeechSynthesis fallback
  const fallbackBrowserSpeech = useCallback((text: string, langCode: string, onEndedCallback?: () => void) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_~`]/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = langCode || "en-IN";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const indVoice = voices.find(
        (v) =>
          v.lang.includes("IN") ||
          v.lang.includes("hi") ||
          v.name.toLowerCase().includes("india") ||
          v.name.toLowerCase().includes("hindi")
      );
      if (indVoice) utterance.voice = indVoice;

      utterance.onstart = () => {
        setIsAiSpeaking(true);
        setSpeechStatusText("AI is speaking... (Click or speak to interrupt)");
      };

      utterance.onend = () => {
        setIsAiSpeaking(false);
        setSpeechStatusText("Listening to you...");
        if (onEndedCallback) onEndedCallback();
      };

      utterance.onerror = () => {
        setIsAiSpeaking(false);
        setSpeechStatusText("Ready for your voice");
        if (onEndedCallback) onEndedCallback();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setIsAiSpeaking(false);
      if (onEndedCallback) onEndedCallback();
    }
  }, []);

  // AUDIBLE SPEECH ENGINE (Sarvam AI 24kHz HD Voice + Web Speech Fallback)
  const speakTextAudible = useCallback(async (text: string, langCode = "en-IN", onEndedCallback?: () => void) => {
    if (!isSpeakerOn) {
      if (onEndedCallback) onEndedCallback();
      return;
    }

    stopCurrentAudio();
    stopLiveListening();
    setIsAiSpeaking(true);
    setSpeechStatusText("AI is speaking... (Click or speak to interrupt)");

    try {
      const res = await fetch("/api/ai-demo/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "tts",
          text,
          languageCode: langCode || "en-IN",
          speaker: "anushka",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          currentAudioRef.current = audio;
          audio.onended = () => {
            setIsAiSpeaking(false);
            setSpeechStatusText("Listening to you...");
            if (onEndedCallback) onEndedCallback();
          };
          audio.onerror = () => {
            fallbackBrowserSpeech(text, langCode, onEndedCallback);
          };
          await audio.play();
          return;
        }
      }
    } catch (e) {
      console.warn("Sarvam TTS error fallback:", e);
    }

    fallbackBrowserSpeech(text, langCode, onEndedCallback);
  }, [fallbackBrowserSpeech, isSpeakerOn, stopCurrentAudio, stopLiveListening]);

  // DISPATCH TO WEBHOOK ROUTE
  const triggerWebhookDispatch = useCallback(async (leadDetails: any) => {
    setWebhookSent(true);
    try {
      await fetch("/api/ai-demo/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industryId: selectedIndustryId,
          industryName: activeIndustry.name,
          channel: channel === "voice" ? "web_voice_call" : "chatbot",
          lead: {
            name: leadDetails.name || extractedDataRef.current.name || "Anonymous",
            mobile: leadDetails.mobile || extractedDataRef.current.mobile || "Not provided",
            dob: leadDetails.dob || extractedDataRef.current.dob || null,
          },
          intent: leadDetails.intent || extractedDataRef.current.intent || activeIndustry.presetExtracted.intent,
          summary: leadDetails.summary || extractedDataRef.current.summary || activeIndustry.presetExtracted.summary,
          systemAction: activeIndustry.systemActionPayloadTemplate,
          transcript: conversationHistoryRef.current,
        }),
      });
    } catch (e) {
      console.warn("Webhook dispatch error:", e);
    }
  }, [activeIndustry, channel, selectedIndustryId]);

  // HANDLE USER MESSAGE (Spoken or Typed) - ALWAYS USES REFS FOR 100% MEMORY PERSISTENCE
  const handleSendMessage = useCallback(async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    stopCurrentAudio();
    stopLiveListening();
    setLiveUserTranscript("");
    accumulatedSpeechRef.current = "";

    const userMessage: IndustryMessage = {
      speaker: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Construct history from Ref to guarantee no turns are dropped
    const updatedHistory = [...conversationHistoryRef.current, userMessage];
    conversationHistoryRef.current = updatedHistory;
    setConversationHistory(updatedHistory);
    setChatInput("");
    setIsProcessing(true);
    setSpeechStatusText("AI is thinking...");

    try {
      const res = await fetch("/api/ai-demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industryId: selectedIndustryId,
          messages: updatedHistory,
          userMessage: text.trim(),
          currentExtracted: extractedDataRef.current,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsProcessing(false);

        const aiReply: IndustryMessage = {
          speaker: "ai",
          text: data.reply || "Thank you! I have noted your details.",
          langLabel: data.languageCode || "auto",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const finalHistory = [...conversationHistoryRef.current, aiReply];
        conversationHistoryRef.current = finalHistory;
        setConversationHistory(finalHistory);

        if (data.languageCode) {
          setCurrentLanguageCode(data.languageCode);
        }

        if (data.extracted) {
          const merged = {
            ...extractedDataRef.current,
            ...data.extracted,
          };
          extractedDataRef.current = merged;
          setExtractedData(merged);
        }

        // Audibly speak AI reply if in Voice Call mode
        if (channel === "voice" || isCallActive) {
          speakTextAudible(aiReply.text, data.languageCode || "en-IN", () => {
            if (isCallActive && !isMuted) {
              startContinuousListening();
            }
          });
        }

        // Trigger Webhook if intake is complete or appointment finalized
        if (data.isComplete || (data.extracted?.slot && data.extracted?.name)) {
          triggerWebhookDispatch(data.extracted);
        }
      } else {
        throw new Error("Chat request failed");
      }
    } catch {
      setIsProcessing(false);
      const fallbackReply: IndustryMessage = {
        speaker: "ai",
        text: `Thank you! I have recorded your inquiry for ${activeIndustry.brandName}.`,
      };
      conversationHistoryRef.current = [...conversationHistoryRef.current, fallbackReply];
      setConversationHistory(conversationHistoryRef.current);
      if (channel === "voice" || isCallActive) {
        speakTextAudible(fallbackReply.text, "en-IN");
      }
    }
  }, [activeIndustry, channel, chatInput, isCallActive, isMuted, selectedIndustryId, speakTextAudible, stopCurrentAudio, stopLiveListening, triggerWebhookDispatch]);

  // CONTINUOUS SPEECH RECOGNITION WITH SILENCE DETECTION (No premature cutoffs!)
  const startContinuousListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechStatusText("Voice input requires microphone access");
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = currentLanguageCode || "hi-IN";
      shouldKeepListeningRef.current = true;

      recognition.onstart = () => {
        setIsUserSpeaking(true);
        setSpeechStatusText("🔴 Listening... Speak naturally (English, Hindi, Tamil, etc.)");
      };

      recognition.onspeechstart = () => {
        stopCurrentAudio();
        setIsUserSpeaking(true);
      };

      recognition.onresult = (event: any) => {
        let interimText = "";
        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript + " ";
          } else {
            interimText += event.results[i][0].transcript;
          }
        }

        const currentLive = (finalText + interimText).trim();
        if (currentLive) {
          accumulatedSpeechRef.current = currentLive;
          setLiveUserTranscript(currentLive);
          setSpeechStatusText(`Listening: "${currentLive}"`);

          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // When user pauses speaking for 1.4 seconds -> finalize and dispatch full sentence!
          silenceTimerRef.current = setTimeout(() => {
            if (accumulatedSpeechRef.current.trim().length > 1) {
              const fullSpokenSentence = accumulatedSpeechRef.current.trim();
              stopLiveListening();
              handleSendMessage(fullSpokenSentence);
            }
          }, 1400);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== "no-speech") {
          console.warn("Speech recognition notice:", event.error);
        }
      };

      recognition.onend = () => {
        if (shouldKeepListeningRef.current && !isAiSpeaking && !isProcessing) {
          try {
            recognition.start();
          } catch {}
        } else {
          setIsUserSpeaking(false);
        }
      };

      recognition.start();
    } catch {
      setIsUserSpeaking(false);
      setSpeechStatusText("Click microphone to speak");
    }
  }, [currentLanguageCode, handleSendMessage, isAiSpeaking, isProcessing, stopCurrentAudio, stopLiveListening]);

  // USER INTERRUPTION HANDLER
  const handleUserInterruption = () => {
    stopCurrentAudio();
    startContinuousListening();
  };

  // START VOICE CALL
  const handleStartCall = async () => {
    stopCurrentAudio();
    stopLiveListening();
    setIsConnecting(true);
    setSpeechStatusText("Connecting to Digital Receptionist...");

    setTimeout(async () => {
      setIsConnecting(false);
      setIsCallActive(true);
      setCurrentLanguageCode("en-IN");

      // Initial English Welcome Greeting
      const welcomeText = activeIndustry.initialGreetingEnglish;

      const welcomeMsg: IndustryMessage = {
        speaker: "ai",
        text: welcomeText,
        langLabel: "English",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      conversationHistoryRef.current = [welcomeMsg];
      setConversationHistory([welcomeMsg]);

      // Speak welcome message in English audibly via Sarvam 24kHz HD
      await speakTextAudible(welcomeText, "en-IN", () => {
        if (!isMuted) {
          startContinuousListening();
        }
      });
    }, 600);
  };

  // END VOICE CALL
  const handleEndCall = () => {
    stopCurrentAudio();
    stopLiveListening();
    setIsCallActive(false);
    setSpeechStatusText("Call ended. Click to call again.");
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>


      {/* 1. TOP INDUSTRY NAVIGATION TABS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "16px",
          marginBottom: "24px",
          scrollbarWidth: "none",
        }}
      >
        {Object.values(INDUSTRY_FLOWS).map((ind) => {
          const isActive = selectedIndustryId === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustryId(ind.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isActive ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.03)",
                color: isActive ? "#9BEA16" : "#A1A1AA",
                border: `1px solid ${isActive ? "rgba(155, 234, 22, 0.45)" : "rgba(255, 255, 255, 0.08)"}`,
                boxShadow: isActive ? "0 0 20px rgba(155, 234, 22, 0.15)" : "none",
              }}
            >
              <span style={{ color: isActive ? "#9BEA16" : ind.badgeColor }}>
                {ICON_MAP[ind.iconName]}
              </span>
              <span>{ind.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. INDUSTRY BANNER & DUAL CHANNEL SWITCHER */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "16px 22px",
          borderRadius: "16px",
          background: "rgba(18, 18, 18, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          marginBottom: "28px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: activeIndustry.badgeColor,
                boxShadow: `0 0 10px ${activeIndustry.badgeColor}`,
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#F5F5F0" }}>
              {activeIndustry.brandName}
            </span>
            <span
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.06)",
                color: "#8E8E93",
              }}
            >
              {activeIndustry.requiresDob ? "Name + Phone + DOB Required" : "Name + Phone Intake"}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "12px", color: "#8E8E93" }}>
            {activeIndustry.tagline}
          </p>
        </div>

        {/* Channel Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => {
              setChannel("voice");
              stopCurrentAudio();
              stopLiveListening();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              background: channel === "voice" ? "rgba(155, 234, 22, 0.2)" : "rgba(255, 255, 255, 0.04)",
              color: channel === "voice" ? "#9BEA16" : "#8E8E93",
              border: `1px solid ${channel === "voice" ? "rgba(155, 234, 22, 0.5)" : "transparent"}`,
              transition: "all 0.2s ease",
            }}
          >
            <Phone size={15} />
            <span>AI Voice Call</span>
          </button>

          <button
            onClick={() => {
              setChannel("chat");
              stopCurrentAudio();
              stopLiveListening();
              if (conversationHistoryRef.current.length === 0) {
                const initMsg: IndustryMessage = {
                  speaker: "ai",
                  text: `Hello and welcome to ${activeIndustry.brandName}. How may I help you today? Please share your name and contact number.`,
                  langLabel: "English",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                };
                conversationHistoryRef.current = [initMsg];
                setConversationHistory([initMsg]);
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              background: channel === "chat" ? "rgba(155, 234, 22, 0.2)" : "rgba(255, 255, 255, 0.04)",
              color: channel === "chat" ? "#9BEA16" : "#8E8E93",
              border: `1px solid ${channel === "chat" ? "rgba(155, 234, 22, 0.5)" : "transparent"}`,
              transition: "all 0.2s ease",
            }}
          >
            <MessageSquare size={15} />
            <span>AI Chatbot</span>
          </button>
        </div>
      </div>

      {/* 3. STEP PROGRESSION INDICATOR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        {[
          { step: 1, label: "Welcome (English)", done: conversationHistory.length >= 1 },
          { step: 2, label: `Contact Intake (Name, Mobile${activeIndustry.requiresDob ? ", DOB" : ""})`, done: !!extractedData.name && !!extractedData.mobile },
          { step: 3, label: "Services & Appointment Booking", done: conversationHistory.length >= 3 },
          { step: 4, label: "CRM Sync & Webhook", done: webhookSent || !!extractedData.slot },
        ].map((s) => (
          <div
            key={s.step}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              background: s.done ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
              border: `1px solid ${s.done ? "rgba(155, 234, 22, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: s.done ? "#9BEA16" : "rgba(255,255,255,0.1)",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              {s.done ? <Check size={11} strokeWidth={3} /> : s.step}
            </div>
            <span style={{ fontSize: "11.5px", color: s.done ? "#F5F5F0" : "#71717A", fontWeight: s.done ? 600 : 400 }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* 4. MAIN INTERACTIVE ARENA */}
      <div
        style={{
          borderRadius: "20px",
          background: "#080808",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
          minHeight: "480px",
        }}
      >
        {channel === "voice" ? (
          /* =========================================================================
             LIVE AI VOICE CALL ARENA
             ========================================================================= */
          <div
            style={{
              padding: "40px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              minHeight: "480px",
            }}
          >
            {/* Top Call Status Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "999px",
                background: isCallActive ? "rgba(34, 197, 94, 0.15)" : isConnecting ? "rgba(245, 158, 11, 0.15)" : "rgba(248, 113, 113, 0.12)",
                border: `1px solid ${isCallActive ? "rgba(34, 197, 94, 0.35)" : isConnecting ? "rgba(245, 158, 11, 0.35)" : "rgba(248, 113, 113, 0.3)"}`,
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: isCallActive ? "#4ADE80" : isConnecting ? "#FBBF24" : "#F87171",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: isCallActive ? "#4ADE80" : isConnecting ? "#FBBF24" : "#F87171",
                  animation: "pulse 1.5s infinite",
                }}
              />
              {isConnecting ? "Connecting..." : isCallActive ? `Call Active • ${formatDuration(callDuration)}` : "Live AI Voice Calling Ready"}
            </div>

            {/* Glowing Central Acoustic Orb */}
            <div
              onClick={isAiSpeaking ? handleUserInterruption : undefined}
              style={{
                position: "relative",
                width: "210px",
                height: "210px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(155, 234, 22, 0.18) 0%, #000000 70%)",
                border: `2px solid ${isAiSpeaking ? "#9BEA16" : isUserSpeaking ? "#38BDF8" : "rgba(155, 234, 22, 0.5)"}`,
                boxShadow: isAiSpeaking
                  ? "0 0 60px rgba(155, 234, 22, 0.6), inset 0 0 30px rgba(155, 234, 22, 0.3)"
                  : isUserSpeaking
                  ? "0 0 60px rgba(56, 189, 248, 0.5)"
                  : "0 0 40px rgba(155, 234, 22, 0.25)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 5,
                padding: "20px",
                transition: "all 0.3s ease",
                cursor: isAiSpeaking ? "pointer" : "default",
              }}
              title={isAiSpeaking ? "Click to interrupt AI" : ""}
            >
              <img
                src="/logo.png"
                alt="Namuste"
                style={{
                  height: "18px",
                  width: "auto",
                  objectFit: "contain",
                  marginBottom: "12px",
                }}
              />

              {/* Dynamic Equalizer Audio Waveform */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "55px" }}>
                {[25, 45, 75, 95, 80, 50, 90, 100, 75, 60, 85, 65, 40, 25].map((h, i) => {
                  const animatedHeight = isAiSpeaking || isUserSpeaking ? Math.max(20, (h * (callDuration % 5 + 3)) % 100) : h * 0.3;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        height: `${animatedHeight}%`,
                        opacity: isAiSpeaking ? 1 : isUserSpeaking ? 0.9 : 0.4,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{
                        width: "3.5px",
                        background: isUserSpeaking ? "#38BDF8" : "#9BEA16",
                        borderRadius: "2px",
                      }}
                    />
                  );
                })}
              </div>

              <span style={{ fontSize: "10.5px", color: isAiSpeaking ? "#9BEA16" : isUserSpeaking ? "#38BDF8" : "#8E8E93", fontWeight: 600, marginTop: "6px" }}>
                {isAiSpeaking ? "AI Speaking (Click to interrupt)" : isUserSpeaking ? "Listening to You..." : isCallActive ? "Call Connected" : "Acoustic Voice Core"}
              </span>
            </div>

            {/* Live Subtitle / Spoken Transcript + Realtime Streaming Speech */}
            <div
              style={{
                marginTop: "24px",
                maxWidth: "680px",
                width: "100%",
                textAlign: "center",
                padding: "16px 20px",
                borderRadius: "14px",
                background: "rgba(18, 18, 18, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                minHeight: "72px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {liveUserTranscript ? (
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#38BDF8", display: "block", marginBottom: "4px" }}>
                    🔴 Speaking... (Streaming transcript)
                  </span>
                  <p style={{ margin: 0, fontSize: "15px", color: "#38BDF8", fontWeight: 600, lineHeight: 1.4 }}>
                    &ldquo;{liveUserTranscript}&rdquo;
                  </p>
                </div>
              ) : conversationHistory.length > 0 ? (
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: conversationHistory[conversationHistory.length - 1].speaker === "ai" ? "#9BEA16" : "#38BDF8",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {conversationHistory[conversationHistory.length - 1].speaker === "ai" ? `${activeIndustry.brandName} Receptionist` : "You (Caller)"}
                  </span>
                  <p style={{ margin: 0, fontSize: "14px", color: "#F5F5F0", lineHeight: 1.5 }}>
                    &ldquo;{conversationHistory[conversationHistory.length - 1].text}&rdquo;
                  </p>
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: "13.5px", color: "#8E8E93" }}>
                  {speechStatusText}
                </p>
              )}
            </div>

            {/* Live Voice Telephony Controls with Continuous Mic & Barge-in */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginTop: "24px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {!isCallActive ? (
                <button
                  onClick={handleStartCall}
                  disabled={isConnecting}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    background: "#9BEA16",
                    color: "#000000",
                    fontSize: "14px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 0 30px rgba(155, 234, 22, 0.45)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Phone size={18} />
                  <span>Call {activeIndustry.name} Receptionist</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleUserInterruption}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "999px",
                      background: isUserSpeaking ? "#38BDF8" : "rgba(155, 234, 22, 0.2)",
                      color: isUserSpeaking ? "#000000" : "#9BEA16",
                      border: `1px solid ${isUserSpeaking ? "#38BDF8" : "rgba(155, 234, 22, 0.5)"}`,
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <Radio size={16} />
                    <span>{isAiSpeaking ? "Interrupt & Speak" : isUserSpeaking ? "🔴 Listening... (Speak sentence)" : "🎙️ Speak Now"}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!isMuted) {
                        stopLiveListening();
                        setIsMuted(true);
                      } else {
                        setIsMuted(false);
                        startContinuousListening();
                      }
                    }}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: isMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.08)",
                      border: `1px solid ${isMuted ? "#EF4444" : "rgba(255, 255, 255, 0.15)"}`,
                      color: isMuted ? "#EF4444" : "#F5F5F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    title={isMuted ? "Unmute Mic" : "Mute Mic"}
                  >
                    {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>

                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: !isSpeakerOn ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.08)",
                      border: `1px solid ${!isSpeakerOn ? "#EF4444" : "rgba(255, 255, 255, 0.15)"}`,
                      color: !isSpeakerOn ? "#EF4444" : "#F5F5F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    title={isSpeakerOn ? "Mute Speaker" : "Unmute Speaker"}
                  >
                    {isSpeakerOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>

                  <button
                    onClick={handleEndCall}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "12px 22px",
                      borderRadius: "999px",
                      background: "rgba(239, 68, 68, 0.9)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <PhoneOff size={16} />
                    <span>End Call</span>
                  </button>
                </>
              )}

              <button
                onClick={() => resetSession()}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#8E8E93",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                title="Restart Session"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             LIVE AI CHATBOT ARENA
             ========================================================================= */
          <div style={{ display: "flex", flexDirection: "column", height: "520px" }}>
            {/* Chatbot Header */}
            <div
              style={{
                padding: "14px 20px",
                background: "rgba(15, 23, 15, 0.95)",
                borderBottom: "1px solid rgba(155, 234, 22, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(155, 234, 22, 0.15)",
                    border: "1px solid #9BEA16",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9BEA16",
                  }}
                >
                  <img src="/logo.png" alt="Namuste" style={{ height: "12px", width: "auto" }} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#F5F5F0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>{activeIndustry.brandName}</span>
                    <CheckCircle2 size={14} color="#9BEA16" />
                  </div>
                  <div style={{ fontSize: "11px", color: "#4ADE80" }}>
                    ● Online • AI Receptionist (English ➔ Hindi, Tamil, Bengali auto-switch)
                  </div>
                </div>
              </div>

              <button
                onClick={() => resetSession()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#A1A1AA",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>

            {/* Chat Stream */}
            <div
              ref={chatScrollRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: "radial-gradient(circle at 50% 50%, rgba(15, 20, 15, 0.5) 0%, #050505 100%)",
              }}
            >
              {conversationHistory.map((msg, index) => {
                const isAi = msg.speaker === "ai";
                return (
                  <div
                    key={index}
                    style={{
                      alignSelf: isAi ? "flex-start" : "flex-end",
                      maxWidth: "75%",
                      padding: "12px 16px",
                      borderRadius: isAi ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                      background: isAi ? "rgba(25, 25, 25, 0.95)" : "rgba(34, 197, 94, 0.22)",
                      border: `1px solid ${isAi ? "rgba(255, 255, 255, 0.1)" : "rgba(34, 197, 94, 0.4)"}`,
                      color: "#F5F5F0",
                      fontSize: "13.5px",
                      lineHeight: 1.5,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                    }}
                  >
                    {msg.langLabel && (
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#9BEA16",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {msg.langLabel}
                      </span>
                    )}
                    <div>{msg.text}</div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#71717A",
                        textAlign: "right",
                        marginTop: "4px",
                      }}
                    >
                      {msg.timestamp || "Just now"}
                    </div>
                  </div>
                );
              })}

              {isProcessing && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    background: "rgba(25, 25, 25, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "12px",
                    color: "#9BEA16",
                  }}
                >
                  Namuste AI is thinking...
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                padding: "8px 20px",
                background: "rgba(10, 10, 10, 0.9)",
                overflowX: "auto",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {activeIndustry.presetTurns
                .filter((t) => t.speaker === "user")
                .map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(t.text)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "999px",
                      background: "rgba(155, 234, 22, 0.08)",
                      border: "1px solid rgba(155, 234, 22, 0.25)",
                      color: "#D4D0C7",
                      fontSize: "11.5px",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                  >
                    💬 {t.text.slice(0, 36)}...
                  </button>
                ))}
            </div>

            {/* Chat Input Bar */}
            <div
              style={{
                padding: "12px 18px",
                background: "rgba(15, 15, 15, 0.95)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={startContinuousListening}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: isUserSpeaking ? "#38BDF8" : "rgba(255, 255, 255, 0.06)",
                  border: `1px solid ${isUserSpeaking ? "#38BDF8" : "rgba(255, 255, 255, 0.12)"}`,
                  color: isUserSpeaking ? "#000000" : "#F5F5F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                title="Speak to Chatbot"
              >
                <Mic size={16} />
              </button>

              <input
                type="text"
                placeholder={`Ask ${activeIndustry.brandName} in English, Hindi, Tamil, etc...`}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#F5F5F0",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#9BEA16",
                  color: "#000000",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. BOTTOM REAL-TIME DATA EXTRACTION & WEBHOOK HUD */}
      <div
        style={{
          marginTop: "24px",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "rgba(10, 18, 10, 0.95)",
          border: "1px solid rgba(155, 234, 22, 0.35)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: webhookSent || !!extractedData.slot ? "#22C55E" : "#F97316",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={13} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9BEA16" }}>
                {webhookSent || !!extractedData.slot ? "UNDERSTOOD & CONFIRMED" : "LIVE PATIENT INTAKE MEMORY"}
              </div>
              <div style={{ fontSize: "13.5px", color: "#F5F5F0", fontWeight: 600 }}>
                {extractedData.summary || `${activeIndustry.name} Receptionist Active`}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => setShowJsonPayload(!showJsonPayload)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#A1A1AA",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <Code2 size={13} />
              <span>{showJsonPayload ? "Hide Webhook JSON" : "View Webhook JSON"}</span>
            </button>

            {(webhookSent || !!extractedData.slot) && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(34, 197, 94, 0.2)",
                  color: "#4ADE80",
                  border: "1px solid rgba(34, 197, 94, 0.4)",
                }}
              >
                ● Webhook Dispatched
              </span>
            )}
          </div>
        </div>

        {/* Structured Field Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
          <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: "10.5px", color: "#8E8E93", textTransform: "uppercase", display: "block" }}>Customer Name</span>
            <span style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 600 }}>{extractedData.name || "Awaiting input..."}</span>
          </div>

          <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: "10.5px", color: "#8E8E93", textTransform: "uppercase", display: "block" }}>Mobile Phone</span>
            <span style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 600 }}>{extractedData.mobile || "Awaiting input..."}</span>
          </div>

          {activeIndustry.requiresDob && (
            <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "10.5px", color: "#8E8E93", textTransform: "uppercase", display: "block" }}>Date of Birth / Age</span>
              <span style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 600 }}>{extractedData.dob || "Awaiting input..."}</span>
            </div>
          )}

          <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: "10.5px", color: "#8E8E93", textTransform: "uppercase", display: "block" }}>Confirmed Slot</span>
            <span style={{ fontSize: "13px", color: "#9BEA16", fontWeight: 600 }}>{extractedData.slot || activeIndustry.systemActionTitle}</span>
          </div>
        </div>

        {/* Expandable Webhook JSON Payload Preview */}
        {showJsonPayload && (
          <div
            style={{
              marginTop: "16px",
              padding: "14px",
              borderRadius: "10px",
              background: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontSize: "12px",
              fontFamily: "monospace",
              color: "#4ADE80",
              overflowX: "auto",
            }}
          >
            <pre style={{ margin: 0 }}>
              {JSON.stringify(
                {
                  event: "ai_demo_intake_completed",
                  industry: activeIndustry.name,
                  channel: channel === "voice" ? "web_voice_call" : "chatbot",
                  lead: {
                    name: extractedData.name || "Pending",
                    mobile: extractedData.mobile || "Pending",
                    dob: activeIndustry.requiresDob ? (extractedData.dob || "Pending") : undefined,
                    department: extractedData.department || undefined,
                    slot: extractedData.slot || undefined,
                  },
                  intent: extractedData.intent || activeIndustry.presetExtracted.intent,
                  systemAction: activeIndustry.systemActionPayloadTemplate,
                  transcript: conversationHistory,
                  timestamp: new Date().toISOString(),
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
