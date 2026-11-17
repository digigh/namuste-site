import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, Smile, Truck, Scissors, ArrowLeft, ArrowUpRight } from "lucide-react";
import { ExperienceShell, TiltCard } from "@/components/experience/ExperienceChrome";

export const metadata: Metadata = {
  title: "Namusté — Professionals Experience",
  robots: { index: false, follow: false },
};

const CARDS = [
  { slug: "doctor", title: "Doctor", desc: "Patient enquiries, appointment booking, and confirmations.", icon: Stethoscope },
  { slug: "dentist", title: "Dentist", desc: "Treatment enquiries and dental appointment scheduling.", icon: Smile },
  { slug: "distributor", title: "Distributor", desc: "Stock checks, price enquiries, and order capture.", icon: Truck },
  { slug: "salon", title: "Salon Owner", desc: "Service enquiries, slot availability, and bookings.", icon: Scissors },
];

export default function ProfessionalsPage() {
  return (
    <ExperienceShell>
      <section className="exp-picker-page">
        <Link href="/experience" className="exp-picker-back">
          <ArrowLeft size={14} /> All Experiences
        </Link>
        <div className="exp-picker-head">
          <h1>Your profession. Your AI assistant.</h1>
          <p>
            Discover how Namusté transforms everyday customer interactions into seamless
            business experiences.
          </p>
        </div>
        <div className="exp-picker-grid">
          {CARDS.map((c) => (
            <Link key={c.slug} href={`/experience/professionals/${c.slug}`} style={{ textDecoration: "none" }}>
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
