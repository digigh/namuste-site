"use client";

import React, { useState } from "react";
import { Smile, Briefcase, Zap, Volume2, CheckCircle2, ShieldCheck } from "lucide-react";

export type MannerType = "warm" | "formal" | "direct";

const MANNERS_DATA: Record<
  MannerType,
  {
    name: string;
    tagline: string;
    icon: React.ElementType;
    bestFor: string;
    transcript: string;
    audioWave: number[];
  }
> = {
  warm: {
    name: "Warm & Empathetic",
    tagline: "High-touch, reassuring and hospitable",
    icon: Smile,
    bestFor: "Clinics, Aesthetic Salons, Luxury Real Estate & Hospitality",
    transcript:
      "Hello! Thank you for calling Dr. Mehta's clinic. We would love to take care of that for you. Dr. Mehta has a convenient opening tomorrow at 5:30 PM. I will hold that for you right now, and send all the directions to your WhatsApp so you don't have to worry about anything.",
    audioWave: [30, 50, 70, 85, 60, 90, 75, 50, 80, 65, 40, 70, 85, 55, 30],
  },
  formal: {
    name: "Formal & Professional",
    tagline: "Structured, compliant and respectful",
    icon: Briefcase,
    bestFor: "Law Firms, Chartered Accountants, Wealth Advisory & Corporate Offices",
    transcript:
      "Namuste. You have reached the chambers of Adv. Sharma. In reference to your query regarding the commercial lease deed, Senior Associate Adv. Sharma is available for a formal consultation on Friday at 3:00 PM. Our preliminary consultation fee is ₹3,500. May I confirm this appointment on your behalf?",
    audioWave: [25, 45, 60, 75, 80, 65, 50, 70, 60, 45, 55, 65, 50, 35, 20],
  },
  direct: {
    name: "Direct & Fast-Paced",
    tagline: "Concise, factual and action-first",
    icon: Zap,
    bestFor: "Distributors, Logistics Hubs, Emergency Desks & Quick Commerce",
    transcript:
      "Namuste. 40 metric tonnes of 0.8mm Galvanized Coil is in stock at Pune Plant Line 2 for immediate dispatch. Commercial PO confirmation has been routed to Regional Sales Head Alok. Expected delivery window is 24 hours.",
    audioWave: [60, 90, 100, 95, 85, 90, 70, 85, 95, 80, 90, 75, 60, 40, 20],
  },
};

export default function MannerSwitcher() {
  const [selectedManner, setSelectedManner] = useState<MannerType>("warm");
  const current = MANNERS_DATA[selectedManner];
  const Icon = current.icon;

  return (
    <div style={{ width: "100%" }}>
      {/* 3 Manner Selector Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
          marginBottom: "32px",
        }}
      >
        {(Object.keys(MANNERS_DATA) as MannerType[]).map((key) => {
          const item = MANNERS_DATA[key];
          const isSelected = selectedManner === key;
          const MannerIcon = item.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedManner(key)}
              style={{
                padding: "24px",
                borderRadius: "18px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isSelected ? "rgba(118, 192, 67, 0.14)" : "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.08)"}`,
                boxShadow: isSelected ? "0 0 25px rgba(118, 192, 67, 0.2)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.08)",
                    color: isSelected ? "#050505" : "var(--text-muted)",
                  }}
                >
                  <MannerIcon size={18} />
                </span>
                <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                  {key}
                </span>
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-ivory)", marginBottom: "6px" }}>{item.name}</h4>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{item.tagline}</p>
            </button>
          );
        })}
      </div>

      {/* Live Voice Delivery Simulation Box */}
      <div
        className="glass-card"
        style={{
          padding: "36px",
          borderRadius: "22px",
          background: "rgba(11, 14, 11, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "20px", marginBottom: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "var(--green)" }}>
                Calibrated Delivery Manner: {current.name}
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Recommended for: {current.bestFor}</p>
            </div>
          </div>

          <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, background: "rgba(255, 255, 255, 0.05)", color: "var(--text-ivory)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={14} style={{ color: "var(--green)" }} /> Same 100% Factual Grounding
          </span>
        </div>

        {/* Dialogue Voice Transcript */}
        <div style={{ padding: "24px", borderRadius: "18px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(118, 192, 67, 0.25)" }}>
          <div style={{ fontSize: "11px", color: "var(--green)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Volume2 size={14} /> Voice Delivery Transcript
          </div>
          <p className="serif" style={{ fontSize: "16px", color: "var(--text-ivory)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 20px 0" }}>
            &ldquo;{current.transcript}&rdquo;
          </p>

          {/* Voice Wave Animation */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Volume2 size={16} style={{ color: "var(--green)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "16px", flex: 1 }}>
              {current.audioWave.map((h, i) => (
                <div
                  key={i}
                  style={{ width: "3px", background: "var(--green)", borderRadius: "2px", height: `${h}%`, opacity: 0.8 }}
                />
              ))}
            </div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "monospace" }}>Custom Brand Voice Tuned</span>
          </div>
        </div>

        <div style={{ marginTop: "16px", fontSize: "12.5px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
          <CheckCircle2 size={14} style={{ color: "var(--green)" }} />
          <span>Factual accuracy and operational rules remain identical across all manner configurations.</span>
        </div>
      </div>
    </div>
  );
}
