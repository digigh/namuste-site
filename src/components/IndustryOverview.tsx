import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Capability {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface IndustryOverviewProps {
  breadcrumbLabel: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  capabilities: Capability[];
}

export default function IndustryOverview({
  breadcrumbLabel,
  eyebrow,
  headline,
  headlineAccent,
  description,
  capabilities,
}: IndustryOverviewProps) {
  return (
    <>
      <section className="iov-hero-pad">
        <div className="iov-container">
          <div className="iov-breadcrumb">
            <Link href="/">Industries</Link>
            <span>/</span>
            <span className="is-current">{breadcrumbLabel}</span>
          </div>

          <div className="iov-eyebrow">
            <span className="iov-eyebrow-dot" />
            {eyebrow}
          </div>

          <h1 className="iov-headline">
            {headline} <span style={{ color: "var(--green)" }}>{headlineAccent}</span>
          </h1>
          <p className="iov-desc">{description}</p>

          <Link href="/contact" className="iov-btn-primary">
            Book a Demo <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="iov-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="iov-container-wide">
          <div className="iov-cards-grid">
            {capabilities.map((c, i) => (
              <Card key={i} className="iov-card">
                <CardContent className="flex flex-col gap-3">
                  <span className="iov-card-icon">{c.icon}</span>
                  <h3 className="iov-card-title">{c.title}</h3>
                  <p className="iov-card-desc">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="iov-closing-section">
        <div className="iov-container">
          <h2 className="iov-closing-heading">
            See it working for <span style={{ color: "var(--green)" }}>your business.</span>
          </h2>
          <p className="iov-desc" style={{ margin: "0 auto 28px" }}>
            Book a short call and we&rsquo;ll walk you through a live demo tailored to your workflows.
          </p>
          <Link href="/contact" className="iov-btn-primary">
            Book a Demo <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <style>{`
        .iov-hero-pad { padding: 150px 36px 70px; }
        .iov-container { max-width: 720px; margin: 0 auto; text-align: center; }
        .iov-container-wide { max-width: 1200px; margin: 0 auto; }

        .iov-breadcrumb { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 12px; color: var(--text-muted); margin-bottom: 24px; }
        .iov-breadcrumb a { color: var(--text-muted); text-decoration: none; }
        .iov-breadcrumb .is-current { color: var(--green); }

        .iov-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; justify-content: center; width: 100%;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .iov-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }

        .iov-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(30px, 4vw, 48px);
          line-height: 1.15; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 18px;
        }
        .iov-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; max-width: 560px; margin: 0 auto 32px; }

        .iov-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14px; font-weight: 700; text-decoration: none;
          transition: transform 0.2s ease;
        }
        .iov-btn-primary:hover { transform: translateY(-2px); }

        .iov-section-pad { padding: 70px 36px; }
        .iov-cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .iov-card { height: 100%; }
        .iov-card-icon {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .iov-card-title { font-size: 16.5px; font-weight: 700; color: var(--text-ivory); margin: 0; }
        .iov-card-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin: 0; }

        .iov-closing-section { padding: 70px 36px 100px; text-align: center; background: var(--bg2); }
        .iov-closing-heading {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(24px, 3vw, 34px);
          color: var(--text-ivory); margin: 0 0 14px;
        }

        @media (max-width: 960px) {
          .iov-cards-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .iov-hero-pad { padding: 110px 20px 40px; }
          .iov-section-pad { padding: 50px 20px; }
          .iov-cards-grid { grid-template-columns: 1fr; }
          .iov-closing-section { padding: 50px 20px 70px; }
        }
      `}</style>
    </>
  );
}
