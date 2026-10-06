"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { openLeadModal } from "@/lib/openLeadModal";

const WAVEFORM_BARS = 72;

export default function HeroVisualExact() {
  const [answered, setAnswered] = useState(false);

  // Deterministic pseudo-random heights (not Math.random, and not Math.sin
  // of a large argument — trig of large inputs can differ by engine/platform
  // in its last bits, which is enough to break SSR/client hydration) so
  // server and client always compute the exact same array.
  const bars = useMemo(
    () =>
      Array.from({ length: WAVEFORM_BARS }, (_, i) => {
        let x = (i + 1) * 2654435761;
        x = (x ^ (x >>> 13)) >>> 0;
        x = (x * 2246822519) >>> 0;
        x = (x ^ (x >>> 15)) >>> 0;
        const frac = x / 4294967295;
        return 0.18 + frac * 0.82;
      }),
    []
  );

  return (
    <section
      className="hero-exact-section"
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div className="hero-exact-pad" style={{ maxWidth: "1520px", margin: "0 auto", width: "100%" }}>
        {/* Call-log eyebrow — sets the "this is a real call" frame for the whole hero */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'SF Mono', 'Menlo', monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span>CALL LOG · ENTRY 001 · OPD LINE</span>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: answered ? "var(--green-luminous)" : "var(--coral)", boxShadow: `0 0 8px ${answered ? "var(--green-luminous)" : "var(--coral)"}` }} />
            {answered ? "CONNECTED" : "RINGING"}
          </span>
        </div>

        {/* Sleek, integrated announcement chip (clean, elegant, no DOS, no heavy banner) */}
        <div style={{ marginBottom: "26px" }}>
          <button
            type="button"
            onClick={openLeadModal}
            className="hero-launch-chip"
          >
            <span className="hero-chip-badge">
              <Stethoscope size={13} />
              <span>DOCTORS &amp; CLINICS</span>
            </span>
            <span className="hero-chip-text">
              Special Launch: <strong>7-Day Free Trial</strong> with 100 free voice minutes
            </span>
            <span className="hero-chip-cta">
              <span>Claim Free Trial</span>
              <ArrowRight size={12} className="hero-chip-arrow" />
            </span>
          </button>
        </div>

        {/* Oversized editorial headline — dominates the viewport instead of sharing it with a visual column */}
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(48px, 8.4vw, 132px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            color: "var(--text-ivory)",
            margin: "0 0 36px",
          }}
        >
          Your customers<br />
          are calling. Is someone<br />
          <span style={{ color: "var(--green)" }}>always</span> answering?
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "56px" }}>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "var(--text-muted)", lineHeight: 1.55, maxWidth: "440px", margin: 0 }}>
            Every conversation deserves a <span style={{ color: "var(--green)", fontWeight: 600 }}>next step.</span>
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                setAnswered(true);
                // Snappy 180ms reaction so the click feels immediate, then a velvety smooth scroll directly to the module
                setTimeout(() => {
                  const target = document.getElementById("live-agent-module") || document.getElementById("voice-engine-demo");
                  if (target) {
                    const rect = target.getBoundingClientRect();
                    const currentY = window.pageYOffset || document.documentElement.scrollTop;
                    // Perfect landing: leaves 80px breathing room so the full module topbar & buttons are in view
                    const targetY = rect.top + currentY - 80;

                    const startY = currentY;
                    const diff = targetY - startY;
                    const duration = 750;
                    let startTime: number | null = null;

                    // Smooth easeInOutCubic curve
                    const easeInOutCubic = (t: number) =>
                      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

                    const step = (now: number) => {
                      if (!startTime) startTime = now;
                      const elapsed = now - startTime;
                      const progress = Math.min(elapsed / duration, 1);
                      window.scrollTo(0, startY + diff * easeInOutCubic(progress));

                      if (progress < 1) {
                        requestAnimationFrame(step);
                      } else {
                        target.classList.add("hp07-module-spotlight");
                        setTimeout(() => target.classList.remove("hp07-module-spotlight"), 2000);
                      }
                    };

                    requestAnimationFrame(step);
                  }
                }, 180);
              }}
              className="hero-cta-btn"
            >
              <span className="hero-cta-shine" />
              <span className="hero-cta-dot" />
              <span>{answered ? "Connected to Namuste" : "Answer it"}</span>
              <ArrowRight size={16} className="hero-cta-arrow" />
            </button>

            <a href="#problem-loss" style={{ color: "var(--text-body)", fontSize: "14.5px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              See what gets missed <span style={{ fontSize: "16px" }}>›</span>
            </a>
          </div>
        </div>

        {/* Full-bleed call-recording timeline — replaces the floating device/orb card
            with a single horizontal spine: a real waveform annotated with call-state
            markers that light up as the call progresses, edge to edge. */}
        <div className="hero-waveform-wrap">
          <div className="hero-waveform" aria-hidden>
            {bars.map((h, i) => {
              const litUpTo = answered ? WAVEFORM_BARS : Math.floor(WAVEFORM_BARS * 0.22);
              const isLit = i < litUpTo;
              return (
                <span
                  key={i}
                  className="hero-wave-bar"
                  style={{
                    height: `${h * 100}%`,
                    background: isLit ? "var(--green-luminous)" : "var(--border2)",
                    animationDuration: `${1.1 + h}s`,
                    animationDelay: `${i * 0.015}s`,
                  }}
                />
              );
            })}
          </div>

          <div className="hero-wave-markers">
            <div className={`hero-wave-marker ${!answered ? "is-active" : "is-done"}`}>
              <span className="hero-wave-marker-dot" />
              <span className="hero-wave-marker-time">0:00</span>
              <span className="hero-wave-marker-label">Ringing</span>
            </div>
            <div className={`hero-wave-marker ${answered ? "is-active" : ""}`}>
              <span className="hero-wave-marker-dot" />
              <span className="hero-wave-marker-time">0:01</span>
              <span className="hero-wave-marker-label">Answered</span>
            </div>
            <div className={`hero-wave-marker ${answered ? "is-active" : ""}`}>
              <span className="hero-wave-marker-dot" />
              <span className="hero-wave-marker-time">0:18</span>
              <span className="hero-wave-marker-label">Next step locked</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-exact-section { padding-top: 140px; padding-bottom: 56px; }
        .hero-exact-pad { padding: 0 40px; }

        .hero-waveform-wrap { width: 100%; }
        .hero-waveform {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 120px;
          width: 100%;
        }
        .hero-wave-bar {
          flex: 1;
          min-width: 2px;
          border-radius: 2px;
          transform-origin: bottom;
          transition: background 0.4s ease;
          animation-name: heroWaveBreathe;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes heroWaveBreathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.55); }
        }
        .hero-wave-markers {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 16px;
          margin-top: 4px;
        }
        .hero-wave-marker {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11.5px;
          letter-spacing: 0.04em;
          color: var(--text-dim);
          transition: color 0.3s ease;
        }
        .hero-wave-marker-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--border2);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .hero-wave-marker-label { color: var(--text-muted); font-family: var(--font-sans); font-weight: 600; }
        .hero-wave-marker.is-active .hero-wave-marker-dot {
          background: var(--green-luminous);
          box-shadow: 0 0 8px var(--green-luminous);
        }
        .hero-wave-marker.is-active .hero-wave-marker-label,
        .hero-wave-marker.is-active { color: var(--green); }
        .hero-wave-marker.is-done .hero-wave-marker-dot { background: var(--coral); }

        .hero-launch-chip {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 5px 8px 5px 12px;
          border-radius: 999px;
          background: var(--surface2);
          border: 1px solid var(--border-green);
          box-shadow: 0 4px 16px -4px var(--shadow-subtle), 0 0 16px -4px var(--green-glow);
          text-decoration: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          max-width: 100%;
        }
        .hero-launch-chip:hover {
          border-color: var(--green);
          box-shadow: 0 8px 24px -4px var(--shadow-subtle), 0 0 24px var(--green-glow);
          transform: translateY(-1.5px);
        }
        .hero-chip-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 999px;
          background: var(--green-glow);
          color: var(--green);
          border: 1px solid var(--border-green);
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        .hero-chip-text {
          font-size: 13px;
          color: var(--text-body);
          line-height: 1.4;
        }
        .hero-chip-text strong {
          color: var(--text-ivory);
          font-weight: 700;
        }
        .hero-chip-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 13px;
          border-radius: 999px;
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
          color: #05180D !important;
          font-size: 11.5px;
          font-weight: 800;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 0 14px rgba(0, 229, 117, 0.42);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .hero-chip-cta::before {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          transform: skewX(-20deg);
          animation: heroChipShine 3s infinite ease-in-out;
        }
        .hero-launch-chip:hover .hero-chip-cta {
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 0 20px rgba(0, 229, 117, 0.65);
        }
        @keyframes heroChipShine {
          0% { left: -120%; }
          35%, 100% { left: 160%; }
        }
        .hero-chip-arrow {
          transition: transform 0.2s ease;
        }
        .hero-launch-chip:hover .hero-chip-arrow {
          transform: translateX(2.5px);
        }

        /* VIBRANT HERO CTA BUTTON */
        .hero-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: 16px 34px;
          border-radius: 999px;
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
          color: #05180D !important;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 32px rgba(0, 229, 117, 0.45), 0 12px 28px rgba(0, 0, 0, 0.35);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .hero-cta-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.48), transparent);
          transform: skewX(-20deg);
          animation: heroBtnShine 3.2s infinite ease-in-out;
        }
        .hero-cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 42px rgba(0, 229, 117, 0.68), 0 16px 36px rgba(0, 0, 0, 0.45);
        }
        .hero-cta-btn:active {
          transform: translateY(-1px) scale(0.99);
        }
        .hero-cta-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #05180D;
          animation: heroDotPulse 1.6s infinite ease-in-out;
        }
        .hero-cta-arrow {
          transition: transform 0.2s ease;
        }
        .hero-cta-btn:hover .hero-cta-arrow {
          transform: translateX(4px);
        }
        @keyframes heroBtnShine {
          0% { left: -120%; }
          35%, 100% { left: 160%; }
        }
        @keyframes heroDotPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.35); opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-exact-section { padding-top: 86px !important; padding-bottom: 28px !important; }
          .hero-exact-pad { padding: 0 20px !important; }
          .hero-waveform { height: 72px; }
          .hero-wave-markers { flex-wrap: wrap; gap: 12px; }
          .hero-launch-chip {
            padding: 8px 12px;
            border-radius: 16px;
            flex-wrap: wrap;
            gap: 8px;
          }
          .hero-chip-text {
            font-size: 12px;
            width: 100%;
          }
          .hero-chip-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
