"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClinicLiveAgent from "./ClinicLiveAgent";

export default function HP07Multilingual() {
  return (
    <section
      id="voice-engine-demo"
      className="multilingual-section-pad"
      style={{
        minHeight: "95vh",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        {/* Eyebrow — consistent monospace call-log tag */}
        <div
          style={{
            fontFamily: "'SF Mono', 'Menlo', monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "20px",
          }}
        >
          Speak Naturally.
        </div>

        {/* Headline */}
        <div style={{ maxWidth: "860px", marginBottom: "36px" }}>
          <h2
            style={{
              fontSize: "clamp(36px, 4.2vw, 62px)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "var(--text-ivory)",
              marginBottom: "16px",
            }}
          >
            Your customers will not<br />
            always speak in one language.<br />
            <span style={{ color: "var(--green)", fontWeight: 600 }}>
              Neither should your receptionist.
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Namuste handles accents, context and code-switching across 10 Indian languages. Try it live as a clinic receptionist: real doctor availability, real bookings, and an instant WhatsApp confirmation.
          </p>
        </div>

        {/* Live clinic receptionist (LiveKit agent) — framed as a physical
            kiosk/tablet sitting on the page, not another bordered dashboard card */}
        <div className="hp07-device-frame" style={{ margin: "32px 0 44px" }}>
          <div className="hp07-device-notch" />
          <div className="hp07-device-screen">
            <ClinicLiveAgent />
          </div>
          <div className="hp07-device-home" />
        </div>

        {/* Primary CTA & Signature Footnote */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            borderTop: "1px solid var(--border)",
            paddingTop: "28px",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 26px",
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
            <span>Let Namuste listen</span>
            <ArrowRight size={14} />
          </Link>

          <p style={{ fontSize: "15px", color: "var(--text-body)", fontWeight: 600, margin: 0 }}>
            Less &lsquo;press one&rsquo;. More &lsquo;haan, boliye&rsquo;.
          </p>
        </div>
      </div>

      <style>{`
        .multilingual-section-pad {
          padding: 110px 40px 100px;
        }
        .hp07-device-frame {
          position: relative;
          background: var(--surface3);
          border-radius: 32px;
          padding: 20px 16px 28px;
          box-shadow: 0 30px 70px -20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .hp07-device-notch {
          width: 60px; height: 5px; border-radius: 999px;
          background: var(--border2);
          margin: 0 auto 16px;
        }
        .hp07-device-screen {
          border-radius: 18px;
          overflow: hidden;
          background: var(--bg);
        }
        .hp07-device-home {
          width: 100px; height: 4px; border-radius: 999px;
          background: var(--border2);
          margin: 20px auto 0;
        }
        @media (max-width: 600px) {
          .hp07-device-frame { padding: 14px 8px 18px; border-radius: 24px; }
        }
        @media (max-width: 768px) {
          .multilingual-section-pad {
            padding: 56px 16px 40px !important;
            scroll-margin-top: 60px;
          }
        }
      `}</style>
    </section>
  );
}
