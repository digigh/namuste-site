import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, CreditCard, Mail, FileText } from "lucide-react";

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
        {/* HERO */}
        <section className="lg-hero-pad" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="lg-container">
            <div className="lg-badge-row">
              <Badge className="lg-badge">
                <span className="lg-badge-dot" /> Legal & Compliance
              </Badge>
              <span className="lg-updated">Last Updated: {lastUpdated}</span>
            </div>

            <h1 className="lg-headline">
              Privacy <span style={{ color: "var(--green)" }}>Policy</span>
            </h1>

            <p className="lg-intro">
              This Privacy Policy explains how Namuste Technologies Pvt. Ltd. collects, uses, safeguards, and processes your personal data and business communication records across our AI Voice, WhatsApp, and Web platform, including secure payment gateway transactions.
            </p>

            {/* Quick Highlights */}
            <div className="lg-highlights">
              <Card className="lg-highlight-card">
                <CardContent className="flex flex-col gap-2">
                  <div className="lg-highlight-head"><CreditCard size={18} /><span>Payment Gateway Security</span></div>
                  <p className="lg-highlight-desc">PCI-DSS certified payment processors. We never store raw debit/credit card numbers or CVVs on our servers.</p>
                </CardContent>
              </Card>
              <Card className="lg-highlight-card">
                <CardContent className="flex flex-col gap-2">
                  <div className="lg-highlight-head"><Lock size={18} /><span>Multi-Tenant Air-Gapping</span></div>
                  <p className="lg-highlight-desc">Strict logical partitioning between accounts. Your proprietary knowledge and customer data are never shared or leaked.</p>
                </CardContent>
              </Card>
              <Card className="lg-highlight-card">
                <CardContent className="flex flex-col gap-2">
                  <div className="lg-highlight-head"><ShieldCheck size={18} /><span>DPDP & Consent Aligned</span></div>
                  <p className="lg-highlight-desc">Built in compliance with the Digital Personal Data Protection Act, 2023, and global data privacy standards.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* POLICY CONTENT */}
        <section className="lg-content-pad">
          <div className="lg-content">

            <div className="lg-block">
              <h2 className="lg-h2">1. Identification of Data Fiduciary & Scope</h2>
              <p className="lg-p">
                This Privacy Policy is issued by <strong>Namuste Technologies Pvt. Ltd.</strong> (&ldquo;Namuste&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a company incorporated under the laws of India, having its registered office at:
              </p>
              <div className="lg-info-box">
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.7 }}>
                  <strong>Namuste Technologies Pvt. Ltd.</strong><br />
                  CIN: <strong>U62013WB2026PTC286896</strong> &nbsp;|&nbsp; GST Number: <strong>19AALCN3032B1ZR</strong><br />
                  Registered Office: 245 B/1, Raipur Road, Kolkata 700047, West Bengal, India<br />
                  General Enquiries: <strong>connect@namuste.com</strong> &nbsp;|&nbsp; Billing & Payments: <strong>payments@namuste.com</strong>
                </p>
              </div>
              <p className="lg-p">
                This policy applies to all visitors, registered subscribers, enterprise clients, and end-users who access our website (<Link href="https://namuste.com" style={{ color: "var(--green)", textDecoration: "underline" }}>https://namuste.com</Link>), subscribe to our software services, utilize our AI Voice, WhatsApp, or Web Assistants, or interact with our billing and checkout systems.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">2. Information We Collect</h2>
              <p className="lg-p">
                We collect information directly provided by you, automatically gathered through your device, and generated in the course of conversational assistant operations:
              </p>
              <ul className="lg-list">
                <li><strong style={{ color: "var(--text-ivory)" }}>Account & Contact Information:</strong> Name, business name, business email address, corporate telephone number, billing address, and account login credentials.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Billing & Payment Information:</strong> When you purchase subscriptions, setup packages, or add-on conversational tokens, our payment gateway partners collect billing names, billing addresses, tax IDs (e.g., GSTIN), and payment card/account tokens. <em>We do not store your full credit/debit card numbers, CVVs, or online banking passwords on our servers.</em></li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Conversational Data & Transcripts:</strong> Audio recordings (where call recording is activated by the client), synthesized speech logs, WhatsApp chat histories, SMS alerts, and web concierge chat sessions processed on behalf of our enterprise clients.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Technical & Telemetry Data:</strong> IP addresses, browser types, operating systems, referring URLs, access timestamps, latency logs, and interaction heatmaps via Google Tag Manager and security cookies.</li>
              </ul>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">3. Payment Processing & Payment Gateway Disclosures</h2>
              <p className="lg-p">
                We utilize authorized, RBI-registered and PCI-DSS Level 1 compliant third-party payment gateways (such as Stripe, Razorpay, or bank-authorized payment aggregators) to securely process online transactions, recurring subscription charges, and usage invoices.
              </p>
              <div className="lg-accent-box">
                <div className="lg-accent-box-head"><CreditCard size={18} /><strong style={{ fontSize: "14.5px" }}>How Payment Data Is Handled:</strong></div>
                <ul className="lg-list" style={{ fontSize: "13.5px" }}>
                  <li>All payment card transactions are encrypted using Transport Layer Security (TLS 1.3) directly transmitted to the payment gateway.</li>
                  <li>Our systems only receive anonymized transaction identifiers, payment authorization tokens, payment status (success/failure), card brand, and the last 4 digits of the payment method for accounting and invoice reconciliation.</li>
                  <li>Automatic recurring billing for monthly or annual SaaS subscriptions is executed strictly in accordance with regulatory mandates, customer mandate approvals, and multi-factor authentication requirements.</li>
                </ul>
              </div>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">4. Purpose of Processing & Legal Grounds</h2>
              <p className="lg-p">We process your personal information and corporate data under the following legal bases:</p>
              <ul className="lg-list">
                <li><strong style={{ color: "var(--text-ivory)" }}>Performance of Contract:</strong> Provisioning and maintaining your AI voice and chat assistants, executing automated appointment scheduling, routing customer enquiries, and billing your account.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Legitimate Interests:</strong> Preventing fraud, safeguarding infrastructure integrity, diagnosing runtime latency, and monitoring system availability.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Explicit Consent:</strong> Sending marketing newsletters or running opt-in telephony pilot evaluations.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Statutory Compliance:</strong> Maintaining tax invoices under GST laws, assisting verified regulatory inquiries, and preserving financial audit records.</li>
              </ul>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">5. Enterprise Multi-Tenancy & PII Masking</h2>
              <p className="lg-p">
                Our architecture enforces air-gapped logical separation between tenants. We adhere to the following privacy commitments:
              </p>
              <div className="lg-tenant-grid">
                <div className="lg-info-box">
                  <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>No Cross-Tenant Training</div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    Customer proprietary documents, internal knowledge graphs, and caller transcripts are never utilized to train generic foundation models for third parties.
                  </p>
                </div>
                <div className="lg-info-box">
                  <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>Automated PII Redaction</div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    Acoustic and text redact filters automatically mask sensitive data such as government identity numbers, payment card numbers, and health markers from diagnostic logs.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">6. Subprocessors & Third-Party Service Providers</h2>
              <p className="lg-p">We share data solely with verified subprocessors under strict confidentiality and data-processing agreements:</p>
              <ul className="lg-list">
                <li><strong style={{ color: "var(--text-ivory)" }}>Payment Processors:</strong> RBI-compliant payment gateways (Stripe, Razorpay) for transaction settlement.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Cloud Infrastructure:</strong> Cloud hosting providers (such as AWS, Microsoft Azure, Google Cloud) with Indian data residency capabilities.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Telecommunication & SIP Gateways:</strong> Licensed telecom providers (e.g. Twilio, Exotel, Tata Tele Business Services) to originate and terminate voice calls and SMS.</li>
                <li><strong style={{ color: "var(--text-ivory)" }}>Analytics & Tag Management:</strong> Google Tag Manager for aggregate visitor analytics and web performance monitoring.</li>
              </ul>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">7. Data Retention & Customer Deletion Rights</h2>
              <p className="lg-p">
                We retain conversational records and customer data only as long as necessary to fulfill the service agreements or comply with statutory requirements:
              </p>
              <ul className="lg-list">
                <li>Call audio and transcripts are stored according to client-configured retention windows (defaulting to 90 days, or customized by enterprise agreements).</li>
                <li>Financial and tax transaction records are retained for a minimum of 7 years in accordance with Indian taxation and corporate statutory requirements.</li>
                <li>Clients may submit a written request to erase, export, or anonymize their business data at any time by emailing <strong>connect@namuste.com</strong>.</li>
              </ul>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">8. Cookies & Google Tag Manager</h2>
              <p className="lg-p">
                Our website utilizes necessary cookies to authenticate sessions, maintain security, and optimize page rendering speed. We also use Google Tag Manager (GTM-M6D769MW) to measure aggregate website traffic and visitor interactions. You can adjust your browser settings to reject non-essential cookies at any time without impacting your core browsing experience.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">9. Grievance Redressal & Contact Officer</h2>
              <p className="lg-p">
                In accordance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, the details of the designated Grievance Officer are set forth below:
              </p>
              <div className="lg-info-box">
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

            {/* RELATED LINKS */}
            <div className="lg-related-bar">
              <div className="lg-related-text">Need to review our operational guidelines?</div>
              <div className="lg-related-actions">
                <Link href="/terms-of-use" className="lg-btn-secondary">
                  Terms of Use <FileText size={14} />
                </Link>
                <Link href="/contact" className="lg-btn-primary">
                  Contact Us <Mail size={14} />
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .lg-hero-pad { padding: 150px 28px 60px; }
        .lg-container { max-width: 1080px; margin: 0 auto; }
        .lg-content-pad { padding: 64px 28px 100px; }
        .lg-content { max-width: 920px; margin: 0 auto; }

        .lg-badge-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
        .lg-badge {
          display: inline-flex !important; align-items: center; gap: 8px;
          background: var(--green-glow) !important; color: var(--green) !important;
          border: 1px solid var(--border-green) !important; height: auto !important; padding: 6px 14px !important;
        }
        .lg-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
        .lg-updated { font-size: 12px; color: var(--text-muted); padding: 6px 14px; border-radius: 100px; background: var(--overlay-1); border: 1px solid var(--border); display: inline-flex; align-items: center; }

        .lg-headline { font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4vw, 52px); color: var(--text-ivory); line-height: 1.18; margin: 0 0 18px; }
        .lg-intro { color: var(--text-muted); font-size: clamp(15px, 1.2vw, 18px); line-height: 1.7; max-width: 760px; margin: 0; }

        .lg-highlights { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 36px; }
        .lg-highlight-head { display: flex; align-items: center; gap: 10px; font-size: 13.5px; font-weight: 600; color: var(--text-ivory); }
        .lg-highlight-head svg { color: var(--green); }
        .lg-highlight-desc { font-size: 12.5px; color: var(--text-muted); margin: 0; line-height: 1.6; }

        .lg-block { margin-bottom: 48px; }
        .lg-h2 { font-family: var(--font-sans); font-weight: 700; font-size: 24px; color: var(--text-ivory); margin: 0 0 16px; letter-spacing: -0.01em; }
        .lg-p { line-height: 1.8; margin: 0 0 16px; color: var(--text-body); }
        .lg-list { padding-left: 24px; line-height: 1.8; display: flex; flex-direction: column; gap: 10px; color: var(--text-body); margin: 0; }

        .lg-info-box { background: var(--overlay-1); border: 1px solid var(--border); border-radius: 12px; padding: 18px 24px; margin-bottom: 20px; }
        .lg-accent-box { background: var(--green-glow); border: 1px solid var(--border-green); border-radius: 14px; padding: 22px; margin-bottom: 20px; }
        .lg-accent-box-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; color: var(--green); }

        .lg-tenant-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }

        .lg-related-bar { border-top: 1px solid var(--border); padding-top: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .lg-related-text { font-size: 14px; color: var(--text-muted); }
        .lg-related-actions { display: flex; gap: 16px; }
        .lg-btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 13px; font-weight: 700; text-decoration: none;
        }
        .lg-btn-secondary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 13px; font-weight: 600; text-decoration: none;
        }
        .lg-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        @media (max-width: 768px) {
          .lg-tenant-grid { grid-template-columns: 1fr; }
          .lg-hero-pad { padding: 110px 20px 40px; }
          .lg-content-pad { padding: 48px 20px 60px; }
        }
      `}</style>
    </>
  );
}
