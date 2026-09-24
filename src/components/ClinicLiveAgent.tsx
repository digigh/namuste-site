"use client";

// The live clinic receptionist on the website: a real voice call or text chat
// with the LiveKit agent (real doctor availability, real bookings). Same look as
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
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Tag,
  User,
  X,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedOrb from "./AnimatedOrb";
import { SpeechWaveform } from "./SpeechWaveform";
import { AI_DASH_CSS } from "./aiDashStyles";
import { useClinicAgent, type SessionMode } from "@/hooks/use-clinic-agent";
import { LANGUAGE_NAMES, formatDuration, languageName } from "@/lib/agentTranscript";

const CLINIC_NAME = "Sunrise Multi-Specialty Clinic";
const RECEPTIONIST = "Ritu";

const QUICK_PROMPTS = [
  "I need a dentist tomorrow evening",
  "मुझे कल सुबह डॉक्टर को दिखाना है",
  "What are your clinic timings and fees?",
  "I want to cancel my appointment",
];

const STATE_LABEL: Record<string, string> = {
  initializing: "Connecting…",
  listening: "Listening",
  thinking: "Thinking…",
  speaking: "Speaking",
};

export default function ClinicLiveAgent() {
  const agent = useClinicAgent();
  const {
    mode,
    status,
    agentState,
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
  const inCall = mode === "voice" && live;
  const aiSpeaking = status === "connected" && agentState === "speaking";
  const thinking = status === "connected" && agentState === "thinking";

  // Keep the newest message in view without scrolling the whole page.
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines, thinking]);

  const switchChannel = (next: SessionMode) => {
    if (next === mode) return;
    void agent.reset().then(() => agent.setMode(next));
  };

  const send = async (text: string) => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await agent.sendText(text);
    } finally {
      setSending(false);
    }
  };

  const onQuickPrompt = (p: string) => {
    if (mode === "voice" && status !== "connected") {
      void agent.start("voice");
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
      ? "Connecting…"
      : status === "connected"
      ? emergency
        ? "Emergency guidance given"
        : STATE_LABEL[agentState] || "Live"
      : status === "error"
      ? "Couldn't connect"
      : "Session ended";

  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Activity size={14} />, label: "Status", value: statusValue },
    { icon: <Globe size={14} />, label: "Language", value: languageName(language) },
    {
      icon: <Stethoscope size={14} />,
      label: "Department",
      value: booking ? booking.department : "—",
    },
    { icon: <User size={14} />, label: "Doctor", value: booking ? booking.doctor : "—" },
    {
      icon: <Calendar size={14} />,
      label: "Appointment",
      value: booking ? `${booking.date}, ${booking.time}` : "—",
    },
    { icon: <Tag size={14} />, label: "Reference", value: booking ? booking.reference : "—" },
  ];

  const busy = thinking || (sending && mode === "chat");

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: 0, boxSizing: "border-box" }}>
      <div className="ai-dash">
        <div className="ai-dash-topbar">
          <div className="ai-dash-fields">
            <div className="ai-dash-field">
              <span className="ai-dash-field-label">Clinic</span>
              <div className="ai-dash-select ai-dash-select-static">
                <span className="ai-dash-select-icon"><Building2 size={13} /></span>
                <span>{CLINIC_NAME}</span>
              </div>
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
          </div>
        </div>

        <div className="ai-dash-grid">
          {/* LEFT — the receptionist */}
          <Card className="ai-panel">
            <CardContent className="ai-panel-body">
              <div className="ai-panel-head">
                <span>AI Receptionist</span>
                <Badge className="ai-badge-active"><span className="ai-live-dot" /> {live ? "Live" : "Online"}</Badge>
              </div>

              <div className="ai-agent-card">
                <span className="ai-agent-icon"><Stethoscope size={16} /></span>
                <div style={{ minWidth: 0 }}>
                  <div className="ai-agent-name">{CLINIC_NAME}</div>
                  <div className="ai-agent-role">Virtual Receptionist</div>
                  <div className="ai-agent-sub">Demo clinic · real-time availability</div>
                </div>
              </div>

              <div className="ai-agent-card ai-persona-card" style={{ cursor: "default" }}>
                <span className="ai-persona-avatar"><AnimatedOrb size={36} /></span>
                <div style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
                  <div className="ai-agent-name">{RECEPTIONIST}</div>
                  <div className="ai-agent-role">{status === "connected" ? STATE_LABEL[agentState] || "Live" : "AI Receptionist"}</div>
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
                    if (!live) void agent.start("voice");
                  } else {
                    chatInputRef.current?.focus();
                  }
                }}
              >
                <span className="ai-try-cta-icon"><Sparkles size={14} /></span>
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
                <span>
                  Books against real doctor schedules. Never double-books, reads details back before confirming, and
                  directs emergencies to 112.
                </span>
              </div>
            </CardContent>
          </Card>

          {/* CENTER — live conversation */}
          <Card className={`ai-panel ai-panel-center${mode === "chat" ? " is-whatsapp" : ""}`}>
            <CardContent className="ai-panel-body ai-center-body">
              {mode === "chat" ? (
                <div className="ai-wa-header">
                  <span className="ai-wa-avatar"><Stethoscope size={16} /></span>
                  <div className="ai-wa-header-text">
                    <span className="ai-wa-name">{CLINIC_NAME}</span>
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
                {lines.length === 0 && status !== "connecting" ? (
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
                          <span className="ai-msg-avatar">{isAi ? <Sparkles size={12} /> : <User size={12} />}</span>
                          <div className={`ai-msg-bubble${!line.final && !isAi ? " ai-msg-live" : ""}`}>
                            <div className="ai-msg-from">{isAi ? RECEPTIONIST : !line.final ? "You · live" : "You"}</div>
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
                {(status === "connecting" || busy) && (
                  <div className="ai-msg is-ai">
                    <span className="ai-msg-avatar"><Sparkles size={12} /></span>
                    <div className="ai-msg-bubble ai-typing">
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-dot" />
                      <span className="ai-typing-text">
                        {status === "connecting" ? "Connecting to the receptionist…" : "Thinking…"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {error && (
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
                  {!inCall ? (
                    <div className="ai-call-cta-wrap" style={{ flexDirection: "column", gap: 8 }}>
                      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <motion.span
                          className="ai-call-pulse-ring"
                          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.button
                          onClick={() => void agent.start("voice")}
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
                        Uses your microphone. Calls may be recorded for quality. Demo clinic: please don&apos;t share
                        sensitive medical details.
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
                          {status === "connecting"
                            ? "Connecting…"
                            : aiSpeaking
                            ? `${RECEPTIONIST} is speaking…`
                            : thinking
                            ? `${RECEPTIONIST} is thinking…`
                            : muted
                            ? "You're muted"
                            : userSpeaking
                            ? "Listening…"
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
                    aria-label="Message the receptionist"
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
                    {QUICK_PROMPTS.map((p) => (
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
