"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, MessageSquare, Globe, Check, User, Building2 } from "lucide-react";

export default function HP05Enterprises() {
  const [selectedEnterprise, setSelectedEnterprise] = useState<string>("Healthcare Networks");
  const [selectedChannel, setSelectedChannel] = useState<"voice" | "whatsapp" | "web">("voice");

  const enterprises = [
    "Healthcare Networks",
    "Retail Chains",
    "Financial Services",
    "Logistics",
    "Education Groups",
    "Manufacturing",
    "Agri Enterprises",
    "Conglomerates",
  ];

  const enterpriseData: Record<
    string,
    {
      img: string;
      departments: string[];
      patientText: string;
      namusteText: string;
      outcomeText: string;
      footerNote: string;
      link: string;
    }
  > = {
    "Healthcare Networks": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["CARDIOLOGY →", "OPD 3 →", "ECHO LAB →", "PHARMACY →"],
      patientText: "Can I move my cardiology appointment to another branch?",
      namusteText: "Certainly. Which location would be more convenient?",
      outcomeText: "Appointment transferred • Salt Lake",
      footerNote: "One network. One helpful front door.",
      link: "/enterprise",
    },
    "Retail Chains": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["FLAGSHIP STORE →", "BAY 3 INVENTORY →", "CUSTOMER DESK →", "RETURNS →"],
      patientText: "Is the Navy Wool Suit in size 40 available for trial at Indiranagar?",
      namusteText: "Yes, 2 units in stock at Indiranagar Bay 3. I have held size 40 under your phone number.",
      outcomeText: "Hold tag generated • Store RM alerted",
      footerNote: "Omnichannel inventory. Zero lost footfall.",
      link: "/enterprise",
    },
    "Financial Services": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["WEALTH DESK →", "KYC VAULT →", "LOAN APPROVALS →", "BRANCH OPS →"],
      patientText: "Need status on our commercial overdraft facility renewal.",
      namusteText: "Renewal application is with Senior Underwriter Rajesh. I have scheduled his callback for 2:30 PM.",
      outcomeText: "SLA ticket #BNK-4091 logged • Direct officer callback",
      footerNote: "Verified financial workflows. Zero leakage.",
      link: "/enterprise",
    },
    "Logistics": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["FLEET TRACKING →", "PUNE HUB →", "CUSTOMS CLEARANCE →", "DISPATCH →"],
      patientText: "Container #TGHU-8819 is delayed at JNPT port gate. What is the revised gate-in time?",
      namusteText: "Customs clearance stamped at 08:15 AM. Trailer 14 is en route to Pune Hub with ETA 4:00 PM.",
      outcomeText: "GPS live sync confirmed • Consignee notified",
      footerNote: "Real-time dispatch context across 40+ transit hubs.",
      link: "/enterprise",
    },
    "Education Groups": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["ADMISSIONS →", "IB CAMPUS →", "REGISTRAR →", "FINANCE DESK →"],
      patientText: "Can we transfer my daughter from Whitefield campus to Sarjapur for Grade 9?",
      namusteText: "Sarjapur has 2 seats open in Grade 9 ICSE. I have initiated inter-branch transfer ticket #EDU-104.",
      outcomeText: "Transfer intake logged • Principal review scheduled",
      footerNote: "Central governance. Multi-campus ease.",
      link: "/enterprise",
    },
    "Manufacturing": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["LINE 2 PRODUCTION →", "PLANT QA →", "SUPPLIER PORTAL →", "DISPATCH →"],
      patientText: "Requesting mill test certificate for Batch 9940 cold-rolled coils.",
      namusteText: "Mill Test Certificate #MTC-9940 generated from SAP. Dispatched to your verified procurement email.",
      outcomeText: "SAP MTC dispatched • Dispatch manager updated",
      footerNote: "ERP synchronized. 100% trace accuracy.",
      link: "/enterprise",
    },
    "Agri Enterprises": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["MANDI PROCUREMENT →", "SEED LAB →", "DISTRIBUTION HUB →", "ACCOUNTS →"],
      patientText: "Need bulk price quote for 200 bags of Hybrid Mustard seeds to Indore depot.",
      namusteText: "Indore depot has stock. Commercial pricing is ₹1,450/bag. Quote #AG-883 sent to your WhatsApp.",
      outcomeText: "Depot stock held • Area Manager notified",
      footerNote: "Rural telephony & vernacular scale.",
      link: "/enterprise",
    },
    "Conglomerates": {
      img: "/hero-assets/healthcare-leader.jpg",
      departments: ["RETAIL UNIT →", "ENERGY CORP →", "REAL ESTATE →", "CENTRAL GOV →"],
      patientText: "Routing cross-subsidiary vendor billing inquiry to corporate treasury.",
      namusteText: "Invoice #GRP-902 routed to Energy Division Treasury with verified authorization token.",
      outcomeText: "Cross-subsidiary token verified • Task assigned",
      footerNote: "One enterprise intelligence. Air-gapped partitions.",
      link: "/enterprise",
    },
  };

  const current = enterpriseData[selectedEnterprise] || enterpriseData["Healthcare Networks"];

  return (
    <section
      id="hp-05"
      className="hp05-section-pad"
      style={{
        minHeight: "95vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
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
          One Role. Many Enterprises.
        </div>

        {/* Headline */}
        <div style={{ maxWidth: "880px", marginBottom: "28px" }}>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(38px, 4.5vw, 66px)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#F5F5F0",
              marginBottom: "16px",
            }}
          >
            Different enterprises.<br />
            The same need to <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>never lose a conversation.</span>
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
            Namuste learns the departments, locations and escalation paths that keep complex organisations moving.
          </p>
        </div>

        {/* 1. Horizontal Enterprise Selector */}
        <div
          className="touch-scroll hp05-tabs-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            paddingBottom: "16px",
            marginBottom: "20px",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {enterprises.map((tab) => {
            const isSelected = selectedEnterprise === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedEnterprise(tab)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 0",
                  fontSize: "14.5px",
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? "#9BEA16" : "#8E8E93",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {isSelected && (
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16", display: "inline-block" }} />
                )}
                <span>{tab}</span>
                {isSelected && (
                  <motion.div
                    layoutId="entTabUnderline"
                    style={{
                      position: "absolute",
                      bottom: "-17px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#9BEA16",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. Channel Selector Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "#8E8E93", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>
            Choose a channel:
          </span>
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
                  onClick={() => setSelectedChannel(ch.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: active ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    color: active ? "#9BEA16" : "#A1A1AA",
                    border: `1px solid ${active ? "rgba(155, 234, 22, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                  }}
                >
                  <Icon size={12} />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Central Operational Image with Signage & Live Conversation Stack */}
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            background: "#080808",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9)",
            minHeight: "500px",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            alignItems: "center",
            padding: "40px",
            marginBottom: "32px",
            boxSizing: "border-box",
            width: "100%",
          }}
          className="hp05-canvas"
        >
          {/* Background Leader Image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <img
              src={current.img}
              alt={selectedEnterprise}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)" }} />
          </div>

          {/* Left Overlay: Departments */}
          <div className="hp05-depts-container" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "#9BEA16", marginBottom: "8px" }}>
              Enterprise Department Routing
            </div>
            <div className="hp05-depts-list" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {current.departments.map((dept, i) => (
                <div key={i} style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: "8px", background: "rgba(10, 10, 10, 0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#D4D0C7", fontSize: "12.5px", fontFamily: "monospace", fontWeight: 600, width: "fit-content" }}>
                  {dept}
                </div>
              ))}
            </div>
          </div>

          {/* Right Overlay: Conversation Stack */}
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#F87171", textTransform: "uppercase" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F87171" }} />
              Live Conversation • {selectedChannel.toUpperCase()}
            </div>
            {/* Bubble 1 */}
            <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(15, 15, 15, 0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <div style={{ fontSize: "11px", color: "#9BEA16", fontWeight: 600, marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}><User size={12} /> Caller</div>
              <p style={{ fontSize: "13.5px", color: "#F5F5F0", margin: 0, lineHeight: 1.5 }}>&ldquo;{current.patientText}&rdquo;</p>
            </div>
            {/* Thread */}
            <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: "1px", height: "16px", background: "#9BEA16", opacity: 0.6 }} /></div>
            {/* Bubble 2 */}
            <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(15, 15, 15, 0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(155, 234, 22, 0.25)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <div style={{ fontSize: "11px", color: "#9BEA16", fontWeight: 700 }}>Namuste Digital Receptionist</div>
                <img src="/logo.png" alt="Namuste" style={{ height: "13px", width: "auto", objectFit: "contain" }} />
              </div>
              <p style={{ fontSize: "13.5px", color: "#F5F5F0", margin: 0, lineHeight: 1.5 }}>&ldquo;{current.namusteText}&rdquo;</p>
            </div>
            {/* Thread */}
            <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: "1px", height: "16px", background: "#9BEA16", opacity: 0.6 }} /></div>
            {/* Bubble 3: Outcome */}
            <div style={{ padding: "14px 20px", borderRadius: "14px", background: "rgba(15, 15, 15, 0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(155, 234, 22, 0.4)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "1.5px solid #9BEA16", display: "flex", alignItems: "center", justifyContent: "center", color: "#9BEA16", flexShrink: 0 }}><Check size={12} strokeWidth={3} /></div>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9BEA16" }}>Outcome</div>
                <div style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 600 }}>{current.outcomeText}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Footer Note & Primary CTA */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <p className="serif-italic" style={{ fontSize: "16px", color: "#D4D0C7", margin: 0, fontStyle: "italic" }}>{current.footerNote}</p>
          <Link href={current.link} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "999px", border: "1px solid rgba(155, 234, 22, 0.5)", color: "#9BEA16", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            <span>Give Namuste an enterprise</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        .hp05-section-pad { padding: 130px 40px 110px; }
        @media (max-width: 900px) {
          .hp05-canvas { 
            grid-template-columns: 1fr !important; 
            gap: 24px !important;
            padding: 24px 16px !important;
            min-height: auto !important;
          }
          .hp05-depts-list { flex-direction: row !important; flex-wrap: wrap !important; gap: 6px !important; }
          .hp05-metrics-strip { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
        @media (max-width: 768px) {
          .hp05-section-pad { padding: 56px 16px 40px !important; }
          .hp05-canvas { padding: 20px 14px !important; border-radius: 20px !important; }
        }
      `}</style>
    </section>
  );
}
