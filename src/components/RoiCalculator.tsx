"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

export default function RoiCalculator() {
  const [dailyCalls, setDailyCalls] = useState<number>(45);
  const [missedPercent, setMissedPercent] = useState<number>(25);
  const [dealValue, setDealValue] = useState<number>(3500); // INR per consultation/booking
  const conversionRate = 30; // % of recovered calls that convert

  // Calculations
  const missedCallsPerDay = (dailyCalls * (missedPercent / 100));
  const recoveredCallsPerMonth = missedCallsPerDay * 26; // 26 working days
  const convertedDealsPerMonth = recoveredCallsPerMonth * (conversionRate / 100);
  const monthlyRevenueRecovered = convertedDealsPerMonth * dealValue;
  const annualRevenueRecovered = monthlyRevenueRecovered * 12;

  return (
    <div
      className="glass-card"
      style={{
        width: "100%",
        padding: "40px",
        borderRadius: "22px",
        background: "rgba(11, 14, 11, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 16px 50px rgba(0, 0, 0, 0.8)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "36px",
          alignItems: "center",
        }}
        className="calculator-grid"
      >
        {/* Left Side: Interactive Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em", color: "var(--green)", marginBottom: "4px" }}>
              Interactive Value Modeling
            </div>
            <h3 className="serif" style={{ fontSize: "28px", color: "var(--text-ivory)", margin: "0 0 8px 0", fontWeight: 400 }}>
              Calculate the cost of missed conversations.
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
              Estimate your monthly and annual revenue recovery with Namuste answering every call within 1 ring.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Slider 1: Daily Calls */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                <span style={{ color: "var(--text-body)" }}>Inbound Inquiries per Day:</span>
                <span style={{ color: "var(--green)", fontFamily: "monospace", fontSize: "13.5px", padding: "3px 10px", borderRadius: "6px", background: "rgba(118, 192, 67, 0.12)", border: "1px solid rgba(118, 192, 67, 0.25)" }}>
                  {dailyCalls} inquiries / day
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={5}
                value={dailyCalls}
                onChange={(e) => setDailyCalls(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--green)", height: "6px", cursor: "pointer" }}
              />
            </div>

            {/* Slider 2: Missed Percent */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                <span style={{ color: "var(--text-body)" }}>Estimated Missed / Delayed Rate:</span>
                <span style={{ color: "var(--coral)", fontFamily: "monospace", fontSize: "13.5px", padding: "3px 10px", borderRadius: "6px", background: "rgba(248, 113, 113, 0.12)", border: "1px solid var(--border-coral)" }}>
                  {missedPercent}% missed
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={missedPercent}
                onChange={(e) => setMissedPercent(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--coral)", height: "6px", cursor: "pointer" }}
              />
            </div>

            {/* Slider 3: Deal / Ticket Value */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                <span style={{ color: "var(--text-body)" }}>Average Transaction / Consultation Value:</span>
                <span style={{ color: "var(--green)", fontFamily: "monospace", fontSize: "13.5px", padding: "3px 10px", borderRadius: "6px", background: "rgba(118, 192, 67, 0.12)", border: "1px solid rgba(118, 192, 67, 0.25)" }}>
                  ₹{dealValue.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--green)", height: "6px", cursor: "pointer" }}
              />
            </div>
          </div>

          <div style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic", display: "flex", alignItems: "center", gap: "6px" }}>
            <AlertTriangle size={14} style={{ color: "#FBBF24" }} />
            <span>Illustrative model based on 26 business days/month and conservative 30% closing rate.</span>
          </div>
        </div>

        {/* Right Side: Calculated Recovered Opportunity Card */}
        <div
          style={{
            padding: "32px",
            borderRadius: "18px",
            background: "rgba(10, 18, 10, 0.9)",
            border: "1px solid rgba(118, 192, 67, 0.35)",
            boxShadow: "0 0 40px rgba(118, 192, 67, 0.12)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", display: "block", marginBottom: "8px" }}>
              Potential Recovered Revenue
            </span>

            {/* Big Monthly Number */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12.5px", color: "var(--text-muted)", fontWeight: 500 }}>Estimated Monthly Opportunity:</div>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--green)", letterSpacing: "-0.02em" }}>
                ₹{Math.round(monthlyRevenueRecovered).toLocaleString("en-IN")}
              </div>
            </div>

            {/* Annual Number */}
            <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Estimated Annual Recovery:</span>
                <span style={{ color: "var(--text-ivory)", fontWeight: 700 }}>
                  ₹{Math.round(annualRevenueRecovered).toLocaleString("en-IN")} / yr
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Recovered Inquiries / Month:</span>
                <span style={{ color: "var(--green)", fontWeight: 600 }}>
                  ~{Math.round(recoveredCallsPerMonth)} conversations
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", padding: "12px 20px", fontSize: "13.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            >
              <span>Stop Losing Customer Calls</span>
              <ArrowRight size={15} />
            </Link>
            <div style={{ textAlign: "center", fontSize: "11.5px", color: "var(--text-muted)" }}>
              Setup in 48 hours • No heavy hardware needed
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calculator-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
