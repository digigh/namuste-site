"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedOrb from "./AnimatedOrb";
import {
  PhoneCall,
  Globe,
  Calendar,
  Users,
  Headphones,
  CreditCard,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  SiWhatsapp,
  SiGooglecalendar,
  SiZoho,
  SiHubspot,
  SiZendesk,
  SiStripe,
  SiRazorpay,
  SiZapier,
} from "react-icons/si";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CHANNELS = [
  { id: "voice", icon: PhoneCall, label: "Voice" },
  { id: "whatsapp", icon: SiWhatsapp, label: "WhatsApp" },
  { id: "web", icon: Globe, label: "Web" },
];

const SYSTEMS = [
  { id: "calendar", icon: Calendar, title: "Calendar", sub: "Google, Outlook, Practo" },
  { id: "crm", icon: Users, title: "Customer records", sub: "Salesforce, Zoho, HubSpot" },
  { id: "helpdesk", icon: Headphones, title: "Helpdesk", sub: "Zendesk, Freshdesk" },
  { id: "payments", icon: CreditCard, title: "Payments", sub: "Razorpay, UPI, Stripe" },
];

const CHECKLIST = ["Finds the right data", "Routes to the right tool", "Creates actions automatically"];

const INTEGRATION_CHIPS = [
  { name: "Google Calendar", icon: SiGooglecalendar, color: "#4285F4" },
  { name: "WhatsApp", icon: SiWhatsapp, color: "#25D366" },
  { name: "Zoho", icon: SiZoho, color: "#C8202F" },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
  { name: "Zendesk", icon: SiZendesk, color: "#03363D" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Razorpay", icon: SiRazorpay, color: "#3395FF" },
  { name: "Zapier", icon: SiZapier, color: "#FF4A00" },
];

export default function HP06Systems() {
  return (
    <section
      id="hp-06"
      className="hp06-section-pad"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", position: "relative" }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        <div style={{ fontFamily: "'SF Mono', 'Menlo', monospace", fontSize: "12px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px" }}>
          <span style={{ color: "var(--green)" }}>●</span> &nbsp;INTEGRATIONS
        </div>

        <div className="hp06-layout">
          {/* Left — copy + at-a-glance benefits + CTA */}
          <div className="hp06-copy">
            <h2 style={{ fontSize: "clamp(34px, 3.6vw, 50px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-ivory)", marginBottom: "18px" }}>
              Your business already has systems.<br />
              Namuste makes conversations <span style={{ color: "var(--green)" }}>work with them.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.65, maxWidth: "480px", marginBottom: "32px" }}>
              Calendars, customer records, support queues, payments and internal workflows — Namuste connects each conversation to the place where work actually happens.
            </p>

            <div className="hp06-benefits">
              {[
                { icon: Sparkles, title: "No context switching", sub: "Everything in sync." },
                { icon: Check, title: "Save hours every week", sub: "Automate updates." },
                { icon: Headphones, title: "More productive teams", sub: "All data in one place." },
                { icon: Users, title: "Happier customers", sub: "Faster, consistent service." },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="hp06-benefit">
                    <span className="hp06-benefit-icon"><Icon size={16} /></span>
                    <div className="hp06-benefit-title">{b.title}</div>
                    <div className="hp06-benefit-sub">{b.sub}</div>
                  </div>
                );
              })}
            </div>

            <div className="hp06-cta-row">
              <Link href="/platform" className="hp06-cta-btn">
                Explore integrations <ArrowRight size={15} />
              </Link>
              <div className="hp06-watch">
                <span className="hp06-watch-play">▶</span>
                <div>
                  <div className="hp06-watch-title">See how it works</div>
                  <div className="hp06-watch-sub">2 min walkthrough</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — a single unified panel, not a scatter of small cards */}
          <div className="hp06-map">
            <div className="hp06-map-head">
              <span className="hp06-map-head-label">HOW IT CONNECTS</span>
              <Badge variant="secondary">Works with your existing tools</Badge>
            </div>

            <Card className="hp06-panel">
              <div className="hp06-panel-grid">
                <motion.div
                  className="hp06-panel-col"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="hp06-col-eyebrow">FROM</div>
                  <div className="hp06-channel-row">
                    {CHANNELS.map((c) => {
                      const Icon = c.icon;
                      return (
                        <span key={c.id} className="hp06-channel-pill">
                          <Icon size={13} />
                          {c.label}
                        </span>
                      );
                    })}
                  </div>
                  <div className="hp06-sample-msg">
                    <div className="hp06-sample-msg-tag">Incoming</div>
                    &ldquo;Hi, I&apos;d like to book an appointment with a dermatologist.&rdquo;
                  </div>
                </motion.div>

                <motion.div
                  className="hp06-panel-col hp06-panel-col-center"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="hp06-center-orb"><AnimatedOrb size={48} /></div>
                  <div className="hp06-center-title">Namuste</div>
                  <div className="hp06-center-caption">CONNECTS · SYNCS · ACTS</div>
                  <ul className="hp06-checklist">
                    {CHECKLIST.map((c) => (
                      <li key={c}>
                        <Check size={12} strokeWidth={3} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="hp06-panel-col"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="hp06-col-eyebrow">TO</div>
                  <ul className="hp06-systems-list">
                    {SYSTEMS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.id}>
                          <span className="hp06-systems-icon"><Icon size={14} /></span>
                          <div>
                            <div className="hp06-systems-title">{s.title}</div>
                            <div className="hp06-systems-sub">{s.sub}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </div>

              <div className="hp06-panel-footer">
                <span className="hp06-panel-footer-icon"><Check size={13} strokeWidth={3} /></span>
                <div>
                  <strong>Work happens.</strong> No manual follow-ups. No lost context. Just progress.
                </div>
              </div>
            </Card>

            <div className="hp06-tools-section">
              <div className="hp06-tools-caption">INTEGRATES WITH</div>
              <div className="hp06-tools-chips">
                {INTEGRATION_CHIPS.map((t, i) => {
                  const BrandIcon = t.icon;
                  return (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="hp06-tool-chip"
                    >
                      <BrandIcon size={15} color={t.color} />
                      <span>{t.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Outcome footnotes */}
        <div className="hp06-outcomes">
          <div className="hp06-outcome">
            <Check size={13} strokeWidth={3} className="hp06-outcome-check" />
            <span><strong>Appointment created</strong> — Tue, 10:30 AM (Google Calendar &amp; Practo)</span>
          </div>
          <div className="hp06-outcome">
            <Check size={13} strokeWidth={3} className="hp06-outcome-check" />
            <span><strong>CRM record synced</strong> — Lead intent scored &amp; owner notified</span>
          </div>
        </div>
      </div>

      <style>{`
        .hp06-section-pad { padding: 130px 40px 110px; }

        .hp06-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 56px;
          align-items: start;
          margin-bottom: 48px;
        }

        .hp06-benefits { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px 24px; margin-bottom: 32px; }
        .hp06-benefit-icon {
          width: 34px; height: 34px; border-radius: 10px; margin-bottom: 10px;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .hp06-benefit-title { font-size: 14px; font-weight: 700; color: var(--text-ivory); }
        .hp06-benefit-sub { font-size: 12.5px; color: var(--text-muted); margin-top: 2px; }

        .hp06-cta-row { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
        .hp06-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 13.5px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .hp06-cta-btn:hover { transform: translateY(-2px); }
        .hp06-watch { display: flex; align-items: center; gap: 12px; }
        .hp06-watch-play {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border2); color: var(--text-ivory); font-size: 11px;
        }
        .hp06-watch-title { font-size: 13.5px; font-weight: 700; color: var(--text-ivory); }
        .hp06-watch-sub { font-size: 12px; color: var(--text-dim); margin-top: 1px; }

        /* Map */
        .hp06-map-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
        .hp06-map-head-label { font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; letter-spacing: 0.1em; color: var(--text-dim); }

        .hp06-panel { padding: 0; overflow: hidden; }
        .hp06-panel-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; }
        .hp06-panel-col { padding: 28px 24px; border-left: 1px solid var(--border); }
        .hp06-panel-col:first-child { border-left: none; }
        .hp06-panel-col-center { text-align: center; background: var(--overlay-1); }

        .hp06-col-eyebrow {
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 10.5px; letter-spacing: 0.1em;
          color: var(--text-dim); margin-bottom: 14px;
        }
        .hp06-channel-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .hp06-channel-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 999px;
          background: var(--green-glow); color: var(--green);
          font-size: 12px; font-weight: 600;
        }
        .hp06-sample-msg {
          font-size: 13px; color: var(--text-muted); line-height: 1.5;
          background: var(--surface2); border-radius: 12px; padding: 14px 16px;
        }
        .hp06-sample-msg-tag {
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 9.5px; letter-spacing: 0.08em;
          color: var(--text-dim); margin-bottom: 6px; text-transform: uppercase;
        }

        .hp06-center-orb { width: 48px; height: 48px; margin: 0 auto 10px; }
        .hp06-center-title { font-size: 15px; font-weight: 700; color: var(--text-ivory); }
        .hp06-center-caption { font-family: 'SF Mono', 'Menlo', monospace; font-size: 9.5px; letter-spacing: 0.08em; color: var(--text-dim); margin-top: 2px; margin-bottom: 18px; }
        .hp06-checklist { display: flex; flex-direction: column; gap: 10px; text-align: left; }
        .hp06-checklist li { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-muted); }
        .hp06-checklist li svg { color: var(--green); flex-shrink: 0; }

        .hp06-systems-list { display: flex; flex-direction: column; gap: 16px; }
        .hp06-systems-list li { display: flex; align-items: flex-start; gap: 10px; }
        .hp06-systems-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .hp06-systems-title { font-size: 13px; font-weight: 700; color: var(--text-ivory); }
        .hp06-systems-sub { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; }

        .hp06-panel-footer {
          display: flex; align-items: center; gap: 10px;
          padding: 18px 24px;
          border-top: 1px solid var(--border);
          background: var(--green-glow);
          font-size: 13px; color: var(--text-muted);
        }
        .hp06-panel-footer strong { color: var(--text-ivory); }
        .hp06-panel-footer-icon {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green); color: #fff;
        }

        .hp06-tools-section { margin-top: 28px; }
        .hp06-tools-caption {
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; letter-spacing: 0.1em;
          color: var(--text-dim); margin-bottom: 14px;
        }
        .hp06-tools-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .hp06-tool-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 999px;
          background: var(--surface); border: 1px solid var(--border);
          font-size: 12.5px; font-weight: 600; color: var(--text-ivory);
          box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 20px -18px rgba(11, 15, 13, 0.3);
        }

        .hp06-outcomes {
          display: flex; flex-direction: column; gap: 10px;
          font-size: 13.5px; color: var(--text-muted);
          border-top: 1px solid var(--border); padding-top: 28px;
        }
        .hp06-outcome { display: flex; align-items: center; gap: 10px; }
        .hp06-outcome strong { color: var(--text-ivory); }
        .hp06-outcome-check {
          width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
          background: var(--green); color: #052015; padding: 3px; box-sizing: border-box;
        }

        @media (max-width: 980px) {
          .hp06-layout { grid-template-columns: 1fr; gap: 40px; }
          .hp06-panel-grid { grid-template-columns: 1fr; }
          .hp06-panel-col { border-left: none; border-top: 1px solid var(--border); }
          .hp06-panel-col:first-child { border-top: none; }
        }

        @media (max-width: 700px) {
          .hp06-section-pad { padding: 56px 20px 40px !important; }
          .hp06-benefits { grid-template-columns: 1fr 1fr; }
          .hp06-cta-row { flex-direction: column; align-items: stretch; }
          .hp06-cta-btn { justify-content: center; }
          .hp06-map-head { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
      `}</style>
    </section>
  );
}
