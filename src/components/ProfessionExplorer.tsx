"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  MessageSquare,
  Globe,
  ArrowRight,
  Stethoscope,
  Scale,
  Calculator,
  Compass,
  Building2,
  Sparkles,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Volume2,
  Clock,
  UserCheck,
} from "lucide-react";

export type Channel = "voice" | "whatsapp" | "web";

export interface ProfessionData {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  slug: string;
  channels: {
    voice: {
      userQuery: string;
      namusteResponse: string;
      audioLength: string;
      actionTaken: string;
      boundaryNote: string;
    };
    whatsapp: {
      userQuery: string;
      namusteResponse: string;
      actionTaken: string;
      boundaryNote: string;
    };
    web: {
      userQuery: string;
      namusteResponse: string;
      actionTaken: string;
      boundaryNote: string;
    };
  };
  outcome: {
    status: string;
    action: string;
    owner: string;
    calendarSync: string;
  };
}

export const PROFESSIONS_DATA: ProfessionData[] = [
  {
    id: "doctors",
    name: "Doctors & Clinics",
    badge: "Flagship Priority 01",
    icon: Stethoscope,
    slug: "doctors-and-clinics",
    channels: {
      voice: {
        userQuery: "Hello, do you have an appointment with Dr. Mehta tomorrow evening for my mother's cardiac follow-up?",
        namusteResponse: "Namuste. Dr. Mehta is available tomorrow, Thursday, at 5:30 PM and 6:45 PM. Shall I book the 5:30 PM slot and send the pre-consultation fasting guidelines over WhatsApp?",
        audioLength: "0:14",
        actionTaken: "Slot held for 15 mins • Pre-visit checklist prepared",
        boundaryNote: "Zero medical diagnosis • Strict scheduling & logistics scope",
      },
      whatsapp: {
        userQuery: "Hi, need to confirm Dr. Mehta's consultation fees and timings for tomorrow.",
        namusteResponse: "Namuste! Dr. Mehta consults from 4:00 PM to 8:00 PM on Thursdays. Consultation fee is ₹1,200. We have slots at 5:30 PM and 6:45 PM. Would you like to reserve one?",
        actionTaken: "Instant clinic fee policy shared • Calendar slot selector active",
        boundaryNote: "Direct verified clinic policy response",
      },
      web: {
        userQuery: "Looking to book an urgent cardiology slot for today.",
        namusteResponse: "Namuste. For medical emergencies, please dial our emergency desk immediately at 1800-000-911. For same-day urgent OPD review, I have alerted Nurse Supervisor Ananya.",
        actionTaken: "Emergency banner triggered • Escalation dispatched to clinic duty desk",
        boundaryNote: "Deterministic emergency safety guardrail applied",
      },
    },
    outcome: {
      status: "Appointment Requested & Confirmed",
      action: "5:30 PM slot reserved on Practo / Clinic HMS",
      owner: "Front Desk Coordinator (Pooja)",
      calendarSync: "Synced with Clinic Calendar • SMS dispatched",
    },
  },
  {
    id: "lawyers",
    name: "Lawyers & Advocates",
    badge: "Confidential Intake",
    icon: Scale,
    slug: "professional-services",
    channels: {
      voice: {
        userQuery: "I received a commercial lease notice and need an advocate to review it before Monday's deadline.",
        namusteResponse: "Namuste. Senior Associate Adv. Sharma handles commercial lease disputes. Her preliminary 30-minute legal assessment fee is ₹3,500. I can schedule you for Friday at 3:00 PM. Would you like me to send our secure document upload link?",
        audioLength: "0:18",
        actionTaken: "Client matter categorised: Commercial Lease • Upload vault token generated",
        boundaryNote: "No legal opinions provided • Intake and consultation fee capture only",
      },
      whatsapp: {
        userQuery: "Need an advocate for property registration dispute in South Delhi.",
        namusteResponse: "Namuste. We have registered property litigation specialists. Please share the jurisdiction area and whether an FIR or notice has been served, and I will align the appropriate partner.",
        actionTaken: "Preliminary intake conflict check initiated",
        boundaryNote: "Zero legal advice given • Conflict screening initiated",
      },
      web: {
        userQuery: "What are your consultation retainers for corporate contract review?",
        namusteResponse: "Namuste. Our corporate advisory desk offers fixed-scope review packages starting from ₹15,000 for standard MSA audits. Shall I schedule an introductory scoping call with our managing partner?",
        actionTaken: "Corporate pitch brief sent • Calendar link shared",
        boundaryNote: "Verified commercial tariff schedule referenced",
      },
    },
    outcome: {
      status: "Consultation Booked & Intake Logged",
      action: "Matter packet forwarded to Litigation Practice Lead",
      owner: "Intake Associate (Adv. Verma)",
      calendarSync: "Friday 3:00 PM locked in Outlook Calendar",
    },
  },
  {
    id: "accountants",
    name: "Chartered Accountants",
    badge: "Compliance & Tax",
    icon: Calculator,
    slug: "professional-services",
    channels: {
      voice: {
        userQuery: "Can I still file my delayed GST reconciliation return for Q3 today, and what documents are required?",
        namusteResponse: "Namuste. Yes, our tax desk is processing Q3 GSTR-9 reconciliations. I have sent the 5-point document checklist to your WhatsApp number. Our senior tax manager CA Rajesh has an opening at 11:30 AM tomorrow to review your ledger.",
        audioLength: "0:16",
        actionTaken: "GSTR document checklist dispatched • Tax manager slot aligned",
        boundaryNote: "Factual statutory deadline stated • No speculative tax advice",
      },
      whatsapp: {
        userQuery: "Need ITR-6 filing for our Pvt Ltd company before the audit deadline.",
        namusteResponse: "Namuste! We handle corporate ITR-6 filings with full statutory audit support. Please reply with your turnover bracket so I can connect you with the appropriate tax partner.",
        actionTaken: "Turnover qualification initiated",
        boundaryNote: "Statutory deadline rules applied",
      },
      web: {
        userQuery: "Do you assist with transfer pricing audits and ROC compliances?",
        namusteResponse: "Namuste. Yes, our international taxation team handles transfer pricing study reports and annual ROC filings. Would you like to view our corporate compliance handbook?",
        actionTaken: "Corporate compliance handbook dispatched to client email",
        boundaryNote: "Verified firm capabilities presented",
      },
    },
    outcome: {
      status: "Tax Checklist Shared & Slot Held",
      action: "5-point GSTR checklist dispatched via WhatsApp",
      owner: "Senior Tax Manager (CA Rajesh)",
      calendarSync: "Tomorrow 11:30 AM review slot booked",
    },
  },
  {
    id: "architects",
    name: "Architects & Designers",
    badge: "Spatial Design",
    icon: Compass,
    slug: "professional-services",
    channels: {
      voice: {
        userQuery: "We bought a 3,500 sq ft villa in Goa and want an initial design consultation and site visit next weekend.",
        namusteResponse: "Namuste. Congratulations on the property. Principal Architect Arjun will be in North Goa next Saturday. I have logged your 3,500 sq ft residential brief and sent our coastal portfolio. May I confirm Saturday at 11:00 AM for the site visit?",
        audioLength: "0:17",
        actionTaken: "Site location & square footage logged • Portfolio PDF dispatched",
        boundaryNote: "Commercial brief captured • Architect calendar confirmed",
      },
      whatsapp: {
        userQuery: "Hi, do you take up commercial interior fit-outs in Bangalore?",
        namusteResponse: "Namuste! Yes, we design commercial workspaces starting from 5,000 sq ft. Could you share your carpet area and expected move-in timeline?",
        actionTaken: "Commercial intent qualification logged",
        boundaryNote: "Minimum project threshold check applied",
      },
      web: {
        userQuery: "Can we see your sustainable residential portfolio?",
        namusteResponse: "Namuste. You can view our net-zero sustainable residences portfolio directly. Would you like our studio coordinator to call you for project scoping?",
        actionTaken: "Portfolio access granted • Lead forwarded to Studio Lead",
        boundaryNote: "Direct verified design assets delivered",
      },
    },
    outcome: {
      status: "Site Visit Confirmed & Brief Logged",
      action: "Goa site survey briefing document generated",
      owner: "Studio Coordinator (Rhea)",
      calendarSync: "Saturday 11:00 AM added to Master Studio Schedule",
    },
  },
  {
    id: "realestate",
    name: "Real Estate Brokers",
    badge: "High-Ticket Advisory",
    icon: Building2,
    slug: "professional-services",
    channels: {
      voice: {
        userQuery: "Hi, is the 4 BHK penthouse in Golf Course Extension still available for private walkthrough tomorrow?",
        namusteResponse: "Namuste. Yes, the 4,200 sq ft duplex penthouse is available for private walkthroughs at 2:00 PM and 4:30 PM tomorrow. I will register your visitor pass and dispatch the floor plan to your WhatsApp. Which timing suits you?",
        audioLength: "0:16",
        actionTaken: "Gate pass pre-approval logged • Floor plan sent to WhatsApp",
        boundaryNote: "Verified property availability confirmed • No price speculation",
      },
      whatsapp: {
        userQuery: "Looking for 3 BHK apartments in Worli under 8 Cr with sea view.",
        namusteResponse: "Namuste! We have 3 verified ready-to-move sea-facing options matching your budget. Sending the PDF brochures and price matrices right now.",
        actionTaken: "Curated inventory PDF batch shared with client",
        boundaryNote: "Grounded in active property inventory database",
      },
      web: {
        userQuery: "Can NRI buyers get remote power-of-attorney walkthroughs?",
        namusteResponse: "Namuste. Yes, our NRI desk conducts live 4K video walkthroughs and coordinates PoA documentation with bank legal teams. Shall I schedule an NRI specialist call?",
        actionTaken: "NRI video walkthrough requested",
        boundaryNote: "NRI compliance protocol followed",
      },
    },
    outcome: {
      status: "Private Viewing Scheduled",
      action: "Visitor security pass generated • Brochure sent",
      owner: "Senior Luxury Advisor (Karan)",
      calendarSync: "Tomorrow 2:00 PM on-site visit confirmed",
    },
  },
  {
    id: "salons",
    name: "Salons & Aesthetics",
    badge: "Wellness & Beauty",
    icon: Sparkles,
    slug: "professional-services",
    channels: {
      voice: {
        userQuery: "Hey, do you have a slot for bridal hair spa and facial with Priya on Saturday at 4 PM?",
        namusteResponse: "Namuste. Priya has an opening at 4:30 PM on Saturday for the 90-minute Bridal Glow & Hair Spa package. I can book Priya for you right now and reserve the private aesthetic suite. Shall I proceed?",
        audioLength: "0:15",
        actionTaken: "Stylist Priya blocked • Private aesthetic suite reserved",
        boundaryNote: "Accurate service duration & specialist availability mapped",
      },
      whatsapp: {
        userQuery: "Hi! How much does the HydraFacial treatment cost and how long does it take?",
        namusteResponse: "Namuste! Our Medical HydraFacial is ₹4,500 and takes approximately 60 minutes. Would you like me to check dermatologist-supervised slots for this weekend?",
        actionTaken: "Treatment pricing card shared",
        boundaryNote: "Standard service catalog rates displayed",
      },
      web: {
        userQuery: "Do you offer group bridal party packages?",
        namusteResponse: "Namuste. Yes, we curate private bridal salon buyouts for groups of 4 or more with complimentary refreshments. Would you like our bridal concierge to call you?",
        actionTaken: "Bridal concierge lead created",
        boundaryNote: "Group package parameters shared",
      },
    },
    outcome: {
      status: "Appointment Slot & Suite Confirmed",
      action: "Salon POS booking created • Stylist notified",
      owner: "Salon Manager (Neha)",
      calendarSync: "Saturday 4:30 PM locked in Zenoti / Salon Software",
    },
  },
  {
    id: "financial",
    name: "Wealth & Financial Advisors",
    badge: "Wealth Management",
    icon: TrendingUp,
    slug: "professional-services",
    channels: {
      voice: {
        userQuery: "I want to review our family trust's debt portfolio allocation before the next RBI monetary policy meeting.",
        namusteResponse: "Namuste. Certified Financial Planner Vikram conducts debt portfolio strategy reviews. I can schedule an introductory 45-minute confidential call on Tuesday at 10:00 AM. I have sent our SEBI-registered advisory credential kit to your phone.",
        audioLength: "0:18",
        actionTaken: "SEBI disclosure document sent • Advisory slot reserved",
        boundaryNote: "Strict SEBI compliance: no stock tips or return guarantees",
      },
      whatsapp: {
        userQuery: "What is the minimum portfolio size for PMS advisory services?",
        namusteResponse: "Namuste! In accordance with SEBI guidelines, the statutory minimum investment for Portfolio Management Services (PMS) is ₹50 Lakhs. Would you like to review our PMS factsheet?",
        actionTaken: "SEBI statutory factsheet dispatched",
        boundaryNote: "SEBI regulated statutory limits stated",
      },
      web: {
        userQuery: "How do you structure offshore estate planning for NRI families?",
        namusteResponse: "Namuste. Our multi-family office desk coordinates cross-border trusts with offshore legal partners. Shall I arrange a confidential discussion with our Estate Planning Director?",
        actionTaken: "Estate planning meeting request logged",
        boundaryNote: "Verified multi-family office workflow shared",
      },
    },
    outcome: {
      status: "Introductory Discovery Call Arranged",
      action: "SEBI regulatory disclosure pack sent via email",
      owner: "Principal Wealth Advisor (Vikram)",
      calendarSync: "Tuesday 10:00 AM secured in Google Calendar",
    },
  },
  {
    id: "consultants",
    name: "Management Consultants",
    badge: "B2B Strategic Advisory",
    icon: Briefcase,
    slug: "professional-services",
    channels: {
      voice: {
        userQuery: "We are an auto-component manufacturer looking to conduct a supply chain audit across 4 regional hubs.",
        namusteResponse: "Namuste. Our Operations Strategy practice has led multi-facility supply chain audits across automotive OEMs. Partner Alok is available for a 45-minute scoping discussion on Monday at 4:00 PM. Shall I send our credentials brief and lock the meeting?",
        audioLength: "0:19",
        actionTaken: "Automotive case study packet sent • Partner meeting held",
        boundaryNote: "Practice capability scoping • Non-binding initial assessment",
      },
      whatsapp: {
        userQuery: "Looking for ERP migration advisory and vendor RFP evaluation consultants.",
        namusteResponse: "Namuste! Our Digital Transformation team assists enterprise clients through vendor selection and SAP/Oracle cutovers. May I share our RFP advisory capability deck?",
        actionTaken: "Capability deck link shared",
        boundaryNote: "Commercial engagement framework outlined",
      },
      web: {
        userQuery: "What is your typical diagnostic engagement duration?",
        namusteResponse: "Namuste. Our rapid diagnostic sprints run for 4 weeks and deliver an actionable operational roadmap. Would you like to schedule a partner discovery session?",
        actionTaken: "Discovery workshop invitation sent",
        boundaryNote: "Standard diagnostic parameters provided",
      },
    },
    outcome: {
      status: "Discovery Session & Deck Dispatched",
      action: "Automotive supply chain audit case study dispatched",
      owner: "Operations Practice Partner (Alok)",
      calendarSync: "Monday 4:00 PM confirmed in Partner Calendar",
    },
  },
];

export default function ProfessionExplorer() {
  const [selectedProfId, setSelectedProfId] = useState<string>("doctors");
  const [selectedChannel, setSelectedChannel] = useState<Channel>("voice");

  const currentProf = PROFESSIONS_DATA.find((p) => p.id === selectedProfId) || PROFESSIONS_DATA[0];
  const channelContent = currentProf.channels[selectedChannel];

  return (
    <div style={{ width: "100%" }}>
      {/* 1. Profession Tab Selector Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {PROFESSIONS_DATA.map((prof) => {
          const isSelected = prof.id === selectedProfId;
          const Icon = prof.icon;
          return (
            <button
              key={prof.id}
              onClick={() => setSelectedProfId(prof.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "999px",
                fontSize: "13.5px",
                fontWeight: isSelected ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isSelected ? "rgba(118, 192, 67, 0.14)" : "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.1)"}`,
                color: isSelected ? "var(--green-luminous)" : "var(--text-muted)",
                boxShadow: isSelected ? "0 0 20px rgba(118, 192, 67, 0.2)" : "none",
              }}
            >
              <Icon size={16} style={{ color: isSelected ? "var(--green)" : "var(--text-muted)" }} />
              <span>{prof.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. NON-NEGOTIABLE PRD LAYOUT RULE: "Choose a channel" immediately beneath the selector */}
      <div
        style={{
          padding: "16px 22px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          marginBottom: "28px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, color: "var(--text-muted)" }}>
            Choose a channel:
          </span>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "voice" as Channel, label: "Voice Call (Default)", icon: PhoneCall },
              { id: "whatsapp" as Channel, label: "WhatsApp Chat", icon: MessageSquare },
              { id: "web" as Channel, label: "Web Assistant", icon: Globe },
            ].map((ch) => {
              const active = selectedChannel === ch.id;
              const ChIcon = ch.icon;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: active ? "var(--green)" : "rgba(255, 255, 255, 0.04)",
                    color: active ? "#050505" : "var(--text-body)",
                    border: `1px solid ${active ? "var(--green)" : "rgba(255, 255, 255, 0.08)"}`,
                    boxShadow: active ? "0 0 14px rgba(118, 192, 67, 0.35)" : "none",
                  }}
                >
                  <ChIcon size={14} />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "var(--text-muted)" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
          <span>Active: <strong style={{ color: "var(--text-ivory)" }}>{currentProf.name}</strong></span>
        </div>
      </div>

      {/* 3. Live Dialogue & Operational Outcome Atomic State Card */}
      <div
        className="glass-card"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "28px",
          padding: "36px",
          borderRadius: "22px",
          background: "rgba(11, 14, 11, 0.85)",
          border: "1px solid rgba(118, 192, 67, 0.2)",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* Left Column: Live Conversation Simulation */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Header Badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {selectedChannel === "voice" ? <Volume2 size={18} /> : selectedChannel === "whatsapp" ? <MessageSquare size={18} /> : <Globe size={18} />}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)" }}>
                    Live {selectedChannel.toUpperCase()} Dialogue
                  </div>
                  <div style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--text-ivory)" }}>{currentProf.name}</div>
                </div>
              </div>
              <span className="pill" style={{ fontSize: "11px" }}>
                {currentProf.badge}
              </span>
            </div>

            {/* Conversation Flow */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* User Message */}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", color: "var(--text-ivory)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>
                  C
                </div>
                <div style={{ padding: "14px 18px", borderRadius: "14px", borderTopLeftRadius: "2px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.6, maxWidth: "85%" }}>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Customer Enquiry</div>
                  &ldquo;{channelContent.userQuery}&rdquo;
                </div>
              </div>

              {/* Namuste Response */}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", justifyContent: "flex-end" }}>
                <div style={{ padding: "16px 20px", borderRadius: "16px", borderTopRightRadius: "2px", background: "rgba(118, 192, 67, 0.09)", border: "1px solid rgba(118, 192, 67, 0.3)", fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.65, maxWidth: "90%", boxShadow: "0 0 30px rgba(118, 192, 67, 0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                      <ShieldCheck size={14} /> Namuste Digital Receptionist
                    </span>
                    {selectedChannel === "voice" && "audioLength" in channelContent && (
                      <span style={{ fontSize: "10.5px", color: "var(--green)", fontFamily: "monospace", padding: "2px 6px", borderRadius: "4px", background: "rgba(118, 192, 67, 0.15)" }}>
                        {(channelContent as any).audioLength}s Audio
                      </span>
                    )}
                  </div>
                  <p style={{ color: "var(--text-ivory)", margin: 0 }}>&ldquo;{channelContent.namusteResponse}&rdquo;</p>

                  {/* Audio Waveform visualization if voice */}
                  {selectedChannel === "voice" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(118, 192, 67, 0.2)" }}>
                      <Volume2 size={14} style={{ color: "var(--green)" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "14px", flex: 1 }}>
                        {[40, 75, 90, 50, 85, 100, 60, 45, 90, 70, 95, 40, 80, 65, 30].map((h, i) => (
                          <div
                            key={i}
                            style={{ width: "3px", background: "var(--green)", borderRadius: "2px", height: `${h}%`, opacity: 0.8 }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>160ms Latency</span>
                    </div>
                  )}
                </div>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--green)", color: "#050505", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, flexShrink: 0, marginTop: "2px" }}>
                  N
                </div>
              </div>
            </div>
          </div>

          {/* Action Taken & Boundary Footnote */}
          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px", fontSize: "12.5px" }}>
            <div style={{ color: "var(--green)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={15} />
              <span>{channelContent.actionTaken}</span>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "11.5px", fontStyle: "italic" }}>
              {channelContent.boundaryNote}
            </div>
          </div>
        </div>

        {/* Right Column: Structured Outcome Card */}
        <div
          style={{
            padding: "28px",
            borderRadius: "18px",
            background: "rgba(10, 18, 10, 0.85)",
            border: "1px solid rgba(118, 192, 67, 0.35)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)" }}>
                Operational Outcome
              </span>
              <span style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", border: "1px solid rgba(118, 192, 67, 0.3)" }}>
                100% Resolved
              </span>
            </div>

            <h4 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", fontWeight: 400, marginBottom: "20px", lineHeight: 1.3 }}>
              {currentProf.outcome.status}
            </h4>

            {/* Outcome Specs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", fontSize: "13px" }}>
              <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "11.5px", marginBottom: "4px", fontWeight: 500 }}>Concrete Business Action:</div>
                <div style={{ color: "var(--text-ivory)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--green)" }} />
                  {currentProf.outcome.action}
                </div>
              </div>

              <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "11.5px", marginBottom: "4px", fontWeight: 500 }}>Assigned Human Owner:</div>
                <div style={{ color: "var(--text-ivory)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  <UserCheck size={14} style={{ color: "var(--green)" }} />
                  {currentProf.outcome.owner}
                </div>
              </div>

              <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "11.5px", marginBottom: "4px", fontWeight: 500 }}>System Synchronization:</div>
                <div style={{ color: "var(--text-body)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={14} style={{ color: "var(--green)" }} />
                  {currentProf.outcome.calendarSync}
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Playbook Link CTA */}
          <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Link
              href={`/industries/${currentProf.slug}`}
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", padding: "12px 20px", fontSize: "13.5px" }}
            >
              <span>Explore {currentProf.name} Playbook</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
