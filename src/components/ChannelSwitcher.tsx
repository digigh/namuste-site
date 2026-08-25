"use client";

import { useState } from "react";
import { PhoneCall, MessageSquare, Globe, ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChannelSwitcher() {
  const [activeChannel, setActiveChannel] = useState<"voice" | "whatsapp" | "web">("voice");

  const channels = [
    {
      id: "voice",
      name: "Voice AI",
      icon: <PhoneCall size={17} />,
      tagline: "Natural, sub-second spoken conversations across Indian & Global languages",
      incoming: "Caller: 'Namaste, I want to know if Dr. Roy is available for a skin consultation on Thursday evening?'",
      namusteResponse: "Namuste: 'Namaste! Yes, Dr. Roy has two slots on Thursday — 5:15 PM and 6:30 PM. Which one suits you better?'",
      outcome: "Slot selected for 5:15 PM · Patient details captured · Confirmation sent via SMS & WhatsApp · Doctor calendar synced",
      metrics: ["<600ms latency", "12+ languages", "Intelligent human transfer"],
    },
    {
      id: "whatsapp",
      name: "WhatsApp AI",
      icon: <MessageSquare size={17} />,
      tagline: "24/7 interactive messaging with quick-reply buttons, catalogs, and persistent history",
      incoming: "Client: 'Hi, I received an invoice notice. Can you share my outstanding balance and payment link?'",
      namusteResponse: "Namuste: 'Hello! Your verified account balance for Invoice #8492 is ₹14,200. Here is your secure UPI/Razorpay payment link.'",
      outcome: "Invoice authenticated · Payment link dispatched · Payment status monitored · Receipt auto-generated",
      metrics: ["Official WhatsApp API", "Rich media & catalogs", "Auto-re-engagement"],
    },
    {
      id: "web",
      name: "Web Concierge",
      icon: <Globe size={17} />,
      tagline: "Instant website guide converting passive visitors into qualified discovery calls",
      incoming: "Visitor: 'We run a 5-doctor polyclinic. Does Namuste integrate with Practo and Google Calendar?'",
      namusteResponse: "Namuste: 'Yes! Namuste syncs real-time with Google Calendar, Practo, and custom clinic management EMRs with zero double-booking.'",
      outcome: "Clinic requirements qualified · Custom demo calendared · Case study PDF delivered to visitor email",
      metrics: ["Zero-friction widget", "Custom brand styling", "Real-time CRM push"],
    },
  ];

  const current = channels.find((c) => c.id === activeChannel)!;

  return (
    <div style={{ width: "100%" }}>
      {/* Switcher Buttons */}
      <div
        className="channel-switcher-tabs"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "28px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "16px",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {channels.map((c) => {
          const isActive = activeChannel === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveChannel(c.id as any)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: isActive ? "rgba(155, 234, 22, 0.16)" : "rgba(255, 255, 255, 0.04)",
                border: `1px solid ${isActive ? "#9BEA16" : "rgba(255, 255, 255, 0.08)"}`,
                color: isActive ? "#9BEA16" : "#A1A1AA",
                padding: "9px 20px",
                borderRadius: "999px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                boxShadow: isActive ? "0 0 20px rgba(155, 234, 22, 0.2)" : "none",
              }}
            >
              {c.icon}
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Channel Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChannel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="channel-display-card"
          style={{
            borderRadius: "22px",
            background: "rgba(14, 16, 14, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 40px rgba(155, 234, 22, 0.04)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Left: Dialogue Progression */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16" }} />
                {current.name} Experience
              </span>
            </div>
            <p style={{ fontSize: "14.5px", color: "#D4D0C7", marginBottom: "22px", lineHeight: 1.6 }}>
              {current.tagline}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Incoming Message */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  fontSize: "13.5px",
                  color: "#D4D0C7",
                  lineHeight: 1.55,
                }}
              >
                {current.incoming}
              </div>

              {/* Namuste Response */}
              <div
                style={{
                  background: "rgba(155, 234, 22, 0.08)",
                  border: "1px solid rgba(155, 234, 22, 0.3)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  fontSize: "13.5px",
                  color: "#F5F5F0",
                  lineHeight: 1.55,
                  boxShadow: "0 0 25px rgba(155, 234, 22, 0.06)",
                }}
              >
                {current.namusteResponse}
              </div>
            </div>
          </div>

          {/* Right: Outcome Box */}
          <div
            style={{
              background: "rgba(10, 16, 10, 0.95)",
              border: "1px solid rgba(155, 234, 22, 0.35)",
              borderRadius: "18px",
              padding: "24px",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.7)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <Sparkles size={16} style={{ color: "#9BEA16" }} />
              <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9BEA16", margin: 0 }}>
                Structured Outcome
              </h4>
            </div>

            <p style={{ fontSize: "13.5px", color: "#F5F5F0", lineHeight: 1.6, marginBottom: "20px" }}>
              {current.outcome}
            </p>

            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#8E8E93", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Key Channel Features
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {current.metrics.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#D4D0C7" }}>
                    <Check size={14} style={{ color: "#9BEA16" }} />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        .channel-display-card {
          padding: 36px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 36px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .channel-display-card {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 24px 18px !important;
          }
        }
      `}</style>
    </div>
  );
}
