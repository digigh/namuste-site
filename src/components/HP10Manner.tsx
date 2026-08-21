"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Headphones, Check, ArrowRight, Globe, ShieldCheck } from "lucide-react";

export default function HP10Manner() {
  const [selectedManner, setSelectedManner] = useState<"warm" | "formal" | "direct">("warm");

  const manners = {
    warm: {
      label: "Warm",
      transcript: "Of course, Riya. I can hold it until 6 PM tomorrow and send you a reminder before it expires.",
      tags: ["English + Bengali", "Use customer's name", "Never overpromise"],
    },
    formal: {
      label: "Formal",
      transcript: "Certainly, Ms. Riya. I have placed a reservation hold until 18:00 hours tomorrow. A formal confirmation has been issued.",
      tags: ["English + Hindi", "Formal honorifics", "Strict policy cited"],
    },
    direct: {
      label: "Direct",
      transcript: "Hold confirmed until tomorrow, 6:00 PM. Barcode and directions sent to your phone.",
      tags: ["Concise English", "Action-first", "Zero filler words"],
    },
  };

  const current = manners[selectedManner];

  return (
    <section
      id="hp-10"
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
          Your Business. Your Manner.
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="hp10-grid"
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
              People remember how<br />
              a business makes them<br />
              feel. <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
                Namuste learns how yours should sound.
              </span>
            </h2>

            <p
              style={{
                fontSize: "clamp(15.5px, 1.3vw, 18px)",
                color: "#A1A1AA",
                lineHeight: 1.65,
                maxWidth: "480px",
                marginBottom: "36px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Choose the warmth, formality, vocabulary and boundaries. Namuste carries them into every conversation — consistently.
            </p>

            {/* Primary CTA from Screenshot 3 */}
            <div style={{ marginBottom: "28px" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  background: "transparent",
                  border: "1px solid rgba(155, 234, 22, 0.5)",
                  color: "#9BEA16",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#8FD813";
                  e.currentTarget.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#9BEA16";
                }}
              >
                <span>Shape your receptionist</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <p className="serif-italic" style={{ fontSize: "14.5px", color: "#8E8E93", fontStyle: "italic", margin: 0 }}>
              A recognisable manner. In every conversation.
            </p>
          </div>

          {/* Right Column: Interactive Manner Calibration Simulator (Exact from Screenshot 3) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "540px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            {/* 1. Customer Input Card (Screenshot 3) */}
            <div
              style={{
                padding: "16px 22px",
                borderRadius: "16px",
                background: "rgba(15, 15, 15, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#F87171", textTransform: "uppercase", marginBottom: "8px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F87171" }} />
                Customer
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#F5F5F0" }}>
                <User size={16} style={{ color: "#9BEA16" }} />
                <span>Can you hold this for me until tomorrow?</span>
              </div>
            </div>

            {/* 2. Choose Your Manner Segmented Bar (Screenshot 3) */}
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "#8E8E93", marginBottom: "8px" }}>
                Choose Your Manner
              </div>
              <div
                style={{
                  display: "flex",
                  borderRadius: "14px",
                  background: "rgba(10, 10, 10, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "4px",
                }}
              >
                {(["warm", "formal", "direct"] as const).map((m) => {
                  const active = selectedManner === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setSelectedManner(m)}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                        background: active ? "rgba(155, 234, 22, 0.15)" : "transparent",
                        color: active ? "#9BEA16" : "#A1A1AA",
                        border: active ? "1px solid #9BEA16" : "1px solid transparent",
                      }}
                    >
                      {active && <Check size={13} strokeWidth={3} />}
                      <span>{manners[m].label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tags below selector (Screenshot 3) */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginTop: "12px", fontSize: "12px", color: "#A1A1AA" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Globe size={13} style={{ color: "#9BEA16" }} /> {current.tags[0]}
                </span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <User size={13} style={{ color: "#9BEA16" }} /> {current.tags[1]}
                </span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldCheck size={13} style={{ color: "#9BEA16" }} /> {current.tags[2]}
                </span>
              </div>
            </div>

            {/* Dotted green path */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "1px", height: "16px", background: "#9BEA16", opacity: 0.6 }} />
            </div>

            {/* 3. Output Response Card (Screenshot 3) */}
            <div
              style={{
                padding: "20px 24px",
                borderRadius: "16px",
                background: "rgba(10, 16, 10, 0.9)",
                border: "1px solid rgba(155, 234, 22, 0.35)",
                boxShadow: "0 0 30px rgba(155, 234, 22, 0.1)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#9BEA16", textTransform: "uppercase" }}>
                  Namuste • {current.label.toUpperCase()}
                </div>
                <img
                  src="/logo.png"
                  alt="Namuste"
                  style={{
                    height: "14px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Headphones size={18} style={{ color: "#9BEA16", flexShrink: 0, marginTop: "2px" }} />
                <p style={{ fontSize: "14px", color: "#F5F5F0", margin: 0, lineHeight: 1.6 }}>
                  &ldquo;{current.transcript}&rdquo;
                </p>
              </div>
            </div>

            {/* 4. Consistent Across (Screenshot 3) */}
            <div
              style={{
                padding: "12px 18px",
                borderRadius: "12px",
                background: "rgba(15, 15, 15, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
              }}
            >
              <span style={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "#8E8E93" }}>
                Consistent Across
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#D4D0C7" }}>
                <Check size={13} style={{ color: "#9BEA16" }} />
                <span>Voice • WhatsApp • Web</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hp10-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
