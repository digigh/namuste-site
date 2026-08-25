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
      className="hp06-section-pad"
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

        {/* Central Visual Architecture Diagram (Proportionally Scaled on Mobile) */}
        <div
          className="hp06-canvas hp06-scaler-wrapper"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "24px 0 34px",
          }}
        >
          <div
            className="hp06-diagram-scaler"
            style={{
              position: "relative",
              width: "1020px",
              minHeight: "440px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 0",
              flexShrink: 0,
            }}
          >
            {/* SVG Connecting Radiating Flow Lines & Traveling Photons */}
            <svg
              viewBox="0 0 1020 440"
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
                <linearGradient id="sysFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9BEA16" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#9BEA16" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8FD813" stopOpacity="0.6" />
                </linearGradient>

                <filter id="sysGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur1" />
                  <feGaussianBlur stdDeviation="2" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <radialGradient id="coreAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(155, 234, 22, 0.35)" />
                  <stop offset="70%" stopColor="rgba(155, 234, 22, 0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* 1. Left 3 Input Lines (Inbound Channels -> Center Node x=510, y=220) */}
              {/* Voice (y=130 -> 220) */}
              <path d="M 220 130 C 350 130, 410 220, 438 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 220 130 C 350 130, 410 220, 438 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.2" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#FFFFFF">
                <animateMotion path="M 220 130 C 350 130, 410 220, 438 220" dur="2.2s" repeatCount="indefinite" />
              </circle>

              {/* WhatsApp (y=220 -> 220) */}
              <path d="M 220 220 L 438 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 220 220 L 438 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.4" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#9BEA16">
                <animateMotion path="M 220 220 L 438 220" dur="2s" begin="0.7s" repeatCount="indefinite" />
              </circle>

              {/* Web (y=310 -> 220) */}
              <path d="M 220 310 C 350 310, 410 220, 438 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 220 310 C 350 310, 410 220, 438 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.2" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#FFFFFF">
                <animateMotion path="M 220 310 C 350 310, 410 220, 438 220" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              </circle>

              {/* 2. Right 5 Output Lines (Center Node x=582, y=220 -> 5 Destination Systems) */}
              {/* Calendar (y=220 -> 65) */}
              <path d="M 582 220 C 640 220, 700 65, 780 65" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 582 220 C 640 220, 700 65, 780 65" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.2" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#FFFFFF">
                <animateMotion path="M 582 220 C 640 220, 700 65, 780 65" dur="2.4s" repeatCount="indefinite" />
              </circle>

              {/* Customer records (y=220 -> 145) */}
              <path d="M 582 220 C 640 220, 700 145, 780 145" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 582 220 C 640 220, 700 145, 780 145" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.2" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#9BEA16">
                <animateMotion path="M 582 220 C 640 220, 700 145, 780 145" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
              </circle>

              {/* Helpdesk (y=220 -> 220) */}
              <path d="M 582 220 L 780 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 582 220 L 780 220" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.4" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#FFFFFF">
                <animateMotion path="M 582 220 L 780 220" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
              </circle>

              {/* Payments (y=220 -> 295) */}
              <path d="M 582 220 C 640 220, 700 295, 780 295" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 582 220 C 640 220, 700 295, 780 295" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.2" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#9BEA16">
                <animateMotion path="M 582 220 C 640 220, 700 295, 780 295" dur="2.3s" begin="1.3s" repeatCount="indefinite" />
              </circle>

              {/* Internal workflows (y=220 -> 375) */}
              <path d="M 582 220 C 640 220, 700 375, 780 375" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="10" strokeOpacity="0.14" filter="url(#sysGlow)" />
              <path d="M 582 220 C 640 220, 700 375, 780 375" fill="none" stroke="url(#sysFlowGrad)" strokeWidth="2.2" filter="url(#sysGlow)" />
              <circle r="3.5" fill="#FFFFFF">
                <animateMotion path="M 582 220 C 640 220, 700 375, 780 375" dur="2.6s" begin="0.4s" repeatCount="indefinite" />
              </circle>

              {/* 3. CENTER ROUTING ORB: 100% CONCENTRIC ANCHORED INSIDE SVG */}
              {/* Concentric Ambient Glowing Aura */}
              <circle cx="510" cy="220" r="105" fill="url(#coreAura)" pointerEvents="none" />
              {/* Concentric Outer Radar Halo */}
              <circle cx="510" cy="220" r="94" fill="none" stroke="rgba(155, 234, 22, 0.25)" strokeWidth="1" strokeDasharray="3 4">
                <animate attributeName="r" values="88;98;88" dur="4s" repeatCount="indefinite" />
              </circle>
              {/* Concentric Middle Guide Ring */}
              <circle cx="510" cy="220" r="82" fill="none" stroke="rgba(155, 234, 22, 0.45)" strokeWidth="1.2" />
              {/* Concentric Core Solid Obsidian Disc */}
              <circle cx="510" cy="220" r="72" fill="#08080A" stroke="#9BEA16" strokeWidth="2.5" filter="url(#sysGlow)" />

              {/* Centered Namuste Logo Image in SVG */}
              <image
                href="/logo.png"
                x="462"
                y="188"
                width="96"
                height="20"
                preserveAspectRatio="xMidYMid meet"
              />

              {/* DIGITAL RECEPTIONIST Label in SVG */}
              <text
                x="510"
                y="226"
                textAnchor="middle"
                fill="#9BEA16"
                fontSize="9"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="700"
                letterSpacing="1.2"
              >
                DIGITAL RECEPTIONIST
              </text>

              {/* Live Routing Hub Subtitle in SVG */}
              <text
                x="510"
                y="240"
                textAnchor="middle"
                fill="#8E8E93"
                fontSize="8.5"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="500"
              >
                Live Routing Hub
              </text>
            </svg>

            {/* Left: 3 Input Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", zIndex: 10, width: "210px" }}>
              {[
                { label: "Voice", sub: "Inbound Telephony", icon: PhoneCall },
                { label: "WhatsApp", sub: "Cloud Business API", icon: MessageSquare },
                { label: "Web", sub: "Live Concierge", icon: Globe },
              ].map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, x: 4 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 18px",
                      borderRadius: "16px",
                      background: "rgba(14, 14, 16, 0.92)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 12px 35px rgba(0,0,0,0.85), 0 0 20px rgba(155, 234, 22, 0.06)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background: "rgba(155, 234, 22, 0.12)",
                        border: "1px solid rgba(155, 234, 22, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9BEA16",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "#F5F5F0", fontWeight: 600 }}>{ch.label}</div>
                      <div style={{ fontSize: "10.5px", color: "#8E8E93" }}>{ch.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: 5 Systems */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", zIndex: 10, width: "230px", marginLeft: "auto" }}>
              {[
                { label: "Calendar", sub: "Google, Outlook, Practo", icon: Calendar },
                { label: "Customer records", sub: "Salesforce, Zoho, HubSpot", icon: Users },
                { label: "Helpdesk", sub: "Zendesk, Freshdesk", icon: Headphones },
                { label: "Payments", sub: "Razorpay, UPI, Stripe", icon: CreditCard },
                { label: "Internal workflows", sub: "Webhooks, Slack, ERP", icon: GitFork },
              ].map((sys, i) => {
                const Icon = sys.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, x: -4 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 15px",
                      borderRadius: "14px",
                      background: "rgba(14, 14, 16, 0.92)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.85), 0 0 20px rgba(155, 234, 22, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(155, 234, 22, 0.1)",
                        border: "1px solid rgba(155, 234, 22, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9BEA16",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 600 }}>{sys.label}</div>
                      <div style={{ fontSize: "10px", color: "#8E8E93" }}>{sys.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Outcome Badges underneath diagram */}
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
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#9BEA16", display: "flex", alignItems: "center", justifyContent: "center", color: "#000000" }}>
              <Check size={11} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#A1A1AA" }}>
                Appointment Created
              </div>
              <div style={{ fontSize: "12.5px", color: "#F5F5F0", fontWeight: 600 }}>
                Tue, 10:30 AM (Google Calendar & Practo)
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
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#9BEA16", display: "flex", alignItems: "center", justifyContent: "center", color: "#000000" }}>
              <Check size={11} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#A1A1AA" }}>
                CRM Record Synced
              </div>
              <div style={{ fontSize: "12.5px", color: "#F5F5F0", fontWeight: 600 }}>
                Lead Intent Scored & Owner Notified
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text & Primary CTA */}
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
              <span>Explore Integrations</span>
              <ArrowRight size={14} />
            </Link>

            <p className="serif-italic" style={{ fontSize: "15px", color: "#A1A1AA", fontStyle: "italic", margin: 0 }}>
              Connects to the place where work actually happens.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hp06-section-pad {
          padding: 130px 40px 110px;
        }
        .hp06-scaler-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .hp06-diagram-scaler {
          transform-origin: center center;
        }
        @media (max-width: 1100px) {
          .hp06-scaler-wrapper {
            height: 340px !important;
            overflow: hidden !important;
          }
          .hp06-diagram-scaler {
            transform: scale(0.78) !important;
          }
        }
        @media (max-width: 768px) {
          .hp06-section-pad {
            padding: 56px 16px 40px !important;
          }
          .hp06-scaler-wrapper {
            height: 250px !important;
            min-height: 250px !important;
            overflow: hidden !important;
            display: block !important;
          }
          .hp06-diagram-scaler {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) scale(0.52) !important;
          }
        }
        @media (max-width: 440px) {
          .hp06-scaler-wrapper {
            height: 210px !important;
            min-height: 210px !important;
          }
          .hp06-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.42) !important;
          }
        }
        @media (max-width: 375px) {
          .hp06-scaler-wrapper {
            height: 185px !important;
            min-height: 185px !important;
          }
          .hp06-diagram-scaler {
            transform: translate(-50%, -50%) scale(0.36) !important;
          }
        }
      `}</style>
    </section>
  );
}
