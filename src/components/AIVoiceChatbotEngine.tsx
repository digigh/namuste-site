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

const VOICE_PERSONAS = [
  { id: "ritu", label: "Ritu", gender: "Female", desc: "Warm & Natural" },
  { id: "priya", label: "Priya", gender: "Female", desc: "Corporate Receptionist" },
  { id: "shubh", label: "Shubh", gender: "Male", desc: "Calm & Articulate" },
  { id: "aditya", label: "Aditya", gender: "Male", desc: "Business Executive" },
];

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
    <div style={{ width: "100%", margin: "0 auto" }}>
      {/* 1. TOP INDUSTRY NAVIGATION TABS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "14px",
          scrollbarWidth: "none",
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
                gap: "7px",
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "12.5px",
                fontWeight: isSelected ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                background: isSelected ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.03)",
                color: isSelected ? "#9BEA16" : "#A1A1AA",
                border: `1px solid ${isSelected ? "rgba(155, 234, 22, 0.6)" : "rgba(255, 255, 255, 0.07)"}`,
                boxShadow: isSelected ? "0 0 20px rgba(155, 234, 22, 0.2)" : "none",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span style={{ color: isSelected ? "#9BEA16" : "#8E8E93" }}>
                {ICON_MAP[ind.iconName]}
              </span>
              <span>{ind.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. HEADER CONTROLS BAR (Industry Title, Voice/Chat Switcher, Reset) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "14px 20px",
          borderRadius: "14px",
          background: "rgba(18, 18, 18, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(155, 234, 22, 0.12)",
              border: "1px solid rgba(155, 234, 22, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9BEA16",
            }}
          >
            {ICON_MAP[activeIndustry.iconName]}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#F5F5F0" }}>
                {activeIndustry.brandName}
              </span>
              <span
                style={{
                  fontSize: "10.5px",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "#8E8E93",
                  fontWeight: 600,
                }}
              >
                {activeIndustry.requiresDob ? "Intake: Name + Mobile + DOB" : "Intake: Name + Mobile"}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "12px", color: "#8E8E93" }}>
              {activeIndustry.tagline}
            </p>
          </div>
        </div>

        {/* Channel Switcher + Reset */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              background: "rgba(0, 0, 0, 0.4)",
              padding: "3px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
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
                padding: "7px 14px",
                borderRadius: "8px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                background: channel === "voice" ? "#9BEA16" : "transparent",
                color: channel === "voice" ? "#000000" : "#8E8E93",
                border: "none",
                transition: "all 0.2s ease",
              }}
            >
              <Phone size={13} />
              <span>Voice Call</span>
            </button>

            <button
              onClick={() => {
                setChannel("chat");
                stopCurrentAudio();
                stopLiveListening();
                if (conversationHistoryRef.current.length === 0) {
                  const initMsg: IndustryMessage = {
                    speaker: "ai",
                    text: `Hello and welcome to ${activeIndustry.brandName}! How may I assist you today? May I please have your name and contact number?`,
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
                padding: "7px 14px",
                borderRadius: "8px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                background: channel === "chat" ? "#9BEA16" : "transparent",
                color: channel === "chat" ? "#000000" : "#8E8E93",
                border: "none",
                transition: "all 0.2s ease",
              }}
            >
              <MessageSquare size={13} />
              <span>Chatbot</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            title="Reset Flow"
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#A1A1AA",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 3. CONVERSATION STAGE PROGRESS TRACKER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {[
          { step: 1, label: "1. Greeting", done: conversationHistory.length >= 1 },
          { step: 2, label: `2. Intake (${activeIndustry.requiresDob ? "Name, Phone, DOB" : "Name, Phone"})`, done: !!extractedData.name && !!extractedData.mobile },
          { step: 3, label: "3. Services & Slots", done: conversationHistory.length >= 3 },
          { step: 4, label: "4. CRM Sync", done: webhookSent || !!extractedData.slot },
        ].map((s) => (
          <div
            key={s.step}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
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
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: s.done ? "#9BEA16" : "rgba(255,255,255,0.1)",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9.5px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {s.done ? <Check size={10} strokeWidth={3} /> : s.step}
            </div>
            <span
              style={{
                fontSize: "11.5px",
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

      {/* 4. MAIN INTERACTIVE EXPERIENCE (2-Column Grid) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.95fr)",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {/* LEFT COLUMN: HERO VOICE / CHAT INTERACTION */}
        <div
          style={{
            borderRadius: "20px",
            background: "linear-gradient(180deg, rgba(24, 24, 27, 0.85) 0%, rgba(12, 12, 14, 0.95) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minHeight: "560px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
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
                minHeight: "500px",
              }}
            >
              {/* Call Status Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: isCallActive ? "rgba(34, 197, 94, 0.15)" : isConnecting ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${isCallActive ? "rgba(34, 197, 94, 0.4)" : isConnecting ? "rgba(245, 158, 11, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                    fontSize: "12px",
                    fontWeight: 600,
                    color: isCallActive ? "#4ADE80" : isConnecting ? "#FBBF24" : "#8E8E93",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: isCallActive ? "#4ADE80" : isConnecting ? "#FBBF24" : "#8E8E93",
                    }}
                  />
                  <span>
                    {isConnecting ? "Connecting..." : isCallActive ? `Call Connected • ${formatDuration(callDuration)}` : "Live Voice Channel"}
                  </span>
                </div>

                {/* Voice Persona Selector */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#8E8E93" }}>Voice:</span>
                  {VOICE_PERSONAS.map((vp) => {
                    const isSelected = selectedSpeaker === vp.id;
                    return (
                      <button
                        key={vp.id}
                        onClick={() => setSelectedSpeaker(vp.id)}
                        style={{
                          padding: "3px 9px",
                          borderRadius: "999px",
                          fontSize: "11px",
                          fontWeight: isSelected ? 700 : 500,
                          background: isSelected ? "rgba(155, 234, 22, 0.18)" : "rgba(255, 255, 255, 0.04)",
                          border: `1px solid ${isSelected ? "#9BEA16" : "rgba(255, 255, 255, 0.08)"}`,
                          color: isSelected ? "#9BEA16" : "#A1A1AA",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {vp.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Glowing Acoustic Orb Visualizer with Magnetic Radar Ripple */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "26px 0 16px",
                  position: "relative",
                  width: "100%",
                }}
              >
                {/* Concentric Pulsing Radar Rings when ready to call */}
                {!isCallActive && (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.45, 1.9],
                        opacity: [0.6, 0.25, 0],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        width: "130px",
                        height: "130px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(155, 234, 22, 0.45)",
                        pointerEvents: "none",
                        top: "26px",
                      }}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.35, 1.65],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        delay: 1.2,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        width: "130px",
                        height: "130px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(155, 234, 22, 0.35)",
                        pointerEvents: "none",
                        top: "26px",
                      }}
                    />
                  </>
                )}

                {/* Central Orb */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={!isCallActive ? handleStartCall : undefined}
                  style={{
                    width: "130px",
                    height: "130px",
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
                      : "radial-gradient(circle, rgba(155, 234, 22, 0.22) 0%, rgba(18, 18, 20, 0.9) 75%)",
                    border: `1.5px solid ${isAiSpeaking ? "rgba(155, 234, 22, 0.8)" : isUserSpeaking ? "rgba(56, 189, 248, 0.8)" : "rgba(155, 234, 22, 0.45)"}`,
                    boxShadow: isAiSpeaking
                      ? "0 0 50px rgba(155, 234, 22, 0.5), 0 0 100px rgba(155, 234, 22, 0.2)"
                      : isUserSpeaking
                      ? "0 0 50px rgba(56, 189, 248, 0.5), 0 0 100px rgba(56, 189, 248, 0.2)"
                      : "0 0 40px rgba(155, 234, 22, 0.35), 0 0 80px rgba(155, 234, 22, 0.15)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 2,
                  }}
                >
                  <motion.div
                    animate={
                      !isCallActive
                        ? {
                            scale: [1, 1.08, 1],
                            boxShadow: [
                              "0 0 20px rgba(155, 234, 22, 0.4)",
                              "0 0 35px rgba(155, 234, 22, 0.75)",
                              "0 0 20px rgba(155, 234, 22, 0.4)",
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
                      width: "66px",
                      height: "66px",
                      borderRadius: "50%",
                      background: isAiSpeaking ? "#9BEA16" : isUserSpeaking ? "#38BDF8" : "#9BEA16",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#000000",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Phone size={26} strokeWidth={2.4} />
                  </motion.div>
                </motion.div>

                {/* Equalizer bars */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "28px", marginTop: "16px" }}>
                  {[30, 60, 90, 100, 75, 45, 80, 95, 60, 35].map((h, i) => {
                    const dynamicH = isAiSpeaking || isUserSpeaking ? Math.max(20, (h * ((callDuration % 4) + 2)) % 100) : 15;
                    return (
                      <div
                        key={i}
                        style={{
                          width: "3px",
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
                  }}
                >
                  {isAiSpeaking ? "AI Speaking (Click to interrupt)" : isUserSpeaking ? "Listening to you..." : isCallActive ? "Connected • Speak naturally" : "Tap Orb or Button to Start Voice Call"}
                </span>
              </div>

              {/* Real-time Subtitle & Transcription Bubble */}
              <div
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "14px",
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  minHeight: "72px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                {liveUserTranscript ? (
                  <div>
                    <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#38BDF8", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      🔴 You are speaking
                    </span>
                    <p style={{ margin: 0, fontSize: "14.5px", color: "#38BDF8", fontWeight: 600, lineHeight: 1.4 }}>
                      &ldquo;{liveUserTranscript}&rdquo;
                    </p>
                  </div>
                ) : conversationHistory.length > 0 ? (
                  <div>
                    <span
                      style={{
                        fontSize: "10.5px",
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
                  <p style={{ margin: 0, fontSize: "13px", color: "#8E8E93" }}>
                    {speechStatusText}
                  </p>
                )}
              </div>

              {/* Quick Suggestion Chips (1-Click Prompts) */}
              <div style={{ width: "100%", marginBottom: "16px" }}>
                <span style={{ fontSize: "10.5px", color: "#8E8E93", display: "block", marginBottom: "6px" }}>
                  💡 1-Click Test Prompts (Instant Audio):
                </span>
                <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
                  {samplePrompts.slice(0, 4).map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isCallActive) {
                          handleStartCall();
                        }
                        processConversationTurn(p.text);
                      }}
                      style={{
                        padding: "5px 11px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#D4D4D8",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", justifyContent: "center" }}>
                {!isCallActive ? (
                  <motion.button
                    onClick={handleStartCall}
                    disabled={isConnecting}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 45px rgba(155, 234, 22, 0.8), 0 0 90px rgba(155, 234, 22, 0.3)" }}
                    whileTap={{ scale: 0.96 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(155, 234, 22, 0.45), 0 0 40px rgba(155, 234, 22, 0.15)",
                        "0 0 35px rgba(155, 234, 22, 0.75), 0 0 70px rgba(155, 234, 22, 0.3)",
                        "0 0 20px rgba(155, 234, 22, 0.45), 0 0 40px rgba(155, 234, 22, 0.15)",
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
                      gap: "10px",
                      padding: "14px 34px",
                      borderRadius: "999px",
                      background: "#9BEA16",
                      color: "#000000",
                      fontSize: "14.5px",
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
                      <Phone size={18} strokeWidth={2.4} />
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
                        gap: "6px",
                        padding: "11px 20px",
                        borderRadius: "999px",
                        background: isUserSpeaking ? "#38BDF8" : "rgba(155, 234, 22, 0.15)",
                        color: isUserSpeaking ? "#000000" : "#9BEA16",
                        border: `1px solid ${isUserSpeaking ? "#38BDF8" : "rgba(155, 234, 22, 0.4)"}`,
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <Radio size={14} />
                      <span>{isAiSpeaking ? "Interrupt & Speak" : isUserSpeaking ? "🔴 Listening..." : "🎙️ Speak"}</span>
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
                        padding: "11px",
                        borderRadius: "50%",
                        background: isMuted ? "#F87171" : "rgba(255, 255, 255, 0.08)",
                        color: isMuted ? "#000000" : "#F5F5F0",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>

                    <button
                      onClick={() => {
                        setIsSpeakerOn(!isSpeakerOn);
                        if (isSpeakerOn) stopCurrentAudio();
                      }}
                      title={isSpeakerOn ? "Mute Speaker" : "Unmute Speaker"}
                      style={{
                        padding: "11px",
                        borderRadius: "50%",
                        background: !isSpeakerOn ? "#FBBF24" : "rgba(255, 255, 255, 0.08)",
                        color: !isSpeakerOn ? "#000000" : "#F5F5F0",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isSpeakerOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>

                    <button
                      onClick={handleEndCall}
                      title="End Call"
                      style={{
                        padding: "11px 22px",
                        borderRadius: "999px",
                        background: "#EF4444",
                        color: "#FFFFFF",
                        border: "none",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <PhoneOff size={15} />
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
          style={{
            borderRadius: "20px",
            background: "rgba(18, 18, 20, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
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
                  background: webhookSent ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.05)",
                  color: webhookSent ? "#4ADE80" : "#8E8E93",
                  fontWeight: 600,
                }}
              >
                {webhookSent ? "✓ Webhook Dispatched" : "Capturing Live..."}
              </span>
            </div>

            {/* Extracted Fields List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: extractedData.name ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.name ? "rgba(155, 234, 22, 0.25)" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <User size={14} color="#8E8E93" />
                  <span style={{ fontSize: "12px", color: "#8E8E93" }}>Name</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: extractedData.name ? "#9BEA16" : "#52525B" }}>
                  {extractedData.name || "Awaiting caller..."}
                </span>
              </div>

              {/* Mobile */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: extractedData.mobile ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.mobile ? "rgba(155, 234, 22, 0.25)" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Phone size={14} color="#8E8E93" />
                  <span style={{ fontSize: "12px", color: "#8E8E93" }}>Phone</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: extractedData.mobile ? "#9BEA16" : "#52525B" }}>
                  {extractedData.mobile || "Awaiting number..."}
                </span>
              </div>

              {/* DOB / Age (if required) */}
              {activeIndustry.requiresDob && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: extractedData.dob ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${extractedData.dob ? "rgba(155, 234, 22, 0.25)" : "rgba(255, 255, 255, 0.05)"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Calendar size={14} color="#8E8E93" />
                    <span style={{ fontSize: "12px", color: "#8E8E93" }}>DOB / Age</span>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: extractedData.dob ? "#9BEA16" : "#52525B" }}>
                    {extractedData.dob || "Awaiting DOB..."}
                  </span>
                </div>
              )}

              {/* Department / Service / Scope */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: extractedData.department ? "rgba(155, 234, 22, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.department ? "rgba(155, 234, 22, 0.25)" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#8E8E93" }}>
                    {ICON_MAP[activeIndustry.iconName] || <Briefcase size={14} />}
                  </span>
                  <span style={{ fontSize: "12px", color: "#8E8E93" }}>
                    {activeIndustry.id === "doctors-clinics"
                      ? "Specialty / Dept"
                      : activeIndustry.id === "lawyers"
                      ? "Practice Area"
                      : activeIndustry.id === "chartered-accountants"
                      ? "Tax Service"
                      : activeIndustry.id === "real-estate"
                      ? "Unit Config"
                      : activeIndustry.id === "education"
                      ? "Course / Batch"
                      : activeIndustry.id === "distributors"
                      ? "Wholesale SKU"
                      : "Service / Scope"}
                  </span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: extractedData.department ? "#9BEA16" : "#52525B" }}>
                  {extractedData.department || "Pending selection"}
                </span>
              </div>

              {/* Confirmed Slot */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: extractedData.slot ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${extractedData.slot ? "#9BEA16" : "rgba(255, 255, 255, 0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Clock size={14} color="#8E8E93" />
                  <span style={{ fontSize: "12px", color: "#8E8E93" }}>Confirmed Slot</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: extractedData.slot ? "#9BEA16" : "#52525B" }}>
                  {extractedData.slot || "Pending resolution"}
                </span>
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
    </div>
  );
}
