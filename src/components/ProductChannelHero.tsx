import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductChannelHeroProps {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  closingLine: string;
  closingAccent: string;
  cards: { icon: React.ReactNode; title: string; desc: string }[];
}

export default function ProductChannelHero({
  eyebrow,
  headline,
  headlineAccent,
  description,
  primaryCta,
  secondaryCta,
  closingLine,
  closingAccent,
  cards,
}: ProductChannelHeroProps) {
  return (
    <>
      <section className="pch-hero-pad">
        <div className="pch-container">
          <div className="pch-eyebrow">
            <span className="pch-eyebrow-dot" />
            {eyebrow}
            <span className="pch-eyebrow-rule" />
          </div>
          <h1 className="pch-headline">
            {headline} <span style={{ color: "var(--green)" }}>{headlineAccent}</span>
          </h1>
          <p className="pch-desc">{description}</p>
          <div className="pch-actions">
            <Link href={primaryCta.href} className="pch-btn-primary">
              {primaryCta.label} <ArrowRight size={15} />
            </Link>
            <Link href={secondaryCta.href} className="pch-btn-secondary">
              {secondaryCta.label} <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="pch-hero-line">
          {closingLine} <span style={{ color: "var(--green)", fontWeight: 700 }}>{closingAccent}</span>
        </div>
      </section>

      <section className="pch-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="pch-container-wide">
          <div className="pch-cards-grid">
            {cards.map((c, i) => (
              <Card key={i} className="pch-card">
                <CardContent className="flex flex-col gap-3">
                  <span className="pch-card-icon">{c.icon}</span>
                  <h3 className="pch-card-title">{c.title}</h3>
                  <p className="pch-card-desc">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .pch-hero-pad { min-height: 78vh; padding: 150px 36px 60px; display: flex; flex-direction: column; justify-content: space-between; }
        .pch-container { max-width: 900px; margin: 0 auto; width: 100%; }
        .pch-container-wide { max-width: 1280px; margin: 0 auto; }

        .pch-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .pch-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .pch-eyebrow-rule { width: 60px; height: 1px; background: var(--border2); }

        .pch-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4vw, 52px);
          line-height: 1.12; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 20px; max-width: 700px;
        }
        .pch-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; max-width: 560px; margin: 0 0 32px; }

        .pch-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .pch-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .pch-btn-primary:hover { transform: translateY(-2px); }
        .pch-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 24px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .pch-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .pch-hero-line {
          text-align: center; margin-top: 60px; border-top: 1px solid var(--border); padding-top: 32px;
          font-family: var(--font-sans); font-weight: 700; font-size: clamp(19px, 2.4vw, 30px); color: var(--text-ivory);
        }

        .pch-section-pad { padding: 90px 36px; }
        .pch-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .pch-card-icon {
          width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .pch-card-title { font-size: 19px; font-weight: 700; color: var(--text-ivory); margin: 0; }
        .pch-card-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin: 0; }

        @media (max-width: 900px) {
          .pch-cards-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .pch-hero-pad { padding: 110px 20px 40px; }
          .pch-section-pad { padding: 60px 20px; }
          .pch-actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}
