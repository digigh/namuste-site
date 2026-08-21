"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageSquare,
  Globe,
  Calendar,
  Users,
  Headphones,
  CreditCard,
  GitFork,
  Check,
  ArrowRight,
} from "lucide-react";

export default function HP06Systems() {
  return (
    <section
      id="hp-06"
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
          Built to Fit In.
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
            Your business already has systems.<br />
            Namuste makes conversations<br />
            <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
              work with them.
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
            Calendars, customer records, support queues, payments and internal workflows — Namuste connects each conversation to the place where work actually happens.
          </p>
        </div>

        {/* Central Visual Architecture Diagram (Exact from Screenshot 1) */}
        <div
          style={{
            position: "relative",
            minHeight: "440px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "40px 0",
            margin: "40px 0",
          }}
          className="hp06-canvas"
        >
          {/* SVG Connecting Radiating Flow Lines */}
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
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8FD813" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#8FD813" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8FD813" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Left 3 Input Lines into Center Node */}
            <path d="M 220 120 C 350 120, 400 200, 460 200" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M 220 200 L 460 200" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 220 280 C 350 280, 400 200, 460 200" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Right 5 Output Lines from Center Node */}
            <path d="M 540 200 C 600 200, 680 60, 780 60" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M 540 200 C 620 200, 700 130, 780 130" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M 540 200 L 780 200" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 540 200 C 620 200, 700 270, 780 270" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M 540 200 C 600 200, 680 340, 780 340" fill="none" stroke="#8FD813" strokeWidth="1.5" strokeOpacity="0.6" />
          </svg>

          {/* Left: 3 Input Channels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10, width: "180px" }}>
            {[
              { label: "Voice", icon: PhoneCall },
              { label: "WhatsApp", icon: MessageSquare },
              { label: "Web", icon: Globe },
            ].map((ch, i) => {
              const Icon = ch.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 18px",
                    borderRadius: "14px",
                    background: "rgba(12, 12, 12, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                  }}
                >
                  <Icon size={16} style={{ color: "#9BEA16" }} />
                  <span style={{ fontSize: "13.5px", color: "#F5F5F0", fontWeight: 500 }}>{ch.label}</span>
                </div>
              );
            })}
          </div>

          {/* Center: Glowing Namuste Digital Receptionist Orb */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "#050505",
              border: "2px solid #9BEA16",
              boxShadow: "0 0 40px rgba(155, 234, 22, 0.35), inset 0 0 20px rgba(155, 234, 22, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "12px",
            }}
          >
            <img
              src="/logo.png"
              alt="Namuste"
              style={{
                height: "22px",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
            <div style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9BEA16", marginTop: "6px", fontWeight: 700 }}>
              Digital Receptionist
            </div>
          </div>

          {/* Right: 5 Systems */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", zIndex: 10, width: "220px" }}>
            {[
              { label: "Calendar", icon: Calendar },
              { label: "Customer records", icon: Users },
              { label: "Helpdesk", icon: Headphones },
              { label: "Payments", icon: CreditCard },
              { label: "Internal workflows", icon: GitFork },
            ].map((sys, i) => {
              const Icon = sys.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    background: "rgba(12, 12, 12, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                  }}
                >
                  <Icon size={15} style={{ color: "#9BEA16" }} />
                  <span style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 500 }}>{sys.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Outcome Badges underneath diagram (Exact from Screenshot 1) */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderRadius: "14px",
              background: "rgba(15, 15, 15, 0.9)",
              border: "1px solid rgba(155, 234, 22, 0.3)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center", color: "#000000" }}>
              <Check size={11} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#A1A1AA" }}>
                Appointment Created
              </div>
              <div style={{ fontSize: "12.5px", color: "#F5F5F0", fontWeight: 600 }}>
                Tue, 10:30 AM
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderRadius: "14px",
              background: "rgba(15, 15, 15, 0.9)",
              border: "1px solid rgba(155, 234, 22, 0.3)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center", color: "#000000" }}>
              <Check size={11} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#A1A1AA" }}>
                Case Updated
              </div>
              <div style={{ fontSize: "12.5px", color: "#F5F5F0", fontWeight: 600 }}>
                Owner notified
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text & Primary CTA (Exact from Screenshot 1) */}
        <div>
          <p style={{ fontSize: "14.5px", color: "#A1A1AA", margin: "0 0 16px 0" }}>
            Works with your setup. Adapts to your process.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
            <Link
              href="/platform"
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
              <span>Explore connections</span>
              <ArrowRight size={14} />
            </Link>

            <p className="serif-italic" style={{ fontSize: "14.5px", color: "#8E8E93", fontStyle: "italic", margin: 0 }}>
              No rip-and-replace. No extra place to check.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hp06-canvas { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
