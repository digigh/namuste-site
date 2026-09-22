"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
            marginBottom: "40px",
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
              onClick={() => setAnswered(!answered)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "var(--text-ivory)",
                color: "var(--bg)",
                padding: "16px 30px",
                borderRadius: "999px",
                fontSize: "15px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              <span>{answered ? "Connected to Namuste" : "Answer it"}</span>
              <ArrowRight size={16} />
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

        @media (max-width: 768px) {
          .hero-exact-section { padding-top: 86px !important; padding-bottom: 28px !important; }
          .hero-exact-pad { padding: 0 20px !important; }
          .hero-waveform { height: 72px; }
          .hero-wave-markers { flex-wrap: wrap; gap: 12px; }
        }
      `}</style>
    </section>
  );
}
