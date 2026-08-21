"use client";

import React, { useState } from "react";
import { UserCheck, Clock, AlertTriangle, ShieldCheck, User, CheckCircle2 } from "lucide-react";

export interface HandoffScenario {
  id: string;
  title: string;
  typeBadge: string;
  urgency: "HIGH" | "MEDIUM" | "CRITICAL";
  caller: string;
  phone: string;
  summary: string;
  assignedTeam: string;
  assignedOwner: string;
  slaMinutes: number;
}

const HANDOFF_SCENARIOS: HandoffScenario[] = [
  {
    id: "urgent-medical",
    title: "Urgent Post-Operative Symptom",
    typeBadge: "Clinical Priority",
    urgency: "CRITICAL",
    caller: "Sunil Kulkarni (Patient #PT-4029)",
    phone: "+91 98201 •••••",
    summary: "Patient had arthroscopic knee surgery 48 hrs ago. Reports sudden localized swelling and fever of 101°F. Painkiller provided was paracetamol. Seeks immediate doctor confirmation.",
    assignedTeam: "Orthopaedic Duty Resident Desk",
    assignedOwner: "Dr. Sandeep K. (On-Call Resident)",
    slaMinutes: 5,
  },
  {
    id: "commercial-legal",
    title: "Commercial Contract Injunction Notice",
    typeBadge: "High-Ticket Retainer",
    urgency: "HIGH",
    caller: "Vikram Malhotra (MD, Zenith Logistics)",
    phone: "+91 99100 •••••",
    summary: "Received urgent high-court notice regarding warehouse concession lease. Needs urgent partner advisory conference before Monday morning listing.",
    assignedTeam: "Commercial Dispute Practice",
    assignedOwner: "Adv. Meenakshi Sundaram (Senior Partner)",
    slaMinutes: 15,
  },
  {
    id: "enterprise-dispute",
    title: "Enterprise Supply Chain Hub Delay",
    typeBadge: "SLA Exception",
    urgency: "MEDIUM",
    caller: "Rajeev Singhal (Regional Procurement Head)",
    phone: "+91 97112 •••••",
    summary: "Consignment of 80 tons cold-rolled steel held at toll checkpost. Seeks commercial discount waiver and immediate gate clearance authorization.",
    assignedTeam: "Key Account Operations Desk",
    assignedOwner: "Ananya Ghosh (Enterprise Account Director)",
    slaMinutes: 30,
  },
];

export default function HumanHandoffPacket() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("urgent-medical");
  const current = HANDOFF_SCENARIOS.find((s) => s.id === selectedScenarioId) || HANDOFF_SCENARIOS[0];

  return (
    <div style={{ width: "100%" }}>
      {/* Scenario Selector Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
        {HANDOFF_SCENARIOS.map((sc) => {
          const isSelected = selectedScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                fontSize: "12.5px",
                fontWeight: isSelected ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.04)",
                color: isSelected ? "#050505" : "var(--text-muted)",
                border: `1px solid ${isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.08)"}`,
                boxShadow: isSelected ? "0 0 15px rgba(118, 192, 67, 0.3)" : "none",
              }}
            >
              {sc.title}
            </button>
          );
        })}
      </div>

      {/* Structured Operational Handoff Packet */}
      <div
        className="glass-card"
        style={{
          padding: "36px",
          borderRadius: "22px",
          background: "rgba(11, 14, 11, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Packet Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "20px", marginBottom: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(248, 113, 113, 0.15)", color: "var(--coral)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UserCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "var(--coral)", display: "flex", alignItems: "center", gap: "4px" }}>
                <AlertTriangle size={13} /> Human Handoff Operational Packet
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-ivory)", margin: "2px 0 0 0" }}>{current.title}</h4>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "11.5px",
                fontWeight: 700,
                background: current.urgency === "CRITICAL" ? "rgba(248, 113, 113, 0.2)" : "rgba(245, 158, 11, 0.2)",
                color: current.urgency === "CRITICAL" ? "var(--coral)" : "#FBBF24",
                border: current.urgency === "CRITICAL" ? "1px solid var(--border-coral)" : "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              Urgency: {current.urgency}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontFamily: "monospace", padding: "4px 12px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.06)", color: "var(--text-ivory)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <Clock size={13} style={{ color: "var(--green)" }} />
              <span>SLA: {current.slaMinutes} Mins</span>
            </div>
          </div>
        </div>

        {/* 3-Column Packet Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Column 1: Verified Caller Information */}
          <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px" }}>
            <div style={{ fontSize: "10.5px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={13} style={{ color: "var(--green)" }} /> Caller Profile
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-ivory)" }}>{current.caller}</div>
            <div style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>{current.phone}</div>
            <div style={{ fontSize: "11.5px", color: "var(--green)", paddingTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <ShieldCheck size={13} /> Verified Caller Identity
            </div>
          </div>

          {/* Column 2: Assigned Responsible Owner */}
          <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px" }}>
            <div style={{ fontSize: "10.5px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
              <UserCheck size={13} style={{ color: "var(--green)" }} /> Assigned Human Owner
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-ivory)" }}>{current.assignedOwner}</div>
            <div style={{ color: "var(--text-muted)" }}>{current.assignedTeam}</div>
            <div style={{ fontSize: "11.5px", color: "var(--green)", paddingTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 size={13} /> WhatsApp & SMS Push Dispatched
            </div>
          </div>

          {/* Column 3: Handoff Protocol & Guardrail */}
          <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px" }}>
            <div style={{ fontSize: "10.5px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)" }}>Handoff Protocol</div>
            <div style={{ color: "var(--text-ivory)", fontWeight: 600 }}>Automatic Context Transfer</div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
              Customer is informed a senior human specialist is reviewing their file and will connect within {current.slaMinutes} minutes.
            </p>
          </div>
        </div>

        {/* Full Dialogue Summary */}
        <div style={{ padding: "18px 22px", borderRadius: "14px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px" }}>
            Structured Conversation Context & Intent Summary:
          </div>
          <p style={{ fontSize: "13.5px", color: "var(--text-body)", lineHeight: 1.65, margin: 0 }}>
            &ldquo;{current.summary}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
