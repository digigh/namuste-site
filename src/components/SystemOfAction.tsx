"use client";

import React, { useState } from "react";
import { Database, Zap, CheckCircle2, XCircle } from "lucide-react";

export default function SystemOfAction() {
  const [activeTab, setActiveTab] = useState<"action" | "record">("action");

  return (
    <div style={{ width: "100%" }}>
      {/* Tab Switcher */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
        <div style={{ display: "inline-flex", padding: "6px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <button
            onClick={() => setActiveTab("action")}
            style={{
              padding: "10px 22px",
              borderRadius: "999px",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: activeTab === "action" ? "var(--green)" : "transparent",
              color: activeTab === "action" ? "#050505" : "var(--text-muted)",
              border: "none",
              boxShadow: activeTab === "action" ? "0 0 20px rgba(118, 192, 67, 0.35)" : "none",
            }}
          >
            <Zap size={15} />
            <span>Namuste: System of Action</span>
          </button>
          <button
            onClick={() => setActiveTab("record")}
            style={{
              padding: "10px 22px",
              borderRadius: "999px",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: activeTab === "record" ? "rgba(255, 255, 255, 0.12)" : "transparent",
              color: activeTab === "record" ? "var(--text-ivory)" : "var(--text-muted)",
              border: "none",
            }}
          >
            <Database size={15} />
            <span>Traditional CRM: System of Record</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {/* System of Record Card */}
        <div
          className="glass-card"
          style={{
            padding: "32px",
            borderRadius: "20px",
            border: activeTab === "record" ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.06)",
            background: activeTab === "record" ? "rgba(25, 25, 25, 0.75)" : "rgba(15, 15, 15, 0.4)",
            opacity: activeTab === "record" ? 1 : 0.75,
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.06)", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Database size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-ivory)", margin: 0 }}>System of Record</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>Traditional CRM, Logs & IVR</p>
              </div>
            </div>
            <span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "rgba(248, 113, 113, 0.12)", color: "var(--coral)", border: "1px solid var(--border-coral)", display: "flex", alignItems: "center", gap: "4px" }}>
              <XCircle size={12} /> Passive Memory
            </span>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "24px" }}>
            Traditional CRMs store what happened <em>after</em> a human intervenes. They record lost calls, create unassigned tickets, and wait for staff to catch up.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
            {[
              { label: "Incoming Call", val: "Rings out or leaves customer on generic IVR hold" },
              { label: "Data Capture", val: "Logs a 'Missed Call' entry in CRM database" },
              { label: "Customer State", val: "Waiting, frustrated, or contacting a competitor" },
              { label: "Resolution Speed", val: "Hours or days until human manual callback" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--coral)", marginTop: "6px", flexShrink: 0 }} />
                <div>
                  <span style={{ color: "var(--text-muted)", fontWeight: 600, display: "block", fontSize: "12px" }}>{item.label}:</span>
                  <span style={{ color: "var(--text-body)" }}>{item.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Namuste System of Action Card */}
        <div
          className="glass-card"
          style={{
            padding: "32px",
            borderRadius: "20px",
            border: activeTab === "action" ? "1px solid rgba(118, 192, 67, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
            background: activeTab === "action" ? "rgba(12, 18, 12, 0.85)" : "rgba(15, 15, 15, 0.4)",
            boxShadow: activeTab === "action" ? "0 0 40px rgba(118, 192, 67, 0.1)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={20} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src="/logo.png"
                    alt="Namuste"
                    style={{
                      height: "15px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-ivory)" }}>System of Action</span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--green)", margin: "2px 0 0 0" }}>Autonomous Intelligence & Execution</p>
              </div>
            </div>
            <span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", border: "1px solid rgba(118, 192, 67, 0.3)", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 size={12} /> Live Execution
            </span>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-body)", lineHeight: 1.65, marginBottom: "24px" }}>
            Namuste actively executes business operations in real-time: checks calendars, applies policy rules, locks appointments, syncs CRM systems, and sends confirmations.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
            {[
              { label: "Incoming Call", val: "Picks up within 1 ring with natural, intelligent voice" },
              { label: "Qualification", val: "Understands intent, collects documents, verifies calendar" },
              { label: "Execution", val: "Directly locks the appointment, creates case, syncs ERP" },
              { label: "Follow-Up", val: "Dispatches WhatsApp confirmation and prep checklist instantly" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(118, 192, 67, 0.2)", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckCircle2 size={15} style={{ color: "var(--green)", marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <span style={{ color: "var(--green)", fontWeight: 600, display: "block", fontSize: "12px" }}>{item.label}:</span>
                  <span style={{ color: "var(--text-ivory)" }}>{item.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
