"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Check, Sparkles, Zap, MessageSquare } from "lucide-react";

export default function HeroVisualExact() {
  const [answered, setAnswered] = useState(false);

  return (
    <section
      className="hero-exact-section"
      style={{
        minHeight: "100vh",
        background: "#000000",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Radial Glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "12%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(155, 234, 22, 0.08) 0%, rgba(248, 113, 113, 0.04) 45%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(155, 234, 22, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />

      <div className="hero-exact-pad" style={{ maxWidth: "1360px", margin: "0 auto", width: "100%", zIndex: 10 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: "56px",
            alignItems: "center",
            minHeight: "70vh",
          }}
          className="hero-exact-grid"
        >
          {/* Left Column: Exact Editorial Typography */}
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
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16" }} />
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
                maxWidth: "500px",
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
                onClick={() => setAnswered(!answered)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#8FD813",
                  color: "#000000",
                  padding: "15px 30px",
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

          {/* Right Column: Advanced Luminous Trajectory Architecture */}
          <div
            className="hero-trajectory-wrapper"
            style={{
              position: "relative",
              width: "100%",
              height: "440px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 1. Ultra-High Fidelity SVG Trajectory Engine */}
            <svg
              viewBox="0 0 600 360"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                {/* Multi-Stop Chromatic Gradient Spline */}
                <linearGradient id="luminousSpline" x1="0%" y1="75%" x2="100%" y2="20%">
                  <stop offset="0%" stopColor="#9BEA16" stopOpacity="1" />
                  <stop offset="35%" stopColor="#8FD813" stopOpacity="0.95" />
                  <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#F87171" stopOpacity="0.95" />
                </linearGradient>

                {/* Soft Atmospheric Blur */}
                <filter id="neonAura" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="12" result="blur1" />
                  <feGaussianBlur stdDeviation="4" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Concentric Glow for Nodes */}
                <radialGradient id="ringGreenGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(155, 234, 22, 0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                <radialGradient id="ringCoralGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(248, 113, 113, 0.35)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* A. Ambient Wide Neon Backlight Halo */}
              <path
                id="heroTrackPath"
                d="M 60 250 C 180 250, 240 230, 340 150 C 410 95, 470 70, 540 65"
                fill="none"
                stroke="url(#luminousSpline)"
                strokeWidth="14"
                strokeOpacity="0.18"
                filter="url(#neonAura)"
              />

              {/* B. Secondary Outer Dashed Guide Spine */}
              <path
                d="M 60 250 C 180 250, 240 230, 340 150 C 410 95, 470 70, 540 65"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />

              {/* C. Primary Razor-Sharp Core Spline */}
              <path
                d="M 60 250 C 180 250, 240 230, 340 150 C 410 95, 470 70, 540 65"
                fill="none"
                stroke="url(#luminousSpline)"
                strokeWidth="3.2"
                filter="url(#neonAura)"
              />

              {/* D. Continuous Travelling Laser Photons (Light Packets gliding on path) */}
              <circle r="4" fill="#FFFFFF">
                <animateMotion
                  path="M 540 65 C 470 70, 410 95, 340 150 C 240 230, 180 250, 60 250"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="8" fill="rgba(155, 234, 22, 0.6)" filter="url(#neonAura)">
                <animateMotion
                  path="M 540 65 C 470 70, 410 95, 340 150 C 240 230, 180 250, 60 250"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Second delayed photon */}
              <circle r="3.5" fill="#F59E0B">
                <animateMotion
                  path="M 540 65 C 470 70, 410 95, 340 150 C 240 230, 180 250, 60 250"
                  dur="3s"
                  begin="1.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* 2. TARGET TERMINAL NODE (Left - Answered Outcome) */}
              {/* Expanding Orbital Radar Rings */}
              <circle cx="105" cy="246" r="38" fill="none" stroke="rgba(155, 234, 22, 0.18)" strokeWidth="1" strokeDasharray="3 4">
                <animate attributeName="r" values="30;46;30" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="105" cy="246" r="28" fill="none" stroke="rgba(155, 234, 22, 0.35)" strokeWidth="1.2" />
              <circle cx="105" cy="246" r="18" fill="#080808" stroke="#9BEA16" strokeWidth="2.2" filter="url(#neonAura)" />
              {/* Checkmark in node */}
              <path d="M 99 246 L 104 251 L 112 242" fill="none" stroke="#9BEA16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* 3. MIDDLE CHECKPOINT NODE (Still ringing) */}
              <circle cx="330" cy="158" r="30" fill="url(#ringCoralGlow)" pointerEvents="none" />
              <circle cx="330" cy="158" r="14" fill="none" stroke="rgba(248, 113, 113, 0.35)" strokeWidth="1.2">
                <animate attributeName="r" values="8;24;8" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="158" r="6" fill="#F87171" stroke="#000000" strokeWidth="1.5" />
            </svg>

            {/* 4. "Still ringing." Serif Italic Telemetry Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: "absolute",
                top: "38%",
                left: "52%",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "999px",
                background: "rgba(20, 10, 10, 0.75)",
                border: "1px solid rgba(248, 113, 113, 0.25)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#F87171",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  letterSpacing: "-0.01em",
                }}
              >
                Still ringing.
              </span>
            </motion.div>

            {/* 5. TOP RIGHT CALLING BADGE (Customer Calling Live Tag) */}
            <motion.div
              style={{
                position: "absolute",
                top: "8%",
                right: "4%",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 20px",
                borderRadius: "999px",
                background: "rgba(22, 10, 10, 0.88)",
                border: "1px solid rgba(248, 113, 113, 0.45)",
                boxShadow: "0 15px 45px rgba(0, 0, 0, 0.9), 0 0 30px rgba(248, 113, 113, 0.25)",
                backdropFilter: "blur(20px)",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              onClick={() => setAnswered(!answered)}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(248, 113, 113, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F87171",
                }}
              >
                <PhoneCall size={14} className="hero-phone-wobble" />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 600 }}>
                  Customer calling...
                </div>
                <div style={{ fontSize: "10.5px", color: "#8E8E93" }}>
                  OPD Line • +91 98201 44821
                </div>
              </div>

              {/* Pulsing Beacon Dot */}
              <span
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "#F87171",
                  boxShadow: "0 0 10px #F87171",
                }}
                className="pulse-dot"
              />
            </motion.div>

            {/* 6. BOTTOM LEFT OUTCOME BADGE (Clean Glass Outcome Pill) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                position: "absolute",
                bottom: "6%",
                left: "2%",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                borderRadius: "14px",
                background: "rgba(10, 18, 10, 0.88)",
                border: "1px solid rgba(155, 234, 22, 0.35)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(155, 234, 22, 0.15)",
                backdropFilter: "blur(18px)",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#9BEA16",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={13} strokeWidth={3} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "12px", color: "#F5F5F0", fontWeight: 600 }}>
                  Next step locked
                </span>
                <span style={{ fontSize: "10px", color: "#9BEA16", fontWeight: 500 }}>
                  OPD Slot Confirmed • WhatsApp Sent
                </span>
              </div>
            </motion.div>

            {/* 7. FLOATING DIAGNOSTIC TELEMETRY PILL */}
            <div
              style={{
                position: "absolute",
                bottom: "3%",
                right: "8%",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(15, 15, 15, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "11px",
                color: "#A1A1AA",
                backdropFilter: "blur(12px)",
              }}
            >
              <Zap size={11} style={{ color: "#9BEA16" }} />
              <span>Sub-200ms Indian Voice Cadence</span>
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

      <style>{`
        .hero-exact-section {
          padding-top: 140px;
          padding-bottom: 40px;
        }
        .hero-exact-pad {
          padding: 0 40px;
        }
        @keyframes phoneWobble {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(-10deg); }
          30% { transform: rotate(10deg); }
          45% { transform: rotate(-8deg); }
          60% { transform: rotate(8deg); }
          75% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .hero-phone-wobble {
          animation: phoneWobble 2.5s infinite ease-in-out;
        }
        @keyframes pulseDot {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.35); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }
        .pulse-dot {
          animation: pulseDot 1.5s infinite ease-in-out;
        }
        @media (max-width: 900px) {
          .hero-exact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            min-height: auto !important;
          }
        }
        @media (max-width: 768px) {
          .hero-exact-section {
            padding-top: 86px !important;
            padding-bottom: 28px !important;
          }
          .hero-exact-pad {
            padding: 0 16px !important;
          }
          .hero-trajectory-wrapper {
            height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}
