"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  Zap,
  BarChart3,
  CheckCircle2,
  Phone,
  PhoneOff,
  Mic,
  MoreHorizontal,
  FileText,
  Calendar,
  Check,
} from "lucide-react";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const FEATURES = [
  { icon: Zap, title: "Live in", sub: "48 hours" },
  { icon: BarChart3, title: "Multilingual", sub: "AI conversations" },
  { icon: CheckCircle2, title: "From call to", sub: "confirmed action" },
];

const PROCESS_WORDS = ["ANSWER", "UNDERSTAND", "BOOK", "FOLLOW UP"];

const TIMELINE = [
  { icon: Phone, title: "Call received", sub: "10:02 AM" },
  { icon: FileText, title: "Intent detected", sub: "Appointment booking" },
  { icon: Calendar, title: "Checked availability", sub: "Dr. Mehta" },
  { icon: Check, title: "Appointment confirmed", sub: "Thursday, 5:00 PM", done: true },
];

export default function ClosingCallToAction() {
  return (
    <section
      id="closing-cta"
      className="cta-section-pad"
      style={{ background: "var(--bg3)", borderTop: "1px solid var(--border-green)", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        <div className="cta-layout">
          {/* Left — the offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="cta-headline">
              Turn every customer call into an <span style={{ color: "var(--green)" }}>organised outcome.</span>
            </h2>
            <p className="cta-desc">
              Schedule a 20-minute tailored consultation to hear Namuste speak with your custom business knowledge and test live multilingual calls.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-btn-primary">
                Book a Live Consultation <ArrowRight size={16} />
              </Link>
              <Link href="#hp-03" className="cta-btn-secondary">
                Explore Demo
              </Link>
            </div>
            <div className="cta-features">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div className="cta-feature" key={i}>
                    <span className="cta-feature-icon"><Icon size={16} /></span>
                    <span className="cta-feature-text">
                      <strong>{f.title}</strong>
                      <br />
                      {f.sub}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — the proof: process, a live call, an outcome timeline */}
          <div className="cta-visual">
            <div className="cta-visual-glow" aria-hidden />

            <div className="cta-annotation-slot">
              <div className={`cta-annotation ${caveat.className}`}>
                More calls.<br />More outcomes.
              </div>
            </div>

            <div className="cta-arch-phone-wrap">
              <div className="cta-arch" aria-hidden>
                {PROCESS_WORDS.map((w) => <span key={w}>{w}</span>)}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="cta-phone"
              >
                <div className="cta-phone-notch" />
                <div className="cta-phone-status">
                  <span className="cta-phone-live-dot" /> Incoming call
                </div>
                <div className="cta-phone-center">
                  <div className="cta-phone-ring-wrap">
                    <motion.span
                      className="cta-phone-ring"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <span className="cta-phone-btn"><Phone size={20} /></span>
                  </div>
                  <div className="cta-phone-name">Sunrise Clinic</div>
                  <div className="cta-phone-timer">00:24</div>
                </div>
                <div className="cta-phone-wave" aria-hidden>
                  {Array.from({ length: 22 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="cta-phone-wave-bar"
                      initial={{ scaleY: 0.3 }}
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
                    />
                  ))}
                </div>
                <div className="cta-phone-controls">
                  <span className="cta-phone-ctrl"><Mic size={14} /><em>Mute</em></span>
                  <span className="cta-phone-ctrl cta-phone-ctrl-end"><PhoneOff size={16} /><em>End</em></span>
                  <span className="cta-phone-ctrl"><MoreHorizontal size={14} /><em>More</em></span>
                </div>
              </motion.div>
            </div>

            <div className="cta-timeline">
              {TIMELINE.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={i}
                    className={`cta-timeline-item ${t.done ? "is-done" : ""}`}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="cta-timeline-icon"><Icon size={14} /></span>
                    <span className="cta-timeline-text">
                      <span className="cta-timeline-title">{t.title}</span>
                      <span className="cta-timeline-sub">{t.sub}</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="cta-footcaption">
              <span className="cta-footcaption-rule" />
              REAL CONVERSATIONS.<br />REAL BUSINESS IMPACT.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section-pad { padding: 120px 40px; }

        .cta-layout { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 56px; align-items: center; }

        .cta-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4.4vw, 58px);
          line-height: 1.05; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 20px;
        }
        .cta-desc { color: var(--text-muted); font-size: 16px; line-height: 1.65; margin: 0 0 32px; max-width: 500px; }

        .cta-buttons { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 30px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 15px; font-weight: 700; text-decoration: none;
          box-shadow: 0 14px 28px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .cta-btn-primary:hover { transform: translateY(-2px); }
        .cta-btn-secondary {
          display: inline-flex; align-items: center;
          padding: 16px 30px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 15px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .cta-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .cta-features { display: flex; gap: 26px; flex-wrap: wrap; }
        .cta-feature { display: flex; align-items: center; gap: 10px; }
        .cta-feature-icon {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .cta-feature-text { font-size: 12.5px; color: var(--text-muted); line-height: 1.4; }
        .cta-feature-text strong { color: var(--text-ivory); font-weight: 700; }

        /* Right visual */
        .cta-visual { position: relative; display: flex; align-items: center; justify-content: center; gap: 30px; min-height: 480px; padding: 30px 0; }
        .cta-visual-glow {
          position: absolute; top: -10%; left: 10%; width: 420px; height: 420px;
          background: radial-gradient(circle, var(--green-glow) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }

        .cta-annotation-slot { position: absolute; top: -6px; right: 0; z-index: 2; }
        .cta-annotation { font-size: 22px; line-height: 1.2; color: var(--green); text-align: right; transform: rotate(-3deg); }

        .cta-arch-phone-wrap { position: relative; width: 280px; height: 420px; flex-shrink: 0; z-index: 1; }
        .cta-arch {
          position: absolute; inset: 0; border-radius: 50% 50% 18px 18px;
          background: linear-gradient(160deg, var(--surface3), var(--surface2));
          border: 1px solid var(--border);
          padding: 130px 26px 0;
          display: flex; flex-direction: column; gap: 14px;
        }
        .cta-arch span {
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; color: var(--text-dim);
        }

        .cta-phone {
          position: absolute; bottom: -16px; right: -30px; z-index: 2;
          width: 190px; background: #0B0F0D; border-radius: 30px;
          padding: 12px 8px 8px; box-shadow: 0 30px 60px -24px rgba(11, 15, 13, 0.55);
          display: flex; flex-direction: column;
        }
        .cta-phone-notch { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 60px; height: 15px; border-radius: 999px; background: #000; }
        .cta-phone-status {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin-top: 24px; color: #fff; font-size: 10.5px; font-weight: 600;
        }
        .cta-phone-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-luminous); animation: ctaPulseDot 1.6s ease-in-out infinite; }
        @keyframes ctaPulseDot { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

        .cta-phone-center { display: flex; flex-direction: column; align-items: center; padding: 14px 0 10px; }
        .cta-phone-ring-wrap { position: relative; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; }
        .cta-phone-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--green); }
        .cta-phone-btn {
          position: relative; width: 46px; height: 46px; border-radius: 50%;
          background: var(--green); color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 20px -8px var(--green-glow-strong);
        }
        .cta-phone-name { margin-top: 10px; font-size: 12.5px; font-weight: 700; color: #fff; }
        .cta-phone-timer { font-size: 10.5px; color: rgba(255,255,255,0.55); margin-top: 1px; font-family: 'SF Mono', 'Menlo', monospace; }

        .cta-phone-wave { display: flex; align-items: center; justify-content: center; gap: 2px; height: 22px; padding: 0 10px; }
        .cta-phone-wave-bar { width: 2.5px; height: 100%; border-radius: 2px; background: var(--green-luminous); transform-origin: center; }

        .cta-phone-controls { display: flex; align-items: center; justify-content: center; gap: 14px; padding: 12px 0 4px; }
        .cta-phone-ctrl { display: inline-flex; flex-direction: column; align-items: center; gap: 3px; }
        .cta-phone-ctrl svg { width: 26px; height: 26px; padding: 6px; border-radius: 50%; background: rgba(255,255,255,0.1); box-sizing: border-box; color: #fff; }
        .cta-phone-ctrl-end svg { background: var(--coral); }
        .cta-phone-ctrl em { font-style: normal; font-size: 8.5px; color: rgba(255,255,255,0.55); }

        .cta-timeline { display: flex; flex-direction: column; gap: 12px; width: 232px; flex-shrink: 0; position: relative; z-index: 1; }
        .cta-timeline-item {
          display: flex; align-items: center; gap: 10px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; padding: 11px 13px;
          box-shadow: 0 10px 22px -16px rgba(11, 15, 13, 0.35);
        }
        .cta-timeline-item.is-done { background: var(--green-glow); border-color: var(--border-green); }
        .cta-timeline-icon {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--overlay-1); color: var(--text-muted);
        }
        .cta-timeline-item.is-done .cta-timeline-icon { background: var(--green); color: #fff; }
        .cta-timeline-text { display: flex; flex-direction: column; min-width: 0; }
        .cta-timeline-title { font-size: 12.5px; font-weight: 700; color: var(--text-ivory); }
        .cta-timeline-sub { font-size: 11px; color: var(--text-muted); margin-top: 1px; }

        .cta-footcaption {
          position: absolute; bottom: -10px; right: 0;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 10.5px; letter-spacing: 0.08em;
          color: var(--text-dim); text-align: right; line-height: 1.6;
        }
        .cta-footcaption-rule { display: block; width: 44px; height: 2px; background: var(--green); margin: 0 0 8px auto; }

        @media (max-width: 1180px) {
          .cta-annotation-slot { position: static; display: flex; justify-content: flex-end; margin-bottom: 12px; }
          .cta-footcaption { position: static; margin-top: 8px; text-align: center; }
          .cta-footcaption-rule { margin: 0 auto 8px; }
        }

        @media (max-width: 980px) {
          .cta-layout { grid-template-columns: 1fr; gap: 48px; }
          .cta-visual { flex-direction: column; }
        }

        @media (max-width: 600px) {
          .cta-section-pad { padding: 56px 20px !important; }
          .cta-buttons { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </section>
  );
}
