"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, HelpCircle, User, ArrowRight, Check } from "lucide-react";

export default function HP08Judgment() {
  const [selectedBranch, setSelectedBranch] = useState<"answer" | "clarify" | "ask">("clarify");

  const branchData = {
    answer: {
      title: "Confirmed information available",
      icon: MessageSquare,
      desc: "Instant verified answer grounded 100% in published business policy.",
      example: "Yes, our Indiranagar branch is open until 8:00 PM today.",
    },
    clarify: {
      title: "Which delivery location?",
      icon: HelpCircle,
      desc: "Asks one clarifying question to resolve destination and logistics timeline.",
      example: "Could you specify if delivery is to your Pune Plant or Mumbai Warehouse?",
    },
    ask: {
      title: "Commitment requires approval",
      icon: User,
      desc: "Escalates commercial or clinical exceptions to designated human owner.",
      example: "Commercial discounts over 15% require Regional Head authorization. Transferring now.",
    },
  };

  return (
    <section
      id="hp-08"
      className="hp08-section-pad"
      style={{
        minHeight: "95vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        position: "relative",
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
            marginBottom: "20px",
          }}
        >
          Knowing is Good. Knowing When to Check is Better.
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="hp08-grid"
        >
          {/* Left Column */}
          <div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(38px, 4.5vw, 66px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#F5F5F0",
                marginBottom: "20px",
              }}
            >
              A confident wrong answer<br />
              is still wrong.<br />
              <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
                Namuste knows when to ask.
              </span>
            </h2>

            <p
              style={{
                fontSize: "clamp(15.5px, 1.3vw, 18px)",
                color: "#A1A1AA",
                lineHeight: 1.65,
                maxWidth: "480px",
                marginBottom: "28px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Responses follow approved business knowledge and rules. When something is unclear, Namuste clarifies, checks or brings in the right person.
            </p>

            {/* 3 Pills from Screenshot 1 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", color: "#D4D0C7" }}>
                <ShieldCheck size={13} style={{ color: "#9BEA16" }} /> Verified knowledge
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", color: "#D4D0C7" }}>
                <MessageSquare size={13} style={{ color: "#9BEA16" }} /> Clarifying questions
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", color: "#D4D0C7" }}>
                <User size={13} style={{ color: "#F87171" }} /> Human confirmation
              </span>
            </div>

            <p style={{ fontSize: "14px", color: "#8E8E93", marginBottom: "28px" }}>
              Useful answers should also be dependable answers.
            </p>

            {/* Solid Lime Primary CTA from Screenshot 1 */}
            <div style={{ marginBottom: "24px" }}>
              <Link
                href="/trust"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 26px",
                  borderRadius: "8px",
                  background: "#9BEA16",
                  color: "#000000",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 0 30px rgba(155, 234, 22, 0.35)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>See how Namuste checks</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <p className="serif-italic" style={{ fontSize: "14.5px", color: "#8E8E93", fontStyle: "italic", margin: 0 }}>
              Sometimes the most intelligent answer is: let me confirm.
            </p>
          </div>

          {/* Right Column: Visual Concentric Rings & 3 Output Branches (Proportionally Scaled on Mobile) */}
          <div className="hp08-canvas hp08-scaler-wrapper" style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              className="hp08-diagram-scaler"
              style={{
                position: "relative",
                width: "720px",
                height: "440px",
                flexShrink: 0,
              }}
            >
              {/* Top Status */}
              <div style={{ position: "absolute", top: "10px", left: "20px", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#F87171", textTransform: "uppercase", zIndex: 15 }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F87171" }} />
                Answer Discipline • Active
              </div>

              {/* SVG 3 Concentric Orbit Rings & Branching Paths */}
              <svg
                viewBox="0 0 720 440"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "visible",
                  pointerEvents: "none",
                }}
              >
                <defs>
                  <linearGradient id="judgeFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9BEA16" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#9BEA16" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8FD813" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Gentle subtle glow filter */}
                  <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <radialGradient id="judgeAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(155, 234, 22, 0.22)" />
                    <stop offset="70%" stopColor="rgba(155, 234, 22, 0.04)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* 1. ANIMATED CONCENTRIC KNOWLEDGE ORBITAL RADARS (Centered at x=340, y=220) */}
                {/* Outer Orbit (r=165) */}
                <circle cx="340" cy="220" r="165" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" />
                <circle
                  cx="340"
                  cy="220"
                  r="165"
                  fill="none"
                  stroke="rgba(155, 234, 22, 0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="14 28"
                  filter="url(#subtleGlow)"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 340 220"
                    to="360 340 220"
                    dur="32s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Middle Orbit (r=120) */}
                <circle cx="340" cy="220" r="120" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
                <circle
                  cx="340"
                  cy="220"
                  r="120"
                  fill="none"
                  stroke="rgba(155, 234, 22, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="10 20"
                  filter="url(#subtleGlow)"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="360 340 220"
                    to="0 340 220"
                    dur="22s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Inner Orbit (r=80) */}
                <circle cx="340" cy="220" r="80" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
                <circle
                  cx="340"
                  cy="220"
                  r="80"
                  fill="none"
                  stroke="rgba(155, 234, 22, 0.5)"
                  strokeWidth="1.5"
                  strokeDasharray="6 12"
                  filter="url(#subtleGlow)"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 340 220"
                    to="360 340 220"
                    dur="14s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 2. HIGH CONTRAST CRYSTAL-CLEAR KNOWLEDGE LABELS WITH GLASS BACKDROPS */}
                {/* Outer Ring Badge */}
                <g transform="translate(230, 46)">
                  <rect width="220" height="22" rx="11" fill="rgba(12, 12, 15, 0.94)" stroke="rgba(155, 234, 22, 0.3)" strokeWidth="1" />
                  <circle cx="14" cy="11" r="3.5" fill="#9BEA16" />
                  <text x="24" y="14.5" fill="#F5F5F0" fontSize="10.5" fontFamily="var(--font-sans), sans-serif" fontWeight="600" letterSpacing="0.02em">
                    Current availability & schedules
                  </text>
                </g>

                {/* Middle Ring Badge */}
                <g transform="translate(250, 90)">
                  <rect width="180" height="22" rx="11" fill="rgba(12, 12, 15, 0.94)" stroke="rgba(155, 234, 22, 0.3)" strokeWidth="1" />
                  <circle cx="14" cy="11" r="3.5" fill="#9BEA16" />
                  <text x="24" y="14.5" fill="#F5F5F0" fontSize="10.5" fontFamily="var(--font-sans), sans-serif" fontWeight="600" letterSpacing="0.02em">
                    Approved business rules
                  </text>
                </g>

                {/* Inner Ring Badge */}
                <g transform="translate(265, 130)">
                  <rect width="150" height="22" rx="11" fill="rgba(12, 12, 15, 0.94)" stroke="rgba(155, 234, 22, 0.3)" strokeWidth="1" />
                  <circle cx="14" cy="11" r="3.5" fill="#9BEA16" />
                  <text x="24" y="14.5" fill="#F5F5F0" fontSize="10.5" fontFamily="var(--font-sans), sans-serif" fontWeight="600" letterSpacing="0.02em">
                    Verified knowledge
                  </text>
                </g>

                {/* 3. Customer Inbound Spline -> Center Engine */}
                <path d="M 180 220 L 275 220" fill="none" stroke="url(#judgeFlowGrad)" strokeWidth="6" strokeOpacity="0.12" filter="url(#subtleGlow)" />
                <path d="M 180 220 L 275 220" fill="none" stroke="url(#judgeFlowGrad)" strokeWidth="2" filter="url(#subtleGlow)" />
                {/* Traveling Photon on Input */}
                <circle r="3.5" fill="#FFFFFF">
                  <animateMotion path="M 180 220 L 275 220" dur="1.8s" repeatCount="indefinite" />
                </circle>

                {/* 4. Output Decision Branches from Center Engine (x=405, y=220) to Right Cards */}
                {/* Branch 1: ANSWER (y=220 -> 95) */}
                <path d="M 405 220 C 445 220, 465 95, 495 95" fill="none" stroke="#9BEA16" strokeWidth="6" strokeOpacity={selectedBranch === "answer" ? 0.18 : 0.05} filter="url(#subtleGlow)" />
                <path d="M 405 220 C 445 220, 465 95, 495 95" fill="none" stroke={selectedBranch === "answer" ? "#9BEA16" : "rgba(255,255,255,0.2)"} strokeWidth={selectedBranch === "answer" ? 2 : 1.2} />
                <circle r="3" fill="#FFFFFF">
                  <animateMotion path="M 405 220 C 445 220, 465 95, 495 95" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Branch 2: CLARIFY (y=220 -> 220) */}
                <path d="M 405 220 L 495 220" fill="none" stroke="#9BEA16" strokeWidth="6" strokeOpacity={selectedBranch === "clarify" ? 0.2 : 0.05} filter="url(#subtleGlow)" />
                <path d="M 405 220 L 495 220" fill="none" stroke={selectedBranch === "clarify" ? "#9BEA16" : "rgba(255,255,255,0.2)"} strokeWidth={selectedBranch === "clarify" ? 2.2 : 1.2} />
                <circle r="3.5" fill="#9BEA16">
                  <animateMotion path="M 405 220 L 495 220" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
                </circle>

                {/* Branch 3: ASK A PERSON (y=220 -> 345) */}
                <path d="M 405 220 C 445 220, 465 345, 495 345" fill="none" stroke="#F87171" strokeWidth="6" strokeOpacity={selectedBranch === "ask" ? 0.18 : 0.05} filter="url(#subtleGlow)" />
                <path d="M 405 220 C 445 220, 465 345, 495 345" fill="none" stroke={selectedBranch === "ask" ? "#F87171" : "rgba(255,255,255,0.2)"} strokeWidth={selectedBranch === "ask" ? 2 : 1.2} />
                <circle r="3" fill="#F87171">
                  <animateMotion path="M 405 220 C 445 220, 465 345, 495 345" dur="2.2s" begin="1s" repeatCount="indefinite" />
                </circle>

                {/* 5. Center Concentric Orb Elements in SVG */}
                <circle cx="340" cy="220" r="88" fill="url(#judgeAura)" pointerEvents="none" />
                <circle cx="340" cy="220" r="65" fill="#08080A" stroke="#9BEA16" strokeWidth="2.2" filter="url(#subtleGlow)" />

                {/* Centered Logo in SVG */}
                <image
                  href="/logo.png"
                  x="298"
                  y="192"
                  width="84"
                  height="18"
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* Monospace Checking Tag */}
                <text
                  x="340"
                  y="226"
                  textAnchor="middle"
                  fill="#9BEA16"
                  fontSize="7.8"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="0.08em"
                >
                  CHECKING BEFORE
                </text>
                <text
                  x="340"
                  y="238"
                  textAnchor="middle"
                  fill="#9BEA16"
                  fontSize="7.8"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="0.08em"
                >
                  ANSWERING
                </text>
              </svg>

              {/* Left Box: Customer Input (Positioned cleanly with zero overlap) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "165px",
                  zIndex: 10,
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "rgba(14, 14, 16, 0.94)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(20px)",
                  width: "170px",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.9)",
                }}
              >
                <div style={{ fontSize: "10px", color: "#8E8E93", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                  Customer
                </div>
                <div style={{ fontSize: "12.5px", color: "#F5F5F0", lineHeight: 1.45 }}>
                  &ldquo;Can you guarantee delivery before Friday?&rdquo;
                </div>
              </motion.div>

              {/* Right Side: 3 Output Decision Cards */}
              <div
                style={{
                  position: "absolute",
                  left: "495px",
                  top: "50px",
                  bottom: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  zIndex: 10,
                  width: "215px",
                }}
              >
                {/* Branch 1: ANSWER */}
                <motion.div
                  whileHover={{ scale: 1.03, x: 4 }}
                  onClick={() => setSelectedBranch("answer")}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: selectedBranch === "answer" ? "rgba(155, 234, 22, 0.15)" : "rgba(14, 14, 16, 0.9)",
                    border: `1px solid ${selectedBranch === "answer" ? "#9BEA16" : "rgba(255, 255, 255, 0.1)"}`,
                    boxShadow: selectedBranch === "answer" ? "0 0 20px rgba(155, 234, 22, 0.15)" : "0 8px 24px rgba(0,0,0,0.6)",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#D4D0C7", background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "4px" }}>
                    ANSWER
                  </span>
                  <div style={{ fontSize: "11px", color: "#A1A1AA", lineHeight: 1.3 }}>
                    Confirmed info available
                  </div>
                </motion.div>

                {/* Branch 2: CLARIFY */}
                <motion.div
                  whileHover={{ scale: 1.03, x: 4 }}
                  onClick={() => setSelectedBranch("clarify")}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "11px 14px",
                    borderRadius: "12px",
                    background: selectedBranch === "clarify" ? "rgba(155, 234, 22, 0.2)" : "rgba(14, 14, 16, 0.9)",
                    border: `1px solid ${selectedBranch === "clarify" ? "#9BEA16" : "rgba(255, 255, 255, 0.1)"}`,
                    boxShadow: selectedBranch === "clarify" ? "0 0 25px rgba(155, 234, 22, 0.25)" : "0 8px 24px rgba(0,0,0,0.6)",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#9BEA16", background: "rgba(155,234,22,0.15)", padding: "2px 6px", borderRadius: "4px" }}>
                    CLARIFY
                  </span>
                  <div style={{ fontSize: "11.5px", color: "#F5F5F0", fontWeight: 600, lineHeight: 1.3 }}>
                    Which delivery location?
                  </div>
                </motion.div>

                {/* Branch 3: ASK A PERSON */}
                <motion.div
                  whileHover={{ scale: 1.03, x: 4 }}
                  onClick={() => setSelectedBranch("ask")}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: selectedBranch === "ask" ? "rgba(248, 113, 113, 0.18)" : "rgba(14, 14, 16, 0.9)",
                    border: `1px solid ${selectedBranch === "ask" ? "#F87171" : "rgba(255, 255, 255, 0.1)"}`,
                    boxShadow: selectedBranch === "ask" ? "0 0 25px rgba(248, 113, 113, 0.2)" : "0 8px 24px rgba(0,0,0,0.6)",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#F87171", background: "rgba(248,113,113,0.15)", padding: "2px 5px", borderRadius: "4px", whiteSpace: "nowrap" }}>
                    ASK PERSON
                  </span>
                  <div style={{ fontSize: "11px", color: "#A1A1AA", lineHeight: 1.3 }}>
                    Requires authorization
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hp08-section-pad {
          padding: 130px 40px 110px;
        }
        .hp08-scaler-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .hp08-diagram-scaler {
          transform-origin: center center;
        }
        @media (max-width: 900px) {
          .hp08-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .hp08-section-pad {
            padding: 56px 16px 40px !important;
          }
          .hp08-scaler-wrapper {
            height: 290px !important;
            min-height: 290px !important;
            overflow: hidden !important;
            display: block !important;
          }
          .hp08-diagram-scaler {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) scale(0.56) !important;
          }
        }
        @media (max-width: 440px) {
          .hp08-scaler-wrapper {
            height: 250px !important;
            min-height: 250px !important;
          }
          .hp08-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.48) !important;
          }
        }
        @media (max-width: 375px) {
          .hp08-scaler-wrapper {
            height: 225px !important;
            min-height: 225px !important;
          }
          .hp08-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.42) !important;
          }
        }
      `}</style>
    </section>
  );
}
