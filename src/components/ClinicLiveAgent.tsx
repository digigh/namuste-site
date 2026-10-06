"use client";

// The live clinic receptionist on the website: a real voice call or text chat
// with the clinic receptionist agent (real doctor availability, real bookings). Same look as
// the older AIVoiceChatbotEngine dashboard.

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Globe,
  Languages,
  Lightbulb,
  Loader2,
  MessageSquare,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  RotateCcw,
  Scissors,
  Send,
  ShieldCheck,
  Zap,
  Bot,
  Sprout,
  Stethoscope,
  HeartPulse,
  Tag,
  User,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedOrb from "./AnimatedOrb";
import { SpeechWaveform } from "./SpeechWaveform";
import { AI_DASH_CSS } from "./aiDashStyles";
import { openLeadModal } from "@/lib/openLeadModal";
import { useClinicAgent, type SessionMode } from "@/hooks/use-clinic-agent";
import { LANGUAGE_NAMES, formatDuration, languageName } from "@/lib/agentTranscript";

export type IndustryId = "clinic" | "salon" | "agri";

export interface IndustryConfig {
  id: IndustryId;
  label: string;
  categoryLabel: string;
  name: string;
  role: string;
  sub: string;
  receptionist: string;
  personaRole: string;
  headerTitle: string;
  icon: React.ReactNode;
  actionFields: {
    label: string;
    icon: React.ReactNode;
    getValue: (booking: any) => string;
  }[];
  quickPrompts: string[];
  verificationBadge: string;
}

const INDUSTRIES: Record<IndustryId, IndustryConfig> = {
  clinic: {
    id: "clinic",
    label: "Sunrise Multi-Specialty Clinic",
    categoryLabel: "Clinic",
    name: "Sunrise Multi-Specialty Clinic",
    role: "Virtual Receptionist",
    sub: "Demo clinic · real-time availability",
    receptionist: "Ritu",
    personaRole: "AI Receptionist",
    headerTitle: "AI Receptionist",
    icon: <Stethoscope size={14} />,
    actionFields: [
      { label: "Department", icon: <Stethoscope size={14} />, getValue: (b) => b?.department || "—" },
      { label: "Doctor", icon: <User size={14} />, getValue: (b) => b?.doctor || "—" },
      { label: "Appointment", icon: <Calendar size={14} />, getValue: (b) => (b ? `${b.date}, ${b.time}` : "—") },
      { label: "Reference", icon: <Tag size={14} />, getValue: (b) => b?.reference || "—" },
    ],
    quickPrompts: [
      "I need a dentist tomorrow evening",
      "मुझे कल सुबह डॉक्टर को दिखाना है",
      "What are your clinic timings and fees?",
      "I want to cancel my appointment",
    ],
    verificationBadge:
      "Books against real doctor schedules. Never double-books, reads details back before confirming, and directs emergencies to 112.",
  },
  salon: {
    id: "salon",
    label: "Headlocks Luxury Salon",
    categoryLabel: "Salon",
    name: "Headlocks Luxury Salon",
    role: "Virtual Receptionist",
    sub: "Golf Course Road · real-time availability",
    receptionist: "Riya",
    personaRole: "AI Receptionist",
    headerTitle: "AI Receptionist",
    icon: <Scissors size={14} />,
    actionFields: [
      { label: "Service", icon: <Scissors size={14} />, getValue: (b) => b?.service || b?.department || "—" },
      { label: "Stylist", icon: <User size={14} />, getValue: (b) => b?.stylist || b?.doctor || "—" },
      { label: "Appointment", icon: <Calendar size={14} />, getValue: (b) => (b ? `${b.date}, ${b.time}` : "—") },
      { label: "Reference", icon: <Tag size={14} />, getValue: (b) => b?.reference || "—" },
    ],
    quickPrompts: [
      "I want a haircut tomorrow evening",
      "मुझे शनिवार को फेशियल करवाना है",
      "What are your timings and prices for keratin?",
      "I want to cancel my appointment",
    ],
    verificationBadge:
      "Books against real stylist schedules. Never double-books, reads details back before confirming, and hands special requests to our team.",
  },
  agri: {
    id: "agri",
    label: "Kisan Sathi Agri Inputs",
    categoryLabel: "Agri Input",
    name: "Kisan Sathi Agri Inputs",
    role: "Virtual Sales & Crop Advisor",
    sub: "Demo · live stock, prices & advice",
    receptionist: "Priya",
    personaRole: "AI Agri Assistant",
    headerTitle: "AI Assistant",
    icon: <Sprout size={14} />,
    actionFields: [
      { label: "Customer", icon: <User size={14} />, getValue: (b) => b?.customer || b?.patient || "—" },
      { label: "Crop / Product", icon: <Sprout size={14} />, getValue: (b) => b?.crop || b?.product || b?.department || "—" },
      { label: "Order", icon: <Tag size={14} />, getValue: (b) => b?.order || b?.doctor || "—" },
      { label: "Reference", icon: <Tag size={14} />, getValue: (b) => b?.reference || "—" },
    ],
    quickPrompts: [
      "My cotton leaves are curling, small white flies underneath",
      "मेरी सोयाबीन के पत्ते पीले पड़ रहे हैं",
      "How much Coragen do I need for 3 acres of paddy?",
      "Which shop near me sells Nativo?",
    ],
    verificationBadge:
      "Quotes from live stock and prices. Reads every order back before confirming, and never advises more than the label dose.",
  },
};

const STATE_LABEL: Record<string, string> = {
  initializing: "Connecting…",
  listening: "Listening",
  thinking: "Thinking…",
  speaking: "Speaking",
};

/* MINIMALIST TRANSIENT MEDALLION FOR INDUSTRY SWITCH (Positioned at top of live conversation card, rings removed) */
function MinimalIndustryWave({ id }: { id: IndustryId }) {
  const meta = {
    salon: {
      name: "Headlocks Salon",
      sub: "Salon AI Ready",
      icon: <Scissors size={15} strokeWidth={2.4} />,
      iconClass: "ai-min-icon-salon",
    },
    agri: {
      name: "Kisan Sathi Agri",
      sub: "Agri AI Ready",
      icon: <Sprout size={15} strokeWidth={2.4} />,
      iconClass: "ai-min-icon-agri",
    },
    clinic: {
      name: "Sunrise Clinic",
      sub: "Clinic AI Ready",
      icon: <Stethoscope size={15} strokeWidth={2.4} />,
      iconClass: "ai-min-icon-clinic",
    },
  }[id];

  return (
    <motion.div
      className="ai-minimal-medallion"
      initial={{ scale: 0.85, opacity: 0, y: -8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 450, damping: 26 }}
    >
      <div className={`ai-min-icon-box ${meta.iconClass}`}>
        {meta.icon}
      </div>
      <div className="ai-min-content">
        <div className="ai-min-name">{meta.name}</div>
        <div className="ai-min-sub">
          <span className="ai-live-dot-mini" /> {meta.sub}
        </div>
      </div>
    </motion.div>
  );
}

export default function ClinicLiveAgent() {
  const [industry, setIndustry] = useState<IndustryId>("clinic");
  const [industryOpen, setIndustryOpen] = useState(false);
  const [industrySwitchEffect, setIndustrySwitchEffect] = useState<{ id: IndustryId; key: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ind = INDUSTRIES[industry];

  const agent = useClinicAgent();
  const {
    mode,
    status,
    agentState,
    connectingStep,
    errorKind,
    lines,
    activity,
    booking,
    language,
    error,
    muted,
    userSpeaking,
    elapsed,
    emergency,
  } = agent;
  const [chatInput, setChatInput] = useState("");
  const [activityExpanded, setActivityExpanded] = useState(false);
  const [sending, setSending] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const live = status === "connecting" || status === "connected";
  const inCall = mode === "voice" && status === "connected";
  const aiSpeaking = status === "connected" && agentState === "speaking";
  const thinking = status === "connected" && agentState === "thinking";

  // Auto-dismiss transient industry switch animation after 1.8s
  useEffect(() => {
    if (!industrySwitchEffect) return;
    const timer = setTimeout(() => {
      setIndustrySwitchEffect(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, [industrySwitchEffect]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keep the newest message in view without scrolling the whole page.
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines, thinking, status]);

  const switchIndustry = (next: IndustryId) => {
    setIndustryOpen(false);
    setIndustrySwitchEffect({ id: next, key: Date.now() });
    if (next === industry) {
      return;
    }
    void agent.reset();
    setIndustry(next);
  };

  const switchChannel = (next: SessionMode) => {
    if (next === mode) return;
    void agent.reset().then(() => agent.setMode(next));
  };

  const send = async (text: string) => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await agent.sendText(text, industry);
    } finally {
      setSending(false);
    }
  };

  const onQuickPrompt = (p: string) => {
    if (mode === "voice" && status !== "connected") {
      void agent.start("voice", industry);
      return;
    }
    void send(p);
  };

  const statusValue =
    status === "idle"
      ? mode === "voice"
        ? "Ready for a call"
        : "Ready to chat"
      : status === "connecting"
      ? connectingStep === "mic_permission"
        ? "Allow microphone"
        : connectingStep === "waiting_agent"
        ? "Ringing line…"
        : "Connecting…"
      : status === "connected"
      ? emergency
        ? "Emergency guidance given"
        : lines.length === 0
        ? "Answering…"
        : STATE_LABEL[agentState] || "Live"
      : status === "error"
      ? errorKind === "mic_denied"
        ? "Mic blocked"
        : errorKind === "timeout"
        ? "Line busy"
        : "Couldn't connect"
      : "Session ended";

  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Activity size={14} />, label: "Status", value: statusValue },
    { icon: <Globe size={14} />, label: "Language", value: languageName(language) },
    ...ind.actionFields.map((f) => ({
      icon: f.icon,
      label: f.label,
      value: f.getValue(booking),
    })),
  ];

  const busy = thinking || (sending && mode === "chat");

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: 0, boxSizing: "border-box" }}>
      <div className="ai-dash">
        <div className="ai-dash-topbar">
          <div className="ai-dash-fields">
            <div className="ai-dash-field ai-dropdown-wrapper" ref={dropdownRef}>
              <div className="ai-field-label-group">
                <span className="ai-dash-field-label">Industry Demo</span>
                <span className="ai-live-pill-tag">
                  <span className="ai-live-dot-mini" /> 3 Live Agents
                </span>
              </div>
              <button
                type="button"
                className={`ai-industry-btn${industryOpen ? " ai-industry-btn-open" : ""}`}
                onClick={() => setIndustryOpen(!industryOpen)}
                aria-expanded={industryOpen}
                aria-label="Switch industry demo"
              >
                <span className="ai-industry-icon-box">{ind.icon}</span>
                <div className="ai-industry-info">
                  <span className="ai-industry-name">{ind.name}</span>
                  <span className="ai-industry-hint">{ind.receptionist} · {ind.role}</span>
                </div>
                <span className="ai-industry-switch-pill">
                  <span>Switch</span>
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: industryOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </span>
              </button>

              {industryOpen && (
                <div className="ai-industry-dropdown-menu">
                  <div className="ai-industry-dropdown-header">
                    <div className="ai-industry-dropdown-title">
                      <span>Select Live AI Assistant</span>
                      <span className="ai-live-pill-tag"><span className="ai-live-dot-mini" /> 3 Available</span>
                    </div>
                    <div className="ai-industry-dropdown-sub">
                      Switch instantly to test real-world conversational workflows
                    </div>
                  </div>

                  <div className="ai-industry-card-list">
                    {(Object.keys(INDUSTRIES) as IndustryId[]).map((id) => {
                      const item = INDUSTRIES[id];
                      const selected = id === industry;
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`ai-industry-card-item${selected ? " is-active" : ""}`}
                          onClick={() => switchIndustry(id)}
                        >
                          <span className="ai-industry-card-icon">{item.icon}</span>
                          <div className="ai-industry-card-body">
                            <div className="ai-industry-card-title">
                              <span>{item.name}</span>
                              {selected && (
                                <span className="ai-selected-badge">
                                  <Check size={11} strokeWidth={3} /> Active
                                </span>
                              )}
                            </div>
                            <div className="ai-industry-card-agent">
                              {item.receptionist} · {item.role}
                            </div>
                            <div className="ai-industry-card-desc">{item.sub}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="ai-industry-dropdown-footer">
                    ⚡ Live voice calls & natural chat powered by dedicated production pipelines
                  </div>
                </div>
              )}
            </div>

            <div className="ai-dash-field">
              <span className="ai-dash-field-label">Language</span>
              <div className="ai-dash-select ai-dash-select-static">
                <Globe size={13} />
                <span>{lines.length ? `Auto · ${languageName(language)}` : "Auto Detect"}</span>
              </div>
            </div>
          </div>

          <div className="ai-dash-actions">
            <Tabs value={mode} onValueChange={(v) => switchChannel(v as SessionMode)}>
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

            <button onClick={() => void agent.reset()} className="ai-dash-reset">
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={openLeadModal}
              className="ai-dash-trial-cta"
              title="Start 7-Day Free Trial for Doctors & Clinics"
            >
              <Zap size={13} strokeWidth={2.5} />
              <span className="ai-trial-tag-text">Claim 7-Day Free Trial</span>
              <ArrowUpRight size={13} className="ai-trial-cta-arrow" />
            </button>
          </div>
        </div>

        <div className="ai-dash-grid">
          {/* LEFT — the receptionist */}
          <Card className="ai-panel">
            <CardContent className="ai-panel-body">
              <div className="ai-panel-head">
                <span>{ind.headerTitle}</span>
                <Badge className="ai-badge-active"><span className="ai-live-dot" /> {live ? "Live" : "Online"}</Badge>
              </div>

              {/* Quick 1-click industry switcher pills */}
              <div className="ai-quick-industry-box">
                <div className="ai-quick-industry-title">
                  <span>Switch Industry Demo</span>
                  <span className="ai-live-pill-tag"><span className="ai-live-dot-mini" /> 3 Ready</span>
                </div>
                <div className="ai-quick-industry-pills">
                  {(Object.keys(INDUSTRIES) as IndustryId[]).map((id) => {
                    const item = INDUSTRIES[id];
                    const active = id === industry;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => switchIndustry(id)}
                        className={`ai-quick-industry-pill${active ? " is-active" : ""}`}
                        title={`Switch to ${item.name}`}
                      >
                        <span className="ai-quick-pill-icon">{item.icon}</span>
                        <span>{item.categoryLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="ai-agent-card">
                <span className="ai-agent-icon">{ind.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="ai-agent-name">{ind.name}</div>
                  <div className="ai-agent-role">{ind.role}</div>
                  <div className="ai-agent-sub">{ind.sub}</div>
                </div>
              </div>

              <div className="ai-agent-card ai-persona-card" style={{ cursor: "default" }}>
                <span className="ai-persona-avatar"><AnimatedOrb size={36} /></span>
                <div style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
                  <div className="ai-agent-name">{ind.receptionist}</div>
                  <div className="ai-agent-role">{status === "connected" ? STATE_LABEL[agentState] || "Live" : ind.personaRole}</div>
                </div>
                <span className="ai-persona-wave">
                  <SpeechWaveform
                    state={aiSpeaking ? "ai" : "idle"}
                    userAnalyserRef={agent.userAnalyserRef}
                    aiAnalyserRef={agent.aiAnalyserRef}
                    barCount={5}
                    barColor="var(--green)"
                  />
                </span>
              </div>

              <div className="ai-panel-subhead"><Languages size={12} /> Languages Supported</div>
              <div className="ai-lang-pills">
                {Object.values(LANGUAGE_NAMES).map((name) => (
                  <span key={name} className="ai-lang-pill">{name}</span>
                ))}
              </div>

              <button
                type="button"
                className="ai-try-cta"
                onClick={() => {
                  if (mode === "voice") {
                    if (!live) void agent.start("voice", industry);
                  } else {
                    chatInputRef.current?.focus();
                  }
                }}
              >
                <span className="ai-try-cta-icon"><Zap size={14} /></span>
                <span className="ai-try-cta-text">
                  <span className="ai-try-cta-title">Try it now</span>
                  <span className="ai-try-cta-sub">
                    {mode === "voice" ? "Start a real voice call" : "Send a message to begin"}
                  </span>
                </span>
                <ChevronRight size={14} className="ai-try-cta-arrow" />
              </button>

              <div className="ai-tip-box">
                <ShieldCheck size={14} />
                <span>{ind.verificationBadge}</span>
              </div>
            </CardContent>
          </Card>

          {/* CENTER — live conversation */}
          <Card className={`ai-panel ai-panel-center${mode === "chat" ? " is-whatsapp" : ""}`}>
            <CardContent className="ai-panel-body ai-center-body" style={{ position: "relative" }}>
              {/* Minimalist transient wave animation centered in the voice box */}
              <AnimatePresence>
                {industrySwitchEffect && (
                  <motion.div
                    key={industrySwitchEffect.key}
                    className="ai-minimal-wave-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  >
                    <MinimalIndustryWave id={industrySwitchEffect.id} />
                  </motion.div>
                )}
              </AnimatePresence>

              {mode === "chat" ? (
                <div className="ai-wa-header">
                  <span className="ai-wa-avatar">{ind.icon}</span>
                  <div className="ai-wa-header-text">
                    <span className="ai-wa-name">{ind.name}</span>
                    <span className="ai-wa-status">
                      {status === "connecting" ? "connecting…" : busy ? "typing…" : "online"}
                    </span>
                  </div>
                  {lines.length > 0 && (
                    <Badge variant="secondary" className="ai-wa-detected">
                      <Globe size={11} />
                      {languageName(language)}
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="ai-panel-head">
                  <span className="ai-live-title"><span className="ai-live-dot" /> Live Conversation</span>
                  {(inCall || elapsed > 0) && <span className="ai-timer">{formatDuration(elapsed)}</span>}
                  {lines.length > 0 && (
                    <Badge variant="secondary" className="ai-detected-badge">
                      <Globe size={11} />
                      Detected: {languageName(language)}
                    </Badge>
                  )}
                </div>
              )}

              <div className="ai-transcript" ref={transcriptRef}>
                {status === "connecting" && mode === "voice" ? (
                  <div className="ai-connecting-stage">
                    <div className="ai-empty-orb-wrap">
                      <motion.span
                        className="ai-empty-orb-ring"
                        animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        className="ai-empty-orb-ring"
                        animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                      />
                      <AnimatedOrb size={96} />
                    </div>

                    <div className="ai-connecting-badge">
                      <span className="ai-live-dot" />
                      <span>
                        {connectingStep === "mic_permission"
                          ? "Action required: Allow Microphone"
                          : connectingStep === "waiting_agent" || connectingStep === "ready"
                          ? `Ringing ${ind.name}…`
                          : `Connecting to ${ind.name}…`}
                      </span>
                    </div>

                    <h3 className="ai-connecting-title">
                      {connectingStep === "mic_permission"
                        ? "Please allow microphone access"
                        : connectingStep === "waiting_agent" || connectingStep === "ready"
                        ? `Connecting to ${ind.receptionist}…`
                        : "Establishing secure line…"}
                    </h3>

                    <p className="ai-connecting-sub">
                      {connectingStep === "mic_permission"
                        ? "Look for your browser's microphone popup near the address bar and click 'Allow' to speak."
                        : connectingStep === "waiting_agent" || connectingStep === "ready"
                        ? `Waiting for ${ind.receptionist} to pick up the line. Please hold on — she will greet you in a moment.`
                        : "Connecting a secure private voice channel."}
                    </p>

                    <div className="ai-connecting-steps">
                      <div className={`ai-cstep ${connectingStep !== "token" ? "is-done" : "is-active"}`}>
                        <span className="ai-cstep-dot" />
                        <span>Line</span>
                      </div>
                      <span className="ai-cstep-line" />
                      <div
                        className={`ai-cstep ${
                          connectingStep === "mic_permission"
                            ? "is-active"
                            : connectingStep === "waiting_agent" || connectingStep === "ready"
                            ? "is-done"
                            : ""
                        }`}
                      >
                        <span className="ai-cstep-dot" />
                        <span>Microphone</span>
                      </div>
                      <span className="ai-cstep-line" />
                      <div
                        className={`ai-cstep ${
                          connectingStep === "waiting_agent" || connectingStep === "ready" ? "is-active" : ""
                        }`}
                      >
                        <span className="ai-cstep-dot" />
                        <span>{ind.receptionist}</span>
                      </div>
                    </div>

                    <div className="ai-connecting-hint">
                      <Languages size={13} style={{ color: "var(--green)", flexShrink: 0 }} />
                      <span>
                        {ind.receptionist} understands English, Hindi, and 8 other Indian languages. Feel free to speak naturally once she answers.
                      </span>
                    </div>

                    <button
                      type="button"
                      className="ai-connecting-cancel-btn"
                      onClick={() => void agent.stop()}
                    >
                      <PhoneOff size={13} />
                      <span>Cancel Call</span>
                    </button>
                  </div>
                ) : status === "error" ? (
                  <div className="ai-error-stage">
                    <div className="ai-error-icon-wrap">
                      {errorKind === "mic_denied" ? (
                        <MicOff size={28} style={{ color: "#EF4444" }} />
                      ) : errorKind === "timeout" ? (
                        <PhoneOff size={28} style={{ color: "#F59E0B" }} />
                      ) : (
                        <AlertTriangle size={28} style={{ color: "#EF4444" }} />
                      )}
                    </div>

                    <h3 className="ai-error-title">
                      {errorKind === "mic_denied"
                        ? "Microphone Access Required"
                        : errorKind === "mic_not_found"
                        ? "No Microphone Detected"
                        : errorKind === "timeout"
                        ? "Receptionist Line Busy"
                        : errorKind === "rate_limited"
                        ? "Session Limit Reached"
                        : "Call Couldn't Connect"}
                    </h3>

                    <p className="ai-error-description">
                      {errorKind === "mic_denied"
                        ? "Your browser blocked or has not granted microphone permission. Please click the lock or camera icon in your address bar to allow microphone access, or switch to chat below."
                        : errorKind === "timeout"
                        ? "The receptionist didn't answer within 20 seconds. The service may be warming up or under temporary load. Please try calling again in a moment."
                        : errorKind === "rate_limited"
                        ? "To keep the demo available to everyone, sessions are limited. You can use text chat or wait a few minutes."
                        : error || "We couldn't connect your call. Please check your network and try again."}
                    </p>

                    <div className="ai-error-actions">
                      <button
                        type="button"
                        className="ai-error-retry-btn"
                        onClick={() => void agent.start(mode, industry)}
                      >
                        <RotateCcw size={13} />
                        <span>{mode === "voice" ? "Try Calling Again" : "Try Again"}</span>
                      </button>

                      {mode === "voice" && (
                        <button
                          type="button"
                          className="ai-error-chat-btn"
                          onClick={() => switchChannel("chat")}
                        >
                          <MessageSquare size={13} />
                          <span>Switch to Text Chat</span>
                        </button>
                      )}

                      <button
                        type="button"
                        className="ai-error-dismiss-btn"
                        onClick={() => void agent.reset()}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : lines.length === 0 ? (
                  status === "connected" ? (
                    <div className="ai-transcript-empty" style={{ padding: "30px 20px" }}>
                      <div className="ai-empty-orb-wrap">
                        <motion.span
                          className="ai-empty-orb-ring"
                          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                        <AnimatedOrb size={88} />
                      </div>
                      <p className="ai-empty-title">
                        {aiSpeaking ? `${ind.receptionist} is speaking…` : `Connected with ${ind.receptionist}`}
                      </p>
                      <p className="ai-empty-sub">
                        {aiSpeaking
                          ? `Listen in as ${ind.receptionist} greets you. Feel free to speak or reply at any time.`
                          : `${ind.receptionist} is preparing her greeting… she will speak in a moment.`}
                      </p>
                      <div style={{ marginTop: 12 }}>
                        <SpeechWaveform
                          state={aiSpeaking ? "ai" : "idle"}
                          userAnalyserRef={agent.userAnalyserRef}
                          aiAnalyserRef={agent.aiAnalyserRef}
                          barCount={8}
                          barColor="var(--green)"
                        />
                      </div>
                    </div>
                  ) : (
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
                        <AnimatedOrb size={104} />
                      </div>
                      <p className="ai-empty-title">
                        {status === "ended" ? "Session ended." : "Ready when you are."}
                      </p>
                      <p className="ai-empty-sub">
                        {mode === "voice"
                          ? "Tap “Start Voice Call” and speak in any Indian language."
                          : "Type a message below, in English, Hindi or your language."}
                      </p>
                      <motion.span
                        className="ai-empty-nudge"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </div>
                  )
                ) : (
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const isAi = line.speaker === "ai";
                      return (
                        <motion.div
                          key={line.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`ai-msg ${isAi ? "is-ai" : "is-user"}`}
                        >
                          <span className="ai-msg-avatar">{isAi ? <Bot size={12} /> : <User size={12} />}</span>
                          <div className={`ai-msg-bubble${!line.final && !isAi ? " ai-msg-live" : ""}`}>
                            <div className="ai-msg-from">{isAi ? ind.receptionist : !line.final ? "You · live" : "You"}</div>
                            <p>{line.text}</p>
                            <span className="ai-msg-time">
                              {new Date(line.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
                {status === "connected" && busy && (
                  <div className="ai-msg is-ai">
                    <span className="ai-msg-avatar"><Bot size={12} /></span>
                    <div className="ai-msg-bubble ai-typing">
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-text">Thinking…</span>
                    </div>
                  </div>
                )}
              </div>

              {error && status !== "error" && (
                <div
                  role="alert"
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                    margin: "0 12px 8px",
                    padding: "8px 10px",
                    borderRadius: 10,
                    fontSize: 12.5,
                    color: "var(--text-ivory)",
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.35)",
                  }}
                >
                  <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1, color: "#EF4444" }} />
                  <span style={{ flex: 1 }}>{error}</span>
                  <button aria-label="Dismiss" onClick={() => void agent.reset()} style={{ color: "var(--text-muted)" }}>
                    <X size={14} />
                  </button>
                </div>
              )}

              {mode === "voice" ? (
                <div className="ai-call-bar">
                  {status === "connecting" ? (
                    <div className="ai-call-connecting-bar">
                      <div className="ai-call-connecting-info">
                        <Loader2 size={16} className="ai-spin" style={{ color: "var(--green)" }} />
                        <span>
                          {connectingStep === "mic_permission"
                            ? "Waiting for microphone permission…"
                            : connectingStep === "waiting_agent" || connectingStep === "ready"
                            ? `Ringing ${ind.receptionist} at ${ind.name}…`
                            : `Connecting to ${ind.name} voice line…`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => void agent.stop()}
                        className="ai-ctrl-btn ai-ctrl-end"
                        style={{ flexDirection: "row", gap: 6, padding: "8px 16px", borderRadius: 999 }}
                      >
                        <PhoneOff size={14} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : !inCall ? (
                    <div className="ai-call-cta-wrap" style={{ flexDirection: "column", gap: 8 }}>
                      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <motion.span
                          className="ai-call-pulse-ring"
                          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.button
                          onClick={() => void agent.start("voice", industry)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="ai-call-start"
                        >
                          <span className="ai-call-start-shine" />
                          <Phone size={16} />
                          <span>{status === "ended" ? "Call again" : "Start Voice Call"}</span>
                        </motion.button>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.4 }}>
                        Uses your microphone. Calls may be recorded for quality. Demo: please don&apos;t share
                        sensitive personal details.
                      </span>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => void agent.toggleMute()} className="ai-ctrl-btn" disabled={status !== "connected"}>
                        {muted ? <MicOff size={15} /> : <Mic size={15} />}
                        <span>{muted ? "Unmute" : "Mute"}</span>
                      </button>

                      <div className="ai-call-wave">
                        <SpeechWaveform
                          state={aiSpeaking ? "ai" : userSpeaking && !muted ? "user" : "idle"}
                          userAnalyserRef={agent.userAnalyserRef}
                          aiAnalyserRef={agent.aiAnalyserRef}
                          barCount={32}
                          barColor={aiSpeaking ? "var(--green)" : userSpeaking ? "#0EA5E9" : "var(--text-dim)"}
                        />
                        <span className="ai-call-wave-label">
                          {aiSpeaking
                            ? `${ind.receptionist} is speaking…`
                            : thinking
                            ? `${ind.receptionist} is thinking…`
                            : muted
                            ? "You're muted"
                            : userSpeaking
                            ? "Listening…"
                            : lines.length === 0
                            ? `Connected · ${ind.receptionist} answering…`
                            : `On call · ${formatDuration(elapsed)}`}
                        </span>
                      </div>

                      <button onClick={() => void agent.stop()} className="ai-ctrl-btn ai-ctrl-end">
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
                    const text = chatInput;
                    setChatInput("");
                    void send(text);
                  }}
                  className="ai-chat-form"
                >
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={chatInput}
                    maxLength={500}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message"
                    aria-label={`Message ${ind.receptionist}`}
                  />
                  <button type="submit" disabled={sending || !chatInput.trim()} aria-label="Send">
                    {sending ? <Loader2 size={16} className="ai-spin" /> : <Send size={16} />}
                  </button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* RIGHT — what the receptionist is actually doing */}
          <Card className="ai-panel">
            <CardContent className="ai-panel-body">
              <div className="ai-panel-head">
                <span className="ai-live-title"><Activity size={13} /> Live Actions</span>
                <Badge className={thinking ? "ai-badge-processing" : "ai-badge-active"}>
                  {thinking && <Loader2 size={10} className="ai-spin" />}
                  {thinking ? "Processing" : booking ? "Booked" : "Ready"}
                </Badge>
              </div>

              <ul className="ai-actions-list">
                {rows.map((row) => (
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
                {activity.length > 3 && (
                  <button onClick={() => setActivityExpanded(!activityExpanded)} className="ai-see-all">
                    {activityExpanded ? "Show less" : "See all"} <ChevronRight size={11} />
                  </button>
                )}
              </div>
              <div className="ai-activity-list">
                {activity.length === 0 ? (
                  <div className="ai-activity-empty">No activity yet. Start a call or chat.</div>
                ) : (
                  [...(activityExpanded ? activity : activity.slice(-3))].reverse().map((entry) => (
                    <div className="ai-activity-row" key={entry.id}>
                      <span className={`ai-activity-dot ${entry.ok ? "completed" : "processing"}`} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="ai-activity-label">{entry.label}</div>
                        <div className="ai-activity-time">{entry.time}</div>
                      </div>
                      <span className={`ai-activity-status ${entry.ok ? "completed" : "processing"}`}>
                        {entry.ok ? <Check size={10} strokeWidth={3} /> : <AlertTriangle size={10} />}
                        {entry.ok ? "Done" : "Needs info"}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="ai-tip-box ai-tip-box-accent">
                <Lightbulb size={14} />
                <div style={{ minWidth: 0 }}>
                  <div className="ai-tip-title">Need something to try?</div>
                  <div className="ai-quick-prompts">
                    {ind.quickPrompts.map((p) => (
                      <button key={p} onClick={() => onQuickPrompt(p)} disabled={sending}>
                        &ldquo;{p}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{AI_DASH_CSS}</style>
    </div>
  );
}
