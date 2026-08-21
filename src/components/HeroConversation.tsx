"use client";

import { useState } from "react";
import { Phone, MessageSquare, Clock, CheckCircle2, Play, Pause, Volume2, Sparkles } from "lucide-react";

export default function HeroConversation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"missed" | "resolved">("resolved");

  return (
    <div
      className="glass-card"
      style={{
        padding: "24px",
        borderRadius: "18px",
        border: "1px solid var(--border)",
        background: "rgba(12, 12, 12, 0.75)",
        backdropFilter: "blur(20px)",
        maxWidth: "480px",
        width: "100%",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Header with Live Status Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "16px",
          marginBottom: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 12px var(--green)",
            }}
          />
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-ivory)" }}>
            Namuste Intelligence Active
          </span>
        </div>
        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Omnichannel Engine</span>
      </div>

      {/* Voice Call Simulation Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(118, 192, 67, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--green)",
              }}
            >
              <Phone size={16} />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-ivory)" }}>Inbound Patient Call</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Bangalore Clinic · 00:42</div>
            </div>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--border)",
              color: "var(--text-ivory)",
              borderRadius: "999px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "Pause" : "Listen"}</span>
          </button>
        </div>

        {/* Audio Waveform visualization */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "28px", padding: "4px 0" }}>
          {[12, 24, 18, 30, 26, 14, 28, 32, 20, 15, 27, 34, 22, 16, 29, 21, 13, 25, 30, 18].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: isPlaying ? `${h}px` : "6px",
                background: isPlaying ? "var(--green-luminous)" : "rgba(255, 255, 255, 0.15)",
                borderRadius: "2px",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Structured Transformation Output */}
      <div
        style={{
          background: "rgba(18, 26, 18, 0.7)",
          border: "1px solid rgba(118, 192, 67, 0.25)",
          borderRadius: "14px",
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Sparkles size={14} style={{ color: "var(--green)" }} />
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--green)" }}>Organised Business Outcome</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12.5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Enquiry:</span>
            <span style={{ color: "var(--text-ivory)", fontWeight: 500 }}>Dermatology Consultation</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Preferred Slot:</span>
            <span style={{ color: "var(--text-ivory)", fontWeight: 500 }}>Tomorrow, 5:30 PM</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Status:</span>
            <span style={{ color: "var(--green-luminous)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 size={13} /> Confirmed in EMR & WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
