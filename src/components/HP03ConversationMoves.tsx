"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, MessageSquare, Globe, Check, User } from "lucide-react";

export default function HP03ConversationMoves() {
  const [selectedChannel, setSelectedChannel] = useState<"voice" | "whatsapp" | "web">("voice");

  const channelExamples = {
    voice: [
      { num: "01", step: "Answer", label: "Be present", text: "Answers within 1 ring with natural Indian vocal cadence.", icon: PhoneCall },
      { num: "02", step: "Understand", label: "Get the context", text: "Extracts caller intent, pain urgency, and doctor preference.", icon: User },
      { num: "03", step: "Act", label: "Create the next step", text: "Locks OPD calendar slot and checks insurance boundary.", icon: Check },
      { num: "04", step: "Follow up", label: "Keep it moving", text: "Dispatches WhatsApp directions and clinic prep notes.", icon: MessageSquare },
      { num: "05", step: "Learn", label: "Improve the response", text: "Staff reviews edge cases to improve practice guidelines.", icon: Check },
    ],
    whatsapp: [
      { num: "01", step: "Answer", label: "Be present", text: "Instant sub-second greeting on official business WhatsApp.", icon: MessageSquare },
      { num: "02", step: "Understand", label: "Get the context", text: "Understands voice notes, PDFs, and multi-lingual text.", icon: User },
      { num: "03", step: "Act", label: "Create the next step", text: "Issues appointment barcode and reserves consultation slot.", icon: Check },
      { num: "04", step: "Follow up", label: "Keep it moving", text: "Sends automated 2-hour pre-visit checklist.", icon: MessageSquare },
      { num: "05", step: "Learn", label: "Improve the response", text: "Integrates patient feedback into knowledge base.", icon: Check },
    ],
    web: [
      { num: "01", step: "Answer", label: "Be present", text: "Interactive concierge greets high-intent web visitors.", icon: Globe },
      { num: "02", step: "Understand", label: "Get the context", text: "Qualifies commercial scope, location, and urgency.", icon: User },
      { num: "03", step: "Act", label: "Create the next step", text: "Routes verified brief to designated relationship partner.", icon: Check },
      { num: "04", step: "Follow up", label: "Keep it moving", text: "Syncs lead telemetry with enterprise CRM.", icon: MessageSquare },
      { num: "05", step: "Learn", label: "Improve the response", text: "Refines conversion scoring with sales feedback.", icon: Check },
    ],
  };

  const currentSteps = channelExamples[selectedChannel];

  return (
    <section
      id="hp-03"
      className="hp03-section-pad"
      style={{
        minHeight: "90vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#8E8E93",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          How a Conversation Moves
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="hp03-grid"
        >
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="serif"
              style={{
                fontSize: "clamp(38px, 4.5vw, 66px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#F5F5F0",
                marginBottom: "24px",
              }}
            >
              From hello to<br />
              an <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>outcome.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                color: "#A1A1AA",
                lineHeight: 1.65,
                maxWidth: "460px",
                marginBottom: "28px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Your Digital Receptionist does more than answer. It keeps the conversation moving.
            </p>

            {/* Channel Switcher */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
              {[
                { id: "voice" as const, label: "Voice", icon: PhoneCall },
                { id: "whatsapp" as const, label: "WhatsApp", icon: MessageSquare },
                { id: "web" as const, label: "Web", icon: Globe },
              ].map((ch) => {
                const Icon = ch.icon;
                const active = selectedChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: active ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.04)",
                      color: active ? "#9BEA16" : "#A1A1AA",
                      border: `1px solid ${active ? "rgba(155, 234, 22, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                    }}
                  >
                    <Icon size={13} />
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>

            <a
              href="#hp-04"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 26px",
                borderRadius: "999px",
                border: "1px solid rgba(143, 216, 19, 0.4)",
                background: "rgba(143, 216, 19, 0.06)",
                color: "#9BEA16",
                fontSize: "14.5px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(143, 216, 19, 0.18)";
                e.currentTarget.style.borderColor = "#9BEA16";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(143, 216, 19, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(143, 216, 19, 0.06)";
                e.currentTarget.style.borderColor = "rgba(143, 216, 19, 0.4)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>Watch a conversation move</span>
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Right Column: 5 Fluid Wavy Nodes on Continuous Sine Wave */}
          <div className="hp03-scaler-wrapper">
            <div className="hp03-diagram-scaler" style={{ position: "relative", width: "700px", height: "340px", flexShrink: 0 }}>
              <svg viewBox="0 0 700 340" style={{ width: "700px", height: "340px", overflow: "visible" }}>
                <defs>
                  {/* Dynamic Sine Wave Gradient */}
                  <linearGradient id="movesGrad03" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9BEA16" stopOpacity="0.4" />
                    <stop offset="20%" stopColor="#9BEA16" stopOpacity="1" />
                    <stop offset="45%" stopColor="#8FD813" stopOpacity="1" />
                    <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#9BEA16" stopOpacity="0.85" />
                  </linearGradient>

                  {/* Atmospheric Glow Filters */}
                  <filter id="waveGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur1" />
                    <feGaussianBlur stdDeviation="2.5" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <radialGradient id="nodeCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(155, 234, 22, 0.45)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>

                  <radialGradient id="humanCoralGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(248, 113, 113, 0.4)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* 1. Atmospheric Wide Sine Glow Aura */}
                <path
                  d="M 15 150 C 35 20, 60 20, 80 150 C 100 280, 160 280, 200 150 C 240 40, 290 40, 330 150 C 370 260, 420 260, 460 150 C 500 70, 550 70, 590 150 C 625 210, 665 210, 690 150"
                  fill="none"
                  stroke="url(#movesGrad03)"
                  strokeWidth="12"
                  strokeOpacity="0.16"
                  filter="url(#waveGlow)"
                />

                {/* 2. Secondary Dashed Frequency Harmonics */}
                <path
                  d="M 15 150 C 35 20, 60 20, 80 150 C 100 280, 160 280, 200 150 C 240 40, 290 40, 330 150 C 370 260, 420 260, 460 150 C 500 70, 550 70, 590 150 C 625 210, 665 210, 690 150"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />

                {/* 3. Primary Dotted Green Sine Spine (Mathematically hits every node at y=150) */}
                <path
                  id="sineMovementTrack"
                  d="M 15 150 C 35 20, 60 20, 80 150 C 100 280, 160 280, 200 150 C 240 40, 290 40, 330 150 C 370 260, 420 260, 460 150 C 500 70, 550 70, 590 150 C 625 210, 665 210, 690 150"
                  fill="none"
                  stroke="url(#movesGrad03)"
                  strokeWidth="2.8"
                  strokeDasharray="3 5"
                  filter="url(#waveGlow)"
                />

                {/* 4. Continuous Traveling Laser Photons along Waveform */}
                <circle r="4" fill="#FFFFFF">
                  <animateMotion
                    path="M 15 150 C 35 20, 60 20, 80 150 C 100 280, 160 280, 200 150 C 240 40, 290 40, 330 150 C 370 260, 420 260, 460 150 C 500 70, 550 70, 590 150 C 625 210, 665 210, 690 150"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="8" fill="rgba(155, 234, 22, 0.6)" filter="url(#waveGlow)">
                  <animateMotion
                    path="M 15 150 C 35 20, 60 20, 80 150 C 100 280, 160 280, 200 150 C 240 40, 290 40, 330 150 C 370 260, 420 260, 460 150 C 500 70, 550 70, 590 150 C 625 210, 665 210, 690 150"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Second trailing photon */}
                <circle r="3" fill="#F59E0B">
                  <animateMotion
                    path="M 15 150 C 35 20, 60 20, 80 150 C 100 280, 160 280, 200 150 C 240 40, 290 40, 330 150 C 370 260, 420 260, 460 150 C 500 70, 550 70, 590 150 C 625 210, 665 210, 690 150"
                    dur="4.5s"
                    begin="2.25s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 5. Red Safety Escalation Branch (Node 04 -> Bring in a human UPWARDS into open space) */}
                <path d="M 460 130 Q 460 85, 460 70" fill="none" stroke="#F87171" strokeWidth="1.8" strokeDasharray="3 3" />

                {/* 6. Milestone Pods Circles (Centered strictly at x=80, 200, 330, 460, 590) */}
                {/* Node 01: Answer */}
                <circle cx="80" cy="150" r="30" fill="url(#nodeCoreGlow)" pointerEvents="none" />
                <circle cx="80" cy="150" r="22" fill="none" stroke="rgba(155, 234, 22, 0.25)" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="80" cy="150" r="16" fill="#080808" stroke="#9BEA16" strokeWidth="2.2" filter="url(#waveGlow)" />
                <circle cx="80" cy="150" r="6" fill="rgba(155, 234, 22, 0.5)" />

                {/* Node 02: Understand */}
                <circle cx="200" cy="150" r="30" fill="url(#nodeCoreGlow)" pointerEvents="none" />
                <circle cx="200" cy="150" r="22" fill="none" stroke="rgba(155, 234, 22, 0.25)" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="200" cy="150" r="16" fill="#080808" stroke="#9BEA16" strokeWidth="2.2" filter="url(#waveGlow)" />
                <circle cx="200" cy="150" r="6" fill="rgba(155, 234, 22, 0.5)" />

                {/* Node 03: Act */}
                <circle cx="330" cy="150" r="30" fill="url(#nodeCoreGlow)" pointerEvents="none" />
                <circle cx="330" cy="150" r="22" fill="none" stroke="rgba(155, 234, 22, 0.25)" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="330" cy="150" r="16" fill="#080808" stroke="#9BEA16" strokeWidth="2.2" filter="url(#waveGlow)" />
                <circle cx="330" cy="150" r="6" fill="rgba(155, 234, 22, 0.5)" />

                {/* Node 04: Follow up */}
                <circle cx="460" cy="150" r="30" fill="url(#nodeCoreGlow)" pointerEvents="none" />
                <circle cx="460" cy="150" r="22" fill="none" stroke="rgba(155, 234, 22, 0.25)" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="460" cy="150" r="16" fill="#080808" stroke="#9BEA16" strokeWidth="2.2" filter="url(#waveGlow)" />
                <circle cx="460" cy="150" r="6" fill="rgba(155, 234, 22, 0.5)" />

                {/* Node 05: Learn (Continuous Radar Wave) */}
                <circle cx="590" cy="150" r="44" fill="none" stroke="rgba(155, 234, 22, 0.15)" strokeWidth="1" strokeDasharray="3 4">
                  <animate attributeName="r" values="36;52;36" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="590" cy="150" r="32" fill="none" stroke="rgba(155, 234, 22, 0.28)" strokeWidth="1.2" />
                <circle cx="590" cy="150" r="20" fill="none" stroke="rgba(155, 234, 22, 0.45)" strokeWidth="1.5" />
                <circle cx="590" cy="150" r="14" fill="#080808" stroke="#9BEA16" strokeWidth="2.5" filter="url(#waveGlow)" />
                <path d="M 585 150 L 588 153 L 595 146" fill="none" stroke="#9BEA16" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

                {/* Branch Target: Bring in a human (Cleanly placed at top y=68) */}
                <circle cx="460" cy="68" r="18" fill="url(#humanCoralGlow)" pointerEvents="none" />
                <circle cx="460" cy="68" r="11" fill="#080808" stroke="#F87171" strokeWidth="1.8" />
                <circle cx="460" cy="68" r="4" fill="#F87171" />
              </svg>

              {/* Top Branch Node Tag: Bring in a human (Positioned at top with zero overlap) */}
              <div
                style={{
                  position: "absolute",
                  left: "398px",
                  top: "22px",
                  textAlign: "center",
                  width: "124px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 9px",
                    borderRadius: "999px",
                    background: "rgba(28, 10, 10, 0.92)",
                    border: "1px solid rgba(248, 113, 113, 0.45)",
                    fontSize: "11px",
                    color: "#F87171",
                    fontWeight: 600,
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.9), 0 0 12px rgba(248, 113, 113, 0.2)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span>Bring in a human</span>
                </div>
              </div>

              {/* Glassmorphic Labels Overlayed for the 5 Milestones (Unobstructed at bottom) */}
              {currentSteps.map((s, idx) => {
                const leftPositions = [36, 156, 286, 416, 532];
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    style={{
                      position: "absolute",
                      left: `${leftPositions[idx]}px`,
                      top: "192px",
                      textAlign: "center",
                      width: idx === 4 ? "124px" : "88px",
                      cursor: "default",
                    }}
                  >
                    {/* Number Badge */}
                    <div
                      style={{
                        display: "inline-block",
                        fontSize: "10.5px",
                        fontFamily: "monospace",
                        color: "#9BEA16",
                        background: "rgba(155, 234, 22, 0.1)",
                        border: "1px solid rgba(155, 234, 22, 0.25)",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        marginBottom: "3px",
                      }}
                    >
                      {s.num}
                    </div>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#F5F5F0", letterSpacing: "-0.01em" }}>
                      {s.step}
                    </div>
                    <div style={{ fontSize: "11px", color: "#8E8E93", marginTop: "2px", lineHeight: 1.3 }}>
                      {s.label}
                    </div>
                    {idx === 4 && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9BEA16",
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          marginTop: "4px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Hello was only the beginning.
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hp03-section-pad {
          padding: 130px 40px 110px;
        }
        .hp03-scaler-wrapper {
          position: relative;
          width: 100%;
          min-height: 360px;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .hp03-diagram-scaler {
          position: relative;
          width: 700px;
          height: 340px;
          transform-origin: center center;
        }
        @media (max-width: 900px) {
          .hp03-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          .hp03-section-pad {
            padding: 56px 16px 40px !important;
          }
          .hp03-scaler-wrapper {
            height: 200px !important;
            min-height: 200px !important;
            overflow: hidden !important;
            display: block !important;
          }
          .hp03-diagram-scaler {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) scale(0.46) !important;
            transform-origin: center center !important;
          }
        }
        @media (max-width: 400px) {
          .hp03-scaler-wrapper {
            height: 180px !important;
            min-height: 180px !important;
          }
          .hp03-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.42) !important;
          }
        }
        @media (max-width: 350px) {
          .hp03-scaler-wrapper {
            height: 165px !important;
            min-height: 165px !important;
          }
          .hp03-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.38) !important;
          }
        }
      `}</style>
    </section>
  );
}
