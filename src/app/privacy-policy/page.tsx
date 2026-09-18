import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, CreditCard, RefreshCw, Mail, MapPin, CheckCircle2, FileText, Server, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Namuste Technologies",
  description:
    "Privacy Policy for Namuste Technologies Pvt. Ltd. Detailed information on data protection, payment processing, voice & chat conversation handling, and DPDP compliance.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 18, 2026";

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text-body)" }}>
        {/* HERO SECTION */}
        <section
          className="bg-radial-hero"
          style={{
            paddingTop: "140px",
            paddingBottom: "60px",
            borderBottom: "1px solid var(--border)",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 28px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
              <div className="pill" style={{ display: "inline-flex" }}>
                <span className="pill-dot" /> Legal & Compliance
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Last Updated: {lastUpdated}
              </div>
            </div>

            <h1
              className="serif"
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "var(--text-ivory)",
                lineHeight: 1.18,
                marginBottom: "18px",
              }}
            >
              Privacy <span className="serif-italic">Policy</span>
            </h1>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                lineHeight: 1.7,
                maxWidth: "760px",
              }}
            >
              This Privacy Policy explains how Namuste Technologies Pvt. Ltd. collects, uses, safeguards, and processes your personal data and business communication records across our AI Voice, WhatsApp, and Web platform, including secure payment gateway transactions.
            </p>

            {/* Quick Highlights Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
                marginTop: "36px",
              }}
            >
              <div
                className="glass-card"
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  background: "rgba(20, 20, 20, 0.6)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CreditCard size={18} style={{ color: "var(--green)" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)" }}>Payment Gateway Security</span>
                </div>
                <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  PCI-DSS certified payment processors. We never store raw debit/credit card numbers or CVVs on our servers.
                </p>
              </div>

              <div
                className="glass-card"
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  background: "rgba(20, 20, 20, 0.6)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Lock size={18} style={{ color: "var(--green)" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)" }}>Multi-Tenant Air-Gapping</span>
                </div>
                <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  Strict logical partitioning between accounts. Your proprietary knowledge and customer data are never shared or leaked.
                </p>
              </div>

              <div
                className="glass-card"
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  background: "rgba(20, 20, 20, 0.6)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <ShieldCheck size={18} style={{ color: "var(--green)" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)" }}>DPDP & Consent Aligned</span>
                </div>
                <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  Built in compliance with the Digital Personal Data Protection Act, 2023, and global data privacy standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* POLICY CONTENT */}
        <section style={{ padding: "64px 28px 100px" }}>
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>
            
            {/* 1. Legal Entity & Scope */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                1. Identification of Data Fiduciary & Scope
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                This Privacy Policy is issued by <strong>Namuste Technologies Pvt. Ltd.</strong> (&ldquo;Namuste&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a company incorporated under the laws of India, having its registered office at:
              </p>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "18px 24px",
                  marginBottom: "20px",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.7 }}>
                  <strong>Namuste Technologies Pvt. Ltd.</strong><br />
                  CIN: <strong>U62013WB2026PTC286896</strong> &nbsp;|&nbsp; GST Number: <strong>19AALCN3032B1ZR</strong><br />
                  Registered Office: 245 B/1, Raipur Road, Kolkata 700047, West Bengal, India<br />
                  General Enquiries: <strong>connect@namuste.com</strong> &nbsp;|&nbsp; Billing & Payments: <strong>payments@namuste.com</strong>
                </p>
              </div>
              <p style={{ lineHeight: 1.8 }}>
                This policy applies to all visitors, registered subscribers, enterprise clients, and end-users who access our website (<Link href="https://namuste.com" style={{ color: "var(--green)", textDecoration: "underline" }}>https://namuste.com</Link>), subscribe to our software services, utilize our AI Voice, WhatsApp, or Web Assistants, or interact with our billing and checkout systems.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                2. Information We Collect
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                We collect information directly provided by you, automatically gathered through your device, and generated in the course of conversational assistant operations:
              </p>
              <ul style={{ paddingLeft: "24px", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Account & Contact Information:</strong> Name, business name, business email address, corporate telephone number, billing address, and account login credentials.
                </li>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Billing & Payment Information:</strong> When you purchase subscriptions, setup packages, or add-on conversational tokens, our payment gateway partners collect billing names, billing addresses, tax IDs (e.g., GSTIN), and payment card/account tokens. <em>We do not store your full credit/debit card numbers, CVVs, or online banking passwords on our servers.</em>
                </li>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Conversational Data & Transcripts:</strong> Audio recordings (where call recording is activated by the client), synthesized speech logs, WhatsApp chat histories, SMS alerts, and web concierge chat sessions processed on behalf of our enterprise clients.
                </li>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Technical & Telemetry Data:</strong> IP addresses, browser types, operating systems, referring URLs, access timestamps, latency logs, and interaction heatmaps via Google Tag Manager and security cookies.
                </li>
              </ul>
            </div>

            {/* 3. Payment Gateway & Financial Data */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                3. Payment Processing & Payment Gateway Disclosures
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                We utilize authorized, RBI-registered and PCI-DSS Level 1 compliant third-party payment gateways (such as Stripe, Razorpay, or bank-authorized payment aggregators) to securely process online transactions, recurring subscription charges, and usage invoices.
              </p>
              <div
                style={{
                  background: "rgba(118, 192, 67, 0.05)",
                  border: "1px solid rgba(118, 192, 67, 0.2)",
                  borderRadius: "14px",
                  padding: "22px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", color: "var(--green)" }}>
                  <CreditCard size={18} />
                  <strong style={{ fontSize: "14.5px" }}>How Payment Data Is Handled:</strong>
                </div>
                <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13.5px", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li>All payment card transactions are encrypted using Transport Layer Security (TLS 1.3) directly transmitted to the payment gateway.</li>
                  <li>Our systems only receive anonymized transaction identifiers, payment authorization tokens, payment status (success/failure), card brand, and the last 4 digits of the payment method for accounting and invoice reconciliation.</li>
                  <li>Automatic recurring billing for monthly or annual SaaS subscriptions is executed strictly in accordance with regulatory mandates, customer mandate approvals, and multi-factor authentication requirements.</li>
                </ul>
              </div>
            </div>

            {/* 4. Purpose and Legal Basis */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                4. Purpose of Processing & Legal Grounds
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                We process your personal information and corporate data under the following legal bases:
              </p>
              <ul style={{ paddingLeft: "24px", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Performance of Contract:</strong> Provisioning and maintaining your AI voice and chat assistants, executing automated appointment scheduling, routing customer enquiries, and billing your account.
                </li>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Legitimate Interests:</strong> Preventing fraud, safeguarding infrastructure integrity, diagnosing runtime latency, and monitoring system availability.
                </li>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Explicit Consent:</strong> Sending marketing newsletters or running opt-in telephony pilot evaluations.
                </li>
                <li>
                  <strong style={{ color: "var(--text-ivory)" }}>Statutory Compliance:</strong> Maintaining tax invoices under GST laws, assisting verified regulatory inquiries, and preserving financial audit records.
                </li>
              </ul>
            </div>

            {/* 5. Enterprise Multi-Tenancy & PII Protection */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                5. Enterprise Multi-Tenancy & PII Masking
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                Our architecture enforces air-gapped logical separation between tenants. We adhere to the following privacy commitments:
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "20px",
                }}
                className="tenant-grid"
              >
                <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>
                    No Cross-Tenant Training
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    Customer proprietary documents, internal knowledge graphs, and caller transcripts are never utilized to train generic foundation models for third parties.
                  </p>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>
                    Automated PII Redaction
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    Acoustic and text redact filters automatically mask sensitive data such as government identity numbers, payment card numbers, and health markers from diagnostic logs.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Third-Party Subprocessors */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                6. Subprocessors & Third-Party Service Providers
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                We share data solely with verified subprocessors under strict confidentiality and data-processing agreements:
              </p>
              <ul style={{ paddingLeft: "24px", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li><strong style={{ color: "var(--text-ivory)" }}>Payment Processors:</strong> RBI-compliant payment gateways (Stripe, Razorpay) for transaction settlement.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Cloud Infrastructure:</strong> Cloud hosting providers (such as AWS, Microsoft Azure, Google Cloud) with Indian data residency capabilities.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Telecommunication & SIP Gateways:</strong> Licensed telecom providers (e.g. Twilio, Exotel, Tata Tele Business Services) to originate and terminate voice calls and SMS.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Analytics & Tag Management:</strong> Google Tag Manager for aggregate visitor analytics and web performance monitoring.</li>
              </ul>
            </div>

            {/* 7. Data Retention & Deletion */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                7. Data Retention & Customer Deletion Rights
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                We retain conversational records and customer data only as long as necessary to fulfill the service agreements or comply with statutory requirements:
              </p>
              <ul style={{ paddingLeft: "24px", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>Call audio and transcripts are stored according to client-configured retention windows (defaulting to 90 days, or customized by enterprise agreements).</li>
                <li>Financial and tax transaction records are retained for a minimum of 7 years in accordance with Indian taxation and corporate statutory requirements.</li>
                <li>Clients may submit a written request to erase, export, or anonymize their business data at any time by emailing <strong>connect@namuste.com</strong>.</li>
              </ul>
            </div>

            {/* 8. Cookies & Tracking Technologies */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                8. Cookies & Google Tag Manager
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                Our website utilizes necessary cookies to authenticate sessions, maintain security, and optimize page rendering speed. We also use Google Tag Manager (GTM-M6D769MW) to measure aggregate website traffic and visitor interactions. You can adjust your browser settings to reject non-essential cookies at any time without impacting your core browsing experience.
              </p>
            </div>

            {/* 9. Grievance Officer & Statutory Redressal */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                9. Grievance Redressal & Contact Officer
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                In accordance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, the details of the designated Grievance Officer are set forth below:
              </p>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--text-ivory)" }}>
                  <div><strong>Designation:</strong> Data Grievance & Compliance Officer</div>
                  <div><strong>Entity:</strong> Namuste Technologies Pvt. Ltd. (CIN: U62013WB2026PTC286896 | GST: 19AALCN3032B1ZR)</div>
                  <div><strong>Address:</strong> 245 B/1, Raipur Road, Kolkata 700047, West Bengal, India</div>
                  <div><strong>Grievance & Privacy Email:</strong> <a href="mailto:connect@namuste.com" style={{ color: "var(--green)" }}>connect@namuste.com</a></div>
                  <div><strong>Billing & Payments Email:</strong> <a href="mailto:payments@namuste.com" style={{ color: "var(--green)" }}>payments@namuste.com</a></div>
                  <div><strong>Response Time:</strong> Within 15 business days of receiving written notice.</div>
                </div>
              </div>
            </div>

            {/* Related Links Bar */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                Need to review our operational guidelines?
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <Link href="/terms-of-use" className="btn-secondary" style={{ fontSize: "13px", padding: "8px 18px" }}>
                  Terms of Use <FileText size={14} style={{ marginLeft: "6px" }} />
                </Link>
                <Link href="/contact" className="btn-primary" style={{ fontSize: "13px", padding: "8px 18px" }}>
                  Contact Us <Mail size={14} style={{ marginLeft: "6px" }} />
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .tenant-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
