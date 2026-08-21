"use client";

import { useState } from "react";
import { PhoneCall, MessageSquare, Globe, ArrowRight, Check, Sparkles } from "lucide-react";

export default function ChannelSwitcher() {
  const [activeChannel, setActiveChannel] = useState<"voice" | "whatsapp" | "web">("voice");

  const channels = [
    {
      id: "voice",
      name: "Voice AI",
      icon: <PhoneCall size={18} />,
      tagline: "Natural, sub-second spoken conversations across Indian & Global languages",
      incoming: "Caller: 'Namaste, I want to know if Dr. Roy is available for a skin consultation on Thursday evening?'",
      namusteResponse: "Namuste: 'Namaste! Yes, Dr. Roy has two slots on Thursday — 5:15 PM and 6:30 PM. Which one suits you better?'",
      outcome: "Slot selected for 5:15 PM · Patient details captured · Confirmation sent via SMS & WhatsApp · Doctor calendar synced",
      metrics: ["<600ms latency", "12+ languages", "Intelligent human transfer"],
    },
    {
      id: "whatsapp",
      name: "WhatsApp AI",
      icon: <MessageSquare size={18} />,
      tagline: "24/7 interactive messaging with quick-reply buttons, catalogs, and persistent history",
      incoming: "Client: 'Hi, I received an invoice notice. Can you share my outstanding balance and payment link?'",
      namusteResponse: "Namuste: 'Hello! Your verified account balance for Invoice #8492 is ₹14,200. Here is your secure UPI/Razorpay payment link.'",
      outcome: "Invoice authenticated · Payment link dispatched · Payment status monitored · Receipt auto-generated",
      metrics: ["Official WhatsApp API", "Rich media & catalogs", "Auto-re-engagement"],
    },
    {
      id: "web",
      name: "Web Concierge",
      icon: <Globe size={18} />,
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
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "32px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "16px",
          overflowX: "auto",
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
                background: isActive ? "rgba(118, 192, 67, 0.12)" : "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${isActive ? "var(--green)" : "var(--border)"}`,
                color: isActive ? "var(--green-luminous)" : "var(--text-muted)",
                padding: "10px 20px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {c.icon}
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Channel Display */}
      <div
        className="glass-card"
        style={{
          padding: "36px",
          borderRadius: "20px",
          background: "rgba(15, 15, 15, 0.8)",
          border: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "36px",
          alignItems: "center",
        }}
      >
        {/* Left: Dialogue Progression */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <span className="pill">{current.name} Experience</span>
          </div>
          <p style={{ fontSize: "15px", color: "var(--text-body)", marginBottom: "24px", lineHeight: 1.6 }}>
            {current.tagline}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Incoming Message */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "13.5px",
                color: "var(--text-body)",
              }}
            >
              {current.incoming}
            </div>

            {/* Namuste Response */}
            <div
              style={{
                background: "rgba(118, 192, 67, 0.08)",
                border: "1px solid rgba(118, 192, 67, 0.25)",
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "13.5px",
                color: "var(--text-ivory)",
              }}
            >
              {current.namusteResponse}
            </div>
          </div>
        </div>

        {/* Right: Outcome Box */}
        <div
          style={{
            background: "rgba(10, 18, 10, 0.9)",
            border: "1px solid rgba(118, 192, 67, 0.3)",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Sparkles size={16} style={{ color: "var(--green)" }} />
            <h4 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--green)" }}>
              Structured Outcome
            </h4>
          </div>

          <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.6, marginBottom: "24px" }}>
            {current.outcome}
          </p>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "18px" }}>
            <div style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "10px", textTransform: "uppercase" }}>
              Key Channel Features
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {current.metrics.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "var(--text-body)" }}>
                  <Check size={14} style={{ color: "var(--green)" }} />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
