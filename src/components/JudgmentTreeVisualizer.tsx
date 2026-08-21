"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, HelpCircle, AlertTriangle, ArrowRight, ShieldCheck, FileText, UserCheck, Lock } from "lucide-react";

export type DecisionPath = "answer" | "clarify" | "handoff";

export default function JudgmentTreeVisualizer() {
  const [selectedPath, setSelectedPath] = useState<DecisionPath>("answer");

  return (
    <div style={{ width: "100%" }}>
      {/* 3 Branch Selector Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
          marginBottom: "32px",
        }}
      >
        {/* Branch 1: Answer */}
        <button
          onClick={() => setSelectedPath("answer")}
          style={{
            padding: "24px",
            borderRadius: "18px",
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: selectedPath === "answer" ? "rgba(118, 192, 67, 0.14)" : "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${selectedPath === "answer" ? "var(--green)" : "rgba(255, 255, 255, 0.08)"}`,
            boxShadow: selectedPath === "answer" ? "0 0 30px rgba(118, 192, 67, 0.2)" : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 size={18} />
            </span>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", padding: "3px 8px", borderRadius: "999px", background: "rgba(118, 192, 67, 0.12)" }}>
              Approved Action
            </span>
          </div>
          <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-ivory)", marginBottom: "6px" }}>1. Answer with Grounded Truth</h4>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
            When verified knowledge exists, Namuste responds decisively and takes immediate operational action.
          </p>
        </button>

        {/* Branch 2: Clarify */}
        <button
          onClick={() => setSelectedPath("clarify")}
          style={{
            padding: "24px",
            borderRadius: "18px",
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: selectedPath === "clarify" ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${selectedPath === "clarify" ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.08)"}`,
            boxShadow: selectedPath === "clarify" ? "0 0 30px rgba(255, 255, 255, 0.1)" : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.1)", color: "var(--text-ivory)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HelpCircle size={18} />
            </span>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-body)", padding: "3px 8px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.1)" }}>
              Context Required
            </span>
          </div>
          <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-ivory)", marginBottom: "6px" }}>2. Clarify Ambiguity</h4>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
            When key parameters are missing, Namuste asks targeted questions rather than guessing or hallucinating.
          </p>
        </button>

        {/* Branch 3: Handoff */}
        <button
          onClick={() => setSelectedPath("handoff")}
          style={{
            padding: "24px",
            borderRadius: "18px",
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: selectedPath === "handoff" ? "rgba(248, 113, 113, 0.14)" : "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${selectedPath === "handoff" ? "var(--coral)" : "rgba(255, 255, 255, 0.08)"}`,
            boxShadow: selectedPath === "handoff" ? "0 0 30px rgba(248, 113, 113, 0.2)" : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(248, 113, 113, 0.2)", color: "var(--coral)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertTriangle size={18} />
            </span>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--coral)", padding: "3px 8px", borderRadius: "999px", background: "rgba(248, 113, 113, 0.12)" }}>
              Human Escalation
            </span>
          </div>
          <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-ivory)", marginBottom: "6px" }}>3. Ask a Person (Handoff)</h4>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
            When outside approved boundaries (e.g. medical diagnosis or legal advice), it escalates with full context.
          </p>
        </button>
      </div>

      {/* Selected Scenario Demonstration Card */}
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
        {selectedPath === "answer" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", display: "flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={16} /> Verified Knowledge Rule Active
              </span>
              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--text-muted)" }}>Source: Approved Clinic Handbook v3.2</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
              <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Incoming Query:</span>
                <p style={{ color: "var(--text-ivory)", margin: 0 }}>&ldquo;What is Dr. Mehta&apos;s consultation fee and is parking available at the clinic?&rdquo;</p>
              </div>

              <div style={{ padding: "18px 20px", borderRadius: "16px", background: "rgba(118, 192, 67, 0.09)", border: "1px solid rgba(118, 192, 67, 0.3)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--green)", display: "block", marginBottom: "4px" }}>
                  Namuste Direct Resolution:
                </span>
                <p style={{ color: "var(--text-ivory)", lineHeight: 1.6, margin: 0 }}>
                  &ldquo;Dr. Mehta&apos;s consultation fee is ₹1,200. Yes, valet parking is available in the clinic basement at no extra charge. Would you like me to book a slot for tomorrow?&rdquo;
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px" }}>
              <div style={{ color: "var(--green)", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
                <CheckCircle2 size={15} />
                <span>Zero guesswork • 100% grounded in verified truth</span>
              </div>
              <Link href="/trust" style={{ color: "var(--text-ivory)", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px" }}>
                <span>View Knowledge Governance</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {selectedPath === "clarify" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-ivory)", display: "flex", alignItems: "center", gap: "6px" }}>
                <HelpCircle size={16} style={{ color: "var(--green)" }} /> Targeted Context Gathering
              </span>
              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--text-muted)" }}>Branch: Disambiguation Protocol</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
              <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Incoming Query:</span>
                <p style={{ color: "var(--text-ivory)", margin: 0 }}>&ldquo;I want to book an appointment for tomorrow.&rdquo;</p>
              </div>

              <div style={{ padding: "18px 20px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.18)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-ivory)", display: "block", marginBottom: "4px" }}>
                  Namuste Clarification Step:
                </span>
                <p style={{ color: "var(--text-ivory)", lineHeight: 1.6, margin: 0 }}>
                  &ldquo;Certainly. Are you looking for a consultation with General Physician Dr. Sharma, or Cardiologist Dr. Mehta? Also, do you prefer morning or evening?&rdquo;
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px" }}>
              <div style={{ color: "var(--text-body)", display: "flex", alignItems: "center", gap: "6px" }}>
                <FileText size={15} style={{ color: "var(--green)" }} />
                <span>Narrows down ambiguity without creating false assumptions</span>
              </div>
              <Link href="/trust" style={{ color: "var(--text-ivory)", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px" }}>
                <span>See Decision Logic</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {selectedPath === "handoff" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--coral)", display: "flex", alignItems: "center", gap: "6px" }}>
                <Lock size={16} /> Safety Boundary Activated
              </span>
              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--coral)" }}>Zero Medical/Legal Diagnosis Guardrail</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
              <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Incoming Query:</span>
                <p style={{ color: "var(--text-ivory)", margin: 0 }}>&ldquo;My chest has had sharp pain for the last 30 minutes, should I take an aspirin?&rdquo;</p>
              </div>

              <div style={{ padding: "18px 20px", borderRadius: "16px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid var(--border-coral)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--coral)", display: "block", marginBottom: "4px" }}>
                  Namuste Responsible Handoff:
                </span>
                <p style={{ color: "var(--text-ivory)", lineHeight: 1.6, margin: 0 }}>
                  &ldquo;For acute chest pain, please visit the emergency room or dial 108/112 immediately. I cannot give medical advice, but I have alerted our on-duty emergency coordinator to call your phone right now.&rdquo;
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px" }}>
              <div style={{ color: "var(--coral)", display: "flex", alignItems: "center", gap: "6px" }}>
                <UserCheck size={15} />
                <span>Instant escalation • PII masked • Complete context transferred</span>
              </div>
              <Link href="/responsible-ai" style={{ color: "var(--text-ivory)", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px" }}>
                <span>Read Responsible AI Policy</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
