"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, ArrowRight, Brain, AlertCircle, ShieldAlert } from "lucide-react";
import AnimatedOrb from "./AnimatedOrb";

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
      className="hp09-section-pad"
      style={{
        minHeight: "95vh",
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
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Knowing When to Step Aside.
        </div>

        {/* Headline */}
        <div style={{ maxWidth: "860px", marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "clamp(38px, 4.5vw, 66px)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "var(--text-ivory)",
              marginBottom: "18px",
            }}
          >
            Some conversations<br />
            need a person. Namuste<br />
            <span style={{ color: "var(--green)", fontWeight: 600 }}>
              knows which ones.
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 19px)",
              color: "var(--text-muted)",
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
                  background: active ? "rgba(155, 234, 22, 0.15)" : "var(--overlay-1)",
                  color: active ? "#9BEA16" : "var(--text-muted)",
                  border: `1px solid ${active ? "rgba(155, 234, 22, 0.4)" : "var(--border)"}`,
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: active ? "#9BEA16" : "rgba(255,255,255,0.3)" }} />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Progression: Customer Input -> Center Brain Node -> Handoff Ready Packet (Proportionally Scaled on Mobile) */}
        <div
          className="hp09-canvas hp09-scaler-wrapper"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "24px 0 34px",
          }}
        >
          <div
            className="hp09-diagram-scaler"
            style={{
              position: "relative",
              width: "920px",
              minHeight: "400px",
              padding: "20px 0",
              flexShrink: 0,
            }}
          >
            {/* Connecting SVG Flow Line with Traveling Laser Photons & 100% Concentric Brain Node */}
            <svg
              viewBox="0 0 920 360"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <defs>
                <linearGradient id="handoffGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9BEA16" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#F87171" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                </linearGradient>

                <filter id="handoffGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <radialGradient id="brainCoreAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(248, 113, 113, 0.35)" />
                  <stop offset="70%" stopColor="rgba(248, 113, 113, 0.05)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* 1. Left to Center Pipeline (260 -> 416) strictly at y=180 */}
              <path d="M 260 180 L 416 180" fill="none" stroke="url(#handoffGrad)" strokeWidth="6" strokeOpacity="0.14" filter="url(#handoffGlow)" />
              <path d="M 260 180 L 416 180" fill="none" stroke="#9BEA16" strokeWidth="2.2" filter="url(#handoffGlow)" />
              <circle cx="260" cy="180" r="4.5" fill="#9BEA16" />

              {/* Traveling Photon Left -> Center */}
              <circle r="3.5" fill="var(--text-ivory)">
                <animateMotion path="M 260 180 L 416 180" dur="1.8s" repeatCount="indefinite" />
              </circle>

              {/* 2. Center to Right Pipeline (504 -> 610) strictly at y=180 */}
              <path d="M 504 180 L 610 180" fill="none" stroke="url(#handoffGrad)" strokeWidth="6" strokeOpacity="0.14" filter="url(#handoffGlow)" />
              <path d="M 504 180 L 610 180" fill="none" stroke="#F59E0B" strokeWidth="2.2" filter="url(#handoffGlow)" />
              <circle cx="610" cy="180" r="4.5" fill="#F59E0B" />

              {/* Traveling Photon Center -> Right */}
              <circle r="3.5" fill="#F59E0B">
                <animateMotion path="M 504 180 L 610 180" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
              </circle>

              {/* Ambient aura + radar rings stay in SVG; the solid core becomes a real 3D orb overlay below */}
              <circle cx="460" cy="180" r="76" fill="url(#brainCoreAura)" pointerEvents="none" />
              <circle cx="460" cy="180" r="62" fill="none" stroke="rgba(248, 113, 113, 0.35)" strokeWidth="1.2" strokeDasharray="3 4">
                <animate attributeName="r" values="58;66;58" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Center Status Headline in SVG */}
              <text
                x="460"
                y="246"
                textAnchor="middle"
                fill="var(--text-ivory)"
                fontSize="11.5"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="800"
                letterSpacing="0.08em"
              >
                {current.centerLabel}
              </text>

              {/* Center Subtitle in SVG */}
              <text
                x="460"
                y="262"
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="10.5"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="500"
              >
                {current.centerSub}
              </text>
            </svg>

            {/* Genuine 3D animated orb hub, replacing the flat SVG disc — warm alert palette for escalation */}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "88px", height: "88px", zIndex: 5, boxShadow: "0 20px 40px -8px rgba(248,113,113,0.4)", borderRadius: "50%" }}>
              <AnimatedOrb size={88} colors={["#F87171", "#F59E0B", "#EF4444"]} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <Brain size={32} style={{ color: "#fff", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }} />
              </div>
            </div>

            {/* 1. Left Card: Customer Input (Centered vertically at y=180) */}
            <motion.div
              key={`cust-${selectedCase}`}
              initial={{ opacity: 0, x: -10, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                left: "10px",
                top: "180px",
                zIndex: 10,
                width: "250px",
                padding: "20px",
                borderRadius: "18px",
                background: "var(--glass-bg)",
                border: "1px solid var(--border2)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.9)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px", letterSpacing: "0.06em" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#9BEA16", boxShadow: "0 0 8px #9BEA16" }} />
                  Customer
                </span>
                <span style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--text-muted)" }}>{current.customerTime}</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-ivory)", margin: 0, lineHeight: 1.55 }}>
                &ldquo;{current.customerQuery}&rdquo;
              </p>
            </motion.div>

            {/* 2. Invisible hit area for brain node hover */}
            <div
              style={{
                position: "absolute",
                left: "460px",
                top: "180px",
                transform: "translate(-50%, -50%)",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                zIndex: 20,
                cursor: "pointer",
              }}
            />

            {/* 3. Right Card: Golden Handoff Ready Packet (Centered vertically at y=180) */}
            <motion.div
              key={`hand-${selectedCase}`}
              initial={{ opacity: 0, x: 10, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                left: "610px",
                top: "180px",
                zIndex: 10,
                width: "300px",
                padding: "24px",
                borderRadius: "20px",
                background: "var(--glass-bg)",
                border: "1px solid rgba(245, 158, 11, 0.45)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.15)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-ivory)" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 8px #F59E0B" }} />
                  Handoff Ready
                </div>
                <img
                  src="/logo.png"
                  alt="Namuste"
                  style={{
                    height: "16px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Officer Profile */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "14px", marginBottom: "14px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
                  <User size={18} />
                </div>
                <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)" }}>
                  {current.leadName}
                </div>
              </div>

              {/* Context Telemetry Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                <div><span style={{ color: "var(--text-muted)" }}>Customer: </span><strong style={{ color: "var(--text-ivory)" }}>Arjun Mehta</strong></div>
                <div><span style={{ color: "var(--text-muted)" }}>Topic: </span><strong style={{ color: "var(--text-ivory)" }}>{current.topic}</strong></div>
                <div><span style={{ color: "var(--text-muted)" }}>History: </span><span style={{ color: "var(--text-body)" }}>{current.history}</span></div>
                <div style={{ paddingTop: "6px" }}><span style={{ color: "var(--text-muted)" }}>Suggested next step: </span><span style={{ color: "#9BEA16", fontWeight: 600 }}>{current.nextStep}</span></div>
              </div>

              <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                No Repeating. No Restarting.
              </div>
            </motion.div>
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

          <p style={{ fontSize: "15px", color: "var(--text-body)", fontWeight: 600, margin: 0 }}>
            Helpful enough to act. Sensible enough to ask.
          </p>
        </div>
      </div>

      <style>{`
        .hp09-section-pad {
          padding: 130px 40px 110px;
        }
        .hp09-scaler-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .hp09-diagram-scaler {
          transform-origin: center center;
        }
        @media (max-width: 960px) {
          .hp09-scaler-wrapper {
            height: 230px !important;
            min-height: 230px !important;
            overflow: hidden !important;
            display: block !important;
          }
          .hp09-diagram-scaler {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) scale(0.52) !important;
          }
        }
        @media (max-width: 768px) {
          .hp09-section-pad {
            padding: 56px 16px 40px !important;
          }
        }
        @media (max-width: 440px) {
          .hp09-scaler-wrapper {
            height: 200px !important;
            min-height: 200px !important;
          }
          .hp09-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.42) !important;
          }
        }
        @media (max-width: 375px) {
          .hp09-scaler-wrapper {
            height: 185px !important;
            min-height: 185px !important;
          }
          .hp09-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.38) !important;
          }
        }
      `}</style>
    </section>
  );
}
