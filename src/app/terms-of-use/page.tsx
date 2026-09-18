import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ShieldAlert, CreditCard, RefreshCw, AlertCircle, CheckCircle2, Scale, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use — Namuste Technologies",
  description:
    "Terms of Use and Service Agreement for Namuste Technologies Pvt. Ltd. Details on SaaS subscriptions, payment gateway terms, billing, refund & cancellation policies.",
};

export default function TermsOfUsePage() {
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
                <span className="pill-dot" /> Service Agreement
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
              Terms of <span className="serif-italic">Use</span>
            </h1>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                lineHeight: 1.7,
                maxWidth: "760px",
              }}
            >
              Please read these Terms of Use carefully before subscribing to or utilizing our AI Voice and Chat Assistant platform, onboarding services, and payment gateway billing facilities.
            </p>

            {/* Quick Summary Cards */}
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
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)" }}>Transparent Billing</span>
                </div>
                <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  Clear monthly or annual subscriptions and usage tokens with GST invoices and certified payment gateways.
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
                  <RefreshCw size={18} style={{ color: "var(--green)" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)" }}>Cancellation & Refunds</span>
                </div>
                <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  Hassle-free cancellation anytime. 7-day initial money-back evaluation guarantee on standard monthly SaaS plans.
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
                  <Scale size={18} style={{ color: "var(--green)" }} />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)" }}>Data Ownership</span>
                </div>
                <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  You maintain complete, unconditional ownership of all customer conversations, transcripts, and enterprise knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN TERMS CONTENT */}
        <section style={{ padding: "64px 28px 100px" }}>
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>

            {/* 1. Legal Agreement & Company Entity */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                1. Acceptance of Terms & Contracting Entity
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                These Terms of Use (&ldquo;Terms&rdquo;, &ldquo;Agreement&rdquo;) constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;Client&rdquo;, &ldquo;you&rdquo;) and <strong>Namuste Technologies Pvt. Ltd.</strong> (&ldquo;Namuste&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), having its registered office at:
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
                By signing up for an account, accessing our dashboard, integrating our APIs, or completing any payment through our website or payment gateway checkout links, you confirm that you have read, understood, and agreed to be bound by these Terms and our <Link href="/privacy-policy" style={{ color: "var(--green)", textDecoration: "underline" }}>Privacy Policy</Link>.
              </p>
            </div>

            {/* 2. Platform Services & Deliverables */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                2. Description of Services & Delivery
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                Namuste provides an enterprise-grade horizontal Conversational AI platform, including:
              </p>
              <ul style={{ paddingLeft: "24px", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                <li><strong>Inbound & Outbound AI Voice Receptionists:</strong> Automated voice assistants connected via SIP trunking, PSTN, or cloud telephony.</li>
                <li><strong>WhatsApp Business AI Assistants:</strong> Automated messaging bots configured via official WhatsApp Business API channels.</li>
                <li><strong>Web Concierge:</strong> Embedded conversational web widgets for website intake, appointment booking, and customer triage.</li>
                <li><strong>Enterprise Integration & Action Engines:</strong> Integrations with CRM, EMR (Practo, Google Calendar), ERP, and structured webhook systems.</li>
              </ul>
              <p style={{ lineHeight: 1.8 }}>
                <strong>Service Fulfillment:</strong> Software subscriptions and digital platform access are provisioned automatically upon successful payment authentication or within one (1) business day for custom-configured telephony onboarding.
              </p>
            </div>

            {/* 3. Account Registration & Responsibilities */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                3. Account Credentials & Security
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                You must provide accurate, complete, and verifiable corporate information during registration. You are solely responsible for maintaining the confidentiality of your API keys, credentials, and user permissions. Any actions taken through your account or authentication tokens shall be deemed authorized by you.
              </p>
            </div>

            {/* 4. Payment Gateway, Pricing & Billing */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                4. Fees, Billing & Payment Gateway Terms
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                Our pricing structure combines recurring platform subscriptions, onboarding/setup fees, and usage-based conversational credits (minutes or message tokens).
              </p>

              <div
                style={{
                  background: "rgba(118, 192, 67, 0.04)",
                  border: "1px solid rgba(118, 192, 67, 0.2)",
                  borderRadius: "14px",
                  padding: "24px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "var(--green)" }}>
                  <CreditCard size={18} />
                  <strong style={{ fontSize: "15px" }}>Payment Gateway Operations:</strong>
                </div>
                <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13.5px", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <li>
                    <strong>Authorized Gateways:</strong> Payments are processed via PCI-DSS Level 1 compliant payment gateways (such as Stripe, Razorpay, or authorized banking partners). Accepted payment methods include major Credit/Debit Cards, UPI, Net Banking, and international wire/card transfers.
                  </li>
                  <li>
                    <strong>Cardholder Security:</strong> All cardholder data is securely transmitted directly to the payment gateway using high-grade TLS encryption. Namuste does not store, process, or view full card numbers, CVVs, or bank authentication passwords.
                  </li>
                  <li>
                    <strong>Recurring Billing:</strong> For recurring subscription plans, you authorize automatic recurring charges to your selected payment method at the beginning of each billing interval (monthly or annually) until cancelled.
                  </li>
                  <li>
                    <strong>Taxes:</strong> Unless expressly stated otherwise, all fees are exclusive of applicable statutory taxes, including Indian Goods & Services Tax (GST at 18%) or international cross-border digital taxes. Tax amounts are calculated and transparently displayed during checkout.
                  </li>
                  <li>
                    <strong>Invoices:</strong> GST-compliant tax invoices are automatically generated and emailed to your registered billing email address upon every successful transaction.
                  </li>
                </ul>
              </div>
            </div>

            {/* 5. Cancellation & Refund Policy (Crucial for Payment Gateway Approval) */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                5. Cancellation & Refund Policy
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                We believe in transparent, predictable business relationships. Our cancellation and refund policy is outlined below:
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "18px 20px",
                  }}
                >
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>Subscription Cancellation:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    You can cancel your subscription at any time through your customer portal or by emailing our billing desk at <strong>payments@namuste.com</strong> (or <strong>connect@namuste.com</strong>) at least 48 hours prior to the next renewal billing date. Upon cancellation, your service remains active until the end of the current paid billing cycle.
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "18px 20px",
                  }}
                >
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>7-Day Evaluation Refund Guarantee:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    For first-time subscribers to our standard monthly SaaS plans, if you are not satisfied with the platform for any reason, you may request a 100% refund of your base monthly platform fee within seven (7) days of your initial purchase date.
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "18px 20px",
                  }}
                >
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>Exclusions from Refunds:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Custom engineering/bespoke onboarding implementation fees, consumed telephony usage credits (direct carrier charges for phone minutes and WhatsApp conversation charges already delivered by carriers), and fees for billing cycles requested after the 7-day evaluation window are non-refundable.
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "18px 20px",
                  }}
                >
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>Refund Processing Timeline:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Approved refunds are processed via the original payment gateway to the original payment method (card, UPI, or bank account) within 5 to 7 business days, in accordance with standard banking and payment gateway turnaround windows.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Acceptable Use & Domain Boundaries */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                6. Acceptable Use & Operational Boundaries
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                You agree to use Namuste&rsquo;s platform in strict compliance with all applicable laws and regulations. You specifically agree NOT to:
              </p>
              <ul style={{ paddingLeft: "24px", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>Violate telecommunication and spam regulations, including TRAI UCC/DND regulations in India or the TCPA in the United States.</li>
                <li>Conduct deceptive, fraudulent, or unsolicited robocall campaigns without verifiable opt-in consent from recipients.</li>
                <li>Configure assistants to issue unauthorized medical diagnoses, definitive clinical prescriptions, or binding legal counsel. (All clinical and statutory queries must be transferred to verified human professionals).</li>
                <li>Attempt to decompile, reverse-engineer, benchmark, or extract the underlying model architectures of the Namuste engine.</li>
              </ul>
            </div>

            {/* 7. Intellectual Property & Customer Ownership */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                7. Intellectual Property & Data Ownership
              </h2>
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
                    Your Data Stays Yours
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    You retain exclusive ownership of all uploaded corporate handbooks, customer lists, CRM inputs, caller voice recordings, and conversation transcripts.
                  </p>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>
                    Namuste Platform IP
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    Namuste retains all rights, title, and interest in and to the platform, proprietary dialogue state trees, software algorithms, design assets, and logos.
                  </p>
                </div>
              </div>
            </div>

            {/* 8. Service Availability & SLA */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                8. Service Availability & Uptime
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                We strive to maintain 99.9% uptime for core conversation routing and API endpoints. Scheduled maintenance windows are communicated in advance. We are not liable for outages caused by upstream public telecommunication carriers, upstream LLM provider downtime, internet exchange disruptions, or force majeure events.
              </p>
            </div>

            {/* 9. Limitation of Liability */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                9. Limitation of Liability
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                To the maximum extent permitted by applicable law, in no event shall Namuste Technologies Pvt. Ltd., its directors, officers, or employees be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, goodwill, or operational interruption. Our total cumulative liability arising out of or related to this agreement shall not exceed the total fees paid by you to Namuste in the twelve (12) months immediately preceding the event giving rise to the claim.
              </p>
            </div>

            {/* 10. Governing Law & Jurisdiction */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                10. Governing Law & Jurisdiction
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                These Terms shall be governed by, construed, and enforced in accordance with the laws of the Republic of India, without regard to its conflict of law principles. Any dispute, claim, or controversy arising out of or in connection with these Terms or the breach thereof shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Kolkata, West Bengal, India</strong>.
              </p>
            </div>

            {/* 11. Contact & Grievance Notices */}
            <div className="policy-block" style={{ marginBottom: "48px" }}>
              <h2 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", marginBottom: "16px" }}>
                11. Contact & Legal Notices
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: "16px" }}>
                For inquiries regarding these Terms, billing issues, or to submit formal notices, please contact us at:
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
                  <div><strong>Legal Entity:</strong> Namuste Technologies Pvt. Ltd.</div>
                  <div><strong>Corporate Identification (CIN):</strong> U62013WB2026PTC286896</div>
                  <div><strong>GST Number:</strong> 19AALCN3032B1ZR</div>
                  <div><strong>Operating Office:</strong> 245 B/1, Raipur Road, Kolkata 700047, West Bengal, India</div>
                  <div><strong>General Support:</strong> <a href="mailto:connect@namuste.com" style={{ color: "var(--green)" }}>connect@namuste.com</a></div>
                  <div><strong>Billing & Payments Desk:</strong> <a href="mailto:payments@namuste.com" style={{ color: "var(--green)" }}>payments@namuste.com</a></div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation Links */}
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
                Looking for our data protection details?
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <Link href="/privacy-policy" className="btn-secondary" style={{ fontSize: "13px", padding: "8px 18px" }}>
                  Privacy Policy <ShieldAlert size={14} style={{ marginLeft: "6px" }} />
                </Link>
                <Link href="/pricing" className="btn-primary" style={{ fontSize: "13px", padding: "8px 18px" }}>
                  View Pricing Plans <CreditCard size={14} style={{ marginLeft: "6px" }} />
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
