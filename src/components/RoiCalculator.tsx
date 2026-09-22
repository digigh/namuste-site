"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Lightbulb, BarChart3, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function SliderCard({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  color,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  color: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <Card className="roi-slider-card">
      <CardContent className="flex flex-col gap-2">
        <span className="roi-slider-label">{label}</span>
        <span className="roi-slider-value" style={{ color }}>{format(value)}</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="roi-slider-range"
          style={{ accentColor: color, background: `linear-gradient(90deg, ${color} ${pct}%, var(--overlay-2) ${pct}%)` }}
        />
      </CardContent>
    </Card>
  );
}

export default function RoiCalculator() {
  const [dailyCalls, setDailyCalls] = React.useState<number>(45);
  const [missedPercent, setMissedPercent] = React.useState<number>(25);
  const [dealValue, setDealValue] = React.useState<number>(3500);
  const conversionRate = 30;

  const missedCallsPerDay = dailyCalls * (missedPercent / 100);
  const recoveredCallsPerMonth = missedCallsPerDay * 26;
  const convertedDealsPerMonth = recoveredCallsPerMonth * (conversionRate / 100);
  const monthlyRevenueRecovered = convertedDealsPerMonth * dealValue;
  const annualRevenueRecovered = monthlyRevenueRecovered * 12;

  // What's lost today vs. what Namuste recovers — the two bars in the chart
  const totalMonthlyOpportunity = dailyCalls * 26 * (conversionRate / 100) * dealValue;
  const lostToday = totalMonthlyOpportunity * (missedPercent / 100);
  const maxBar = Math.max(totalMonthlyOpportunity, lostToday, 1);
  const revenueMultiple = lostToday > 0 ? totalMonthlyOpportunity / lostToday : 0;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
      <div className="roi-eyebrow">
        INTERACTIVE VALUE MODELING
        <span className="roi-eyebrow-rule" />
      </div>
      <h3 className="roi-headline">Calculate the cost of missed conversations.</h3>
      <p className="roi-subhead">
        See how many inquiries you might be losing — and the real revenue impact. Adjust the numbers to match your business.
      </p>

      <div className="roi-layout">
        <div>
          <div className="roi-sliders">
            <SliderCard label="Inbound inquiries per day" value={dailyCalls} min={10} max={200} step={5} onChange={setDailyCalls} color="var(--green)" format={(v) => `${v}`} />
            <SliderCard label="Missed or delayed" value={missedPercent} min={5} max={60} step={1} onChange={setMissedPercent} color="var(--coral)" format={(v) => `${v}%`} />
            <SliderCard label="Average value per inquiry" value={dealValue} min={500} max={20000} step={500} onChange={setDealValue} color="var(--green)" format={(v) => `₹${v.toLocaleString("en-IN")}`} />
          </div>

          <motion.div
            key={Math.round(monthlyRevenueRecovered)}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="roi-loss-card"
          >
            <span className="roi-loss-icon"><TrendingUp size={18} /></span>
            <div style={{ minWidth: 0 }}>
              <div className="roi-loss-label">YOUR ESTIMATED LOSS</div>
              <div className="roi-loss-value">
                ₹{Math.round(monthlyRevenueRecovered).toLocaleString("en-IN")} <span className="roi-loss-unit">/ month</span>
              </div>
              <div className="roi-loss-annual">That&apos;s about ₹{Math.round(annualRevenueRecovered).toLocaleString("en-IN")} a year.</div>
            </div>
          </motion.div>

          <div className="roi-cta-row">
            <Link href="/contact" className="roi-cta-btn">
              Stop Losing Customer Calls <ArrowRight size={16} />
            </Link>
            <a href="#messy-conversations" className="roi-watch-link">
              <span className="roi-watch-play"><Play size={12} fill="currentColor" /></span>
              <span>
                <span className="roi-watch-title">See how it works</span>
                <span className="roi-watch-sub">Watch a real conversation</span>
              </span>
            </a>
          </div>

          <div className="roi-footnote">
            ~{Math.round(recoveredCallsPerMonth)} recoverable conversations/month · illustrative model, 26 business days, 30% closing rate.
          </div>
        </div>

        {/* A real chart illustration — two bars that grow and shrink live as
            the numbers change, not just stated as text. */}
        <Card className="roi-chart-card">
          <CardContent className="flex flex-col gap-5">
            <div className="roi-chart-head">
              <div>
                <div className="roi-chart-title">Monthly Revenue Impact</div>
                <div className="roi-chart-desc">From missed vs. captured conversations</div>
              </div>
              <Badge variant="secondary" className="roi-multiple-badge">
                <BarChart3 size={13} />
                <span>
                  +{revenueMultiple.toFixed(1)}x<br /><span className="roi-multiple-sub">More revenue</span>
                </span>
              </Badge>
            </div>

            <div className="roi-chart-bars">
              <div className="roi-chart-col">
                <div className="roi-chart-value" style={{ color: "var(--coral)" }}>₹{Math.round(lostToday).toLocaleString("en-IN")}</div>
                <div className="roi-chart-track">
                  <motion.div
                    className="roi-chart-fill roi-chart-fill-coral"
                    animate={{ height: `${(lostToday / maxBar) * 100}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
                <div className="roi-chart-label">Lost today</div>
                <div className="roi-chart-sublabel">From missed<br />or delayed inquiries</div>
              </div>
              <div className="roi-chart-col">
                <div className="roi-chart-value" style={{ color: "var(--green)" }}>₹{Math.round(totalMonthlyOpportunity).toLocaleString("en-IN")}</div>
                <div className="roi-chart-track">
                  <motion.div
                    className="roi-chart-fill roi-chart-fill-green"
                    animate={{ height: `${(totalMonthlyOpportunity / maxBar) * 100}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
                <div className="roi-chart-label">Possible with Namuste</div>
                <div className="roi-chart-sublabel">By converting<br />more conversations</div>
              </div>
            </div>

            <div className="roi-tip-box">
              <Lightbulb size={16} />
              <span>Even a 10% improvement in response rate can unlock significant revenue for your business.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .roi-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px;
          letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 18px;
        }
        .roi-eyebrow-rule { flex: 1; max-width: 60px; height: 1px; background: var(--border2); }
        .roi-headline {
          font-size: clamp(30px, 3.6vw, 46px); color: var(--text-ivory); margin: 0 0 14px;
          font-weight: 800; letter-spacing: -0.02em; line-height: 1.1;
        }
        .roi-subhead { color: var(--text-muted); font-size: 15.5px; line-height: 1.6; margin: 0 0 44px; max-width: 560px; }

        .roi-layout { display: grid; grid-template-columns: 1fr 0.85fr; gap: 40px; align-items: start; }

        .roi-sliders { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px; }
        .roi-slider-card { transition: border-color 0.2s ease; }
        .roi-slider-label { font-size: 12px; color: var(--text-muted); }
        .roi-slider-value { font-size: 24px; font-weight: 800; font-family: 'SF Mono', 'Menlo', monospace; }
        .roi-slider-range {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 5px; border-radius: 999px; margin-top: 6px; cursor: pointer;
        }
        .roi-slider-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff; border: 3px solid var(--green); cursor: pointer;
          box-shadow: 0 2px 6px rgba(11,15,13,0.3);
        }
        .roi-slider-range::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff; border: 3px solid var(--green); cursor: pointer;
        }

        .roi-loss-card {
          display: flex; align-items: flex-start; gap: 14px;
          background: var(--green-glow); border: 1px solid var(--border-green);
          border-radius: 16px; padding: 20px 22px; margin-bottom: 24px;
        }
        .roi-loss-icon {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green); color: #fff;
        }
        .roi-loss-label { font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; color: var(--text-muted); }
        .roi-loss-value { font-size: 30px; font-weight: 800; color: var(--text-ivory); font-family: 'SF Mono', 'Menlo', monospace; margin-top: 2px; }
        .roi-loss-unit { font-size: 14px; font-weight: 600; color: var(--text-muted); font-family: var(--font-sans); }
        .roi-loss-annual { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

        .roi-cta-row { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; margin-bottom: 16px; }
        .roi-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 28px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14.5px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .roi-cta-btn:hover { transform: translateY(-2px); }
        .roi-watch-link { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .roi-watch-play {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border2); color: var(--text-ivory);
        }
        .roi-watch-title { display: block; font-size: 13.5px; font-weight: 700; color: var(--text-ivory); }
        .roi-watch-sub { display: block; font-size: 12px; color: var(--text-dim); margin-top: 1px; }

        .roi-footnote { font-size: 12.5px; color: var(--text-dim); }

        .roi-chart-card { position: sticky; top: 24px; }
        .roi-chart-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .roi-chart-title { font-size: 15px; font-weight: 700; color: var(--text-ivory); }
        .roi-chart-desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .roi-multiple-badge {
          display: inline-flex !important; align-items: center; gap: 7px;
          background: var(--green-glow) !important; color: var(--green) !important;
          border: 1px solid var(--border-green) !important; padding: 7px 11px !important;
          font-size: 12px !important; font-weight: 800 !important; line-height: 1.25;
          height: auto !important; max-height: none !important; overflow: visible !important;
          white-space: normal !important; flex-shrink: 0;
        }
        .roi-multiple-sub { font-size: 9px; font-weight: 600; color: var(--text-muted); }

        .roi-chart-bars { display: flex; align-items: flex-end; justify-content: center; gap: 28px; padding-top: 8px; }
        .roi-chart-col { display: flex; flex-direction: column; align-items: center; flex: 1; }
        .roi-chart-value { font-family: 'SF Mono', 'Menlo', monospace; font-size: 13.5px; font-weight: 700; margin-bottom: 8px; }
        .roi-chart-track {
          width: 100%; max-width: 84px; height: 150px;
          display: flex; align-items: flex-end;
          background: var(--overlay-1); border-radius: 10px 10px 0 0; overflow: hidden;
        }
        .roi-chart-fill { width: 100%; border-radius: 10px 10px 0 0; }
        .roi-chart-fill-coral { background: linear-gradient(180deg, var(--coral) 0%, var(--coral-dim) 100%); }
        .roi-chart-fill-green { background: linear-gradient(180deg, var(--green-luminous) 0%, var(--green) 100%); }
        .roi-chart-label { font-size: 12px; font-weight: 700; color: var(--text-ivory); margin-top: 10px; text-align: center; }
        .roi-chart-sublabel { font-size: 10.5px; color: var(--text-dim); margin-top: 2px; text-align: center; line-height: 1.35; }

        .roi-tip-box {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 13px 14px; border-radius: 12px;
          background: var(--green-glow); border: 1px solid var(--border-green);
          font-size: 12px; color: var(--text-muted); line-height: 1.5;
        }
        .roi-tip-box svg { color: var(--green); flex-shrink: 0; margin-top: 1px; }

        @media (max-width: 900px) {
          .roi-layout { grid-template-columns: 1fr; }
          .roi-sliders { grid-template-columns: 1fr; }
          .roi-chart-card { position: static; }
        }
      `}</style>
    </div>
  );
}
