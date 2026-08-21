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
      style={{
        minHeight: "90vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "130px 40px 110px",
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
          <div style={{ position: "relative", width: "100%", minHeight: "360px", display: "flex", alignItems: "center" }}>
            <svg viewBox="0 0 650 300" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              <defs>
                <linearGradient id="movesGrad03" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8FD813" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#8FD813" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#8FD813" stopOpacity="1" />
                  <stop offset="75%" stopColor="#8FD813" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8FD813" stopOpacity="0.7" />
                </linearGradient>

                <filter id="glow03" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Sine Wave Dotted Green Path */}
              <path
                d="M 15 150 C 35 20, 85 20, 115 150 C 145 280, 175 220, 235 150 C 295 80, 325 220, 375 150 C 425 80, 475 200, 525 150 C 565 110, 605 150, 640 150"
                fill="none"
                stroke="url(#movesGrad03)"
                strokeWidth="2.5"
                strokeDasharray="2 4"
                filter="url(#glow03)"
              />

              {/* Red branch from node 04 down to Bring in a human */}
              <path d="M 435 168 Q 445 210, 465 230" fill="none" stroke="#F87171" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* 5 Milestone Circles */}
              <circle cx="75" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="75" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              <circle cx="195" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="195" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              <circle cx="315" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="315" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              <circle cx="435" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="435" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              {/* Node 05: Learn with Concentric Radar Waves */}
              <circle cx="555" cy="150" r="42" fill="none" stroke="rgba(143, 216, 19, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="555" cy="150" r="32" fill="none" stroke="rgba(143, 216, 19, 0.25)" strokeWidth="1" />
              <circle cx="555" cy="150" r="22" fill="none" stroke="rgba(143, 216, 19, 0.45)" strokeWidth="1.5" />
              <circle cx="555" cy="150" r="14" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <path d="M 550 150 L 553 153 L 560 146" fill="none" stroke="#8FD813" strokeWidth="2" strokeLinecap="round" />

              {/* Branch Down End Node: Bring in a human */}
              <circle cx="465" cy="230" r="14" fill="#000000" stroke="#F87171" strokeWidth="2" />
            </svg>

            {/* Labels overlayed on milestones */}
            {currentSteps.map((s, idx) => {
              const leftPositions = ["6%", "24%", "43%", "61%", "78%"];
              return (
                <div key={idx} style={{ position: "absolute", left: leftPositions[idx], top: "60%", textAlign: "center", width: idx === 4 ? "130px" : "80px" }}>
                  <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#8E8E93", fontWeight: 700 }}>{s.num}</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F5F0" }}>{s.step}</div>
                  <div style={{ fontSize: "11px", color: "#71717A" }}>{s.label}</div>
                  {idx === 4 && (
                    <div style={{ fontSize: "12px", color: "#9BEA16", fontFamily: "var(--font-serif)", fontStyle: "italic", marginTop: "4px" }}>
                      Hello was only the beginning.
                    </div>
                  )}
                </div>
              );
            })}

            {/* Branch node label: Bring in a human */}
            <div style={{ position: "absolute", left: "64%", top: "88%", textAlign: "center", width: "110px" }}>
              <div style={{ fontSize: "12px", color: "#F87171", fontWeight: 500 }}>Bring in a human</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hp03-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
