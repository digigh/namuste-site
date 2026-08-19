import Link from "next/link";
import { ArrowRight, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", position: "relative" }}>
      {/* Editorial Conversion Callout Banner */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "radial-gradient(ellipse at 50% 0%, rgba(118, 192, 67, 0.05) 0%, transparent 70%)",
          padding: "80px 36px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          <div>
            <div className="pill" style={{ marginBottom: "14px" }}>
              <span className="pill-dot" /> Intelligent Outcomes
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(26px, 3.5vw, 42px)",
                color: "var(--text-ivory)",
                lineHeight: 1.2,
                maxWidth: "640px",
              }}
            >
              Every conversation deserves an intelligent response and a <span className="serif-italic">clear next step.</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              Book a Consultation <ArrowRight size={15} />
            </Link>
            <Link href="/industries/doctors-and-clinics" className="btn-secondary">
              Explore Clinic Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sitemap Grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 36px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr",
            gap: "40px",
            marginBottom: "56px",
          }}
          className="footer-grid"
        >
          {/* Official Brand Logo */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-block",
                textDecoration: "none",
                marginBottom: "18px",
              }}
            >
              <img
                src="/logo.png"
                alt="Namuste"
                style={{
                  height: "48px",
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.7, maxWidth: "280px", marginBottom: "20px" }}>
              The horizontal AI voice and chat assistant platform turning fragmented customer enquiries into structured business outcomes.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "8px" }}>
              <ShieldCheck size={14} style={{ color: "var(--green)" }} />
              <span style={{ fontSize: "11.5px", color: "var(--text-body)" }}>Responsible AI & Human In Loop</span>
            </div>
          </div>

          {/* Product & Channels */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-ivory)", marginBottom: "16px" }}>
              Platform
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link href="/product" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Platform Overview</Link></li>
              <li><Link href="/product/voice-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Voice AI Engine</Link></li>
              <li><Link href="/product/whatsapp-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>WhatsApp AI</Link></li>
              <li><Link href="/product/web-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Web Concierge</Link></li>
              <li><Link href="/how-it-works" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>How It Works</Link></li>
            </ul>
          </div>

          {/* Priority Industries */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-ivory)", marginBottom: "16px" }}>
              Industries
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/industries/doctors-and-clinics" style={{ color: "var(--green)", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                  Doctors & Clinics
                </Link>
              </li>
              <li><Link href="/industries/professional-services" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Professional Services</Link></li>
              <li><Link href="/industries/distribution" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Distribution & Field</Link></li>
              <li><Link href="/industries/agriculture" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Agriculture & Rural</Link></li>
              <li><Link href="/industries/education" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Education & Admissions</Link></li>
              <li><Link href="/industries/research" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Research & Surveys</Link></li>
            </ul>
          </div>

          {/* Enterprise & Use Cases */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-ivory)", marginBottom: "16px" }}>
              Solutions
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link href="/enterprise" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Enterprise Groups</Link></li>
              <li><Link href="/use-cases" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Universal Use Cases</Link></li>
              <li><Link href="/pricing" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Transparent Pricing</Link></li>
              <li><Link href="/responsible-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Responsible AI Policy</Link></li>
            </ul>
          </div>

          {/* Registered Office */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-ivory)", marginBottom: "16px" }}>
              Company
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "var(--text-muted)", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Mail size={15} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
                <span>connect@namuste.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <MapPin size={15} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
                <span>245 B/1, Raipur Road, Kolkata 700047, West Bengal, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "12px",
            color: "var(--text-dim)",
          }}
        >
          <div>
            © {new Date().getFullYear()} Namuste Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/responsible-ai" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Privacy & Responsible AI</Link>
            <Link href="/about" style={{ color: "var(--text-dim)", textDecoration: "none" }}>About Founders</Link>
            <Link href="/contact" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Book a Demo</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
