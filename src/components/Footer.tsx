import Link from "next/link";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", position: "relative" }}>
      {/* Main Sitemap Grid */}
      <div className="footer-main-container" style={{ maxWidth: "1360px", margin: "0 auto", padding: "48px 40px 40px" }}>
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
          <div className="footer-brand-col">
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
                className="brand-logo"
                style={{
                  height: "40px",
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.7, maxWidth: "280px", marginBottom: "20px" }}>
              The horizontal AI voice and chat assistant platform turning fragmented customer enquiries into structured business outcomes.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--overlay-1)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "8px" }}>
              <ShieldCheck size={14} style={{ color: "var(--green)" }} />
              <span style={{ fontSize: "11.5px", color: "var(--text-body)" }}>Responsible AI & Human In Loop</span>
            </div>
          </div>

          {/* Product & Channels */}
          <div>
            <h4 style={{ fontFamily: "'SF Mono', 'Menlo', monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Platform
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0, margin: 0 }}>
              <li><Link href="/product" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Platform Overview</Link></li>
              <li><Link href="/product/voice-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Voice AI Engine</Link></li>
              <li><Link href="/product/whatsapp-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>WhatsApp AI</Link></li>
              <li><Link href="/product/web-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Web Concierge</Link></li>
              <li><Link href="/how-it-works" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>How It Works</Link></li>
            </ul>
          </div>

          {/* Priority Industries */}
          <div>
            <h4 style={{ fontFamily: "'SF Mono', 'Menlo', monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Industries
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0, margin: 0 }}>
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
            <h4 style={{ fontFamily: "'SF Mono', 'Menlo', monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Solutions
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0, margin: 0 }}>
              <li><Link href="/enterprise" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Enterprise Groups</Link></li>
              <li><Link href="/use-cases" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Universal Use Cases</Link></li>
              <li><Link href="/pricing" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Transparent Pricing</Link></li>
              <li><Link href="/responsible-ai" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Responsible AI Policy</Link></li>
            </ul>
          </div>

          {/* Registered Office & Legal */}
          <div className="footer-company-col">
            <h4 style={{ fontFamily: "'SF Mono', 'Menlo', monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Company & Legal
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0, margin: "0 0 16px 0" }}>
              <li><Link href="/privacy-policy" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Terms of Use</Link></li>
              <li><Link href="/pricing" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Pricing & Plans</Link></li>
              <li><Link href="/contact" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>Contact Desk</Link></li>
            </ul>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "var(--text-muted)", fontSize: "12.5px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Mail size={14} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
                <span><strong style={{ color: "var(--text-body)" }}>General:</strong> connect@namuste.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Mail size={14} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
                <span><strong style={{ color: "var(--text-body)" }}>Payments:</strong> payments@namuste.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <MapPin size={14} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
                <span>245 B/1, Raipur Road, Kolkata 700047, West Bengal, India</span>
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "10px",
                  marginTop: "6px",
                  fontSize: "11.5px",
                  lineHeight: 1.6,
                  color: "var(--text-dim)",
                }}
              >
                <div><span style={{ color: "var(--text-muted)", fontWeight: 600 }}>GST Number:</span> 19AALCN3032B1ZR</div>
                <div><span style={{ color: "var(--text-muted)", fontWeight: 600 }}>CIN:</span> U62013WB2026PTC286896</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar — the call-log signature, echoing the hero/menu timestamp motif */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontFamily: "'SF Mono', 'Menlo', monospace",
            fontSize: "11.5px",
            color: "var(--text-dim)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-dim)" }} />
            <span>CALL ENDED · © {new Date().getFullYear()} NAMUSTE TECHNOLOGIES PVT. LTD.</span>
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/privacy-policy" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms-of-use" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Terms of Use</Link>
            <Link href="/responsible-ai" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Responsible AI</Link>
            <Link href="/contact" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px 24px !important;
          }
          .footer-brand-col {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 768px) {
          .footer-main-container {
            padding: 44px 18px 28px !important;
          }
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 36px 18px !important;
            margin-bottom: 36px !important;
          }
          .footer-brand-col {
            grid-column: 1 / -1 !important;
            margin-bottom: 6px !important;
          }
          .footer-company-col {
            grid-column: 1 / -1 !important;
            margin-top: 6px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
