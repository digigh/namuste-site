import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, CheckCheck, Clock, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Official WhatsApp AI Automation & Workflows — Namuste",
  description:
    "Turn WhatsApp into an intelligent 24/7 self-service counter. Dispatch appointment confirmations, PDFs, payment links, and interactive catalogs automatically.",
};

export default function WhatsAppAIPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <section
          style={{
            minHeight: "85vh",
            paddingTop: "140px",
            paddingBottom: "80px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="bg-radial-hero"
        >
          <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 36px", width: "100%" }}>
            <div className="pill" style={{ marginBottom: "16px" }}>WhatsApp AI Workflows</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "680px" }}>
              Turn WhatsApp into an <span className="serif-italic">instant action desk.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "32px" }}>
              Official WhatsApp Business Cloud API integration with rich message templates, interactive quick-reply buttons, and persistent memory across conversations.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Configure WhatsApp AI <ArrowRight size={15} />
              </Link>
              <Link href="/how-it-works" className="btn-secondary">
                See How It Works <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "80px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Where your customers already are. <span className="serif-italic">24 hours a day.</span>
            </span>
          </div>
        </section>

        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="wa-grid">
              {[
                { title: "Automated Document Dispatch", desc: "Sends brochures, clinic location pins, invoice PDFs, and preparation guides the instant a customer requests them." },
                { title: "One-Click Rescheduling", desc: "Interactive buttons allow clients to confirm, reschedule, or cancel bookings without speaking to a human." },
                { title: "Re-engagement & Nurturing", desc: "Follows up on unconfirmed appointments or abandoned inquiries with consent-aware notification flows." },
              ].map((c, i) => (
                <div key={i} className="glass-card" style={{ padding: "32px", borderRadius: "18px" }}>
                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "10px" }}>{c.title}</h3>
                  <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media (max-width: 900px) { .wa-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
