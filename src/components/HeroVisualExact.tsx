"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, Check, Volume2 } from "lucide-react";

export default function HeroVisualExact() {
  const [answered, setAnswered] = useState(false);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#000000",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "140px",
        paddingBottom: "40px",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(118, 192, 67, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 40px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "40px",
            alignItems: "center",
            minHeight: "65vh",
          }}
          className="hero-exact-grid"
        >
          {/* Left Column: Exact Typography from Screenshot 1 */}
          <div style={{ zIndex: 10 }}>
            {/* Monospace Eyebrow */}
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: "#8E8E93",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              The Digital Receptionist for India
            </div>

            {/* Editorial Headline */}
            <h1
              className="serif"
              style={{
                fontSize: "clamp(38px, 4.6vw, 68px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#F5F5F0",
                marginBottom: "28px",
              }}
            >
              Your customers<br />
              are calling. Is someone<br />
              <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>always</span> answering?
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 20px)",
                color: "#A1A1AA",
                lineHeight: 1.6,
                marginBottom: "40px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Every conversation deserves a{" "}
              <span className="serif-italic" style={{ color: "#9BEA16", fontStyle: "italic", fontFamily: "var(--font-serif)" }}>
                next step.
              </span>
            </p>

            {/* CTA Row */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <button
                onClick={() => setAnswered(true)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#8FD813",
                  color: "#000000",
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontSize: "15px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 35px rgba(143, 216, 19, 0.45)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="btn-glow-green"
              >
                <span>{answered ? "Connected to Namuste" : "Answer it"}</span>
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#000000",
                    color: "#8FD813",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowRight size={13} />
                </div>
              </button>

              <a
                href="#problem-loss"
                style={{
                  color: "#D4D0C7",
                  fontSize: "14.5px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9BEA16")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#D4D0C7")}
              >
                <span>See what gets missed</span>
                <span style={{ fontSize: "16px" }}>›</span>
              </a>
            </div>
          </div>

          {/* Right Column: Luminous Trajectory Wave Animation (Exact Match with Screenshot 1) */}
          <div style={{ position: "relative", width: "100%", height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* SVG Glowing Particle Thread */}
            <svg
              viewBox="0 0 500 300"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="threadGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#8FD813" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F87171" stopOpacity="0.9" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background faint path */}
              <path
                d="M 50 200 C 150 200, 200 180, 280 120 C 340 70, 400 60, 480 60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Glowing Particle Trajectory */}
              <path
                d="M 50 200 C 150 200, 200 180, 280 120 C 340 70, 400 60, 480 60"
                fill="none"
                stroke="url(#threadGrad)"
                strokeWidth="2.5"
                filter="url(#glow)"
              />

              {/* Target checkmark ring on left */}
              <circle cx="90" cy="195" r="28" fill="none" stroke="rgba(143, 216, 19, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="90" cy="195" r="16" fill="rgba(143, 216, 19, 0.1)" stroke="#8FD813" strokeWidth="1.5" />
              <path d="M 85 195 L 89 199 L 96 191" fill="none" stroke="#8FD813" strokeWidth="2" strokeLinecap="round" />

              {/* Middle Still Ringing Node */}
              <circle cx="270" cy="125" r="5" fill="#F87171" />
              <circle cx="270" cy="125" r="12" fill="none" stroke="rgba(248, 113, 113, 0.3)" strokeWidth="1">
                <animate attributeName="r" values="5;20;5" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* "Still ringing." Text Label */}
            <div
              style={{
                position: "absolute",
                top: "42%",
                left: "48%",
                fontSize: "12px",
                color: "#F87171",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
              }}
            >
              Still ringing.
            </div>

            {/* Right Side Calling Badge (Exact from Screenshot 1) */}
            <div
              style={{
                position: "absolute",
                top: "18%",
                right: "0",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "999px",
                background: "rgba(35, 15, 15, 0.8)",
                border: "1px solid rgba(248, 113, 113, 0.4)",
                boxShadow: "0 0 25px rgba(248, 113, 113, 0.2)",
              }}
            >
              <PhoneCall size={15} style={{ color: "#F87171" }} />
              <span style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 500 }}>Customer calling...</span>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F87171", animation: "pulse 1.5s infinite" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator (Exact from Screenshot 1) */}
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <a
          href="#problem-loss"
          style={{
            color: "#71717A",
            fontSize: "13px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.2s",
          }}
        >
          <span>Follow the conversation</span>
          <span style={{ fontSize: "14px" }}>↓</span>
        </a>
      </div>
    </section>
  );
}
