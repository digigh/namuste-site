"use client";

import { useState } from "react";
import { Scale, FileText, Briefcase, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface ProfessionConfig {
  id: "lawyers" | "accountants" | "consultants";
  name: string;
  icon: any;
  clientQuery: string;
  assistantQuestion: string;
  clientAnswer: string;
  outcome: string;
  checklist: string[];
}

const professions: ProfessionConfig[] = [
  {
    id: "lawyers",
    name: "Lawyers & Law Firms",
    icon: <Scale size={18} />,
    clientQuery: "I need urgent legal advice regarding a commercial property lease dispute.",
    assistantQuestion: "Understood. Which state and city is the property located in, and is there an existing arbitration clause?",
    clientAnswer: "The property is in Mumbai, Maharashtra. Yes, Clause 14 specifies expedited arbitration.",
    outcome: "Jurisdiction confirmed · Conflict of interest screened · Discovery checklist dispatched · 30-min preliminary partner consultation scheduled.",
    checklist: ["Registered Lease Deed Copy", "Notices / Demand letters exchanged", "Arbitration clause excerpt"],
  },
  {
    id: "accountants",
    name: "Chartered Accountants",
    icon: <FileText size={18} />,
    clientQuery: "We need GST audit filing and corporate tax compliance advisory for our mid-sized manufacturing firm.",
    assistantQuestion: "Certainly. What is your approximate annual turnover and do you operate in multi-state GST jurisdictions?",
    clientAnswer: "Annual turnover is ₹42 Cr with facilities across 3 states.",
    outcome: "Client scale classified as Mid-Market Corporate · Lead assigned to Senior Tax Partner · Engagement scope document auto-generated.",
    checklist: ["GSTR-9 & GSTR-9C past filings", "Audited P&L and Balance Sheet", "List of branch GSTINs"],
  },
  {
    id: "consultants",
    name: "Management Consultants",
    icon: <Briefcase size={18} />,
    clientQuery: "We are seeking a supply chain restructuring partner for our pan-India distribution network.",
    assistantQuestion: "Understood. What is the approximate number of distribution nodes, and what is your target execution timeline?",
    clientAnswer: "14 central warehouses and 120 regional hubs. Looking for rollout in Q3.",
    outcome: "Consulting scope qualified · Capability deck dispatched · Discovery workshop request logged on Partner calendar.",
    checklist: ["Network node topology map", "Current SLA benchmarks", "Project sponsor brief"],
  },
];

export default function IntakeAssistantDemo() {
  const [activeTab, setActiveTab] = useState<"lawyers" | "accountants" | "consultants">("lawyers");
  const current = professions.find((p) => p.id === activeTab)!;

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "24px",
        background: "rgba(10, 12, 10, 0.85)",
        border: "1px solid var(--border)",
        padding: "36px",
        boxShadow: "0 24px 80px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Profession Selector Buttons */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
          Select Professional Practice
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {professions.map((p) => {
            const isActive = p.id === activeTab;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: isActive ? "rgba(118, 192, 67, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${isActive ? "var(--green)" : "var(--border)"}`,
                  color: isActive ? "var(--green-luminous)" : "var(--text-body)",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {p.icon}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Progression */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "32px",
          alignItems: "start",
        }}
        className="intake-demo-grid"
      >
        {/* Left: Dialogue Progression */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Client Query */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "16px 20px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--coral)", textTransform: "uppercase", marginBottom: "4px" }}>
              Prospective Client Enquiry
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.5 }}>
              &ldquo;{current.clientQuery}&rdquo;
            </div>
          </div>

          {/* Namuste Intake */}
          <div
            style={{
              background: "rgba(118, 192, 67, 0.08)",
              border: "1px solid rgba(118, 192, 67, 0.25)",
              borderRadius: "14px",
              padding: "16px 20px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", marginBottom: "4px" }}>
              Namuste Intake Assistant
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.5 }}>
              {current.assistantQuestion}
            </div>
          </div>

          {/* Client Qualification Response */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "14px 20px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
              Client Qualification Details
            </div>
            <div style={{ fontSize: "13.5px", color: "var(--green-luminous)", fontWeight: 500 }}>
              &ldquo;{current.clientAnswer}&rdquo;
            </div>
          </div>
        </div>

        {/* Right: Outcome Box */}
        <div
          style={{
            background: "rgba(8, 16, 8, 0.95)",
            border: "1px solid rgba(118, 192, 67, 0.35)",
            borderRadius: "18px",
            padding: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Sparkles size={16} style={{ color: "var(--green)" }} />
            <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--green)" }}>
              Structured Intake Result
            </h4>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "20px" }}>
            <CheckCircle2 size={18} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.55 }}>
              {current.outcome}
            </p>
          </div>

          {/* Required Checklist */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "14px",
              marginBottom: "18px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
              Auto-Dispatched Document Checklist
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {current.checklist.map((item, idx) => (
                <div key={idx} style={{ fontSize: "12px", color: "var(--text-body)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "var(--green)", fontWeight: "bold" }}>•</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Boundaries */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "11.5px", color: "var(--text-muted)" }}>
            <ShieldCheck size={14} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
            <span>Conducts initial administrative qualification only. Does not provide independent legal or financial advice.</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .intake-demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
