"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MessageSquare, X, BarChart3, ArrowRight, Check, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// A single restrained third accent for the chat channel — voice and
// WhatsApp reuse the brand's real coral/green tokens; chat gets one
// deliberately muted blue, defined once and used consistently everywhere
// it appears in this section, never introduced ad hoc.
const CHAT_BLUE = { fg: "#3B6FE0", bg: "rgba(59, 111, 224, 0.08)", border: "rgba(59, 111, 224, 0.22)" };

const CHANNELS = {
  voice: { fg: "var(--coral)", bg: "var(--coral-bg)", border: "var(--border-coral)" },
  whatsapp: { fg: "var(--green)", bg: "var(--green-glow)", border: "var(--border-green)" },
  chat: CHAT_BLUE,
};

const ACTIVITY = [
  { id: "voice", icon: Phone, channel: CHANNELS.voice, name: "Unknown Caller", meta: "Voice · OPD Line", verb: "answered", time: "9:42 AM", foot: "0:00" },
  { id: "whatsapp", icon: MessageCircle, channel: CHANNELS.whatsapp, name: "+91 98•••• ••41", meta: "WhatsApp · Business Line", verb: "understood", time: "11:15 AM", foot: "No reply" },
  { id: "chat", icon: MessageSquare, channel: CHANNELS.chat, name: "Site Visitor", meta: "Web · Live Chat", verb: "followed through", time: "2:30 PM", foot: "Abandoned" },
];

// The illustration — floating enquiry cards (the same three from ACTIVITY,
// so the copy never drifts out of sync with the list on the left), each
// clear of the others and of the funnel below. Their enquiry keeps flowing
// continuously past a channel-colored marker, down through a glass-look 3D
// funnel with real depth (directional shading, a gloss highlight, an inner
// throat shadow, a cast ground shadow), and out through a leaking spout.
// An original composition built from the site's own tokens/icons/data —
// not a traced copy of any reference.
const FUNNEL_CHIPS = [
  { item: ACTIVITY[0], x: 0, y: 4, w: 158 },
  { item: ACTIVITY[2], x: 242, y: 4, w: 158 },
  { item: ACTIVITY[1], x: 90, y: 78, w: 158 },
];
const FUNNEL_CHIP_CONNECTORS = [
  "M 79 60 Q 130 128 182 176",
  "M 169 134 Q 186 158 199 178",
  "M 321 60 Q 268 128 218 176",
];
// Each enquiry's continuous fall: spawns just under the rim, narrows toward
// center as the glass tapers, and fades out right at the drain — looped.
const FUNNEL_FLOWS = [
  { x: [182, 192, 198, 200], y: [180, 240, 320, 396], opacity: [0, 1, 1, 0], duration: 3.4, delay: 0 },
  { x: [199, 200, 200, 200], y: [180, 240, 320, 396], opacity: [0, 1, 1, 0], duration: 3.1, delay: 1.15 },
  { x: [218, 206, 200, 200], y: [180, 240, 320, 396], opacity: [0, 1, 1, 0], duration: 3.8, delay: 2.3 },
];
const FUNNEL_FLOW_TIMES = [0, 0.2, 0.72, 1];

function FunnelSpillIllustration() {
  const uid = React.useId();
  const bodyGradId = `funnel-body-${uid}`;
  const glossId = `funnel-gloss-${uid}`;
  const throatShadeId = `funnel-throat-${uid}`;
  const neckShadeId = `funnel-neck-${uid}`;
  const dropShadowId = `funnel-shadow-${uid}`;
  const groundBlurId = `funnel-ground-blur-${uid}`;

  return (
    <svg
      viewBox="0 0 400 470"
      width="100%"
      role="img"
      aria-label="A voice call, a WhatsApp message and a web chat flowing continuously through a funnel and out through a leaking spout"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={bodyGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--surface2)" />
          <stop offset="32%" stopColor="var(--surface3)" />
          <stop offset="62%" stopColor="var(--overlay-2)" />
          <stop offset="100%" stopColor="var(--surface2)" />
        </linearGradient>
        <radialGradient id={glossId} cx="30%" cy="18%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={throatShadeId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={neckShadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <filter id={dropShadowId} x="-40%" y="-20%" width="180%" height="160%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0B0F0D" floodOpacity="0.22" />
        </filter>
        <filter id={groundBlurId}>
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* Dashed lines — each enquiry's path down into the funnel */}
      {FUNNEL_CHIP_CONNECTORS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={ACTIVITY[i].channel.fg}
          strokeWidth="1.6"
          strokeDasharray="4 5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
        />
      ))}

      {/* Cast shadow on the "ground" beneath the funnel */}
      <ellipse cx="200" cy="428" rx="44" ry="7" fill="#000" opacity="0.16" filter={`url(#${groundBlurId})`} />

      {/* Funnel body — a glass-look vessel with real depth, not a bar chart */}
      <g filter={`url(#${dropShadowId})`}>
        <motion.path
          d="M 80 162 L 176 338 L 172 404 L 228 404 L 224 338 L 320 162 Z"
          fill={`url(#${bodyGradId})`}
          stroke="var(--border2)"
          strokeWidth="1"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        {/* Shadow gradient deepening toward the neck, for recession */}
        <rect x="172" y="338" width="56" height="66" fill={`url(#${neckShadeId})`} />
        {/* Glossy directional highlight across the body */}
        <path
          d="M 80 162 L 176 338 L 172 404 L 228 404 L 224 338 L 320 162 Z"
          fill={`url(#${glossId})`}
        />
        {/* Crisp facet edges — the light-catching left wall and the shadowed right wall */}
        <line x1="80" y1="162" x2="176" y2="338" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="172" y1="404" x2="176" y2="338" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="224" y1="338" x2="320" y2="162" stroke="#000" strokeOpacity="0.22" strokeWidth="1.5" />
        <line x1="228" y1="404" x2="224" y2="338" stroke="#000" strokeOpacity="0.18" strokeWidth="1.5" />

        <ellipse cx="200" cy="162" rx="122" ry="23" style={{ fill: "var(--surface3)" }} stroke="var(--border2)" strokeWidth="1" />
        {/* Inner throat shadow — depth cue for looking down into the opening */}
        <ellipse cx="200" cy="162" rx="96" ry="15" fill={`url(#${throatShadeId})`} />
        <ellipse cx="200" cy="162" rx="80" ry="11" style={{ fill: "var(--overlay-2)" }} />
        <ellipse cx="200" cy="162" rx="122" ry="23" fill={`url(#${glossId})`} />

        {/* Spout + drain */}
        <ellipse cx="200" cy="404" rx="26" ry="7" style={{ fill: "var(--bg2)" }} />
        <ellipse cx="200" cy="407" rx="19" ry="6" fill="#101314" />
        <motion.line x1="174" y1="392" x2="164" y2="407" stroke="var(--coral)" strokeWidth="2.5" strokeLinecap="round" animate={{ opacity: [0.15, 1, 0.15] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.line x1="226" y1="392" x2="236" y2="407" stroke="var(--coral)" strokeWidth="2.5" strokeLinecap="round" animate={{ opacity: [0.15, 1, 0.15] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
      </g>

      {/* Channel markers, flowing continuously down through the glass */}
      {ACTIVITY.map((item, i) => {
        const Icon = item.icon;
        const flow = FUNNEL_FLOWS[i];
        return (
          <motion.g
            key={item.id}
            initial={{ x: flow.x[0], y: flow.y[0], opacity: 0 }}
            animate={{ x: flow.x, y: flow.y, opacity: flow.opacity }}
            transition={{ duration: flow.duration, delay: flow.delay, repeat: Infinity, times: FUNNEL_FLOW_TIMES, ease: "easeIn" }}
          >
            <circle r="17" style={{ fill: item.channel.fg }} stroke="var(--surface)" strokeWidth="2" />
            <circle r="17" fill={`url(#${glossId})`} />
            <foreignObject x="-13" y="-13" width="26" height="26">
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <Icon size={16} />
              </div>
            </foreignObject>
          </motion.g>
        );
      })}

      {/* Floating enquiry chips — same data as the activity list on the left,
          spaced clear of each other and of the funnel below */}
      {FUNNEL_CHIPS.map(({ item, x, y, w }, i) => {
        const Icon = item.icon;
        return (
          <motion.g
            key={item.id}
            initial={{ opacity: 0, y: y - 8 }}
            whileInView={{ opacity: 1, y }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <foreignObject x={x} y={0} width={w} height={58}>
              <div className="funnel-chip" style={{ borderColor: item.channel.border }}>
                <span className="funnel-chip-icon" style={{ background: item.channel.bg, color: item.channel.fg }}>
                  <Icon size={14} />
                </span>
                <div className="funnel-chip-text">
                  <div className="funnel-chip-line1">
                    {item.name}
                    <span className="funnel-chip-time">{item.time}</span>
                  </div>
                  <div className="funnel-chip-line2">Nobody {item.verb}.</div>
                </div>
              </div>
            </foreignObject>
          </motion.g>
        );
      })}

      {/* Hand-written annotation, pointing at the leak */}
      <motion.path
        d="M 300 350 C 322 368, 302 390, 262 398"
        fill="none"
        stroke="var(--text-dim)"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <foreignObject x="228" y="344" width="168" height="90">
        <div className="funnel-annotation font-hand">Don&apos;t just get enquiries.<br />Convert them.</div>
      </foreignObject>
    </svg>
  );
}

export default function LossEnquiryExact() {
  return (
    <section
      id="problem-loss"
      className="loss-section-pad"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        <div className="loss-grid">
          {/* Left — real content */}
          <div className="loss-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ marginBottom: "32px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'SF Mono', 'Menlo', monospace", fontSize: "12px", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "18px", textTransform: "uppercase" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--coral)", flexShrink: 0 }} />
                RECENT · MISSED
              </div>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.18, letterSpacing: "-0.015em", margin: "0 0 16px" }}>
                <span style={{ color: "var(--text-ivory)" }}>The enquiry arrived.</span><br />
                <span style={{ color: "var(--text-ivory)" }}>The business </span><span style={{ color: "var(--coral)" }}>did not respond.</span>
              </h2>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, maxWidth: "480px" }}>
                The loss happens in the space between interest and action.
              </p>
            </motion.div>

            <div className="loss-activity-list">
              {ACTIVITY.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="loss-row"
                  >
                    <div className="loss-row-icon-wrap">
                      <div className="loss-row-icon" style={{ background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.5), rgba(255,255,255,0) 55%), ${item.channel.bg}`, color: item.channel.fg, border: `1px solid ${item.channel.border}` }}>
                        <Icon size={18} />
                      </div>
                      <span className="loss-row-badge"><X size={9} strokeWidth={3} /></span>
                    </div>
                    <div className="loss-row-main">
                      <div className="loss-row-name">{item.name}</div>
                      <div className="loss-row-meta">{item.meta}</div>
                    </div>
                    <div className="loss-row-status">
                      <span className="loss-row-pill">Nobody <strong>{item.verb}</strong>.</span>
                      <div className="loss-row-foot">
                        <span className="loss-row-time">{item.time}</span>
                        <span className="loss-row-dot">·</span>
                        <span className="loss-row-tag">
                          {item.foot === "No reply" && <Check size={11} />}
                          {item.foot}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="loss-insight-bar"
            >
              <div className="loss-insight-head">
                <div className="loss-insight-icon" style={{ background: "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%), var(--coral)" }}><BarChart3 size={19} /></div>
                <div style={{ minWidth: 0 }}>
                  <div className="loss-insight-line1">Every missed enquiry is a potential customer lost.</div>
                  <div className="loss-insight-line2">Be there, every time it matters.</div>
                </div>
              </div>
              <Link href="/contact" className="loss-cta-btn">
                Turn Missed into Opportunities <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Right — the funnel, as an actual tapering 3D illustration
              (SVG + motion/react), not a bar chart standing in for one */}
          <div className="loss-right">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", maxWidth: "440px" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Where the funnel breaks</CardTitle>
                  <CardDescription>Every enquiry that never gets a next step.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <FunnelSpillIllustration />
                </CardContent>
                <CardFooter className="gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--coral-bg)", color: "var(--coral)", border: "1px solid var(--border-coral)" }}>
                    <TrendingDown size={14} />
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-ivory)" }}>
                    3 of 12 never came back.
                  </span>
                  <Badge variant="destructive" className="ml-auto shrink-0">Lost</Badge>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .loss-section-pad { padding: 120px 40px 100px; }

        .loss-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 64px;
          align-items: center;
        }

        /* Activity list */
        .loss-activity-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
        .loss-row {
          display: flex; align-items: center; gap: 16px;
          padding: 18px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 22px 40px -30px rgba(11, 15, 13, 0.4);
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .loss-row:hover {
          border-color: var(--border2);
          transform: translateY(-2px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 28px 48px -28px rgba(11, 15, 13, 0.48);
        }
        .loss-row-icon-wrap { position: relative; flex-shrink: 0; }
        .loss-row-icon {
          width: 42px; height: 42px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -6px 10px rgba(11,15,13,0.12), 0 8px 16px -10px rgba(11,15,13,0.4);
        }
        .loss-row-badge {
          position: absolute; top: -3px; right: -3px;
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--coral); color: #fff;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid var(--surface);
          box-shadow: 0 2px 6px -1px rgba(225, 76, 60, 0.5);
        }
        .loss-row-main { min-width: 0; flex: 1; }
        .loss-row-name { font-size: 15px; font-weight: 700; color: var(--text-ivory); letter-spacing: -0.005em; }
        .loss-row-meta { font-size: 12px; color: var(--text-muted); margin-top: 3px; }
        .loss-row-status { text-align: right; flex-shrink: 0; }
        .loss-row-pill {
          display: inline-block;
          font-size: 12px; color: var(--coral);
          background: var(--coral-bg);
          border: 1px solid var(--border-coral);
          border-radius: 999px;
          padding: 5px 13px;
          white-space: nowrap;
        }
        .loss-row-pill strong { font-weight: 700; }
        .loss-row-foot { display: flex; align-items: center; justify-content: flex-end; gap: 5px; margin-top: 7px; }
        .loss-row-time { font-family: 'SF Mono', 'Menlo', monospace; font-size: 10.5px; color: var(--text-dim); }
        .loss-row-dot { color: var(--text-dim); font-size: 10.5px; }
        .loss-row-tag { display: inline-flex; align-items: center; gap: 3px; font-size: 10.5px; color: var(--text-dim); }

        /* Insight bar */
        .loss-insight-bar {
          display: flex; flex-direction: column; align-items: flex-start; gap: 18px;
          background: var(--coral-bg);
          border: 1px solid var(--border-coral);
          border-radius: 18px;
          padding: 22px 26px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 26px 48px -30px rgba(225, 76, 60, 0.28);
        }
        .loss-insight-head { display: flex; align-items: flex-start; gap: 14px; }
        .loss-insight-icon {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -6px 10px rgba(11,15,13,0.15), 0 10px 20px -10px rgba(225, 76, 60, 0.6);
        }
        .loss-insight-line1 { font-size: 15px; font-weight: 700; color: var(--text-ivory); line-height: 1.45; }
        .loss-insight-line2 { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .loss-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 13px; font-weight: 700; text-decoration: none;
          white-space: nowrap;
          margin-left: 58px;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .loss-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 30px -10px rgba(11, 15, 13, 0.5); }

        /* Funnel — shadcn Chart card */
        .loss-right { display: flex; align-items: center; justify-content: center; }

        .funnel-chip {
          display: flex; align-items: flex-start; gap: 8px;
          height: 58px; margin: 2px 2px 0; padding: 9px 11px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; box-sizing: border-box;
          box-shadow: 0 10px 22px -14px rgba(11, 15, 13, 0.45);
        }
        .funnel-chip-icon {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .funnel-chip-text { min-width: 0; flex: 1; }
        .funnel-chip-line1 {
          display: flex; align-items: baseline; justify-content: space-between; gap: 6px;
          font-size: 11.5px; font-weight: 700; color: var(--text-ivory);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .funnel-chip-time { font-family: 'SF Mono', 'Menlo', monospace; font-size: 9px; font-weight: 500; color: var(--text-dim); flex-shrink: 0; }
        .funnel-chip-line2 { font-size: 10.5px; color: var(--text-muted); margin-top: 2px; }
        .funnel-annotation {
          font-size: 22px; line-height: 1.15; color: var(--text-muted);
          text-align: left; transform: rotate(-2deg); transform-origin: left top;
        }

        @media (max-width: 980px) {
          .loss-grid { grid-template-columns: 1fr; gap: 56px; }
        }

        @media (max-width: 700px) {
          .loss-section-pad { padding: 56px 20px 40px !important; }
          .loss-row { flex-wrap: wrap; }
          .loss-row-status { text-align: left; margin-left: 58px; flex-basis: 100%; }
          .loss-row-foot { justify-content: flex-start; }
          .loss-insight-bar { align-items: stretch; }
          .loss-cta-btn { justify-content: center; margin-left: 0; width: 100%; }
        }
      `}</style>
    </section>
  );
}
