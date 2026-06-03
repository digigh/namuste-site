import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconMapPin, IconMail, IconTarget, IconLayers, IconUsers } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us — Namuste Technologies",
  description: "Learn about Namuste Technologies, building the Counter OS digital infrastructure connecting brands, distributors, and local merchants in rural India.",
};

const pillars = [
  {
    title: "Starting at the Counter",
    icon: <IconTarget size={22} />,
    desc: "The rural retail counter is where B2C transactions occur for 650 million consumers. By starting directly at the point of sale, we secure the first and most critical moment of supply chain trust."
  },
  {
    title: "Full-Stack Architecture",
    icon: <IconLayers size={22} />,
    desc: "From local hardware counters running Counter OS to corporate wholesale networks and cloud BI systems, we own the full software-hardware stack. Every layer is connected with native offline-sync capabilities."
  },
  {
    title: "Retailer-First Philosophy",
    icon: <IconUsers size={22} />,
    desc: "We focus on solving day-to-day frictions for Kirana shop owners, pharmacists, and local seed dealers. If the product makes life simpler at the counter, network growth follows naturally."
  }
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Namuste Technologies Pvt. Ltd.",
    "image": "https://namuste.in/images/logo-green.png",
    "@id": "https://namuste.in/#corporate-info",
    "url": "https://namuste.in",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "245 B/1, Raipur Road",
      "addressLocality": "Kolkata",
      "postalCode": "700047",
      "addressRegion": "West Bengal",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.4842,
      "longitude": 88.3719
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:30",
      "closes": "18:30"
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", paddingTop: "110px", overflowX: "hidden" }}>
        
        {/* Inject JSON-LD Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Corporate Header */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px", position: "relative" }}>
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
            <span className="pill" style={{ marginBottom: "20px" }}>Our Mission</span>
            <h1 className="hf" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: "24px", color: "var(--ink)" }}>
              Digitizing India&apos;s <span className="gt">Rural Retail Counters.</span>
            </h1>
            <p style={{ color: "var(--ink2)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto" }}>
              We build the digital infrastructure layer connecting brands, wholesalers, and local merchants at the counter, for the first time.
            </p>
          </div>
        </section>

        {/* Company History and Registered Office */}
        <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="solutions-g">
              <div>
                <h2 className="hf" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--ink)", marginBottom: "20px" }}>
                  Building the <span className="gt-green">Operating System</span> for Rural Trade
                </h2>
                <p style={{ color: "var(--ink2)", fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" }}>
                  Namuste Technologies is resolving the long-standing opacity in general trade distribution. Over 12 million Kirana shops, rural chemists, and agricultural seed dealers conduct trillions in cash transactions every year — with zero digital record.
                </p>
                <p style={{ color: "var(--ink2)", fontSize: "14px", lineHeight: 1.8, marginBottom: "32px" }}>
                  Our platform connects B2B wholesaling, OTP verification checks, and digital rewards, shifting store owners from guess-work bookkeeping to data-driven commercial intelligence.
                </p>

                {/* Office Info card */}
                <div style={{ display: "flex", gap: "16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(82,204,79,0.08)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)", flexShrink: 0 }}>
                    <IconMapPin size={18} />
                  </div>
                  <div>
                    <h4 className="hf" style={{ fontWeight: 700, fontSize: "14px", color: "var(--ink)", marginBottom: "4px" }}>Registered Corporate Office</h4>
                    <p style={{ color: "var(--ink2)", fontSize: "13px", lineHeight: 1.6 }}>
                      245 B/1, Raipur Road, Kolkata 700047<br />
                      West Bengal, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillars list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {pillars.map((p) => (
                  <div key={p.title} className="card" style={{ padding: "24px" }}>
                    <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "12px", color: "var(--accent-green)" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {p.icon}
                      </div>
                      <h3 className="hf" style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>{p.title}</h3>
                    </div>
                    <p style={{ color: "var(--ink2)", fontSize: "13px", lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founding Thesis Quote section */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", padding: "60px 40px", position: "relative" }}>
            <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.2, pointerEvents: "none" }} />
            <h3 className="hf" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "var(--ink)", fontStyle: "italic", lineHeight: 1.45, marginBottom: "28px" }}>
              &ldquo;The first company to digitize the rural retail counter owns the most valuable commercial data asset in India.&rdquo;
            </h3>
            <div style={{ display: "inline-block" }}>
              <h4 className="hf" style={{ fontWeight: 700, fontSize: "14px", color: "var(--accent-green)" }}>Namuste Technologies</h4>
              <p style={{ color: "var(--ink2)", fontSize: "12px", marginTop: "4px" }}>Our Founding Thesis</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){.solutions-g{grid-template-columns:1fr!important;gap:40px!important}}
      `}</style>
    </>
  );
}
