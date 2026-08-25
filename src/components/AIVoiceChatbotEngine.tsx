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
  }>({});
  const [webhookSent, setWebhookSent] = useState<boolean>(false);

  // References for live async callbacks
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const conversationHistoryRef = useRef<IndustryMessage[]>([]);
  const extractedDataRef = useRef<any>({});
  const selectedSpeakerRef = useRef<string>("ritu");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

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

  const stopLiveListening = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsUserSpeaking(false);
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
    };
    utterance.onend = () => {
      setIsAiSpeaking(false);
      setSpeechStatusText("Listening to you...");
      if (onEndedCallback) onEndedCallback();
    };
    utterance.onerror = () => {
      setIsAiSpeaking(false);
      if (onEndedCallback) onEndedCallback();
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  // Audible Speech Engine (Sarvam bulbul:v3 with fallback)
  const speakTextAudible = useCallback(async (text: string, langCode = "en-IN", onEndedCallback?: () => void) => {
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
  }, [fallbackBrowserSpeech, isSpeakerOn, selectedSpeaker, stopCurrentAudio, stopLiveListening]);

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

  // Main turn processor (Calls OpenAI GPT-4o-mini + State Machine)
  const processConversationTurn = useCallback(async (rawText: string) => {
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

    try {
      const res = await fetch("/api/ai-demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industryId: selectedIndustryId,
          messages: updatedHistoryWithUser,
          userMessage: userText,
          currentExtracted: currentExt,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          const aiMsg: IndustryMessage = {
            speaker: "ai",
            text: data.reply,
            langLabel: data.languageCode?.includes("hi") ? "Hindi" : "English",
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

          if (data.isComplete || data.step === "confirmation_complete" || data.extracted?.slot) {
            triggerWebhookDispatch(data.extracted || currentExt, finalHistory);
          }

          setIsProcessing(false);

          if (channel === "voice" || isCallActive) {
            speakTextAudible(data.reply, data.languageCode, () => {
              if (isCallActive && !isMuted) {
                startLiveListening();
              }
            });
          }
          return;
        }
      }
    } catch (e) {
      console.warn("Turn processing error fallback:", e);
    }

    setIsProcessing(false);
  }, [channel, isCallActive, isMuted, isProcessing, selectedIndustryId, speakTextAudible, stopCurrentAudio, stopLiveListening, triggerWebhookDispatch]);

  // Continuous speech recognition
  const startLiveListening = useCallback(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechStatusText("Browser speech recognition not supported. Use chat or quick test.");
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLanguageCode || "en-IN";

      recognition.onstart = () => {
        setIsUserSpeaking(true);
        setSpeechStatusText("Listening to you... (Speak naturally)");
      };

      recognition.onresult = (event: any) => {
        let interimText = "";
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }

        const activeTranscript = finalText || interimText;
        setLiveUserTranscript(activeTranscript);

        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }

        if (activeTranscript.trim().length > 0) {
          silenceTimeoutRef.current = setTimeout(() => {
            try { recognition.stop(); } catch (_) {}
            processConversationTurn(activeTranscript);
          }, 1400);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== "no-speech") {
          console.warn("STT warning:", event.error);
        }
        setIsUserSpeaking(false);
      };

      recognition.onend = () => {
        setIsUserSpeaking(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("Could not start STT:", err);
      setIsUserSpeaking(false);
    }
  }, [currentLanguageCode, processConversationTurn]);

  const handleStartCall = async () => {
    setIsConnecting(true);
    setSpeechStatusText("Connecting to AI Receptionist...");
    setCallDuration(0);
    setLiveUserTranscript("");
    setIsMuted(false);

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
    });
  };

  const handleEndCall = () => {
    stopCurrentAudio();
    stopLiveListening();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsCallActive(false);
    setSpeechStatusText("Call ended. Click to call again.");
  };

  const handleReset = () => {
    handleEndCall();
    setConversationHistory([]);
    conversationHistoryRef.current = [];
    setExtractedData({});
    extractedDataRef.current = {};
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

                {/* Voice Persona Selector */}
                <div style={{ display: "flex", alignItems: "center", gap: "2px", flexShrink: 0 }}>
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

            {/* Extracted Entity Fields */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginBottom: "14px",
              }}
            >
              {/* Name */}
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: extractedData.name ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.name ? "rgba(155, 234, 22, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10.5px", color: "#8E8E93" }}>
                    <User size={11} color={extractedData.name ? "#9BEA16" : "#71717A"} />
                    <span>Caller Name</span>
                  </div>
                  {extractedData.name && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: extractedData.name ? "#F5F5F0" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.name || "—"}
                </div>
              </div>

              {/* Phone */}
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: extractedData.mobile ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.mobile ? "rgba(155, 234, 22, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10.5px", color: "#8E8E93" }}>
                    <Phone size={11} color={extractedData.mobile ? "#9BEA16" : "#71717A"} />
                    <span>Phone</span>
                  </div>
                  {extractedData.mobile && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: extractedData.mobile ? "#F5F5F0" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.mobile || "—"}
                </div>
              </div>

              {/* DOB / Department */}
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: extractedData.dob || extractedData.department ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.dob || extractedData.department ? "rgba(155, 234, 22, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10.5px", color: "#8E8E93" }}>
                    {activeIndustry.requiresDob ? <Calendar size={11} color={extractedData.dob ? "#9BEA16" : "#71717A"} /> : <Stethoscope size={11} color={extractedData.department ? "#9BEA16" : "#71717A"} />}
                    <span>{activeIndustry.requiresDob ? "DOB / Age" : "Specialty"}</span>
                  </div>
                  {(extractedData.dob || extractedData.department) && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: extractedData.dob || extractedData.department ? "#F5F5F0" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.dob || extractedData.department || "—"}
                </div>
              </div>

              {/* Slot */}
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: extractedData.slot ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.slot ? "#9BEA16" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10.5px", color: "#8E8E93" }}>
                    <Clock size={11} color={extractedData.slot ? "#9BEA16" : "#71717A"} />
                    <span>Booking Slot</span>
                  </div>
                  {extractedData.slot && <CheckCircle2 size={11} color="#9BEA16" />}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: extractedData.slot ? "#9BEA16" : "#52525B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {extractedData.slot || "—"}
                </div>
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
                    event: "lead.captured",
                    token: "CCH-014",
                    lead: extractedData,
                    status: webhookSent ? "dispatched" : "collecting",
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
