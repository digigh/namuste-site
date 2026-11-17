import type { Metadata } from "next";
import Link from "next/link";
import { Sprout, ShoppingBasket, Pill, ArrowLeft, ArrowUpRight } from "lucide-react";
import { ExperienceShell, TiltCard } from "@/components/experience/ExperienceChrome";

export const metadata: Metadata = {
  title: "Namusté — Enterprises Experience",
  robots: { index: false, follow: false },
};

const CARDS = [
  { slug: "agribusiness", title: "Agribusiness", desc: "Grower interest capture, seed trial enquiries, and field-team routing.", icon: Sprout },
  { slug: "fmcg", title: "FMCG", desc: "Retailer enquiries, promotions, and distributor coordination.", icon: ShoppingBasket },
  { slug: "pharmaceuticals", title: "Pharmaceuticals", desc: "Pharmacy stock enquiries and regional trade-desk routing.", icon: Pill },
];

export default function EnterprisesPage() {
  return (
    <ExperienceShell>
      <section className="exp-picker-page">
        <Link href="/experience" className="exp-picker-back">
          <ArrowLeft size={14} /> All Experiences
        </Link>
        <div className="exp-picker-head">
          <h1>Complex operations. Simplified conversations.</h1>
          <p>
            Bring intelligence to every customer interaction, from the first enquiry to the
            final business action.
          </p>
        </div>
        <div className="exp-picker-grid">
          {CARDS.map((c) => (
            <Link key={c.slug} href={`/experience/enterprises/${c.slug}`} style={{ textDecoration: "none" }}>
              <TiltCard>
                <div className="exp-card-icon-row">
                  <c.icon size={22} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="exp-card-cta">
                  Experience it <ArrowUpRight size={15} />
                </span>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>
    </ExperienceShell>
  );
}
