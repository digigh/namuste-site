import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroVisualExact from "@/components/HeroVisualExact";
import LossEnquiryExact from "@/components/LossEnquiryExact";
import HP03ConversationMoves from "@/components/HP03ConversationMoves";
import HP06Systems from "@/components/HP06Systems";
import HP07Multilingual from "@/components/HP07Multilingual";
import TrustSection from "@/components/TrustSection";
import MessyConversationPlayer from "@/components/MessyConversationPlayer";
import RoiCalculator from "@/components/RoiCalculator";
import ClosingCallToAction from "@/components/ClosingCallToAction";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
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
            SYSTEMS & INTEGRATIONS
            ========================================================================= */}
        <HP06Systems />

        {/* =========================================================================
            SPEAK NATURALLY (MULTILINGUAL INTELLIGENCE)
            ========================================================================= */}
        <HP07Multilingual />

        {/* =========================================================================
            TRUST: judgment + handoff + brand-voice, consolidated into one real
            interactive section instead of three near-identical diagram templates
            ========================================================================= */}
        <TrustSection />

        {/* =========================================================================
            HP-11: ACOUSTIC INTELLIGENCE (MESSY CONVERSATIONS)
            ========================================================================= */}
        <section id="messy-conversations" className="page-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <MessyConversationPlayer />
          </div>
        </section>

        {/* =========================================================================
            HP-12: COMMERCIAL PROOF / ROI CALCULATOR
            ========================================================================= */}
        <section id="roi-calculator" className="page-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <RoiCalculator />
          </div>
        </section>

        {/* =========================================================================
            FINAL CLOSING CONVERSION ACT — merges what used to be two separate
            back-to-back CTA blocks (this section + the footer's own callout)
            into one
            ========================================================================= */}
        <ClosingCallToAction />
      </main>
      <Footer />

      <style>{`
        .page-section-pad {
          padding: 120px 40px;
        }
        @media (max-width: 768px) {
          .page-section-pad {
            padding: 56px 20px !important;
          }
        }
      `}</style>
    </>
  );
}
