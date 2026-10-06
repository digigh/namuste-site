"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ArrowRight,
  Zap,
  Star,
  ShieldCheck,
  ExternalLink,
  Stethoscope,
  BadgePercent,
} from "lucide-react";
import { openLeadModal } from "@/lib/openLeadModal";

interface FeatureRow {
  name: string;
  comingSoon?: boolean;
  solo: boolean | string;
  pro: boolean | string;
  clinic: boolean | string;
}

interface FeatureCategory {
  title: string;
  rows: FeatureRow[];
}

const COMPARISON_CATEGORIES: FeatureCategory[] = [
  {
    title: "CORE CALL HANDLING",
    rows: [
      { name: "AI answers incoming calls", solo: true, pro: true, clinic: true },
      { name: "AI makes outgoing calls", solo: true, pro: true, clinic: true },
      { name: "Appointment booking (real-time)", solo: true, pro: true, clinic: true },
      { name: "Clinic & service FAQs", comingSoon: true, solo: true, pro: true, clinic: true },
      { name: "Patient enquiry capture", comingSoon: true, solo: true, pro: true, clinic: true },
      { name: "Call recordings & transcripts", solo: true, pro: true, clinic: true },
      { name: "Calendar integration (Google / other)", comingSoon: true, solo: true, pro: true, clinic: true },
    ],
  },
  {
    title: "COMMUNICATION CHANNELS",
    rows: [
      { name: "WhatsApp AI receptionist", comingSoon: true, solo: false, pro: true, clinic: true },
      { name: "WhatsApp sessions included", comingSoon: true, solo: false, pro: "500 / month", clinic: "1,000 / month" },
      { name: "Website AI receptionist (web chat)", comingSoon: true, solo: false, pro: true, clinic: true },
    ],
  },
  {
    title: "PATIENT MANAGEMENT",
    rows: [
      { name: "Appointment reminders (SMS / WhatsApp / call)", comingSoon: true, solo: true, pro: true, clinic: true },
      { name: "Automated patient follow-ups", solo: false, pro: true, clinic: true },
      { name: "Missed-enquiry follow-ups", comingSoon: true, solo: false, pro: true, clinic: true },
      { name: "Patient conversation history", solo: false, pro: true, clinic: true },
      { name: "Patient information storage (CRM)", solo: false, pro: true, clinic: true },
    ],
  },
  {
    title: "CLINIC OPERATIONS",
    rows: [
      { name: "Multi-doctor support", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Intelligent call routing (by doctor / specialty)", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Doctor-specific calendars", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Centralised patient CRM (across doctors)", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Role-based access (receptionist, staff, admin)", comingSoon: true, solo: false, pro: false, clinic: true },
    ],
  },
  {
    title: "GROWTH & INSIGHTS",
    rows: [
      { name: "Practice-level analytics (calls, bookings, trends)", solo: false, pro: true, clinic: true },
      { name: "Clinic-wide analytics (multi-doctor)", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Patient recall campaigns (due visits, check-ups)", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "No-show recovery (auto re-engagement)", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Reputation & review automation (e.g. Google)", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Revenue attribution (enquiries → bookings)", comingSoon: true, solo: false, pro: false, clinic: true },
    ],
  },
  {
    title: "PAYMENTS & INTEGRATIONS",
    rows: [
      { name: "Payment gateway integration", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Send payment links (consultations / advance)", comingSoon: true, solo: false, pro: false, clinic: true },
      { name: "Payment gateway charges", comingSoon: true, solo: false, pro: false, clinic: "3.5% per transaction" },
    ],
  },
];

const FAQS = [
  {
    q: "How does the 7-Day Free Trial work for Doctors & Clinics?",
    a: "You get full, unrestricted access to the Namuste Doctors & Clinic Platform for 7 days. This includes real-time voice call answering, 100 free voice minutes, and calendar booking. No credit card is required to begin.",
  },
  {
    q: "How do I start with Solo or Pro?",
    a: "Click 'Upgrade' or 'Start 7-Day Free Trial' on either the Solo or Pro plan. You will be taken directly to our Doctors Platform portal where your clinic account is provisioned in under 2 minutes.",
  },
  {
    q: "Can I connect my clinic's existing phone number?",
    a: "Yes. You can simply forward incoming clinic calls when your line is busy or after-hours, or use a dedicated virtual AI receptionist number provided by Namuste.",
  },
  {
    q: "What if I have multiple doctors or clinic branches?",
    a: "The Clinic plan supports up to 5 doctors with independent calendars and intelligent call routing. For larger multi-branch hospital networks, select 'Contact us' to discuss custom EMR integrations and dedicated account management.",
  },
  {
    q: "Are patient details and call recordings safe?",
    a: "Yes. All audio streams and patient data are encrypted in transit and at rest with strict medical-grade confidentiality standards.",
  },
];

export default function PricingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedTier, setSelectedTier] = useState<"solo" | "pro" | "clinic">("pro");
  const [hoveredTier, setHoveredTier] = useState<"solo" | "pro" | "clinic" | null>(null);

  const renderCell = (val: boolean | string) => {
    if (typeof val === "string") {
      return <span className="pr-cell-text">{val}</span>;
    }
    if (val) {
      return (
        <span className="pr-check-icon">
          <Check size={18} strokeWidth={2.6} />
        </span>
      );
    }
    return <span className="pr-dash-icon">—</span>;
  };

  return (
    <div className="pr-page-wrap">
      {/* Top Ambient Glow */}
      <div className="pr-ambient-top" aria-hidden="true" />

      <div className="pr-shell">
        {/* HERO SECTION */}
        <section className="pr-hero">
          <div className="pr-eyebrow-pill">
            <span className="pr-pulse-dot" />
            <Stethoscope size={13} className="pr-hero-icon" />
            <span>DOCTORS &amp; CLINIC PLATFORM · TRANSPARENT PRICING</span>
          </div>

          <h1 className="pr-hero-title">
            Simple, predictable pricing for <span className="pr-hero-accent">every practice.</span>
          </h1>

          <p className="pr-hero-sub">
            AI Voice Receptionist and Automated WhatsApp Booking built specifically for individual practitioners, dental practices, and multi-doctor polyclinics.
          </p>
        </section>

        {/* FUNKY & AESTHETIC LAUNCH OFFER BANNER (Theme-Adaptive, No Emojis) */}
        <div className="pr-funky-banner">
          <div className="pr-funky-glow" />
          <div className="pr-funky-content">
            <div className="pr-funky-left">
              <div className="pr-funky-badge-row">
                <span className="pr-funky-chip">
                  <BadgePercent size={13} />
                  <span>SPECIAL LAUNCH OFFER</span>
                </span>
                <span className="pr-funky-tag">7 DAYS FREE TRIAL</span>
              </div>

              <h2 className="pr-funky-heading">
                Try the Doctors &amp; Clinic AI Platform Free for 7 Days
              </h2>

              <p className="pr-funky-desc">
                Experience real-time patient appointment booking and 100 free voice minutes.
                Zero risk, instant 2-minute setup, and no credit card required to start.
              </p>

              <div className="pr-funky-perks">
                <span className="pr-perk-item"><Check size={13} strokeWidth={3} /> 100 Free Voice Minutes</span>
                <span className="pr-perk-item"><Check size={13} strokeWidth={3} /> No Credit Card Needed</span>
                <span className="pr-perk-item"><Check size={13} strokeWidth={3} /> 2-Minute Activation</span>
                <span className="pr-perk-item"><Check size={13} strokeWidth={3} /> Cancel Anytime</span>
              </div>
            </div>

            <div className="pr-funky-right">
              <button
                type="button"
                onClick={openLeadModal}
                className="pr-funky-cta"
              >
                <span className="pr-funky-cta-shine" />
                <span className="pr-funky-cta-text">Start 7-Day Free Trial</span>
                <ArrowRight size={16} />
              </button>
              <span className="pr-funky-sub-hint">Instant 2-minute setup · No credit card required</span>
            </div>
          </div>
        </div>

        {/* PRICING TABLE MATRIX (Theme-adaptive: Light & Dark) */}
        <div className="pr-table-container">
          <div className="pr-table-scroll">
            <table className="pr-pricing-table">
              {/* TABLE HEADER WITH PLAN TIERS */}
              <thead>
                <tr className="pr-head-row">
                  <th className="pr-th-features">
                    <div className="pr-features-head-card">
                      <div className="pr-features-badge-row">
                        <span className="pr-features-title">PLAN MATRIX</span>
                        <span className="pr-features-free-badge">
                          <Zap size={11} /> 7-Day Free Trial
                        </span>
                      </div>
                      <div className="pr-features-head-title">
                        Choose your clinic tier
                      </div>
                      <div className="pr-features-head-sub">
                        Click any plan to highlight its minutes, calendar syncing &amp; support limits.
                      </div>
                      <div className="pr-features-tab-row" role="tablist" aria-label="Select practice plan">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedTier === "solo"}
                          className={`pr-feature-tab-btn ${selectedTier === "solo" ? "is-active-solo" : ""}`}
                          onClick={() => setSelectedTier("solo")}
                          onMouseEnter={() => setHoveredTier("solo")}
                          onMouseLeave={() => setHoveredTier(null)}
                        >
                          Solo
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedTier === "pro"}
                          className={`pr-feature-tab-btn ${selectedTier === "pro" ? "is-active-pro" : ""}`}
                          onClick={() => setSelectedTier("pro")}
                          onMouseEnter={() => setHoveredTier("pro")}
                          onMouseLeave={() => setHoveredTier(null)}
                        >
                          <Star size={10} fill="currentColor" /> Pro
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={selectedTier === "clinic"}
                          className={`pr-feature-tab-btn ${selectedTier === "clinic" ? "is-active-clinic" : ""}`}
                          onClick={() => setSelectedTier("clinic")}
                          onMouseEnter={() => setHoveredTier("clinic")}
                          onMouseLeave={() => setHoveredTier(null)}
                        >
                          Clinic
                        </button>
                      </div>
                      <div className="pr-features-guarantee-row">
                        <span><Check size={11} strokeWidth={3} /> Instant 2-Min Setup</span>
                        <span><Check size={11} strokeWidth={3} /> No Lock-in</span>
                      </div>
                    </div>
                  </th>

                  {/* PLAN 1: SOLO (MINT / EMERALD ACCENT) */}
                  <th
                    className={`pr-th-tier pr-th-tier-solo pr-th-tier-btn ${selectedTier === "solo" ? "is-solo-selected-col" : ""} ${hoveredTier === "solo" && selectedTier !== "solo" ? "is-solo-hovered-col" : ""}`}
                    onClick={() => setSelectedTier("solo")}
                    onMouseEnter={() => setHoveredTier("solo")}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <div className={`pr-plan-card pr-plan-card-solo ${selectedTier === "solo" ? "is-solo-selected" : ""}`}>
                      {selectedTier === "solo" ? (
                        <div className="pr-selected-pill pr-solo-selected-pill">
                          <Check size={11} strokeWidth={3} /> Selected Plan
                        </div>
                      ) : (
                        <div className="pr-select-hint">Click to inspect</div>
                      )}
                      <div className="pr-plan-name">Solo</div>
                      <div className="pr-plan-sub">For individual doctors</div>
                      <div className="pr-plan-price">
                        <span className="pr-curr">₹</span>
                        <span className="pr-amount">999</span>
                        <span className="pr-period"> / 30 days</span>
                      </div>
                      <div className="pr-plan-limits">
                        <div>1 doctor</div>
                        <div>100 voice minutes / month</div>
                      </div>
                    </div>
                  </th>

                  {/* PLAN 2: PRO (ELECTRIC GREEN ACCENT - MOST POPULAR) */}
                  <th
                    className={`pr-th-tier pr-th-tier-pro pr-th-tier-btn ${selectedTier === "pro" ? "is-pro-selected-col" : ""} ${hoveredTier === "pro" && selectedTier !== "pro" ? "is-pro-hovered-col" : ""}`}
                    onClick={() => setSelectedTier("pro")}
                    onMouseEnter={() => setHoveredTier("pro")}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <div className={`pr-plan-card pr-plan-card-pro ${selectedTier === "pro" ? "is-pro-selected" : ""}`}>
                      <div className="pr-badge-group">
                        <div className="pr-popular-badge">
                          <Star size={11} fill="currentColor" /> Most popular
                        </div>
                        {selectedTier === "pro" && (
                          <div className="pr-selected-pill pr-pro-selected-pill">
                            <Check size={11} strokeWidth={3} /> Selected
                          </div>
                        )}
                      </div>
                      <div className="pr-plan-name">Pro</div>
                      <div className="pr-plan-sub">For growing practices</div>
                      <div className="pr-plan-price">
                        <span className="pr-curr">₹</span>
                        <span className="pr-amount">4,999</span>
                        <span className="pr-period"> / 30 days</span>
                      </div>
                      <div className="pr-plan-limits">
                        <div>1 doctor</div>
                        <div>1,000 voice minutes / month</div>
                        <div>500 WhatsApp sessions / month</div>
                      </div>
                    </div>
                  </th>

                  {/* PLAN 3: CLINIC (ROYAL SAPPHIRE ACCENT) */}
                  <th
                    className={`pr-th-tier pr-th-tier-clinic pr-th-tier-btn ${selectedTier === "clinic" ? "is-clinic-selected-col" : ""} ${hoveredTier === "clinic" && selectedTier !== "clinic" ? "is-clinic-hovered-col" : ""}`}
                    onClick={() => setSelectedTier("clinic")}
                    onMouseEnter={() => setHoveredTier("clinic")}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <div className={`pr-plan-card pr-plan-card-clinic ${selectedTier === "clinic" ? "is-clinic-selected" : ""}`}>
                      {selectedTier === "clinic" ? (
                        <div className="pr-selected-pill pr-clinic-selected-pill">
                          <Check size={11} strokeWidth={3} /> Selected Plan
                        </div>
                      ) : (
                        <div className="pr-select-hint">Click to inspect</div>
                      )}
                      <div className="pr-plan-name">Clinic</div>
                      <div className="pr-plan-sub">For multi-doctor clinics</div>
                      <div className="pr-plan-price">
                        <span className="pr-curr">₹</span>
                        <span className="pr-amount">9,999</span>
                        <span className="pr-period"> / 30 days</span>
                      </div>
                      <div className="pr-plan-limits">
                        <div>Up to 5 doctors</div>
                        <div>2,000 voice minutes / month</div>
                        <div>1,000 WhatsApp sessions / month</div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY (CATEGORIES & ROWS) */}
              <tbody>
                {COMPARISON_CATEGORIES.map((cat) => (
                  <React.Fragment key={cat.title}>
                    <tr className="pr-cat-row">
                      <td colSpan={4} className="pr-cat-td">
                        <span className="pr-cat-title">{cat.title}</span>
                      </td>
                    </tr>

                    {cat.rows.map((row) => (
                      <tr key={row.name} className="pr-feature-row">
                        <td className="pr-feature-name-td">
                          <span className="pr-feature-label">{row.name}</span>
                          {row.comingSoon && (
                            <span className="pr-coming-soon-badge">Coming soon</span>
                          )}
                        </td>

                        <td
                          className={`pr-val-td ${selectedTier === "solo" ? "is-solo-col" : ""} ${hoveredTier === "solo" && selectedTier !== "solo" ? "is-solo-hovered" : ""}`}
                          onClick={() => setSelectedTier("solo")}
                          onMouseEnter={() => setHoveredTier("solo")}
                          onMouseLeave={() => setHoveredTier(null)}
                        >
                          {renderCell(row.solo)}
                        </td>
                        <td
                          className={`pr-val-td ${selectedTier === "pro" ? "is-pro-col" : ""} ${hoveredTier === "pro" && selectedTier !== "pro" ? "is-pro-hovered" : ""}`}
                          onClick={() => setSelectedTier("pro")}
                          onMouseEnter={() => setHoveredTier("pro")}
                          onMouseLeave={() => setHoveredTier(null)}
                        >
                          {renderCell(row.pro)}
                        </td>
                        <td
                          className={`pr-val-td ${selectedTier === "clinic" ? "is-clinic-col" : ""} ${hoveredTier === "clinic" && selectedTier !== "clinic" ? "is-clinic-hovered" : ""}`}
                          onClick={() => setSelectedTier("clinic")}
                          onMouseEnter={() => setHoveredTier("clinic")}
                          onMouseLeave={() => setHoveredTier(null)}
                        >
                          {renderCell(row.clinic)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

                {/* BOTTOM ACTION ROW */}
                <tr className="pr-action-row">
                  <td className="pr-action-td-empty">
                    <div className="pr-action-features-hint">
                      <div className="pr-action-features-title">Ready to launch?</div>
                      <div className="pr-action-features-sub">7-Day Free Trial on Solo &amp; Pro</div>
                    </div>
                  </td>

                  {/* SOLO ACTION -> DOS PORTAL */}
                  <td
                    className={`pr-action-td ${selectedTier === "solo" ? "is-solo-col" : ""} ${hoveredTier === "solo" && selectedTier !== "solo" ? "is-solo-hovered" : ""}`}
                    onClick={() => setSelectedTier("solo")}
                    onMouseEnter={() => setHoveredTier("solo")}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <button
                      type="button"
                      onClick={openLeadModal}
                      className={`pr-btn-upgrade pr-btn-luminous is-solo-btn ${selectedTier === "solo" ? "is-active-btn" : ""}`}
                    >
                      <span className="pr-btn-shine" />
                      <span>Claim Free Trial</span>
                    </button>
                    <span className="pr-action-sub">7-Day Free Trial · Solo</span>
                  </td>

                  {/* PRO ACTION -> DOS PORTAL */}
                  <td
                    className={`pr-action-td ${selectedTier === "pro" ? "is-pro-col" : ""} ${hoveredTier === "pro" && selectedTier !== "pro" ? "is-pro-hovered" : ""}`}
                    onClick={() => setSelectedTier("pro")}
                    onMouseEnter={() => setHoveredTier("pro")}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <button
                      type="button"
                      onClick={openLeadModal}
                      className={`pr-btn-upgrade pr-btn-luminous is-pro-btn ${selectedTier === "pro" ? "is-active-btn" : ""}`}
                    >
                      <span className="pr-btn-shine" />
                      <span>Claim Free Trial</span>
                    </button>
                    <span className="pr-action-sub">7-Day Free Trial · Most Popular</span>
                  </td>

                  {/* CLINIC ACTION -> CONTACT US */}
                  <td
                    className={`pr-action-td ${selectedTier === "clinic" ? "is-clinic-col" : ""} ${hoveredTier === "clinic" && selectedTier !== "clinic" ? "is-clinic-hovered" : ""}`}
                    onClick={() => setSelectedTier("clinic")}
                    onMouseEnter={() => setHoveredTier("clinic")}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    <Link
                      href="/contact"
                      className={`pr-btn-contact ${selectedTier === "clinic" ? "is-clinic-active-btn" : ""}`}
                    >
                      <span>Contact us</span>
                      <ArrowRight size={14} />
                    </Link>
                    <span className="pr-action-sub">Multi-Doctor Setup</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="pr-faq-section">
          <div className="pr-faq-header">
            <span className="pr-eyebrow-pill">COMMON QUESTIONS</span>
            <h2 className="pr-faq-title">
              Everything you need to know about <span style={{ color: "var(--green)" }}>plans &amp; trials.</span>
            </h2>
          </div>

          <div className="pr-faq-list">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`pr-faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="pr-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className="pr-faq-chevron" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="pr-faq-answer">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* CLOSING STRIP */}
        <section className="pr-closing-box">
          <h3 className="pr-closing-title">Have custom requirements or a multi-branch network?</h3>
          <p className="pr-closing-sub">
            Our clinical integration engineers can configure custom on-prem EMR connectors and private hospital SIP trunks.
          </p>
          <Link href="/contact" className="pr-closing-btn">
            <span>Talk to Clinical Specialists</span>
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>

      <style>{`
        .pr-page-wrap {
          min-height: 100vh;
          background: var(--bg);
          position: relative;
          overflow-x: hidden;
          padding: 130px 24px 100px;
          transition: background 0.3s ease;
        }
        .pr-ambient-top {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 480px;
          background: radial-gradient(ellipse at 50% 0%, var(--green-glow) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .pr-shell {
          max-width: 1360px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Hero */
        .pr-hero {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 48px;
        }
        .pr-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 13px;
          border-radius: 999px;
          background: var(--green-glow);
          border: 1px solid var(--border-green);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--green);
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .pr-hero-icon {
          color: var(--green);
        }
        .pr-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: prDotPulse 1.8s infinite ease-in-out;
        }
        @keyframes prDotPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .pr-hero-title {
          font-family: var(--font-sans);
          font-size: clamp(34px, 4.4vw, 58px);
          font-weight: 800;
          line-height: 1.14;
          letter-spacing: -0.03em;
          color: var(--text-ivory);
          margin: 0 0 18px;
        }
        .pr-hero-accent {
          color: var(--green);
        }
        .pr-hero-sub {
          font-size: clamp(15px, 1.25vw, 17px);
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0;
        }

        /* FUNKY LAUNCH BANNER (Theme-Adaptive) */
        .pr-funky-banner {
          position: relative;
          border-radius: 20px;
          margin-bottom: 56px;
          background: var(--glass-panel-grad, var(--surface));
          background-color: var(--surface2);
          border: 1.5px solid var(--border-green);
          box-shadow: 0 20px 60px -15px var(--shadow-subtle), 0 0 35px -5px var(--green-glow);
          overflow: hidden;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .pr-funky-glow {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 340px;
          height: 340px;
          background: radial-gradient(circle, var(--green-glow-strong) 0%, transparent 65%);
          pointer-events: none;
        }
        .pr-funky-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 36px;
          gap: 32px;
          flex-wrap: wrap;
        }
        .pr-funky-left {
          flex: 1;
          min-width: 300px;
        }
        .pr-funky-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .pr-funky-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          border-radius: 999px;
          background: var(--green-glow);
          color: var(--green);
          border: 1px solid var(--border-green);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .pr-funky-tag {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--green);
          letter-spacing: 0.06em;
          background: var(--green-glow);
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid var(--border-green);
        }
        .pr-funky-heading {
          font-size: clamp(22px, 2.3vw, 30px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-ivory);
          margin: 0 0 8px;
        }
        .pr-funky-desc {
          font-size: 14px;
          color: var(--text-body);
          line-height: 1.55;
          max-width: 640px;
          margin: 0 0 16px;
        }
        .pr-funky-perks {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .pr-perk-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--text-body);
        }
        .pr-perk-item svg {
          color: var(--green);
        }
        .pr-funky-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .pr-funky-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 34px;
          border-radius: 999px;
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
          color: #05180D !important;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          outline: none;
          position: relative;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 32px rgba(0, 229, 117, 0.45), 0 10px 24px rgba(0, 0, 0, 0.35);
          white-space: nowrap;
        }
        .pr-funky-cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 44px rgba(0, 229, 117, 0.7), 0 14px 34px rgba(0, 0, 0, 0.45);
        }
        .pr-funky-cta-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.48), transparent);
          transform: skewX(-20deg);
          animation: prShine 3.2s infinite ease-in-out;
        }
        @keyframes prShine {
          0% { left: -120%; }
          35%, 100% { left: 160%; }
        }
        .pr-funky-sub-hint {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        /* PRICING TABLE MATRIX (100% Theme Adaptive) */
        .pr-table-container {
          background: var(--surface);
          border-radius: 20px;
          border: 1px solid var(--border2);
          box-shadow: 0 24px 70px -15px var(--shadow-subtle);
          overflow: hidden;
          margin-bottom: 72px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .pr-table-scroll {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .pr-pricing-table {
          width: 100%;
          min-width: 860px;
          border-collapse: collapse;
          text-align: left;
        }

        /* Head Row */
        .pr-head-row {
          border-bottom: 1px solid var(--border2);
          background: var(--surface);
        }
        .pr-th-features {
          width: 32%;
          padding: 24px 20px 20px 24px;
          vertical-align: top;
        }

        /* FEATURES HEAD CARD (Fills previously empty space) */
        .pr-features-head-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--surface2);
          border: 1.5px solid var(--border-green);
          border-radius: 16px;
          padding: 18px 20px;
          box-shadow: 0 4px 18px var(--shadow-subtle);
          position: relative;
        }
        .pr-features-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pr-features-title {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--green);
        }
        .pr-features-free-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 800;
          color: var(--green);
          background: var(--green-glow);
          padding: 2.5px 8px;
          border-radius: 999px;
          border: 1px solid var(--border-green);
        }
        .pr-features-head-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-ivory);
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .pr-features-head-sub {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.45;
        }
        .pr-features-tab-row {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--surface);
          padding: 3.5px;
          border-radius: 10px;
          border: 1px solid var(--border);
          margin: 4px 0 2px;
        }
        .pr-feature-tab-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 6px 8px;
          border-radius: 7px;
          border: none;
          background: transparent;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .pr-feature-tab-btn:hover {
          color: var(--text-ivory);
          background: var(--surface2);
        }
        .pr-feature-tab-btn.is-active-solo {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #052015 !important;
          box-shadow: 0 2px 10px rgba(16, 185, 129, 0.45);
          font-weight: 800;
        }
        .pr-feature-tab-btn.is-active-pro {
          background: linear-gradient(135deg, #00E575 0%, #00B853 100%);
          color: #05180D !important;
          box-shadow: 0 2px 10px rgba(0, 229, 117, 0.45);
          font-weight: 800;
        }
        .pr-feature-tab-btn.is-active-clinic {
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          color: #FFFFFF !important;
          box-shadow: 0 2px 10px rgba(59, 130, 246, 0.45);
          font-weight: 800;
        }
        .pr-features-guarantee-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--text-muted);
          flex-wrap: wrap;
        }
        .pr-features-guarantee-row span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-body);
        }

        /* Tier Columns */
        .pr-th-tier {
          width: 22.6%;
          padding: 24px 16px 20px;
          vertical-align: top;
          transition: all 0.25s ease;
          background: transparent;
        }
        .pr-th-tier-btn {
          cursor: pointer;
        }
        .pr-plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 16px 14px;
          border-radius: 14px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pr-plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px -8px var(--shadow-subtle);
        }

        /* 1. SOLO STYLES (Mint / Emerald) */
        .pr-plan-card.is-solo-selected {
          border-color: #10B981 !important;
          background: rgba(16, 185, 129, 0.12) !important;
          box-shadow: 0 0 24px rgba(16, 185, 129, 0.35), 0 10px 25px -5px var(--shadow-subtle);
        }
        .pr-solo-selected-pill {
          background: #10B981 !important;
          color: #052015 !important;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
        }
        .is-solo-selected-col,
        .is-solo-col {
          background: rgba(16, 185, 129, 0.08) !important;
          border-left: 1.5px solid rgba(16, 185, 129, 0.32);
          border-right: 1.5px solid rgba(16, 185, 129, 0.32);
        }

        /* 2. PRO STYLES (Luminous Electric Green - only highlighted when selected!) */
        .pr-plan-card.is-pro-selected {
          border-color: #00E575 !important;
          background: rgba(0, 229, 117, 0.14) !important;
          box-shadow: 0 0 26px rgba(0, 229, 117, 0.45), 0 10px 25px -5px var(--shadow-subtle);
        }
        .pr-pro-selected-pill {
          background: #00E575 !important;
          color: #05180D !important;
          box-shadow: 0 0 12px rgba(0, 229, 117, 0.5);
        }
        .is-pro-selected-col,
        .is-pro-col {
          background: rgba(0, 229, 117, 0.08) !important;
          border-left: 1.5px solid rgba(0, 229, 117, 0.35);
          border-right: 1.5px solid rgba(0, 229, 117, 0.35);
        }

        /* 3. CLINIC STYLES (Royal Sapphire / Medical Blue) */
        .pr-plan-card.is-clinic-selected {
          border-color: #3B82F6 !important;
          background: rgba(59, 130, 246, 0.12) !important;
          box-shadow: 0 0 24px rgba(59, 130, 246, 0.35), 0 10px 25px -5px var(--shadow-subtle);
        }
        .pr-clinic-selected-pill {
          background: #3B82F6 !important;
          color: #FFFFFF !important;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
        }
        .is-clinic-selected-col,
        .is-clinic-col {
          background: rgba(59, 130, 246, 0.08) !important;
          border-left: 1.5px solid rgba(59, 130, 246, 0.32);
          border-right: 1.5px solid rgba(59, 130, 246, 0.32);
        }

        /* SUBTLE HOVER PREVIEWS FOR UNSELECTED TIERS */
        .is-solo-hovered-col,
        .is-solo-hovered {
          background: rgba(16, 185, 129, 0.04) !important;
        }
        .is-pro-hovered-col,
        .is-pro-hovered {
          background: rgba(0, 229, 117, 0.04) !important;
        }
        .is-clinic-hovered-col,
        .is-clinic-hovered {
          background: rgba(59, 130, 246, 0.04) !important;
        }
        .pr-th-tier-solo:hover .pr-plan-card:not(.is-solo-selected) {
          border-color: rgba(16, 185, 129, 0.45);
          background: rgba(16, 185, 129, 0.05);
        }
        .pr-th-tier-pro:hover .pr-plan-card:not(.is-pro-selected) {
          border-color: rgba(0, 229, 117, 0.45);
          background: rgba(0, 229, 117, 0.05);
        }
        .pr-th-tier-clinic:hover .pr-plan-card:not(.is-clinic-selected) {
          border-color: rgba(59, 130, 246, 0.45);
          background: rgba(59, 130, 246, 0.05);
        }

        .pr-selected-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          align-self: flex-start;
          font-size: 10px;
          font-weight: 800;
          padding: 2.5px 8px;
          border-radius: 999px;
          margin-bottom: 2px;
        }
        .pr-select-hint {
          font-size: 9.5px;
          font-weight: 700;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2px;
          opacity: 0.8;
        }
        .pr-badge-group {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 2px;
        }
        .pr-popular-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          align-self: flex-start;
          background: var(--surface2);
          border: 1px solid var(--border-green);
          color: var(--green);
          font-size: 10.5px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 999px;
        }
        .pr-plan-name {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-ivory);
          letter-spacing: -0.02em;
        }
        .pr-plan-sub {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        .pr-plan-price {
          display: flex;
          align-items: baseline;
          color: var(--text-ivory);
          margin: 4px 0 6px;
        }
        .pr-curr {
          font-size: 20px;
          font-weight: 700;
        }
        .pr-amount {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .pr-period {
          font-size: 13px;
          color: var(--text-muted);
          margin-left: 4px;
        }
        .pr-plan-limits {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.45;
          margin-top: 4px;
        }

        /* Categories */
        .pr-cat-row {
          background: var(--surface2);
          border-top: 1px solid var(--border2);
          border-bottom: 1px solid var(--border);
        }
        .pr-cat-td {
          padding: 14px 28px;
        }
        .pr-cat-title {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--green);
          text-transform: uppercase;
        }

        /* Rows */
        .pr-feature-row {
          border-bottom: 1px solid var(--border);
          transition: background 0.15s ease;
        }
        .pr-feature-row:hover {
          background: var(--overlay-1);
        }
        .pr-feature-name-td {
          padding: 16px 24px;
          font-size: 13.5px;
          color: var(--text-ivory);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pr-feature-label {
          font-weight: 500;
        }
        .pr-coming-soon-badge {
          display: inline-block;
          padding: 2px 7px;
          border-radius: 999px;
          background: var(--overlay-2);
          border: 1px solid var(--border2);
          font-size: 10px;
          font-weight: 600;
          color: var(--text-dim);
          letter-spacing: 0.02em;
        }

        .pr-val-td {
          padding: 16px 20px;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .pr-check-icon {
          color: var(--green);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .pr-dash-icon {
          color: var(--text-dim);
          font-size: 16px;
        }
        .pr-cell-text {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-ivory);
        }

        /* Action Row */
        .pr-action-row {
          border-top: 1px solid var(--border2);
          background: var(--surface2);
        }
        .pr-action-td-empty {
          padding: 24px 28px;
          vertical-align: middle;
        }
        .pr-action-features-hint {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .pr-action-features-title {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-ivory);
        }
        .pr-action-features-sub {
          font-size: 11.5px;
          color: var(--text-muted);
        }
        .pr-action-td {
          padding: 24px 18px;
          text-align: center;
          vertical-align: middle;
          transition: background 0.2s ease;
        }
        .pr-action-sub {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 8px;
          font-weight: 600;
        }

        /* Luminous Action Buttons */
        .pr-btn-upgrade {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          padding: 13px 18px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          font-size: 13.5px;
          font-weight: 800;
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .pr-btn-upgrade.is-solo-btn {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%) !important;
          color: #052015 !important;
          border: none;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 4px 14px rgba(0, 0, 0, 0.25);
        }
        .pr-btn-upgrade.is-solo-btn.is-active-btn {
          box-shadow: 0 0 32px rgba(16, 185, 129, 0.75), 0 8px 22px rgba(0, 0, 0, 0.35);
        }
        .pr-btn-upgrade.is-pro-btn {
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%) !important;
          color: #05180D !important;
          border: none;
          box-shadow: 0 0 22px rgba(0, 229, 117, 0.45), 0 4px 14px rgba(0, 0, 0, 0.25);
        }
        .pr-btn-upgrade.is-pro-btn.is-active-btn {
          box-shadow: 0 0 36px rgba(0, 229, 117, 0.8), 0 8px 24px rgba(0, 0, 0, 0.4);
        }
        .pr-btn-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
          transform: skewX(-20deg);
          animation: prShine 3s infinite ease-in-out;
        }
        .pr-btn-upgrade:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .pr-btn-contact {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          padding: 13px 18px;
          border-radius: 10px;
          background: var(--surface);
          border: 1.5px solid var(--border2);
          color: var(--text-ivory);
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .pr-btn-contact:hover,
        .pr-btn-contact.is-clinic-active-btn {
          border-color: #3B82F6 !important;
          background: rgba(59, 130, 246, 0.15) !important;
          color: #3B82F6 !important;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.35);
        }

        /* FAQ */
        .pr-faq-section {
          max-width: 800px;
          margin: 0 auto 72px;
        }
        .pr-faq-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .pr-faq-title {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          color: var(--text-ivory);
          margin: 12px 0 0;
        }
        .pr-faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pr-faq-item {
          border-bottom: 1px solid var(--border);
        }
        .pr-faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 20px 4px;
          font-size: 15.5px;
          font-weight: 600;
          color: var(--text-ivory);
        }
        .pr-faq-chevron {
          color: var(--text-dim);
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .pr-faq-item.is-open .pr-faq-chevron {
          transform: rotate(180deg);
          color: var(--green);
        }
        .pr-faq-answer {
          margin: 0 4px 20px;
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.7;
        }

        /* Closing Box */
        .pr-closing-box {
          border-radius: 20px;
          padding: 48px 36px;
          text-align: center;
          background: var(--surface2);
          border: 1px solid var(--border);
          max-width: 860px;
          margin: 0 auto;
        }
        .pr-closing-title {
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 800;
          color: var(--text-ivory);
          margin: 0 0 10px;
        }
        .pr-closing-sub {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 580px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }
        .pr-closing-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 999px;
          background: var(--text-ivory);
          color: var(--bg);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .pr-closing-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .pr-page-wrap {
            padding: 100px 16px 60px;
          }
          .pr-funky-content {
            padding: 22px 20px;
          }
          .pr-funky-cta {
            width: 100%;
            justify-content: center;
          }
          .pr-closing-box {
            padding: 32px 20px;
          }
        }
      `}</style>
    </div>
  );
}
