import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, RefreshCw, Scale, ShieldAlert } from "lucide-react";

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
        {/* HERO */}
        <section className="lg-hero-pad" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="lg-container">
            <div className="lg-badge-row">
              <Badge className="lg-badge">
                <span className="lg-badge-dot" /> Service Agreement
              </Badge>
              <span className="lg-updated">Last Updated: {lastUpdated}</span>
            </div>

            <h1 className="lg-headline">
              Terms of <span style={{ color: "var(--green)" }}>Use</span>
            </h1>

            <p className="lg-intro">
              Please read these Terms of Use carefully before subscribing to or utilizing our AI Voice and Chat Assistant platform, onboarding services, and payment gateway billing facilities.
            </p>

            {/* Quick Summary */}
            <div className="lg-highlights">
              <Card className="lg-highlight-card">
                <CardContent className="flex flex-col gap-2">
                  <div className="lg-highlight-head"><CreditCard size={18} /><span>Transparent Billing</span></div>
                  <p className="lg-highlight-desc">Clear monthly or annual subscriptions and usage tokens with GST invoices and certified payment gateways.</p>
                </CardContent>
              </Card>
              <Card className="lg-highlight-card">
                <CardContent className="flex flex-col gap-2">
                  <div className="lg-highlight-head"><RefreshCw size={18} /><span>Cancellation & Refunds</span></div>
                  <p className="lg-highlight-desc">Hassle-free cancellation anytime. 7-day initial money-back evaluation guarantee on standard monthly SaaS plans.</p>
                </CardContent>
              </Card>
              <Card className="lg-highlight-card">
                <CardContent className="flex flex-col gap-2">
                  <div className="lg-highlight-head"><Scale size={18} /><span>Data Ownership</span></div>
                  <p className="lg-highlight-desc">You maintain complete, unconditional ownership of all customer conversations, transcripts, and enterprise knowledge.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* MAIN TERMS CONTENT */}
        <section className="lg-content-pad">
          <div className="lg-content">

            <div className="lg-block">
              <h2 className="lg-h2">1. Acceptance of Terms & Contracting Entity</h2>
              <p className="lg-p">
                These Terms of Use (&ldquo;Terms&rdquo;, &ldquo;Agreement&rdquo;) constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;Client&rdquo;, &ldquo;you&rdquo;) and <strong>Namuste Technologies Pvt. Ltd.</strong> (&ldquo;Namuste&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), having its registered office at:
              </p>
              <div className="lg-info-box">
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.7 }}>
                  <strong>Namuste Technologies Pvt. Ltd.</strong><br />
                  CIN: <strong>U62013WB2026PTC286896</strong> &nbsp;|&nbsp; GST Number: <strong>19AALCN3032B1ZR</strong><br />
                  Registered Office: 245 B/1, Raipur Road, Kolkata 700047, West Bengal, India<br />
                  General Enquiries: <strong>connect@namuste.com</strong> &nbsp;|&nbsp; Billing & Payments: <strong>payments@namuste.com</strong>
                </p>
              </div>
              <p className="lg-p" style={{ marginBottom: 0 }}>
                By signing up for an account, accessing our dashboard, integrating our APIs, or completing any payment through our website or payment gateway checkout links, you confirm that you have read, understood, and agreed to be bound by these Terms and our <Link href="/privacy-policy" style={{ color: "var(--green)", textDecoration: "underline" }}>Privacy Policy</Link>.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">2. Description of Services & Delivery</h2>
              <p className="lg-p">Namuste provides an enterprise-grade horizontal Conversational AI platform, including:</p>
              <ul className="lg-list" style={{ marginBottom: "16px" }}>
                <li><strong>Inbound & Outbound AI Voice Receptionists:</strong> Automated voice assistants connected via SIP trunking, PSTN, or cloud telephony.</li>
                <li><strong>WhatsApp Business AI Assistants:</strong> Automated messaging bots configured via official WhatsApp Business API channels.</li>
                <li><strong>Web Concierge:</strong> Embedded conversational web widgets for website intake, appointment booking, and customer triage.</li>
                <li><strong>Enterprise Integration & Action Engines:</strong> Integrations with CRM, EMR (Practo, Google Calendar), ERP, and structured webhook systems.</li>
              </ul>
              <p className="lg-p" style={{ marginBottom: 0 }}>
                <strong>Service Fulfillment:</strong> Software subscriptions and digital platform access are provisioned automatically upon successful payment authentication or within one (1) business day for custom-configured telephony onboarding.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">3. Account Credentials & Security</h2>
              <p className="lg-p" style={{ marginBottom: 0 }}>
                You must provide accurate, complete, and verifiable corporate information during registration. You are solely responsible for maintaining the confidentiality of your API keys, credentials, and user permissions. Any actions taken through your account or authentication tokens shall be deemed authorized by you.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">4. Fees, Billing & Payment Gateway Terms</h2>
              <p className="lg-p">
                Our pricing structure combines recurring platform subscriptions, onboarding/setup fees, and usage-based conversational credits (minutes or message tokens).
              </p>
              <div className="lg-accent-box">
                <div className="lg-accent-box-head"><CreditCard size={18} /><strong style={{ fontSize: "15px" }}>Payment Gateway Operations:</strong></div>
                <ul className="lg-list" style={{ fontSize: "13.5px" }}>
                  <li><strong>Authorized Gateways:</strong> Payments are processed via PCI-DSS Level 1 compliant payment gateways (such as Stripe, Razorpay, or authorized banking partners). Accepted payment methods include major Credit/Debit Cards, UPI, Net Banking, and international wire/card transfers.</li>
                  <li><strong>Cardholder Security:</strong> All cardholder data is securely transmitted directly to the payment gateway using high-grade TLS encryption. Namuste does not store, process, or view full card numbers, CVVs, or bank authentication passwords.</li>
                  <li><strong>Recurring Billing:</strong> For recurring subscription plans, you authorize automatic recurring charges to your selected payment method at the beginning of each billing interval (monthly or annually) until cancelled.</li>
                  <li><strong>Taxes:</strong> Unless expressly stated otherwise, all fees are exclusive of applicable statutory taxes, including Indian Goods & Services Tax (GST at 18%) or international cross-border digital taxes. Tax amounts are calculated and transparently displayed during checkout.</li>
                  <li><strong>Invoices:</strong> GST-compliant tax invoices are automatically generated and emailed to your registered billing email address upon every successful transaction.</li>
                </ul>
              </div>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">5. Cancellation & Refund Policy</h2>
              <p className="lg-p">
                We believe in transparent, predictable business relationships. Our cancellation and refund policy is outlined below:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                <div className="lg-info-box" style={{ marginBottom: 0 }}>
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>Subscription Cancellation:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    You can cancel your subscription at any time through your customer portal or by emailing our billing desk at <strong>payments@namuste.com</strong> (or <strong>connect@namuste.com</strong>) at least 48 hours prior to the next renewal billing date. Upon cancellation, your service remains active until the end of the current paid billing cycle.
                  </p>
                </div>
                <div className="lg-info-box" style={{ marginBottom: 0 }}>
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>7-Day Evaluation Refund Guarantee:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    For first-time subscribers to our standard monthly SaaS plans, if you are not satisfied with the platform for any reason, you may request a 100% refund of your base monthly platform fee within seven (7) days of your initial purchase date.
                  </p>
                </div>
                <div className="lg-info-box" style={{ marginBottom: 0 }}>
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>Exclusions from Refunds:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Custom engineering/bespoke onboarding implementation fees, consumed telephony usage credits (direct carrier charges for phone minutes and WhatsApp conversation charges already delivered by carriers), and fees for billing cycles requested after the 7-day evaluation window are non-refundable.
                  </p>
                </div>
                <div className="lg-info-box" style={{ marginBottom: 0 }}>
                  <strong style={{ color: "var(--text-ivory)", fontSize: "14px" }}>Refund Processing Timeline:</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Approved refunds are processed via the original payment gateway to the original payment method (card, UPI, or bank account) within 5 to 7 business days, in accordance with standard banking and payment gateway turnaround windows.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">6. Acceptable Use & Operational Boundaries</h2>
              <p className="lg-p">
                You agree to use Namuste&rsquo;s platform in strict compliance with all applicable laws and regulations. You specifically agree NOT to:
              </p>
              <ul className="lg-list">
                <li>Violate telecommunication and spam regulations, including TRAI UCC/DND regulations in India or the TCPA in the United States.</li>
                <li>Conduct deceptive, fraudulent, or unsolicited robocall campaigns without verifiable opt-in consent from recipients.</li>
                <li>Configure assistants to issue unauthorized medical diagnoses, definitive clinical prescriptions, or binding legal counsel. (All clinical and statutory queries must be transferred to verified human professionals).</li>
                <li>Attempt to decompile, reverse-engineer, benchmark, or extract the underlying model architectures of the Namuste engine.</li>
              </ul>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">7. Intellectual Property & Data Ownership</h2>
              <div className="lg-tenant-grid">
                <div className="lg-info-box" style={{ marginBottom: 0 }}>
                  <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>Your Data Stays Yours</div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    You retain exclusive ownership of all uploaded corporate handbooks, customer lists, CRM inputs, caller voice recordings, and conversation transcripts.
                  </p>
                </div>
                <div className="lg-info-box" style={{ marginBottom: 0 }}>
                  <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>Namuste Platform IP</div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    Namuste retains all rights, title, and interest in and to the platform, proprietary dialogue state trees, software algorithms, design assets, and logos.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">8. Service Availability & Uptime</h2>
              <p className="lg-p" style={{ marginBottom: 0 }}>
                We strive to maintain 99.9% uptime for core conversation routing and API endpoints. Scheduled maintenance windows are communicated in advance. We are not liable for outages caused by upstream public telecommunication carriers, upstream LLM provider downtime, internet exchange disruptions, or force majeure events.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">9. Limitation of Liability</h2>
              <p className="lg-p" style={{ marginBottom: 0 }}>
                To the maximum extent permitted by applicable law, in no event shall Namuste Technologies Pvt. Ltd., its directors, officers, or employees be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, goodwill, or operational interruption. Our total cumulative liability arising out of or related to this agreement shall not exceed the total fees paid by you to Namuste in the twelve (12) months immediately preceding the event giving rise to the claim.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">10. Governing Law & Jurisdiction</h2>
              <p className="lg-p" style={{ marginBottom: 0 }}>
                These Terms shall be governed by, construed, and enforced in accordance with the laws of the Republic of India, without regard to its conflict of law principles. Any dispute, claim, or controversy arising out of or in connection with these Terms or the breach thereof shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Kolkata, West Bengal, India</strong>.
              </p>
            </div>

            <div className="lg-block">
              <h2 className="lg-h2">11. Contact & Legal Notices</h2>
              <p className="lg-p">For inquiries regarding these Terms, billing issues, or to submit formal notices, please contact us at:</p>
              <div className="lg-info-box" style={{ marginBottom: 0 }}>
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

            {/* RELATED LINKS */}
            <div className="lg-related-bar">
              <div className="lg-related-text">Looking for our data protection details?</div>
              <div className="lg-related-actions">
                <Link href="/privacy-policy" className="lg-btn-secondary">
                  Privacy Policy <ShieldAlert size={14} />
                </Link>
                <Link href="/pricing" className="lg-btn-primary">
                  View Pricing Plans <CreditCard size={14} />
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
        .lg-accent-box-head { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: var(--green); }

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
