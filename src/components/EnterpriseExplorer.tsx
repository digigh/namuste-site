"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Network,
  Building,
  Store,
  Landmark,
  Truck,
  GraduationCap,
  Factory,
  Wheat,
  PhoneCall,
  MessageSquare,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  Layers,
  Database,
  Volume2,
} from "lucide-react";

export type Channel = "voice" | "whatsapp" | "web";

export interface EnterpriseData {
  id: string;
  name: string;
  sectorBadge: string;
  icon: React.ElementType;
  slug: string;
  routingContext: string;
  channels: {
    voice: {
      userQuery: string;
      namusteResponse: string;
      routingStep: string;
      integrationSync: string;
    };
    whatsapp: {
      userQuery: string;
      namusteResponse: string;
      routingStep: string;
      integrationSync: string;
    };
    web: {
      userQuery: string;
      namusteResponse: string;
      routingStep: string;
      integrationSync: string;
    };
  };
  outcome: {
    status: string;
    targetEntity: string;
    dataSecurity: string;
    slaGuaranteed: string;
  };
}

export const ENTERPRISE_DATA: EnterpriseData[] = [
  {
    id: "healthcare",
    name: "Healthcare Networks",
    sectorBadge: "Multi-Hospital Group",
    icon: Network,
    slug: "healthcare-networks",
    routingContext: "Multi-facility EHR • Regional triage • Doctor scheduling across 14 units",
    channels: {
      voice: {
        userQuery: "I need to transfer my post-op cardiology review from Mumbai South to the Thane West facility.",
        namusteResponse: "Namuste. I have located your post-operative record under Dr. Singhania. I am transferring your review to Senior Cardiologist Dr. Patwardhan at Thane West for Saturday, 11:30 AM, and transferring your pre-op scan history.",
        routingStep: "EHR Record mapped from Unit 01 (South) -> Unit 04 (Thane)",
        integrationSync: "Epic / Cerner FHIR API • HL7 compliant record transfer",
      },
      whatsapp: {
        userQuery: "Which of your Apollo branches in NCR has a paediatric neurologist available this Sunday?",
        namusteResponse: "Namuste. Dr. Kavita Rao is on duty at our Noida Sector 62 hospital from 10:00 AM to 2:00 PM this Sunday. Would you like me to hold an OPD queue token?",
        routingStep: "NCR Cross-facility paediatric doctor roster check",
        integrationSync: "Real-time Multi-Branch OPD Queue Manager",
      },
      web: {
        userQuery: "We need corporate executive health check-up slots for 80 employees across Pune and Bengaluru.",
        namusteResponse: "Namuste. I have initiated an Enterprise Health Checkup proposal. Corporate Relationship Manager Mr. Deshmukh has received your roster parameters.",
        routingStep: "Corporate Health Services Desk escalation",
        integrationSync: "Enterprise Corporate Wellness CRM API",
      },
    },
    outcome: {
      status: "Cross-Location Record & Slot Transferred",
      targetEntity: "Thane West Cardiology Outpatient Division",
      dataSecurity: "HIPAA / DISHA Compliant PII Masking Active",
      slaGuaranteed: "Instant transfer • Confirmation in 30s",
    },
  },
  {
    id: "retail",
    name: "Retail Chains",
    sectorBadge: "120+ Store Network",
    icon: Store,
    slug: "retail-chains",
    routingContext: "Live store inventory • POS reservation • Geo-routed pickup",
    channels: {
      voice: {
        userQuery: "Is the Merino Wool Navy Blazer in size 42 in stock at the Indiranagar store, or can I pick it up in Koramangala?",
        namusteResponse: "Namuste. Indiranagar has 1 piece remaining. Koramangala has 3 pieces in stock. I have placed a 3-hour inventory hold for you at the Koramangala flagship store and sent the pickup barcode to WhatsApp.",
        routingStep: "Store Inventory Matrix mapped (Koramangala Store #18)",
        integrationSync: "SAP S/4HANA Retail & POS Inventory Engine",
      },
      whatsapp: {
        userQuery: "Can I exchange an online shoe order at your Connaught Place store?",
        namusteResponse: "Namuste! Yes, omnichannel returns are accepted at all flagship outlets. Present your Order #IN-9082 at the ground-floor return desk for instant exchange.",
        routingStep: "Omnichannel OMS return token generated",
        integrationSync: "Shopify Plus / Blue Yonder OMS",
      },
      web: {
        userQuery: "Looking to place a bulk festive corporate gifting order across 5 cities.",
        namusteResponse: "Namuste. Our Institutional Sales team handles multi-location corporate consignments. I have routed your request to Regional Head Priya with catalog pricing.",
        routingStep: "Institutional Corporate Sales Desk",
        integrationSync: "Salesforce B2B Commerce Hub",
      },
    },
    outcome: {
      status: "Inventory Reserved at Selected Store",
      targetEntity: "Koramangala Flagship Store #18 (Hold Bay 4)",
      dataSecurity: "PCI-DSS tokenized order identifiers",
      slaGuaranteed: "Store hold confirmed within 15 seconds",
    },
  },
  {
    id: "financial",
    name: "Financial Services",
    sectorBadge: "Banking & NBFC",
    icon: Landmark,
    slug: "financial-services",
    routingContext: "Dispute logging • Auth verification • Fraud triage • Lead routing",
    channels: {
      voice: {
        userQuery: "I noticed a duplicate international debit charge of $140 on my platinum card while in transit.",
        namusteResponse: "Namuste. For your security, I have temporarily restricted international e-commerce on card ending 8819 and created Priority Dispute Case #DIS-9921 for our 24/7 Fraud Operations desk. A verification SMS has been dispatched.",
        routingStep: "Fraud desk priority queue • Card control switch engaged",
        integrationSync: "Finacle / Temenos Core Banking Switch",
      },
      whatsapp: {
        userQuery: "What is the status of my home loan sanction letter for Application #HL-4421?",
        namusteResponse: "Namuste! Your home loan sanction letter of ₹75 Lakhs is approved. I have verified your registered mobile and dispatched the encrypted PDF sanction letter.",
        routingStep: "Loan Origination System (LOS) record query",
        integrationSync: "Pennant / FinnOne Neo LOS",
      },
      web: {
        userQuery: "Need working capital overdraft facility of 5 Cr for manufacturing firm.",
        namusteResponse: "Namuste. Commercial Credit Partner Rajesh handles SME working capital credit. Would you like to upload your audited 3-year P&L for preliminary term-sheet review?",
        routingStep: "Mid-Market Commercial Underwriting Team",
        integrationSync: "Corporate Underwriting Portal",
      },
    },
    outcome: {
      status: "Dispute Logged to Priority Risk Desk",
      targetEntity: "Card Operations & Fraud Prevention Unit",
      dataSecurity: "ISO 27001 / RBI Cyber Security Compliant",
      slaGuaranteed: "Instant card lock • Case TAT 2 hours",
    },
  },
  {
    id: "logistics",
    name: "Logistics & Freight",
    sectorBadge: "Supply Chain & Hubs",
    icon: Truck,
    slug: "logistics",
    routingContext: "Fleet tracking • Hub exception resolution • Consignee dispatch updates",
    channels: {
      voice: {
        userQuery: "AWB 992813 container is delayed past delivery window at Bhiwandi Hub. What is the updated gate-in ETA?",
        namusteResponse: "Namuste. AWB 992813 cleared toll clearance at Khadavli and is scheduled for Bhiwandi Hub gate-in at 3:15 PM today. Unloading bay #07 is pre-assigned for priority cross-docking.",
        routingStep: "GPS Telematics & Hub Management System query",
        integrationSync: "Oracle Transportation Management (OTM)",
      },
      whatsapp: {
        userQuery: "Reschedule delivery for shipment #DEL-401 to tomorrow morning.",
        namusteResponse: "Namuste! Shipment #DEL-401 has been rescheduled for first-attempt delivery tomorrow between 9:00 AM and 1:00 PM. Delivery associate notified.",
        routingStep: "Last-mile route planner re-sequenced",
        integrationSync: "FarEye / Locus Dispatch Engine",
      },
      web: {
        userQuery: "Requesting full truckload rate quote for Chennai to Gurgaon corridor.",
        namusteResponse: "Namuste. Spot rate for 32ft multi-axle vehicle on Chennai-Gurgaon is ₹84,500. Booking desk partner Sanjay is available to confirm vehicle placement.",
        routingStep: "Line-Haul Pricing & Placement Desk",
        integrationSync: "Freight ERP & Carrier Management Engine",
      },
    },
    outcome: {
      status: "Hub Status & Bay Reservation Dispatched",
      targetEntity: "Bhiwandi Central Cross-Docking Terminal",
      dataSecurity: "Encrypted Telematics & Geofence Logs",
      slaGuaranteed: "Live GPS update in < 200ms",
    },
  },
  {
    id: "education",
    name: "Education Groups",
    sectorBadge: "Multi-Campus University",
    icon: GraduationCap,
    slug: "education-groups",
    routingContext: "Campus admission triage • Programme eligibility • Counsellor alignment",
    channels: {
      voice: {
        userQuery: "We want to book a guided campus walkthrough and Dean interview for the B.Tech Computer Science programme at Noida campus.",
        namusteResponse: "Namuste. Noida campus is hosting prospective engineering families this Saturday at 10:00 AM. I have reserved 3 attendee badges for the Robotics Lab tour and Dean introductory briefing.",
        routingStep: "School of Engineering Admissions Coordinator",
        integrationSync: "NoPaperForms / Salesforce Education Cloud",
      },
      whatsapp: {
        userQuery: "What is the CUET cut-off for B.Com (Hons) at North Campus?",
        namusteResponse: "Namuste! The general category 1st round cut-off percentile was 98.2. Would you like to review scholarship criteria for top-decile scorers?",
        routingStep: "Admissions Eligibility Knowledge Base",
        integrationSync: "University SIS & Merit Portal",
      },
      web: {
        userQuery: "Can international students get on-campus residential housing?",
        namusteResponse: "Namuste. Yes, our International Student Centre reserves twin-sharing air-conditioned residential blocks. I have forwarded our Global Admissions prospectus.",
        routingStep: "International Student Relations Office",
        integrationSync: "Global Admissions CRM",
      },
    },
    outcome: {
      status: "Campus Tour & Dean Meeting Confirmed",
      targetEntity: "School of Technology Admissions Directorate",
      dataSecurity: "Student Data Privacy & FERPA Equivalent Controls",
      slaGuaranteed: "Visitor pass with QR generated immediately",
    },
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Heavy Industries",
    sectorBadge: "Multi-Plant Operations",
    icon: Factory,
    slug: "manufacturing",
    routingContext: "Dealer quotes • Production capacity • OEM supply dispatch",
    channels: {
      voice: {
        userQuery: "We are an authorized dealer requiring 40 metric tonnes of galvanized coil from Pune Plant for immediate delivery.",
        namusteResponse: "Namuste. Pune Plant Line 2 has 40 MT 0.8mm GI Coil available for batch dispatch tomorrow morning. I have alerted Regional Sales Head Alok to lock the commercial purchase order.",
        routingStep: "Plant Line 2 Production Schedule & Inventory check",
        integrationSync: "SAP ERP S/4HANA Materials Management",
      },
      whatsapp: {
        userQuery: "Need test certificates (MTC) for Heat Number #HT-9821.",
        namusteResponse: "Namuste! Mill Test Certificate for Heat #HT-9821 is verified. Dispatching the digitally signed PDF certificate to your registered email.",
        routingStep: "Quality Assurance & Metallurgical Lab Portal",
        integrationSync: "Plant LIMS & Document Management System",
      },
      web: {
        userQuery: "Looking to become an authorized regional distributor for industrial lubricants.",
        namusteResponse: "Namuste. Our Channel Development Director evaluates territorial dealership applications. Would you like to complete our 4-point credential screening form?",
        routingStep: "Institutional Channel Expansion Desk",
        integrationSync: "Enterprise Partner Relationship Management (PRM)",
      },
    },
    outcome: {
      status: "Plant Dispatch & PO Request Created",
      targetEntity: "Pune Facility Regional Sales & Logistics Desk",
      dataSecurity: "Commercial confidentiality & pricing controls",
      slaGuaranteed: "Commercial confirmation within 4 hours",
    },
  },
  {
    id: "agri",
    name: "Agri Enterprises",
    sectorBadge: "Field Commerce & Inputs",
    icon: Wheat,
    slug: "agri-enterprises",
    routingContext: "Field distribution • Agronomy advice boundaries • Regional stock routing",
    channels: {
      voice: {
        userQuery: "Is certified hybrid mustard seed stock available for supply to our 12 dealer points in Kota district?",
        namusteResponse: "Namuste. Our Rajasthan Central Warehouse has 180 quintals of certified Hybrid Mustard seed in stock. Regional Agronomist Dr. Choudhary will coordinate dispatch with Kota hub.",
        routingStep: "Regional Agri-Hub Inventory & Field Agronomist assignment",
        integrationSync: "Agri-Distribution ERP & Supply Chain System",
      },
      whatsapp: {
        userQuery: "What is the recommended dosage for bio-fertilizer on wheat crop in 3rd week?",
        namusteResponse: "Namuste! For 3rd-week wheat crop, the verified agronomy recommendation is 2.5 kg per acre with irrigation. Sending the complete field application guide.",
        routingStep: "Verified Agronomy Protocol Knowledge Repository",
        integrationSync: "Digital Agronomy Knowledge Engine",
      },
      web: {
        userQuery: "Can FPOs place bulk credit orders for solar micro-irrigation systems?",
        namusteResponse: "Namuste. Yes, our Institutional FPO desk provides subsidized financing under PM-KUSUM. I have alerted our Rural Credit Team.",
        routingStep: "Institutional Rural & FPO Desk",
        integrationSync: "Rural Finance & Subsidy Processing Engine",
      },
    },
    outcome: {
      status: "Seed Allocation & Regional Delivery Route Set",
      targetEntity: "Rajasthan Regional Agri-Commerce Hub (Kota)",
      dataSecurity: "Dealer privacy & regulated chemical safety protocols",
      slaGuaranteed: "Dispatched within 24 hours to dealer points",
    },
  },
  {
    id: "conglomerate",
    name: "Conglomerates & Holding Cos",
    sectorBadge: "Multi-Brand Group Architecture",
    icon: Building,
    slug: "conglomerates",
    routingContext: "Single front door • Multi-entity RBAC • Enterprise routing governance",
    channels: {
      voice: {
        userQuery: "We are an institutional investor seeking corporate sustainability disclosures across your renewable energy and infrastructure subsidiaries.",
        namusteResponse: "Namuste. I am connecting you with the Group Chief Sustainability Officer's desk. I have generated your ESG Investor Packet containing audited BRSR filings across all 4 listed group entities.",
        routingStep: "Group Holding Co Corporate Affairs & Investor Relations",
        integrationSync: "Group Corporate Governance & IR Portal",
      },
      whatsapp: {
        userQuery: "Need vendor onboarding guidelines for Group Shared Services procurement.",
        namusteResponse: "Namuste! Shared Services Global Procurement guidelines are accessible via our vendor portal. I have dispatched the compliance vendor registration checklist.",
        routingStep: "Central Shared Services Procurement Desk",
        integrationSync: "Ariba / Coupa Vendor Management Engine",
      },
      web: {
        userQuery: "How does Namuste enforce data isolation across competing business units in one conglomerate?",
        namusteResponse: "Namuste utilizes multi-tenant logical partitioning with strict Role-Based Access Control (RBAC). Each subsidiary operates isolated knowledge vaults, CRM integrations, and compliance policies.",
        routingStep: "Enterprise Architecture & Security Overview",
        integrationSync: "Single Sign-On (Okta/Azure AD) & RBAC Gateway",
      },
    },
    outcome: {
      status: "Investor ESG Packet Generated & Routed",
      targetEntity: "Group Investor Relations & ESG Directorate",
      dataSecurity: "Strict Multi-Entity Air-Gapped RBAC Vaults",
      slaGuaranteed: "Verified routing across 20+ operating companies",
    },
  },
];

export default function EnterpriseExplorer() {
  const [selectedEntId, setSelectedEntId] = useState<string>("healthcare");
  const [selectedChannel, setSelectedChannel] = useState<Channel>("voice");

  const currentEnt = ENTERPRISE_DATA.find((e) => e.id === selectedEntId) || ENTERPRISE_DATA[0];
  const channelContent = currentEnt.channels[selectedChannel];

  return (
    <div style={{ width: "100%" }}>
      {/* 1. Enterprise Sector Selector Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {ENTERPRISE_DATA.map((ent) => {
          const isSelected = ent.id === selectedEntId;
          const Icon = ent.icon;
          return (
            <button
              key={ent.id}
              onClick={() => setSelectedEntId(ent.id)}
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
              <span>{ent.name}</span>
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
          <GitBranch size={14} style={{ color: "var(--green)" }} />
          <span>Routing: <strong style={{ color: "var(--text-ivory)" }}>{currentEnt.routingContext}</strong></span>
        </div>
      </div>

      {/* 3. Enterprise Routing & System Synchronization Engine */}
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
        {/* Left Column: Enterprise Multi-System Dialogue */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Header Badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Network size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)" }}>
                    Enterprise Layer • {selectedChannel.toUpperCase()}
                  </div>
                  <div style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--text-ivory)" }}>{currentEnt.name}</div>
                </div>
              </div>
              <span className="pill" style={{ fontSize: "11px" }}>
                {currentEnt.sectorBadge}
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
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Enterprise Inbound Request</div>
                  &ldquo;{channelContent.userQuery}&rdquo;
                </div>
              </div>

              {/* Namuste Enterprise Response */}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", justifyContent: "flex-end" }}>
                <div style={{ padding: "16px 20px", borderRadius: "16px", borderTopRightRadius: "2px", background: "rgba(118, 192, 67, 0.09)", border: "1px solid rgba(118, 192, 67, 0.3)", fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.65, maxWidth: "90%", boxShadow: "0 0 30px rgba(118, 192, 67, 0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                      <ShieldCheck size={14} /> Namuste Enterprise Layer
                    </span>
                    <span style={{ fontSize: "10.5px", color: "var(--green)", fontFamily: "monospace", padding: "2px 6px", borderRadius: "4px", background: "rgba(118, 192, 67, 0.15)" }}>
                      Multi-Tenant RBAC
                    </span>
                  </div>
                  <p style={{ color: "var(--text-ivory)", margin: 0 }}>&ldquo;{channelContent.namusteResponse}&rdquo;</p>

                  {/* System Routing Telemetry */}
                  <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(118, 192, 67, 0.2)", display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px" }}>
                    <div style={{ color: "var(--green-luminous)", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
                      <GitBranch size={13} />
                      <span>{channelContent.routingStep}</span>
                    </div>
                    <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                      <Database size={12} style={{ color: "var(--green)" }} />
                      <span>{channelContent.integrationSync}</span>
                    </div>
                  </div>
                </div>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--green)", color: "#050505", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, flexShrink: 0, marginTop: "2px" }}>
                  N
                </div>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--green)" }}>
              <Layers size={14} />
              <span>Isolated tenant boundary • Zero data leak across entities</span>
            </div>
            <span style={{ fontFamily: "monospace", fontSize: "11px" }}>Latency &lt; 220ms</span>
          </div>
        </div>

        {/* Right Column: Enterprise Outcome & Security Card */}
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
                Enterprise Outcome
              </span>
              <span style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: "rgba(118, 192, 67, 0.2)", color: "var(--green)", border: "1px solid rgba(118, 192, 67, 0.3)" }}>
                Routed & Governed
              </span>
            </div>

            <h4 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", fontWeight: 400, marginBottom: "20px", lineHeight: 1.3 }}>
              {currentEnt.outcome.status}
            </h4>

            {/* Outcome Specs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", fontSize: "13px" }}>
              <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "11.5px", marginBottom: "4px", fontWeight: 500 }}>Target Operating Entity:</div>
                <div style={{ color: "var(--text-ivory)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--green)" }} />
                  {currentEnt.outcome.targetEntity}
                </div>
              </div>

              <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "11.5px", marginBottom: "4px", fontWeight: 500 }}>Enterprise Security Protocol:</div>
                <div style={{ color: "var(--text-ivory)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={14} style={{ color: "var(--green)" }} />
                  {currentEnt.outcome.dataSecurity}
                </div>
              </div>

              <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "11.5px", marginBottom: "4px", fontWeight: 500 }}>Execution SLA:</div>
                <div style={{ color: "var(--text-body)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Network size={14} style={{ color: "var(--green)" }} />
                  {currentEnt.outcome.slaGuaranteed}
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Consultation CTA */}
          <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Link
              href="/enterprise"
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", padding: "12px 20px", fontSize: "13.5px" }}
            >
              <span>Design Enterprise Architecture</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
