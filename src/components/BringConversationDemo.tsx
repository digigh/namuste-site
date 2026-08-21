"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  PhoneCall,
  MessageSquare,
  Globe,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

export interface DemoPreset {
  id: string;
  industry: string;
  channel: "voice" | "whatsapp" | "web";
  question: string;
  answer: string;
  understood: {
    intent: string;
    entities: string[];
    urgency: string;
  };
  action: {
    operation: string;
    owner: string;
    syncTarget: string;
  };
}

const DEMO_PRESETS: DemoPreset[] = [
  {
    id: "clinic-1",
    industry: "Doctors & Clinics",
    channel: "voice",
    question: "Do you have an emergency appointment with Dr. Mehta tomorrow evening for cardiac pain?",
    answer: "Namuste. For acute cardiac pain, please dial 108 immediately. For urgent OPD review with Dr. Mehta, I have reserved tomorrow 5:30 PM and dispatched clinic pre-visit instructions to your phone.",
    understood: {
      intent: "Emergency & Doctor Appointment Booking",
      entities: ["Dr. Mehta", "Tomorrow 5:30 PM", "Cardiac review"],
      urgency: "HIGH",
    },
    action: {
      operation: "Emergency protocol initiated • 5:30 PM slot held in HMS",
      owner: "Nurse Supervisor (Ananya)",
      syncTarget: "Practo / Hospital EMR System",
    },
  },
  {
    id: "law-1",
    industry: "Lawyers & Advocates",
    channel: "whatsapp",
    question: "I received a commercial lease termination notice and need an advocate before Friday.",
    answer: "Namuste. Senior Associate Adv. Sharma handles commercial tenancy disputes. Her preliminary 30-minute consultation is open for Thursday at 3:00 PM (Fee: ₹3,500). I have sent our secure document upload link.",
    understood: {
      intent: "Litigation Dispute Intake & Assessment",
      entities: ["Commercial lease notice", "Thursday 3:00 PM", "Adv. Sharma"],
      urgency: "HIGH",
    },
    action: {
      operation: "Conflict check initiated • Secure vault upload link dispatched",
      owner: "Intake Associate (Adv. Verma)",
      syncTarget: "Clio / Law Practice Management",
    },
  },
  {
    id: "retail-1",
    industry: "Retail & Commerce",
    channel: "voice",
    question: "Is the Navy Wool Suit in size 40 available at your flagship store for evening pickup?",
    answer: "Namuste. Yes, our flagship store has 2 pieces in stock. I have placed a 3-hour customer hold on size 40 at Bay 3 and texted you the pickup barcode.",
    understood: {
      intent: "Inventory Verification & Store Pickup Hold",
      entities: ["Navy Wool Suit", "Size 40", "Flagship store hold"],
      urgency: "MEDIUM",
    },
    action: {
      operation: "SAP POS inventory locked for 3 hours • Barcode sent",
      owner: "Floor Store Manager (Rohan)",
      syncTarget: "SAP S/4HANA Retail POS",
    },
  },
];

export default function BringConversationDemo() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("Doctors & Clinics");
  const [selectedChannel, setSelectedChannel] = useState<"voice" | "whatsapp" | "web">("voice");
  const [customQuestion, setCustomQuestion] = useState<string>(
    "Do you have an emergency appointment with Dr. Mehta tomorrow evening for cardiac pain?"
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<DemoPreset | null>(DEMO_PRESETS[0]);

  const handleTestRun = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const match = DEMO_PRESETS.find(
        (p) => p.industry === selectedIndustry && p.channel === selectedChannel
      ) || {
        id: "custom",
        industry: selectedIndustry,
        channel: selectedChannel,
        question: customQuestion,
        answer: `Namuste. Thank you for reaching out regarding ${selectedIndustry}. I have processed your request: "${customQuestion}". Our team has locked your slot and verified operational availability.`,
        understood: {
          intent: "Customer Service & Operational Scheduling",
          entities: [selectedIndustry, selectedChannel.toUpperCase(), "Verified Request"],
          urgency: "NORMAL",
        },
        action: {
          operation: "Task logged to CRM • Automatic follow-up scheduled",
          owner: "Duty Operations Specialist",
          syncTarget: "Enterprise Cloud Database",
        },
      };
      setResult(match);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 1. HP-13: Bring One Real Conversation Intake */}
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
        <div style={{ paddingBottom: "20px", marginBottom: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "var(--green)", marginBottom: "4px" }}>
            HP-13 • Interactive Demo Engine
          </div>
          <h3 className="serif" style={{ fontSize: "28px", color: "var(--text-ivory)", margin: "0 0 8px 0", fontWeight: 400 }}>
            Bring us the conversation your business keeps missing.
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
            Select your industry, choose a channel, and test how Namuste understands and acts in real time.
          </p>
        </div>

        {/* Step 1 & 2: Industry and Channel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {/* Industry dropdown */}
          <div>
            <label style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
              1. Select Your Vertical:
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                background: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "14px",
                color: "var(--text-ivory)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="Doctors & Clinics">Doctors & Clinics</option>
              <option value="Lawyers & Advocates">Lawyers & Advocates</option>
              <option value="Chartered Accountants">Chartered Accountants</option>
              <option value="Architects & Designers">Architects & Designers</option>
              <option value="Real Estate & High-Ticket">Real Estate & High-Ticket</option>
              <option value="Retail & Commerce">Retail & Commerce</option>
              <option value="Enterprise & Logistics">Enterprise & Logistics</option>
            </select>
          </div>

          {/* Channel selector */}
          <div>
            <label style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
              2. Choose Channel:
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { id: "voice" as const, label: "Voice", icon: PhoneCall },
                { id: "whatsapp" as const, label: "WhatsApp", icon: MessageSquare },
                { id: "web" as const, label: "Web", icon: Globe },
              ].map((ch) => {
                const Icon = ch.icon;
                const active = selectedChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChannel(ch.id)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: active ? "var(--green)" : "rgba(0, 0, 0, 0.4)",
                      color: active ? "#050505" : "var(--text-muted)",
                      border: `1px solid ${active ? "var(--green)" : "rgba(255, 255, 255, 0.1)"}`,
                    }}
                  >
                    <Icon size={15} />
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Customer Question Input */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
            3. Enter or Select Customer Enquiry:
          </label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="e.g. Can I reschedule my appointment with Dr. Mehta to Friday 4 PM?"
              style={{
                flex: 1,
                minWidth: "240px",
                padding: "14px 18px",
                borderRadius: "12px",
                background: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "14px",
                color: "var(--text-ivory)",
                outline: "none",
              }}
            />
            <button
              onClick={handleTestRun}
              disabled={isProcessing || !customQuestion.trim()}
              className="btn-primary"
              style={{ padding: "14px 24px", fontSize: "13.5px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Let Namuste Answer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Presets Quick Taps */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", fontSize: "12.5px" }}>
          <span style={{ color: "var(--text-muted)" }}>Or try sample questions:</span>
          {DEMO_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedIndustry(p.industry);
                setSelectedChannel(p.channel);
                setCustomQuestion(p.question);
                setResult(p);
              }}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                color: "var(--text-body)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {p.industry} ({p.channel})
            </button>
          ))}
        </div>
      </div>

      {/* 2. HP-14: Demonstration Result Card */}
      {result && (
        <div
          className="glass-card"
          style={{
            padding: "36px",
            borderRadius: "22px",
            background: "rgba(10, 18, 10, 0.9)",
            border: "1px solid rgba(118, 192, 67, 0.35)",
            boxShadow: "0 0 50px rgba(118, 192, 67, 0.12)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "20px", marginBottom: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <img
                  src="/logo.png"
                  alt="Namuste"
                  style={{
                    height: "14px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
                <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "var(--green)" }}>
                  HP-14 • Outcome Execution Engine
                </span>
              </div>
              <h4 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", margin: 0, fontWeight: 400 }}>
                A question becomes a qualified, responsible next step.
              </h4>
            </div>
            <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11.5px", fontWeight: 700, background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", border: "1px solid rgba(118, 192, 67, 0.3)", display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={13} /> Complete Resolution
            </span>
          </div>

          {/* 3-Stage Transformation Breakdown (Answer -> Understand -> Act) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            {/* Stage 1: Answer */}
            <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>1</span>
                  Natural Answer
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
                  &ldquo;{result.answer}&rdquo;
                </p>
              </div>
              <div style={{ paddingTop: "12px", marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", fontSize: "11px", color: "var(--text-muted)" }}>
                Delivered via {result.channel.toUpperCase()} in 180ms
              </div>
            </div>

            {/* Stage 2: Understand */}
            <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>2</span>
                  Context Extraction
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12.5px" }}>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Intent: </span>
                    <span style={{ color: "var(--text-ivory)", fontWeight: 600 }}>{result.understood.intent}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
                    {result.understood.entities.map((ent, i) => (
                      <span key={i} style={{ padding: "2px 6px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.08)", fontSize: "10.5px", color: "var(--text-body)" }}>
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "12px", marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", fontSize: "11px", color: "var(--green)", fontFamily: "monospace" }}>
                Urgency: {result.understood.urgency}
              </div>
            </div>

            {/* Stage 3: Act */}
            <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(118, 192, 67, 0.3)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--green)", color: "#050505", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800 }}>3</span>
                  Concrete Action Taken
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12.5px" }}>
                  <div style={{ color: "var(--text-ivory)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--green)" }} />
                    {result.action.operation}
                  </div>
                  <div style={{ color: "var(--text-muted)" }}>
                    Assigned: <strong style={{ color: "var(--text-body)" }}>{result.action.owner}</strong>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "12px", marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", fontSize: "11.5px", color: "var(--green)", display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={13} />
                <span>Synced: {result.action.syncTarget}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Ready to deploy this exact intelligence for your team?
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => setCustomQuestion("")}
                className="btn-secondary"
                style={{ fontSize: "13px", padding: "10px 18px" }}
              >
                Try Another Conversation
              </button>
              <Link href="/contact" className="btn-primary" style={{ fontSize: "13px", padding: "10px 20px" }}>
                Book a Working Session <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
