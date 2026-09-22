"use client";

import { useState } from "react";
import { PhoneCall, MessageSquare, Globe, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ChannelId = "voice" | "whatsapp" | "web";

const CHANNELS: {
  id: ChannelId;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  incoming: string;
  namusteResponse: string;
  outcome: string;
  metrics: string[];
}[] = [
  {
    id: "voice",
    name: "Voice AI",
    icon: <PhoneCall size={15} />,
    tagline: "Natural, sub-second spoken conversations across Indian & global languages.",
    incoming: "“Namaste, I want to know if Dr. Roy is available for a skin consultation on Thursday evening?”",
    namusteResponse: "“Namaste! Yes, Dr. Roy has two slots on Thursday — 5:15 PM and 6:30 PM. Which one suits you better?”",
    outcome: "Slot selected for 5:15 PM · Patient details captured · Confirmation sent via SMS & WhatsApp · Doctor calendar synced.",
    metrics: ["<600ms latency", "12+ languages", "Intelligent human transfer"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp AI",
    icon: <MessageSquare size={15} />,
    tagline: "24/7 interactive messaging with quick-reply buttons, catalogs, and persistent history.",
    incoming: "“Hi, I received an invoice notice. Can you share my outstanding balance and payment link?”",
    namusteResponse: "“Hello! Your verified account balance for Invoice #8492 is ₹14,200. Here is your secure UPI/Razorpay payment link.”",
    outcome: "Invoice authenticated · Payment link dispatched · Payment status monitored · Receipt auto-generated.",
    metrics: ["Official WhatsApp API", "Rich media & catalogs", "Auto-re-engagement"],
  },
  {
    id: "web",
    name: "Web Concierge",
    icon: <Globe size={15} />,
    tagline: "Instant website guide converting passive visitors into qualified discovery calls.",
    incoming: "“We run a 5-doctor polyclinic. Does Namuste integrate with Practo and Google Calendar?”",
    namusteResponse: "“Yes! Namuste syncs real-time with Google Calendar, Practo, and custom clinic management EMRs with zero double-booking.”",
    outcome: "Clinic requirements qualified · Custom demo calendared · Case study PDF delivered to visitor email.",
    metrics: ["Zero-friction widget", "Custom brand styling", "Real-time CRM push"],
  },
];

export default function ChannelSwitcher() {
  const [activeChannel, setActiveChannel] = useState<ChannelId>("voice");
  const current = CHANNELS.find((c) => c.id === activeChannel)!;

  return (
    <div style={{ width: "100%" }}>
      <Tabs value={activeChannel} onValueChange={(v) => setActiveChannel(v as ChannelId)}>
        <TabsList variant="line" className="cs-tabs">
          {CHANNELS.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="cs-tab-trigger">
              {c.icon}
              <span>{c.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeChannel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="cs-card">
            <CardContent className="cs-card-grid">
              {/* Left: dialogue progression */}
              <div>
                <div className="cs-eyebrow">
                  <span className="cs-eyebrow-dot" />
                  {current.name} EXPERIENCE
                </div>
                <p className="cs-tagline">{current.tagline}</p>

                <div className="cs-messages">
                  <div className="cs-msg cs-msg-incoming">{current.incoming}</div>
                  <div className="cs-msg cs-msg-response">{current.namusteResponse}</div>
                </div>
              </div>

              {/* Right: structured outcome */}
              <div className="cs-outcome">
                <div className="cs-outcome-head">
                  <Sparkles size={15} />
                  <h4>Structured Outcome</h4>
                </div>
                <p className="cs-outcome-text">{current.outcome}</p>
                <div className="cs-outcome-features">
                  <div className="cs-outcome-features-label">Key Channel Features</div>
                  {current.metrics.map((m, i) => (
                    <div key={i} className="cs-feature-row">
                      <Check size={13} />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <style>{`
        .cs-tabs { margin-bottom: 28px; }
        .cs-tab-trigger { display: inline-flex; align-items: center; gap: 8px; }

        .cs-card-grid {
          display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: stretch;
        }

        .cs-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; color: var(--green); margin-bottom: 14px;
        }
        .cs-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
        .cs-tagline { font-size: 14.5px; color: var(--text-muted); line-height: 1.6; margin: 0 0 22px; }

        .cs-messages { display: flex; flex-direction: column; gap: 12px; }
        .cs-msg { border-radius: 14px; padding: 14px 18px; font-size: 13.5px; line-height: 1.55; }
        .cs-msg-incoming { background: var(--surface2); border: 1px solid var(--border); color: var(--text-muted); }
        .cs-msg-response { background: var(--green-glow); border: 1px solid var(--border-green); color: var(--text-ivory); }

        .cs-outcome {
          background: var(--bg2); border: 1px solid var(--border-green);
          border-radius: 16px; padding: 24px; display: flex; flex-direction: column;
        }
        .cs-outcome-head { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; color: var(--green); }
        .cs-outcome-head h4 { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0; }
        .cs-outcome-text { font-size: 13.5px; color: var(--text-ivory); line-height: 1.6; margin: 0 0 20px; }
        .cs-outcome-features { border-top: 1px solid var(--border); padding-top: 16px; margin-top: auto; }
        .cs-outcome-features-label { font-size: 10.5px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
        .cs-feature-row { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-muted); margin-top: 8px; }
        .cs-feature-row svg { color: var(--green); flex-shrink: 0; }

        @media (max-width: 900px) {
          .cs-card-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </div>
  );
}
