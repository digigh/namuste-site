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
      style={{
        minHeight: "95vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "130px 40px 110px",
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

          {/* Right Column: Visual Concentric Rings & 3 Output Branches (Exact from Screenshot 1) */}
          <div style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Top Status */}
            <div style={{ position: "absolute", top: "10px", left: "20px", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#F87171", textTransform: "uppercase" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F87171" }} />
              Answer Discipline • Active
            </div>

            {/* SVG 3 Concentric Orbit Rings & Branching Paths */}
            <svg
              viewBox="0 0 650 400"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              {/* 3 Concentric Rings */}
              <circle cx="360" cy="200" r="170" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
              <circle cx="360" cy="200" r="120" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <circle cx="360" cy="200" r="70" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />

              {/* Ring Labels */}
              <text x="360" y="50" textAnchor="middle" fill="#71717A" fontSize="10" fontFamily="sans-serif">Current availability</text>
              <text x="360" y="100" textAnchor="middle" fill="#71717A" fontSize="10" fontFamily="sans-serif">Business rules</text>
              <text x="360" y="150" textAnchor="middle" fill="#71717A" fontSize="10" fontFamily="sans-serif">Approved knowledge</text>

              {/* Line from Customer Box into Center Orb */}
              <path d="M 170 200 L 300 200" fill="none" stroke="#9BEA16" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* 3 Output Radiating Branches from Center Orb */}
              <path d="M 420 200 C 460 200, 480 100, 520 100" fill="none" stroke="#9BEA16" strokeWidth="1.5" />
              <path d="M 420 200 L 520 200" fill="none" stroke="#9BEA16" strokeWidth="2" />
              <path d="M 420 200 C 460 200, 480 300, 520 300" fill="none" stroke="#F87171" strokeWidth="1.5" />

              {/* Branch Connection Nodes */}
              <circle cx="520" cy="100" r="4" fill="#F5F5F0" />
              <circle cx="520" cy="200" r="5" fill="#9BEA16" />
              <circle cx="520" cy="300" r="4" fill="#F87171" />
            </svg>

            {/* Left Box: Customer Input (Screenshot 1) */}
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "38%",
                zIndex: 10,
                padding: "12px 16px",
                borderRadius: "12px",
                background: "rgba(15, 15, 15, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(16px)",
                width: "160px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#8E8E93", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                Customer
              </div>
              <div style={{ fontSize: "12.5px", color: "#F5F5F0", lineHeight: 1.4 }}>
                Can you guarantee delivery before Friday?
              </div>
            </div>

            {/* Center Glowing Orb: NAMUSTE (Screenshot 1) */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#050505",
                border: "2px solid #9BEA16",
                boxShadow: "0 0 35px rgba(155, 234, 22, 0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "8px",
              }}
            >
              <img
                src="/logo-icon.png"
                alt="Namuste"
                style={{
                  width: "28px",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  marginBottom: "4px",
                }}
              />
              <img
                src="/logo.png"
                alt="Namuste"
                style={{
                  height: "14px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <div style={{ fontSize: "7.5px", textTransform: "uppercase", color: "#9BEA16", marginTop: "3px", fontWeight: 700 }}>
                Checking Before Answering
              </div>
            </div>

            {/* Right Side: 3 Output Decision Cards (Screenshot 1) */}
            <div style={{ position: "absolute", right: "0", top: "12%", bottom: "12%", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 10, width: "190px" }}>
              {/* Branch 1: ANSWER */}
              <div
                onClick={() => setSelectedBranch("answer")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: selectedBranch === "answer" ? "rgba(155, 234, 22, 0.15)" : "rgba(15, 15, 15, 0.85)",
                  border: `1px solid ${selectedBranch === "answer" ? "#9BEA16" : "rgba(255, 255, 255, 0.1)"}`,
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#D4D0C7", minWidth: "50px" }}>ANSWER</div>
                <div style={{ fontSize: "11px", color: "#8E8E93" }}>Confirmed info available</div>
              </div>

              {/* Branch 2: CLARIFY (Highlighted) */}
              <div
                onClick={() => setSelectedBranch("clarify")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: selectedBranch === "clarify" ? "rgba(155, 234, 22, 0.2)" : "rgba(15, 15, 15, 0.85)",
                  border: `1px solid ${selectedBranch === "clarify" ? "#9BEA16" : "rgba(255, 255, 255, 0.1)"}`,
                  boxShadow: selectedBranch === "clarify" ? "0 0 20px rgba(155, 234, 22, 0.2)" : "none",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9BEA16", minWidth: "50px" }}>CLARIFY</div>
                <div style={{ fontSize: "11px", color: "#F5F5F0" }}>Which delivery location?</div>
              </div>

              {/* Branch 3: ASK A PERSON */}
              <div
                onClick={() => setSelectedBranch("ask")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: selectedBranch === "ask" ? "rgba(248, 113, 113, 0.15)" : "rgba(15, 15, 15, 0.85)",
                  border: `1px solid ${selectedBranch === "ask" ? "#F87171" : "rgba(255, 255, 255, 0.1)"}`,
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#F87171", minWidth: "50px" }}>ASK A PERSON</div>
                <div style={{ fontSize: "11px", color: "#8E8E93" }}>Commitment requires approval</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hp08-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
