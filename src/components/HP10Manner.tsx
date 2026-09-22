"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Headphones, Check, ArrowRight, Globe, ShieldCheck, Sparkles, Volume2, MessageSquare } from "lucide-react";

export default function HP10Manner() {
  const [selectedManner, setSelectedManner] = useState<"warm" | "formal" | "direct">("warm");

  const manners = {
    warm: {
      label: "Warm",
      subtitle: "Empathetic & Personal",
      transcript: "Of course, Riya. I can hold it until 6 PM tomorrow and send you a reminder before it expires.",
      tags: ["English + Bengali", "Uses Customer's Name", "Empathetic Assurance"],
      toneColor: "#9BEA16",
    },
    formal: {
      label: "Formal",
      subtitle: "Professional & Protocol-led",
      transcript: "Certainly, Ms. Riya. I have placed a reservation hold until 18:00 hours tomorrow. A formal confirmation has been issued.",
      tags: ["English + Hindi", "Formal Honorifics", "Strict Policy Cited"],
      toneColor: "#60A5FA",
    },
    direct: {
      label: "Direct",
      subtitle: "Fast & Action-first",
      transcript: "Hold confirmed until tomorrow, 6:00 PM. Barcode and directions sent to your phone.",
      tags: ["Concise English", "Action-first", "Zero Filler Words"],
      toneColor: "#F59E0B",
    },
  };

  const current = manners[selectedManner];

  return (
    <section
      id="hp-10"
      className="hp10-section-pad"
      style={{
        minHeight: "90vh",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11.5px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16" }} />
          Your Business. Your Manner.
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="hp10-grid"
        >
          {/* Left Column: Formatted Poetic Headline & Story */}
          <div>
            <h2
              style={{
                fontSize: "clamp(34px, 4.2vw, 58px)",
                fontWeight: 700,
                lineHeight: 1.16,
                letterSpacing: "-0.02em",
                color: "var(--text-ivory)",
                marginBottom: "22px",
              }}
            >
              People remember how a<br />
              business makes them feel.<br />
              <span style={{ color: "var(--green)", fontWeight: 600 }}>
                Namuste learns how yours should sound.
              </span>
            </h2>

            <p
              style={{
                fontSize: "clamp(15px, 1.25vw, 17.5px)",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: "500px",
                marginBottom: "32px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Choose the warmth, formality, vocabulary and boundaries. Namuste carries them into every conversation — with unwavering consistency.
            </p>

            {/* Primary CTA */}
            <div style={{ marginBottom: "24px" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 28px",
                  borderRadius: "8px",
                  background: "#9BEA16",
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 0 25px rgba(155, 234, 22, 0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>Shape your receptionist</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <p style={{ fontSize: "14.5px", color: "var(--text-muted)", fontWeight: 600, margin: 0 }}>
              A recognisable brand voice. In every customer interaction.
            </p>
          </div>

          {/* Right Column: Hyper-Luxurious Brand Tone & Acoustic Persona Console */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "540px",
              margin: "0 auto",
              width: "100%",
              background: "rgba(12, 14, 12, 0.8)",
              border: "1px solid var(--border2)",
              borderRadius: "22px",
              padding: "26px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 40px rgba(155, 234, 22, 0.04)",
              backdropFilter: "blur(20px)",
              position: "relative",
            }}
          >
            {/* 1. Customer Input Card */}
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "14px",
                background: "rgba(18, 18, 22, 0.85)",
                border: "1px solid var(--border2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", color: "#F87171", textTransform: "uppercase" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F87171" }} />
                  Customer Query
                </span>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "var(--text-muted)" }}>10:24 AM</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "var(--text-ivory)" }}>
                <User size={15} style={{ color: "#9BEA16", flexShrink: 0 }} />
                <span>&ldquo;Can you hold this for me until tomorrow?&rdquo;</span>
              </div>
            </div>

            {/* 2. Choose Your Manner Segmented Selector */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "10.5px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                  Choose Your Manner
                </div>
                <div style={{ fontSize: "11px", color: current.toneColor, fontWeight: 600 }}>
                  {current.subtitle}
                </div>
              </div>

              {/* Segmented Buttons */}
              <div
                style={{
                  display: "flex",
                  borderRadius: "12px",
                  background: "rgba(8, 8, 10, 0.9)",
                  border: "1px solid var(--border)",
                  padding: "4px",
                  gap: "4px",
                }}
              >
                {(["warm", "formal", "direct"] as const).map((m) => {
                  const active = selectedManner === m;
                  const item = manners[m];
                  return (
                    <button
                      key={m}
                      onClick={() => setSelectedManner(m)}
                      style={{
                        flex: 1,
                        padding: "9px 12px",
                        borderRadius: "8px",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                        background: active ? "rgba(155, 234, 22, 0.16)" : "transparent",
                        color: active ? "#9BEA16" : "var(--text-muted)",
                        border: active ? "1px solid #9BEA16" : "1px solid transparent",
                        boxShadow: active ? "0 0 15px rgba(155, 234, 22, 0.2)" : "none",
                      }}
                    >
                      {active && <Check size={13} strokeWidth={3} />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Behavioral Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginTop: "10px", fontSize: "11.5px", color: "var(--text-body)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: "6px" }}>
                  <Globe size={12} style={{ color: "#9BEA16" }} /> {current.tags[0]}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: "6px" }}>
                  <User size={12} style={{ color: "#9BEA16" }} /> {current.tags[1]}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: "6px" }}>
                  <ShieldCheck size={12} style={{ color: "#9BEA16" }} /> {current.tags[2]}
                </span>
              </div>
            </div>

            {/* Connecting Vertical Laser Flow */}
            <div style={{ display: "flex", justifyContent: "center", margin: "-4px 0" }}>
              <div style={{ width: "2px", height: "14px", background: "linear-gradient(180deg, #9BEA16, transparent)", opacity: 0.8 }} />
            </div>

            {/* 3. Output Response Card with Animated Speech Waves */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedManner}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: "18px 22px",
                  borderRadius: "16px",
                  background: "rgba(14, 20, 14, 0.95)",
                  border: "1px solid rgba(155, 234, 22, 0.35)",
                  boxShadow: "0 0 30px rgba(155, 234, 22, 0.12)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", color: "#9BEA16", textTransform: "uppercase" }}>
                    <span>Namuste • {current.label.toUpperCase()}</span>
                  </div>

                  {/* Micro Audio Equalizer Waveform */}
                  <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "14px" }}>
                    {[8, 14, 6, 16, 10].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: [h * 0.4, h, h * 0.3] }}
                        transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: "easeInOut" }}
                        style={{ width: "2px", borderRadius: "1px", background: "#9BEA16", display: "inline-block" }}
                      />
                    ))}
                  </div>

                  <img
                    src="/logo.png"
                    alt="Namuste"
                    style={{
                      height: "13px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <Headphones size={16} style={{ color: "#9BEA16", flexShrink: 0, marginTop: "3px" }} />
                  <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", margin: 0, lineHeight: 1.6 }}>
                    &ldquo;{current.transcript}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 4. Multi-Channel Consistency Banner */}
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                background: "rgba(15, 15, 18, 0.7)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "11.5px",
              }}
            >
              <span style={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                Consistent Across
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-body)", fontWeight: 500 }}>
                <Check size={13} style={{ color: "#9BEA16" }} />
                <span>Voice • WhatsApp • Web</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hp10-section-pad {
          padding: 120px 40px 100px;
        }
        @media (max-width: 900px) {
          .hp10-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .hp10-section-pad {
            padding: 60px 20px 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
