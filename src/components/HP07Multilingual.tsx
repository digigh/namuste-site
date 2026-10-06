"use client";

import React from "react";
import { ArrowRight, Globe, Mic, Zap, ArrowUpRight, Stethoscope } from "lucide-react";
import ClinicLiveAgent from "./ClinicLiveAgent";

export default function HP07Multilingual() {
  return (
    <section
      id="voice-engine-demo"
      className="hp07-section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        scrollMarginTop: "24px",
      }}
    >
      {/* Subtle ambient lighting behind section */}
      <div className="hp07-ambient-glow" aria-hidden="true" />

      <div className="hp07-container">
        {/* Top Eyebrow */}
        <div className="hp07-eyebrow-row">
          <div className="hp07-eyebrow-pill">
            <span className="hp07-eyebrow-pulse" />
            <span>LIVE PLAYGROUND</span>
          </div>
          <span className="hp07-eyebrow-sub">MULTILINGUAL VOICE &amp; CHAT ASSISTANTS</span>
        </div>

        {/* Hero Headline & Key Highlights */}
        <div className="hp07-header-grid">
          <div className="hp07-header-text">
            <h2 className="hp07-headline">
              Your customers will not always speak in one language.{" "}
              <span className="hp07-headline-gradient">Neither should your AI.</span>
            </h2>
            <p className="hp07-lead">
              Namuste understands accents, colloquial nuances, and real-time code-switching across 10+ Indian languages.
              Test our live voice and chat models across Healthcare, Luxury Salons, and Agriculture directly below.
            </p>
          </div>

          <div className="hp07-highlights">
            <div className="hp07-highlight-card">
              <div className="hp07-highlight-icon"><Mic size={16} /></div>
              <div>
                <div className="hp07-highlight-title">Sub-Second Voice</div>
                <div className="hp07-highlight-desc">Encrypted WebRTC streaming with interruption handling</div>
              </div>
            </div>
            <div className="hp07-highlight-card">
              <div className="hp07-highlight-icon"><Globe size={16} /></div>
              <div>
                <div className="hp07-highlight-title">Fluid Hinglish &amp; Dialects</div>
                <div className="hp07-highlight-desc">Switch naturally between languages mid-sentence</div>
              </div>
            </div>
            <div className="hp07-highlight-card">
              <div className="hp07-highlight-icon"><Zap size={16} /></div>
              <div>
                <div className="hp07-highlight-title">Live System Execution</div>
                <div className="hp07-highlight-desc">Real bookings, doctor schedules &amp; product triage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Agent Workspace (Clean luxury frame, no fake tablet notch) */}
        <div className="hp07-canvas" id="live-agent-module">
          <ClinicLiveAgent />
        </div>
      </div>

      <style>{`
        .hp07-section {
          padding: 88px 32px 96px;
          position: relative;
          overflow: hidden;
        }
        .hp07-ambient-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 380px;
          background: radial-gradient(ellipse at center, rgba(34, 197, 94, 0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .hp07-container {
          max-width: 1520px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .hp07-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .hp07-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 11px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.28);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--green);
          text-transform: uppercase;
        }
        .hp07-eyebrow-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: hp07Pulse 1.8s ease-in-out infinite;
        }
        @keyframes hp07Pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .hp07-eyebrow-sub {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .hp07-header-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.85fr;
          gap: 40px;
          align-items: flex-end;
          margin-bottom: 40px;
        }
        .hp07-header-text {
          max-width: 820px;
        }
        .hp07-headline {
          font-family: var(--font-sans);
          font-size: clamp(34px, 3.8vw, 56px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-ivory);
          margin: 0 0 16px;
        }
        .hp07-headline-gradient {
          color: var(--green);
          display: inline;
        }
        .hp07-lead {
          font-size: clamp(15px, 1.15vw, 17px);
          color: var(--text-muted);
          line-height: 1.62;
          margin: 0;
          max-width: 720px;
        }

        .hp07-highlights {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hp07-highlight-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          background: var(--surface2);
          border: 1px solid var(--border);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .hp07-highlight-card:hover {
          border-color: var(--border-green);
          background: rgba(34, 197, 94, 0.04);
        }
        .hp07-highlight-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--green-glow);
          color: var(--green);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .hp07-highlight-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-ivory);
        }
        .hp07-highlight-desc {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
          line-height: 1.35;
        }

        .hp07-canvas {
          position: relative;
          background: transparent;
          border-radius: 20px;
          margin-bottom: 0;
          scroll-margin-top: 80px;
          transition: box-shadow 0.4s ease;
        }
        .hp07-canvas.hp07-module-spotlight {
          animation: hp07ModuleGlow 1.8s ease-out;
        }
        @keyframes hp07ModuleGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);
          }
          40% {
            box-shadow: 0 0 40px 6px rgba(34, 197, 94, 0.25);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        @media (max-width: 1040px) {
          .hp07-header-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .hp07-highlights {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 10px;
          }
        }

        @media (max-width: 768px) {
          .hp07-section {
            padding: 56px 18px 60px;
            scroll-margin-top: 50px;
          }
          .hp07-header-grid {
            margin-bottom: 28px;
          }
          .hp07-highlights {
            grid-template-columns: 1fr;
          }
          .hp07-footer-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
