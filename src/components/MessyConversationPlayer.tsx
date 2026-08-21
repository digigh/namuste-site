"use client";

import React, { useState } from "react";
import { Play, Pause, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";

export default function MessyConversationPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = [
    {
      time: "0:02",
      speaker: "Caller",
      type: "caller",
      text: "Yeah hi... uh, I wanted to check if Dr. Mehta is available on Wednesday afternoon... wait, no, actually my mom said Thursday is better, around 5?",
      annotation: "Mid-sentence self-correction: Wednesday -> Thursday 5 PM",
      badge: "Correction Handled",
    },
    {
      time: "0:07",
      speaker: "Namuste",
      type: "assistant",
      text: "Namuste. Thursday at 5:00 PM is open. Dr. Mehta has both 5:00 PM and 5:45 PM available.",
      annotation: "Grasped corrected intent without confusion",
      badge: "Intent Understood",
    },
    {
      time: "0:12",
      speaker: "Caller",
      type: "caller",
      text: "Wait, sorry—can you also check if her cardiac echo reports need to be brought along, or can we send them online?",
      annotation: "Mid-flow interruption & secondary query",
      badge: "Interruption Parsed",
    },
    {
      time: "0:18",
      speaker: "Namuste",
      type: "assistant",
      text: "You can easily upload her echo reports to our secure WhatsApp link before the visit, or bring physical copies. I have locked Thursday, 5:00 PM for her. I will text the upload link now.",
      annotation: "Resolved both booking & document questions in single response",
      badge: "Multi-Intent Resolved",
    },
  ];

  return (
    <div
      className="glass-card"
      style={{
        width: "100%",
        padding: "36px",
        borderRadius: "22px",
        background: "rgba(11, 14, 11, 0.9)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 16px 50px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Header with Playback Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "20px", marginBottom: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div>
          <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "var(--green)", marginBottom: "4px" }}>
            Real Dialogue Dynamics • Zero Script Rigidity
          </div>
          <h4 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", margin: 0, fontWeight: 400 }}>
            People pause. Interrupt. Change their mind. Namuste keeps up.
          </h4>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary"
            style={{ fontSize: "12.5px", padding: "8px 16px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? "Pause Dialogue" : "Play Conversation"}</span>
          </button>
          <button
            onClick={() => setIsPlaying(false)}
            className="btn-secondary"
            style={{ fontSize: "12.5px", padding: "8px 12px" }}
            title="Reset playback"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Transcript Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {steps.map((step, idx) => {
          const isAssistant = step.type === "assistant";
          return (
            <div
              key={idx}
              style={{
                padding: "18px 22px",
                borderRadius: "16px",
                border: isAssistant ? "1px solid rgba(118, 192, 67, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                background: isAssistant ? "rgba(118, 192, 67, 0.08)" : "rgba(255, 255, 255, 0.03)",
                marginLeft: isAssistant ? "36px" : "0",
                marginRight: isAssistant ? "0" : "36px",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: isAssistant ? "var(--green)" : "rgba(255, 255, 255, 0.15)",
                      color: isAssistant ? "#050505" : "var(--text-ivory)",
                    }}
                  >
                    {isAssistant ? "N" : "C"}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-ivory)" }}>{step.speaker}</span>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--text-muted)" }}>{step.time}</span>
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: isAssistant ? "rgba(118, 192, 67, 0.15)" : "rgba(245, 158, 11, 0.15)",
                    color: isAssistant ? "var(--green)" : "#FBBF24",
                    border: isAssistant ? "1px solid rgba(118, 192, 67, 0.3)" : "1px solid rgba(245, 158, 11, 0.3)",
                  }}
                >
                  {step.badge}
                </span>
              </div>

              <p style={{ fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.6, margin: "0 0 10px 0" }}>
                &ldquo;{step.text}&rdquo;
              </p>

              <div style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic", display: "flex", alignItems: "center", gap: "6px", paddingTop: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <AlertCircle size={13} style={{ color: "var(--green)" }} />
                <span>{step.annotation}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outcome Summary Footnote */}
      <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px", fontSize: "12.5px", color: "var(--text-muted)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--green)" }}>
          <CheckCircle2 size={15} />
          <span>Full acoustic cancellation • Natural barge-in support • 180ms latency</span>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: "11.5px" }}>Sub-200ms Response Time</span>
      </div>
    </div>
  );
}
