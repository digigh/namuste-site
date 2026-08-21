"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, ArrowRight, Brain, AlertCircle, ShieldAlert } from "lucide-react";

export default function HP09Handoff() {
  const [selectedCase, setSelectedCase] = useState<"sensitive" | "approval" | "human">("approval");

  const caseData = {
    sensitive: {
      tag: "Sensitive request",
      customerTime: "09:45 AM",
      customerQuery: "I am experiencing unexpected post-procedure pain and need immediate medical review.",
      centerLabel: "CLINICAL TRIAGE ESCALATION",
      centerSub: "Priority clinical routing",
      leadName: "Dr. Rohit · Duty Medical Registrar",
      topic: "Post-op symptom triage",
      history: "1 surgical record • Yesterday",
      nextStep: "Review vitals & clinical callback",
    },
    approval: {
      tag: "Approval needed",
      customerTime: "10:24 AM",
      customerQuery: "I need to discuss an exception to our commercial enterprise agreement.",
      centerLabel: "JUDGEMENT REQUIRED",
      centerSub: "Escalating with context",
      leadName: "Meera · Account Lead",
      topic: "Contract exception",
      history: "3 conversations",
      nextStep: "Review terms & discount approval",
    },
    human: {
      tag: "Customer asks for a person",
      customerTime: "11:15 AM",
      customerQuery: "Please connect me directly to my relationship manager.",
      centerLabel: "DIRECT STAFF TRANSFER",
      centerSub: "Immediate desk transfer",
      leadName: "Kabir · Relationship Manager",
      topic: "Direct customer request",
      history: "5 past transactions",
      nextStep: "Warm handover with full call history",
    },
  };

  const current = caseData[selectedCase];

  return (
    <section
      id="hp-09"
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
          Knowing When to Step Aside.
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
            Some conversations<br />
            need a person. Namuste<br />
            <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
              knows which ones.
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
            When judgement, sensitivity or approval is required, Namuste brings in the right person — with the entire conversation already understood.
          </p>
        </div>

        {/* 3 Pill Selectors (Screenshot 2) */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {[
            { id: "sensitive" as const, label: "Sensitive request" },
            { id: "approval" as const, label: "Approval needed" },
            { id: "human" as const, label: "Customer asks for a person" },
          ].map((pill) => {
            const active = selectedCase === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedCase(pill.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: active ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.04)",
                  color: active ? "#9BEA16" : "#A1A1AA",
                  border: `1px solid ${active ? "rgba(155, 234, 22, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: active ? "#9BEA16" : "rgba(255,255,255,0.3)" }} />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Progression: Customer Input -> Center Brain Node -> Handoff Ready Packet (Exact from Screenshot 2) */}
        <div
          style={{
            position: "relative",
            minHeight: "360px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px 0",
            margin: "20px 0 40px",
          }}
          className="hp09-canvas"
        >
          {/* Connecting SVG Flow Line */}
          <svg
            viewBox="0 0 900 300"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {/* Left to Center */}
            <path d="M 220 150 L 400 150" fill="none" stroke="#9BEA16" strokeWidth="1.5" />
            <circle cx="220" cy="150" r="4" fill="#9BEA16" />

            {/* Center to Right */}
            <path d="M 480 150 L 620 150" fill="none" stroke="#9BEA16" strokeWidth="1.5" />
            <circle cx="620" cy="150" r="4" fill="#9BEA16" />
          </svg>

          {/* 1. Left Card: Customer Input (Screenshot 2) */}
          <div
            style={{
              zIndex: 10,
              width: "240px",
              padding: "18px 20px",
              borderRadius: "16px",
              background: "rgba(15, 15, 15, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "#8E8E93", fontWeight: 700, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16" }} />
                Customer
              </span>
              <span style={{ fontSize: "10.5px", fontFamily: "monospace", color: "#71717A" }}>{current.customerTime}</span>
            </div>
            <p style={{ fontSize: "13px", color: "#F5F5F0", margin: 0, lineHeight: 1.5 }}>
              &ldquo;{current.customerQuery}&rdquo;
            </p>
          </div>

          {/* 2. Center Glowing Coral Brain Orb (Screenshot 2) */}
          <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(248, 113, 113, 0.2) 0%, #000000 70%)",
                border: "2px solid #F87171",
                boxShadow: "0 0 35px rgba(248, 113, 113, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9BEA16",
                marginBottom: "12px",
              }}
            >
              <Brain size={36} style={{ color: "#9BEA16" }} />
            </div>
            <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#F5F5F0" }}>
              {current.centerLabel}
            </div>
            <div style={{ fontSize: "11px", color: "#8E8E93", marginTop: "2px" }}>
              {current.centerSub}
            </div>
          </div>

          {/* 3. Right Card: Golden Handoff Ready Packet (Screenshot 2) */}
          <div
            style={{
              zIndex: 10,
              width: "300px",
              padding: "24px",
              borderRadius: "18px",
              background: "rgba(12, 12, 10, 0.95)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              boxShadow: "0 0 35px rgba(245, 158, 11, 0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#F5F5F0" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F59E0B" }} />
                Handoff Ready
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

            {/* Officer Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "14px", marginBottom: "14px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F5F0" }}>
                <User size={18} />
              </div>
              <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#F5F5F0" }}>
                {current.leadName}
              </div>
            </div>

            {/* Context Telemetry Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
              <div><span style={{ color: "#8E8E93" }}>Customer: </span><strong style={{ color: "#F5F5F0" }}>Arjun Mehta</strong></div>
              <div><span style={{ color: "#8E8E93" }}>Topic: </span><strong style={{ color: "#F5F5F0" }}>{current.topic}</strong></div>
              <div><span style={{ color: "#8E8E93" }}>History: </span><span style={{ color: "#D4D0C7" }}>{current.history}</span></div>
              <div style={{ paddingTop: "6px" }}><span style={{ color: "#8E8E93" }}>Suggested next step: </span><span style={{ color: "#9BEA16", fontWeight: 600 }}>{current.nextStep}</span></div>
            </div>

            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "#8E8E93", textTransform: "uppercase" }}>
              No Repeating. No Restarting.
            </div>
          </div>
        </div>

        {/* Primary CTA & Signature Quote */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <Link
            href="/trust"
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
            <span>See the handoff</span>
            <ArrowRight size={14} />
          </Link>

          <p className="serif-italic" style={{ fontSize: "15px", color: "#D4D0C7", fontStyle: "italic", margin: 0 }}>
            Helpful enough to act. Sensible enough to ask.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hp09-canvas { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
