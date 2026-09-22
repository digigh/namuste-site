"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Caveat } from "next/font/google";
import {
  Play,
  Pause,
  RotateCcw,
  Phone,
  Zap,
  MessageCircle,
  Signal,
  Wifi,
  BatteryFull,
  MoreHorizontal,
  Plus,
  Mic,
  CheckCheck,
  Sparkles,
} from "lucide-react";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const WAVE_BARS = 48;

const PILLS = [
  { icon: Phone, title: "Understands", sub: "natural speech" },
  { icon: Zap, title: "Adapts", sub: "in real time" },
  { icon: MessageCircle, title: "Feels human,", sub: "not robotic" },
];

export default function MessyConversationPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);

  // Deterministic bar heights (same integer-hash technique as the hero
  // waveform) — never Math.random, which would mismatch between server and
  // client render and break hydration.
  const bars = useMemo(
    () =>
      Array.from({ length: WAVE_BARS }, (_, i) => {
        let x = (i + 1) * 2654435761;
        x = (x ^ (x >>> 13)) >>> 0;
        x = (x * 2246822519) >>> 0;
        x = (x ^ (x >>> 15)) >>> 0;
        return 0.15 + (x / 4294967295) * 0.85;
      }),
    []
  );

  const steps = [
    {
      time: "0:02",
      speaker: "Caller",
      type: "caller",
      text: "Yeah hi... uh, I wanted to check if Dr. Mehta is available on Wednesday afternoon... wait, no, actually my mom said Thursday is better, around 5?",
      annotation: "Mid-sentence self-correction: Wednesday → Thursday 5:00 PM",
      tag: "Correction Handled",
    },
    {
      time: "0:07",
      speaker: "Namuste",
      type: "assistant",
      text: "Namuste. Thursday at 5:00 PM is open. Dr. Mehta has both 5:00 PM and 5:45 PM available. Which works best for her?",
      annotation: "Grasped corrected intent without confusion or repeating discarded date",
      tag: "Intent Understood",
    },
    {
      time: "0:12",
      speaker: "Caller",
      type: "caller",
      text: "Wait, sorry—can you also check if her cardiac echo reports need to be brought along, or can we send them online?",
      annotation: "Mid-flow interruption & secondary clinical query parsed seamlessly",
      tag: "Interruption Parsed",
    },
    {
      time: "0:18",
      speaker: "Namuste",
      type: "assistant",
      text: "You can easily upload her echo reports to our secure WhatsApp link before the visit, or bring physical copies. I have locked Thursday, 5:00 PM for her. I am texting the upload link now.",
      annotation: "Resolved booking + document requirements in a single fluid turn",
      tag: "Multi-Intent Resolved",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        const next = prev + 1.25;
        setCurrentStepIndex(next < 25 ? 0 : next < 50 ? 1 : next < 75 ? 2 : 3);
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setPlaybackProgress(0);
  };

  const handlePlayToggle = () => {
    if (playbackProgress >= 100) {
      setPlaybackProgress(0);
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const activeStep = steps[currentStepIndex];

  return (
    <div className="mcp-layout">
      {/* Left — headline, transport controls, waveform, live tag, pills */}
      <div className="mcp-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mcp-eyebrow">
            <span className="mcp-eyebrow-dot" />
            ACOUSTIC INTELLIGENCE
            <span className="mcp-eyebrow-rule" />
          </div>
          <h2 className="mcp-headline">
            Real conversations do not read scripts.{" "}
            <span style={{ color: "var(--green)" }}>Namuste simply keeps up.</span>
          </h2>
          <p className="mcp-desc">
            Handles human pauses, interruptions, and mid-sentence intent changes with sub-200ms acoustic responsiveness.
          </p>
        </motion.div>

        <div className="mcp-controls">
          <button onClick={handlePlayToggle} className="mcp-play-btn">
            {isPlaying ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
            <span>{isPlaying ? "Pause" : "Play the conversation"}</span>
          </button>
          <button onClick={handleReset} className="mcp-reset-btn" title="Reset">
            <RotateCcw size={13} />
            <span>Replay</span>
          </button>
        </div>

        {/* A real waveform illustration standing in for the audio itself — bars
            lit up as playback crosses them, animating while playing. */}
        <div className="mcp-waveform" aria-hidden>
          {bars.map((h, i) => {
            const isLit = (i / WAVE_BARS) * 100 <= playbackProgress;
            return (
              <span
                key={i}
                className={`mcp-wave-bar ${isPlaying ? "is-live" : ""}`}
                style={{
                  height: `${h * 100}%`,
                  background: isLit ? "var(--green-luminous)" : "var(--border2)",
                  animationDuration: `${0.6 + h}s`,
                  animationDelay: `${i * 0.02}s`,
                }}
              />
            );
          })}
        </div>
        <div className="mcp-time-row">
          <span>00:00</span>
          <span>01:12</span>
        </div>

        <div className="mcp-live-tag-slot">
          <AnimatePresence mode="wait">
            {isPlaying && activeStep && (
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mcp-live-tag"
              >
                <span className="mcp-live-tag-badge">{activeStep.tag}</span>
                <span className="mcp-live-tag-text">{activeStep.annotation}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mcp-pills">
          {PILLS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div className="mcp-pill" key={i}>
                <span className="mcp-pill-icon">
                  <Icon size={15} />
                </span>
                <span className="mcp-pill-text">
                  <strong>{p.title}</strong>
                  <br />
                  {p.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right — a real phone mockup carrying the same transcript as chat bubbles */}
      <div className="mcp-right">
        <div className="mcp-phone-glow mcp-phone-glow-a" aria-hidden />
        <div className="mcp-phone-glow mcp-phone-glow-b" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mcp-phone"
        >
          <div className="mcp-phone-notch" />
          <div className="mcp-phone-status">
            <span>9:41</span>
            <span className="mcp-phone-status-icons">
              <Signal size={12} />
              <Wifi size={12} />
              <BatteryFull size={15} />
            </span>
          </div>

          <div className="mcp-phone-header">
            <span className="mcp-phone-avatar">
              <Sparkles size={14} />
            </span>
            <div className="mcp-phone-header-text">
              <div className="mcp-phone-name">Sunrise Clinic</div>
              <div className="mcp-phone-sub">AI Receptionist</div>
            </div>
            <span className="mcp-phone-icon-btn"><Phone size={13} /></span>
            <span className="mcp-phone-icon-btn"><MoreHorizontal size={13} /></span>
          </div>

          <div className="mcp-phone-body">
            <div className="mcp-phone-date">Today</div>
            {steps.map((step, idx) => {
              const isAssistant = step.type === "assistant";
              const isActive = isPlaying && currentStepIndex === idx;
              return (
                <motion.div
                  key={idx}
                  animate={{ opacity: isPlaying && !isActive ? 0.5 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`mcp-phone-msg ${isAssistant ? "is-ai" : ""}`}
                >
                  <div className="mcp-phone-bubble">
                    <p>{step.text}</p>
                    <span className="mcp-phone-time">
                      {step.time}
                      {isAssistant && <CheckCheck size={12} className="mcp-phone-check" />}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mcp-phone-input">
            <span className="mcp-phone-plus"><Plus size={15} /></span>
            <span className="mcp-phone-placeholder">Type a message...</span>
            <span className="mcp-phone-mic"><Mic size={14} /></span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`mcp-annotation ${caveat.className}`}
        >
          A real conversation.<br />On your terms.
          <svg width="60" height="14" viewBox="0 0 60 14" className="mcp-annotation-underline" aria-hidden>
            <motion.path
              d="M2 8 C 16 2, 34 2, 58 9"
              fill="none" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            />
          </svg>
        </motion.div>
      </div>

      <style>{`
        .mcp-layout {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 56px;
          align-items: center;
        }

        .mcp-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px;
          letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 18px;
        }
        .mcp-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .mcp-eyebrow-rule { flex: 1; max-width: 60px; height: 1px; background: var(--border2); }
        .mcp-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 3.8vw, 50px);
          line-height: 1.08; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 16px;
        }
        .mcp-desc { color: var(--text-muted); font-size: 15.5px; line-height: 1.65; margin: 0 0 36px; max-width: 480px; }

        .mcp-controls { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
        .mcp-play-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--text-ivory); color: var(--bg);
          border: none; border-radius: 999px; padding: 13px 24px;
          font-size: 13.5px; font-weight: 700; cursor: pointer;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.15s ease;
        }
        .mcp-play-btn:hover { transform: translateY(-1px); }
        .mcp-reset-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none; padding: 6px 4px;
          color: var(--text-muted); font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .mcp-reset-btn svg { width: 32px; height: 32px; padding: 8px; border-radius: 50%; background: var(--overlay-1); border: 1px solid var(--border); box-sizing: border-box; }

        .mcp-waveform { display: flex; align-items: center; gap: 2px; height: 56px; }
        .mcp-wave-bar { flex: 1; min-width: 2px; border-radius: 2px; transform-origin: center; transition: background 0.3s ease; }
        .mcp-wave-bar.is-live { animation-name: mcpWaveBreathe; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes mcpWaveBreathe { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.5); } }
        .mcp-time-row { display: flex; justify-content: space-between; font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; color: var(--text-dim); margin-top: 8px; }

        .mcp-live-tag-slot { min-height: 46px; margin-top: 18px; }
        .mcp-live-tag {
          display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
          padding: 10px 14px; border-radius: 10px;
          background: var(--green-glow); border: 1px solid var(--border-green);
        }
        .mcp-live-tag-badge { font-size: 10.5px; font-weight: 700; color: var(--green); white-space: nowrap; }
        .mcp-live-tag-text { font-size: 12px; color: var(--text-muted); }

        .mcp-pills { display: flex; gap: 22px; margin-top: 22px; flex-wrap: wrap; }
        .mcp-pill { display: flex; align-items: center; gap: 10px; }
        .mcp-pill-icon {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .mcp-pill-text { font-size: 12.5px; color: var(--text-muted); line-height: 1.4; }
        .mcp-pill-text strong { color: var(--text-ivory); font-weight: 700; }

        /* Phone mockup */
        .mcp-right { position: relative; display: flex; align-items: center; justify-content: center; padding: 20px 0; }
        .mcp-phone-glow { position: absolute; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, var(--green-glow) 0%, transparent 70%); }
        .mcp-phone-glow-a { top: -10%; right: 5%; width: 320px; height: 320px; }
        .mcp-phone-glow-b { bottom: -5%; left: 0%; width: 260px; height: 260px; opacity: 0.7; }

        .mcp-phone {
          position: relative; z-index: 1;
          width: 300px; background: #0B0F0D; border-radius: 40px;
          padding: 14px 10px 10px; box-shadow: 0 40px 80px -30px rgba(11, 15, 13, 0.5), 0 0 0 2px rgba(255,255,255,0.04) inset;
          display: flex; flex-direction: column;
        }
        .mcp-phone-notch {
          position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
          width: 90px; height: 22px; border-radius: 999px; background: #000; z-index: 2;
        }
        .mcp-phone-status {
          display: flex; align-items: center; justify-content: space-between;
          padding: 4px 14px 10px; color: #fff; font-size: 12px; font-weight: 600;
        }
        .mcp-phone-status-icons { display: flex; align-items: center; gap: 4px; }
        .mcp-phone-header {
          display: flex; align-items: center; gap: 9px;
          background: var(--surface); border-radius: 16px 16px 0 0;
          padding: 10px 12px;
        }
        .mcp-phone-avatar {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .mcp-phone-header-text { flex: 1; min-width: 0; }
        .mcp-phone-name { font-size: 13px; font-weight: 700; color: var(--text-ivory); }
        .mcp-phone-sub { font-size: 10.5px; color: var(--text-muted); }
        .mcp-phone-icon-btn {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
        }
        .mcp-phone-body {
          background: var(--bg2); padding: 14px 10px; min-height: 340px; max-height: 420px; overflow-y: auto;
          display: flex; flex-direction: column; gap: 10px;
        }
        .mcp-phone-date {
          text-align: center; font-size: 10px; color: var(--text-dim);
          background: var(--overlay-1); border-radius: 999px; padding: 3px 10px;
          align-self: center; margin-bottom: 4px;
        }
        .mcp-phone-msg { display: flex; }
        .mcp-phone-msg.is-ai { justify-content: flex-end; }
        .mcp-phone-bubble {
          max-width: 82%; padding: 8px 11px; border-radius: 3px 14px 14px 14px;
          background: var(--surface); box-shadow: 0 1px 0.5px rgba(0,0,0,0.1);
        }
        .mcp-phone-msg.is-ai .mcp-phone-bubble { border-radius: 14px 3px 14px 14px; background: var(--green-glow); }
        .mcp-phone-bubble p { margin: 0; font-size: 12.5px; line-height: 1.42; color: var(--text-ivory); }
        .mcp-phone-time { display: flex; align-items: center; gap: 3px; justify-content: flex-end; margin-top: 4px; font-family: 'SF Mono', 'Menlo', monospace; font-size: 9px; color: var(--text-dim); }
        .mcp-phone-check { color: #53BDEB; }
        .mcp-phone-input {
          display: flex; align-items: center; gap: 8px;
          background: var(--surface); border-radius: 0 0 16px 16px;
          padding: 10px 12px;
        }
        .mcp-phone-plus, .mcp-phone-mic {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
        }
        .mcp-phone-mic { background: var(--green); color: #fff; }
        .mcp-phone-placeholder { flex: 1; font-size: 12px; color: var(--text-dim); background: var(--bg2); border-radius: 999px; padding: 7px 12px; }

        .mcp-annotation {
          position: absolute; right: -14px; bottom: 6%;
          font-size: 20px; line-height: 1.2; color: var(--text-muted); text-align: right;
          transform: rotate(-2deg); display: none;
        }
        .mcp-annotation-underline { display: block; margin-top: 4px; margin-left: auto; }

        @media (min-width: 1180px) {
          .mcp-annotation { display: block; right: -40px; }
        }

        @media (max-width: 980px) {
          .mcp-layout { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </div>
  );
}
