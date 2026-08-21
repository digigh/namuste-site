"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Volume2 } from "lucide-react";

export default function HP07Multilingual() {
  const [selectedLang, setSelectedLang] = useState<string>("Hindi");

  const languages = ["Hindi", "Bengali", "Tamil", "Marathi", "Telugu", "More"];

  return (
    <section
      id="hp-07"
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
          Speak Naturally.
        </div>

        {/* Headline */}
        <div style={{ maxWidth: "860px", marginBottom: "28px" }}>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(38px, 4.5vw, 66px)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#F5F5F0",
              marginBottom: "18px",
            }}
          >
            Your customers will not<br />
            always speak in one language.<br />
            <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
              Neither should your receptionist.
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 19px)",
              color: "#A1A1AA",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Namuste follows accents, context and code-switching — so customers can speak the way they already do.
          </p>
        </div>

        {/* Central Luminous Acoustic Orb with 4 Radiating Bubbles (Exact from Screenshot 5) */}
        <div
          style={{
            position: "relative",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "40px 0",
          }}
          className="hp07-canvas"
        >
          {/* Top Status Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(248, 113, 113, 0.12)",
              border: "1px solid rgba(248, 113, 113, 0.3)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#F87171",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F87171", animation: "pulse 1.5s infinite" }} />
            Digital Receptionist • Listening
          </div>

          {/* Glowing Center Waveform Orb */}
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(155, 234, 22, 0.15) 0%, #000000 70%)",
              border: "2px solid #9BEA16",
              boxShadow: "0 0 50px rgba(155, 234, 22, 0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              padding: "16px",
            }}
          >
            <img
              src="/logo.png"
              alt="Namuste"
              style={{
                height: "18px",
                width: "auto",
                objectFit: "contain",
                marginBottom: "8px",
              }}
            />
            {/* Audio Wave Visualizer Bars inside Orb */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "60px" }}>
              {[20, 35, 60, 90, 75, 40, 85, 100, 70, 50, 85, 60, 30, 20].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: `${h}%`,
                    background: "#9BEA16",
                    borderRadius: "2px",
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          </div>

          {/* SVG Radiating Connecting Lines */}
          <svg
            viewBox="0 0 1000 400"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {/* Left Top: Hindi */}
            <path d="M 500 200 C 420 200, 360 120, 280 120" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Left Bottom: Tamil */}
            <path d="M 500 200 C 420 200, 360 280, 280 280" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Right Top: Bangla */}
            <path d="M 500 200 C 580 200, 640 120, 720 120" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Right Bottom: English */}
            <path d="M 500 200 C 580 200, 640 280, 720 280" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Center Down: Understood Outcome */}
            <path d="M 500 300 L 500 350" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.8" />
          </svg>

          {/* 4 Radiating Native Speech Bubbles (Exact from Screenshot 5) */}
          {/* 1. Hindi + English (Top Left) */}
          <div
            style={{
              position: "absolute",
              left: "12%",
              top: "14%",
              zIndex: 10,
              padding: "14px 18px",
              borderRadius: "14px",
              background: "rgba(15, 15, 15, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              maxWidth: "260px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#8E8E93", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
              Hindi + English
            </div>
            <div style={{ fontSize: "13px", color: "#F5F5F0", lineHeight: 1.4 }}>
              Kal morning ka appointment mil sakta hai?
            </div>
          </div>

          {/* 2. Bangla (Top Right) */}
          <div
            style={{
              position: "absolute",
              right: "12%",
              top: "14%",
              zIndex: 10,
              padding: "14px 18px",
              borderRadius: "14px",
              background: "rgba(15, 15, 15, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              maxWidth: "260px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#8E8E93", fontWeight: 700, marginBottom: "4px" }}>
              বাংলা
            </div>
            <div style={{ fontSize: "13.5px", color: "#F5F5F0", lineHeight: 1.4 }}>
              আগামীকাল ডাক্তার কখন বসবেন?
            </div>
          </div>

          {/* 3. Tamil (Bottom Left) */}
          <div
            style={{
              position: "absolute",
              left: "12%",
              bottom: "22%",
              zIndex: 10,
              padding: "14px 18px",
              borderRadius: "14px",
              background: "rgba(15, 15, 15, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              maxWidth: "260px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#8E8E93", fontWeight: 700, marginBottom: "4px" }}>
              தமிழ்
            </div>
            <div style={{ fontSize: "13.5px", color: "#F5F5F0", lineHeight: 1.4 }}>
              நாளைக்கு நேரம் கிடைக்குமா?
            </div>
          </div>

          {/* 4. English (Bottom Right) */}
          <div
            style={{
              position: "absolute",
              right: "12%",
              bottom: "22%",
              zIndex: 10,
              padding: "14px 18px",
              borderRadius: "14px",
              background: "rgba(15, 15, 15, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              maxWidth: "260px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#8E8E93", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
              English
            </div>
            <div style={{ fontSize: "13px", color: "#F5F5F0", lineHeight: 1.4 }}>
              Can I come in tomorrow morning?
            </div>
          </div>

          {/* 5. Center Outcome Tag (Exact from Screenshot 5) */}
          <div
            style={{
              position: "absolute",
              bottom: "2%",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "14px",
              background: "rgba(10, 18, 10, 0.95)",
              border: "1px solid rgba(155, 234, 22, 0.4)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.9)",
            }}
          >
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#F97316", color: "#000000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={11} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9BEA16" }}>
                UNDERSTOOD
              </div>
              <div style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 500 }}>
                Appointment enquiry • Tomorrow morning
              </div>
            </div>
          </div>
        </div>

        {/* Language Tabs Selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
          {languages.map((lang) => {
            const active = selectedLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: active ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.04)",
                  color: active ? "#9BEA16" : "#A1A1AA",
                  border: `1px solid ${active ? "rgba(155, 234, 22, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                }}
              >
                {lang}
              </button>
            );
          })}
        </div>

        <p style={{ fontSize: "14px", color: "#8E8E93", marginBottom: "24px" }}>
          Customers switch languages. Context does not get lost.
        </p>

        {/* Primary CTA & Signature Footnote (Exact from Screenshot 5) */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
            <span>Let Namuste listen</span>
            <ArrowRight size={14} />
          </Link>

          <p className="serif-italic" style={{ fontSize: "15px", color: "#D4D0C7", fontStyle: "italic", margin: 0 }}>
            Less &lsquo;press one&rsquo;. More &lsquo;haan, boliye&rsquo;.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hp07-canvas { min-height: 560px !important; }
        }
      `}</style>
    </section>
  );
}
