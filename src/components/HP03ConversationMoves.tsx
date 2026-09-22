"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  PhoneCall,
  MessageSquare,
  Globe,
  FileText,
  Calendar,
  Send,
  BarChart3,
  Mic,
  PhoneOff,
  MoreHorizontal,
  Clock,
  Target,
  TrendingUp,
  Play,
  Bot,
  Check,
  CheckCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

type ChannelId = "voice" | "whatsapp" | "web";

const CHANNELS: { id: ChannelId; label: string; icon: typeof PhoneCall }[] = [
  { id: "voice", label: "Voice", icon: PhoneCall },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { id: "web", label: "Web", icon: Globe },
];

const STEP_ICONS = [PhoneCall, FileText, Calendar, Send, BarChart3];

const channelExamples: Record<ChannelId, { num: string; step: string; text: string; escalation?: string; isLearn?: boolean }[]> = {
  voice: [
    { num: "01", step: "Answer", text: "Answers within 1 ring with natural Indian vocal cadence." },
    { num: "02", step: "Understand", text: "Extracts caller intent, pain urgency, and doctor preference." },
    { num: "03", step: "Act", text: "Locks OPD calendar slot and checks insurance boundary." },
    { num: "04", step: "Follow up", text: "Dispatches WhatsApp directions and clinic prep notes.", escalation: "Bring in a human" },
    { num: "05", step: "Learn", text: "Staff reviews edge cases to improve practice guidelines.", isLearn: true },
  ],
  whatsapp: [
    { num: "01", step: "Answer", text: "Instant sub-second greeting on official business WhatsApp." },
    { num: "02", step: "Understand", text: "Understands voice notes, PDFs, and multi-lingual text." },
    { num: "03", step: "Act", text: "Issues appointment barcode and reserves consultation slot." },
    { num: "04", step: "Follow up", text: "Sends automated 2-hour pre-visit checklist.", escalation: "Bring in a human" },
    { num: "05", step: "Learn", text: "Integrates patient feedback into knowledge base.", isLearn: true },
  ],
  web: [
    { num: "01", step: "Answer", text: "Interactive concierge greets high-intent web visitors." },
    { num: "02", step: "Understand", text: "Qualifies commercial scope, location, and urgency." },
    { num: "03", step: "Act", text: "Routes verified brief to designated relationship partner." },
    { num: "04", step: "Follow up", text: "Syncs lead telemetry with enterprise CRM.", escalation: "Bring in a human" },
    { num: "05", step: "Learn", text: "Refines conversion scoring with sales feedback.", isLearn: true },
  ],
};

const TRANSCRIPTS: Record<ChannelId, { from: "caller" | "ai"; text: string }[]> = {
  voice: [
    { from: "caller", text: "Hello, I want to book an appointment with a dermatologist." },
    { from: "ai", text: "Sure! May I know your preferred date and time?" },
    { from: "caller", text: "Tomorrow morning works." },
    { from: "ai", text: "Your appointment is confirmed for tomorrow at 10:30 AM. I've also sent you the clinic location on WhatsApp." },
  ],
  whatsapp: [
    { from: "caller", text: "Hi, do you have any slots open this week for a check-up?" },
    { from: "ai", text: "Yes! We have Wednesday 4 PM and Friday 11 AM open." },
    { from: "caller", text: "Friday 11 AM works for me." },
    { from: "ai", text: "Booked! I've sent the address and prep instructions here on WhatsApp." },
  ],
  web: [
    { from: "caller", text: "I'd like to know your consultation pricing." },
    { from: "ai", text: "Our general consultation starts at ₹500. Would you like to book a slot?" },
    { from: "caller", text: "Yes, please." },
    { from: "ai", text: "Great — I've reserved a slot and sent confirmation to your email." },
  ],
};

const CHANNEL_META: Record<ChannelId, { icon: typeof PhoneCall; live: string; handle: string }> = {
  voice: { icon: PhoneCall, live: "Live Call", handle: "+91 98765 43210" },
  whatsapp: { icon: MessageSquare, live: "Live Chat", handle: "+91 90000 12345" },
  web: { icon: Globe, live: "Live Session", handle: "Web Visitor · Mumbai" },
};

// Real WhatsApp green for the WhatsApp card, the site's existing chat-blue
// for Web — each channel gets its own accent instead of the call card
// always rendering as a phone call regardless of which tab is active.
const CHANNEL_VISUAL: Record<ChannelId, { accent: string; glow: string }> = {
  voice: { accent: "var(--green)", glow: "var(--green-glow-strong)" },
  whatsapp: { accent: "#25D366", glow: "rgba(37, 211, 102, 0.35)" },
  web: { accent: "#3B6FE0", glow: "rgba(59, 111, 224, 0.3)" },
};

const METRICS = [
  { icon: Clock, value: 30, suffix: "s", label: "Average answer time" },
  { icon: Target, value: 92, suffix: "%", label: "Intent captured" },
  { icon: TrendingUp, value: 3, suffix: "x", label: "More bookings" },
];

const SPARK_PATHS = [
  "M2 16 C 10 8, 18 20, 26 12 S 42 4, 50 10",
  "M2 14 C 10 18, 18 6, 26 14 S 42 18, 50 6",
  "M2 12 C 10 4, 18 18, 26 8 S 42 16, 50 4",
];

function useLiveTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s + 1) % 3600), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function HP03ConversationMoves() {
  const [selectedChannel, setSelectedChannel] = useState<ChannelId>("voice");
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(1);
  const timer = useLiveTimer();

  const currentSteps = channelExamples[selectedChannel];
  const transcript = TRANSCRIPTS[selectedChannel];
  const meta = CHANNEL_META[selectedChannel];
  const visual = CHANNEL_VISUAL[selectedChannel];
  const HeaderIcon = meta.icon;

  useEffect(() => {
    setVisibleMessages(1);
    const id = setInterval(() => {
      setVisibleMessages((v) => (v >= transcript.length ? 1 : v + 1));
    }, 2200);
    return () => clearInterval(id);
  }, [selectedChannel, transcript.length]);

  return (
    <section
      id="hp-03"
      className="hp03-section-pad"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        <div
          style={{
            fontFamily: "'SF Mono', 'Menlo', monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "24px",
          }}
        >
          CALL LOG · TRANSCRIPT · HOW A CONVERSATION MOVES
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "20px" }}>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(38px, 4.5vw, 58px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--text-ivory)",
              margin: 0,
            }}
          >
            From hello to an <span style={{ color: "var(--green)" }}>outcome.</span>
          </h2>

          <div style={{ display: "flex", gap: "8px" }}>
            {CHANNELS.map((ch) => {
              const Icon = ch.icon;
              const active = selectedChannel === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => { setSelectedChannel(ch.id); setActiveIdx(0); }}
                  className="hp03-channel-btn"
                  style={{
                    background: active ? "var(--green-glow)" : "var(--surface)",
                    color: active ? "var(--green)" : "var(--text-muted)",
                    border: `1px solid ${active ? "var(--border-green)" : "var(--border)"}`,
                  }}
                >
                  <Icon size={13} />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p style={{ fontSize: "clamp(16px, 1.3vw, 19px)", color: "var(--text-muted)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "48px" }}>
          Your Digital Receptionist does more than answer. It keeps the conversation moving.
        </p>

        <div className="hp03-layout">
          {/* Left — the numbered stepper, restyled as cards on a connecting line */}
          <div className="hp03-steps">
            <div className="hp03-steps-line" />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedChannel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="hp03-steps-list"
              >
                {currentSteps.map((s, idx) => {
                  const Icon = STEP_ICONS[idx];
                  const isActive = idx === activeIdx;
                  return (
                    <motion.div
                      key={s.num}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className="hp03-step-row"
                      onMouseEnter={() => setActiveIdx(idx)}
                    >
                      <div className="hp03-step-node" style={{
                        background: isActive ? "var(--green)" : "var(--surface)",
                        borderColor: isActive ? "var(--green)" : "var(--border2)",
                      }}>
                        <span style={{ color: isActive ? "#fff" : "var(--text-dim)" }}>{s.num}</span>
                      </div>
                      <Card className="hp03-step-card">
                        <CardContent className="flex items-center gap-4">
                          <span className="hp03-step-icon">
                            <Icon size={18} />
                          </span>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div className="hp03-step-title">{s.step}</div>
                            <div className="hp03-step-text">{s.text}</div>
                            {s.escalation && (
                              <Badge variant="destructive" className="hp03-step-badge">{s.escalation}</Badge>
                            )}
                            {s.isLearn && (
                              <Badge className="hp03-step-badge hp03-step-badge-green">Hello was only the beginning.</Badge>
                            )}
                          </div>
                          <ArrowRight size={16} className="hp03-step-arrow" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="hp03-cta-row">
              <a href="/contact" className="hp03-cta-btn">
                See it in action <ArrowRight size={15} />
              </a>
              <a href="#professions" className="hp03-watch-link">
                <span className="hp03-watch-play"><Play size={12} fill="currentColor" /></span>
                <span>
                  <span className="hp03-watch-title">Watch a conversation move</span>
                  <span className="hp03-watch-sub">Real calls. Real outcomes.</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right — the live product visual: a call card, a transcript, and outcome metrics */}
          <div className="hp03-visual">
            <div className="hp03-visual-bg" aria-hidden />

            <div className="hp03-visual-top">
              <motion.div
                key={`call-${selectedChannel}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="hp03-call-card"
              >
                <Card>
                  <CardContent className="flex flex-col gap-4">
                    <div className="hp03-call-head">
                      <span className="hp03-live-dot" style={{ background: visual.accent }} />
                      <span className="hp03-live-label">{meta.live}</span>
                      <span className="hp03-live-timer">{timer}</span>
                    </div>

                    {selectedChannel === "voice" ? (
                      <div className="hp03-waveform">
                        {Array.from({ length: 22 }).map((_, i) => (
                          <motion.span
                            key={i}
                            className="hp03-wave-bar"
                            initial={{ scaleY: 0.3 }}
                            animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.9 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                          />
                        ))}
                      </div>
                    ) : selectedChannel === "whatsapp" ? (
                      <div className="hp03-status-row">
                        <MessageSquare size={13} style={{ color: visual.accent }} />
                        <span>Message delivered</span>
                        <CheckCheck size={15} style={{ color: "#53BDEB", marginLeft: "auto" }} />
                      </div>
                    ) : (
                      <div className="hp03-status-row">
                        <Globe size={13} style={{ color: visual.accent }} />
                        <span>Browsing your website</span>
                        <span className="hp03-typing-dots"><i /><i /><i /></span>
                      </div>
                    )}

                    <div className="hp03-call-center">
                      <div className="hp03-call-ring-wrap">
                        {selectedChannel === "voice" ? (
                          <motion.span
                            className="hp03-call-ring"
                            style={{ borderColor: visual.accent }}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                          />
                        ) : (
                          <motion.span
                            className="hp03-call-ring hp03-call-ring-static"
                            style={{ borderColor: visual.accent }}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.35 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                        <span className="hp03-call-btn" style={{ background: visual.accent, boxShadow: `0 12px 24px -8px ${visual.glow}` }}><HeaderIcon size={24} /></span>
                      </div>
                      <div className="hp03-call-number">{meta.handle}</div>
                      <div className="hp03-call-sub">Incoming {selectedChannel === "voice" ? "call" : selectedChannel === "whatsapp" ? "message" : "visitor"}</div>
                    </div>

                    <div className="hp03-call-controls">
                      {selectedChannel === "voice" ? (
                        <>
                          <span className="hp03-ctrl-btn"><Mic size={16} /></span>
                          <span className="hp03-ctrl-btn hp03-ctrl-end"><PhoneOff size={18} /></span>
                          <span className="hp03-ctrl-btn"><MoreHorizontal size={16} /></span>
                        </>
                      ) : selectedChannel === "whatsapp" ? (
                        <>
                          <span className="hp03-ctrl-btn"><Check size={16} /></span>
                          <span className="hp03-ctrl-btn hp03-ctrl-primary" style={{ background: visual.accent }}><Send size={16} /></span>
                          <span className="hp03-ctrl-btn"><MoreHorizontal size={16} /></span>
                        </>
                      ) : (
                        <>
                          <span className="hp03-ctrl-btn"><FileText size={16} /></span>
                          <span className="hp03-ctrl-btn hp03-ctrl-primary" style={{ background: visual.accent }}><MessageSquare size={16} /></span>
                          <span className="hp03-ctrl-btn"><MoreHorizontal size={16} /></span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="hp03-chat-card"
              >
                <Card>
                  <CardContent className="hp03-chat-content">
                    {transcript.map((m, i) => (
                      <AnimatePresence key={i} mode="popLayout">
                        {i < visibleMessages && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="hp03-chat-row"
                          >
                            <span className="hp03-chat-dot" style={{ background: m.from === "ai" ? "var(--green)" : "var(--text-dim)" }} />
                            <div className={`hp03-chat-bubble ${m.from === "ai" ? "is-ai" : ""}`}>
                              <div className="hp03-chat-from">
                                {m.from === "ai" && <Bot size={11} />}
                                {m.from === "ai" ? "AI Receptionist" : "Caller"}
                              </div>
                              <div className="hp03-chat-text">{m.text}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="hp03-metrics-row">
              {METRICS.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <Card className="hp03-metric-card">
                      <CardContent className="flex flex-col gap-2">
                        <span className="hp03-metric-icon"><Icon size={14} /></span>
                        <div className="hp03-metric-value">
                          <CountingNumber number={m.value} inView inViewOnce transition={{ stiffness: 90, damping: 40 }} />{m.suffix}
                        </div>
                        <div className="hp03-metric-label">{m.label}</div>
                        <svg viewBox="0 0 52 20" className="hp03-metric-spark" aria-hidden>
                          <path d={SPARK_PATHS[i]} fill="none" stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className={`hp03-annotation ${caveat.className}`}>
              Conversations<br />that care.
              <svg width="60" height="46" viewBox="0 0 60 46" className="hp03-annotation-arrow" aria-hidden>
                <motion.path
                  d="M4 4 C 20 8, 34 18, 40 34 C 42 39, 44 42, 48 43"
                  fill="none" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                <path d="M42 36 L 48 43 L 54 35" fill="none" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hp03-section-pad { padding: 130px 40px 110px; }

        .hp03-channel-btn {
          display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px;
          font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;
        }

        .hp03-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }

        /* Steps */
        .hp03-steps { position: relative; }
        .hp03-steps-line {
          position: absolute; top: 20px; bottom: 76px; left: 19px;
          width: 2px; background: var(--border2);
        }
        .hp03-steps-list { display: flex; flex-direction: column; gap: 14px; }
        .hp03-step-row { display: grid; grid-template-columns: 40px 1fr; gap: 16px; align-items: flex-start; position: relative; }
        .hp03-step-node {
          position: relative; z-index: 1;
          width: 40px; height: 40px; border-radius: 50%; border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12.5px; font-weight: 700;
          transition: all 0.25s ease;
          margin-top: 6px;
        }
        .hp03-step-card {
          box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 20px 36px -28px rgba(11, 15, 13, 0.35);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .hp03-step-row:hover .hp03-step-card { transform: translateY(-1px); border-color: var(--border2); }
        .hp03-step-icon {
          width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .hp03-step-title { font-size: 16px; font-weight: 700; color: var(--text-ivory); }
        .hp03-step-text { font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin-top: 3px; }
        .hp03-step-badge { display: inline-flex; margin-top: 8px; font-size: 11px; }
        .hp03-step-badge-green { background: var(--green-glow); color: var(--green); }
        .hp03-step-arrow { color: var(--text-dim); flex-shrink: 0; }

        .hp03-cta-row { display: flex; align-items: center; gap: 22px; margin-top: 28px; flex-wrap: wrap; }
        .hp03-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 13.5px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .hp03-cta-btn:hover { transform: translateY(-2px); }
        .hp03-watch-link { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .hp03-watch-play {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border2); color: var(--text-ivory);
        }
        .hp03-watch-title { display: block; font-size: 13.5px; font-weight: 700; color: var(--text-ivory); }
        .hp03-watch-sub { display: block; font-size: 12px; color: var(--text-dim); margin-top: 1px; }

        /* Visual */
        .hp03-visual { position: relative; }
        .hp03-visual-bg {
          position: absolute; top: -60px; right: -60px; width: 340px; height: 340px;
          background: radial-gradient(circle, var(--green-glow) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .hp03-visual-top { position: relative; display: grid; grid-template-columns: 1fr 1.1fr; gap: 20px; }

        .hp03-call-head { display: flex; align-items: center; gap: 8px; }
        .hp03-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); animation: hp03Pulse 1.6s ease-in-out infinite; }
        @keyframes hp03Pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .hp03-live-label { font-size: 12.5px; font-weight: 700; color: var(--text-ivory); }
        .hp03-live-timer { margin-left: auto; font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; color: var(--text-dim); }

        .hp03-waveform { display: flex; align-items: center; gap: 2.5px; height: 28px; }
        .hp03-wave-bar { display: block; width: 3px; height: 100%; border-radius: 2px; background: var(--green-luminous); transform-origin: center; }

        .hp03-status-row { display: flex; align-items: center; gap: 7px; height: 28px; font-size: 12.5px; color: var(--text-muted); }
        .hp03-typing-dots { display: inline-flex; gap: 3px; margin-left: auto; }
        .hp03-typing-dots i { width: 5px; height: 5px; border-radius: 50%; background: var(--text-dim); display: block; animation: hp03TypingDot 1.2s ease-in-out infinite; }
        .hp03-typing-dots i:nth-child(2) { animation-delay: 0.15s; }
        .hp03-typing-dots i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes hp03TypingDot { 0%, 60%, 100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }

        .hp03-call-center { display: flex; flex-direction: column; align-items: center; padding: 8px 0; }
        .hp03-call-ring-wrap { position: relative; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; }
        .hp03-call-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--green); }
        .hp03-call-btn {
          position: relative; width: 60px; height: 60px; border-radius: 50%;
          background: var(--green); color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 12px 24px -8px var(--green-glow-strong);
        }
        .hp03-call-number { margin-top: 12px; font-size: 15px; font-weight: 700; color: var(--text-ivory); }
        .hp03-call-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

        .hp03-call-controls { display: flex; align-items: center; justify-content: center; gap: 14px; }
        .hp03-ctrl-btn {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--surface2); color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .hp03-ctrl-end { background: var(--coral); color: #fff; border-color: var(--coral); }
        .hp03-ctrl-primary { color: #fff; border-color: transparent; }

        .hp03-chat-content { display: flex; flex-direction: column; gap: 12px; min-height: 220px; }
        .hp03-chat-row { display: flex; gap: 8px; align-items: flex-start; }
        .hp03-chat-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
        .hp03-chat-bubble {
          flex: 1; min-width: 0;
          background: var(--surface2);
          border-radius: 12px;
          padding: 9px 12px;
        }
        .hp03-chat-bubble.is-ai { background: var(--green-glow); }
        .hp03-chat-from { display: flex; align-items: center; gap: 4px; font-size: 10.5px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.04em; }
        .hp03-chat-bubble.is-ai .hp03-chat-from { color: var(--green); }
        .hp03-chat-text { font-size: 13px; color: var(--text-ivory); line-height: 1.45; margin-top: 3px; }

        .hp03-metrics-row { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 20px; }
        .hp03-metric-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .hp03-metric-value { font-size: 20px; font-weight: 700; color: var(--text-ivory); font-family: 'SF Mono', 'Menlo', monospace; }
        .hp03-metric-label { font-size: 11px; color: var(--text-muted); line-height: 1.3; }
        .hp03-metric-spark { width: 100%; height: 18px; margin-top: 2px; opacity: 0.7; }

        .hp03-annotation {
          position: relative;
          margin-top: 18px;
          text-align: right;
          font-size: 22px; line-height: 1.15; color: var(--text-muted);
        }
        .hp03-annotation-arrow { display: inline-block; margin-left: 8px; vertical-align: -14px; }

        @media (max-width: 980px) {
          .hp03-layout { grid-template-columns: 1fr; gap: 48px; }
          .hp03-visual-top { grid-template-columns: 1fr; }
        }

        @media (max-width: 700px) {
          .hp03-section-pad { padding: 56px 20px 40px !important; }
          .hp03-metrics-row { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .hp03-cta-row { flex-direction: column; align-items: stretch; }
          .hp03-cta-btn { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
