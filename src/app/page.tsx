import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroVisualExact from "@/components/HeroVisualExact";
import LossEnquiryExact from "@/components/LossEnquiryExact";
import HP03ConversationMoves from "@/components/HP03ConversationMoves";
import HP04Professions from "@/components/HP04Professions";
import HP05Enterprises from "@/components/HP05Enterprises";
import HP06Systems from "@/components/HP06Systems";
import HP07Multilingual from "@/components/HP07Multilingual";
import HP08Judgment from "@/components/HP08Judgment";
import HP09Handoff from "@/components/HP09Handoff";
import HP10Manner from "@/components/HP10Manner";
import MessyConversationPlayer from "@/components/MessyConversationPlayer";
import RoiCalculator from "@/components/RoiCalculator";
import BringConversationDemo from "@/components/BringConversationDemo";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#000000", minHeight: "100vh", overflowX: "hidden" }}>
        {/* =========================================================================
            HP-01: PROBLEM-LED HERO
            ========================================================================= */}
        <HeroVisualExact />

        {/* =========================================================================
            HP-02: THE RESPONSE PROBLEM
            ========================================================================= */}
        <LossEnquiryExact />

        {/* =========================================================================
            HP-03: OPERATING LOOP - FROM HELLO TO AN OUTCOME
            ========================================================================= */}
        <HP03ConversationMoves />

        {/* =========================================================================
            HP-04: ONE ROLE. MANY PROFESSIONS.
            ========================================================================= */}
        <HP04Professions />

        {/* =========================================================================
            HP-05: ONE ROLE. MANY ENTERPRISES.
            ========================================================================= */}
        <HP05Enterprises />

        {/* =========================================================================
            HP-06: BUILT TO FIT IN. (SYSTEMS & INTEGRATIONS)
            ========================================================================= */}
        <HP06Systems />

        {/* =========================================================================
            HP-07: SPEAK NATURALLY. (MULTILINGUAL INTELLIGENCE)
            ========================================================================= */}
        <HP07Multilingual />

        {/* =========================================================================
            HP-08: APPROVED ANSWERS & 3-PATH JUDGMENT
            ========================================================================= */}
        <HP08Judgment />

        {/* =========================================================================
            HP-09: HUMAN ESCALATION PROTOCOL (HANDOFF PACKET)
            ========================================================================= */}
        <HP09Handoff />

        {/* =========================================================================
            HP-10: YOUR BUSINESS. YOUR MANNER. (BRAND CALIBRATION)
            ========================================================================= */}
        <HP10Manner />

        {/* =========================================================================
            HP-11: ACOUSTIC INTELLIGENCE (MESSY CONVERSATIONS)
            ========================================================================= */}
        <section id="messy-conversations" style={{ padding: "120px 40px", background: "#000000", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>HP-11 • Acoustic Intelligence</div>
              <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 42px)", color: "var(--text-ivory)", lineHeight: 1.25, marginBottom: "14px", letterSpacing: "-0.015em" }}>
                Real conversations do not read scripts. <span className="serif-italic" style={{ color: "#9BEA16" }}>Namuste simply keeps up.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "15.5px", lineHeight: 1.65 }}>
                Handles human pauses, interruptions, and mid-sentence intent changes with sub-200ms acoustic responsiveness.
              </p>
            </div>

            <MessyConversationPlayer />
          </div>
        </section>

        {/* =========================================================================
            HP-12: COMMERCIAL PROOF / ROI CALCULATOR
            ========================================================================= */}
        <section id="roi-calculator" style={{ padding: "120px 40px", background: "rgba(10, 10, 10, 0.95)", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <RoiCalculator />
          </div>
        </section>

        {/* =========================================================================
            HP-13 & HP-14: BRING ONE REAL CONVERSATION INTERACTIVE ENGINE
            ========================================================================= */}
        <section id="interactive-demo" style={{ padding: "120px 40px", background: "#000000", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <BringConversationDemo />
          </div>
        </section>

        {/* =========================================================================
            FINAL CLOSING CONVERSION ACT
            ========================================================================= */}
        <section style={{ padding: "120px 40px", background: "rgba(10, 18, 10, 0.95)", borderTop: "1px solid rgba(118, 192, 67, 0.25)", textAlign: "center" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div className="pill" style={{ marginBottom: "18px" }}>Deploy in 48 Hours</div>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 3.8vw, 52px)", color: "var(--text-ivory)", lineHeight: 1.18, marginBottom: "20px", letterSpacing: "-0.02em" }}>
              Turn every customer call into an <span className="serif-italic" style={{ color: "#9BEA16" }}>organised outcome.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "16.5px", lineHeight: 1.65, marginBottom: "36px" }}>
              Schedule a 20-minute tailored consultation to hear Namuste speak with your custom business knowledge and test live multilingual calls.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ padding: "14px 34px", fontSize: "15px", fontWeight: 700 }}>
                Book a Live Consultation <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-secondary" style={{ padding: "14px 30px", fontSize: "15px" }}>
                View Transparent Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
