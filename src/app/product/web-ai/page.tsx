import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, MousePointerClick, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Concierge & Conversational Lead Assistant — Namuste",
  description:
    "Engage website visitors instantly. Guide potential clients to relevant services, answer technical FAQs, and book qualified discovery calls 24/7.",
};

export default function WebAIPage() {
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
            <div className="pill" style={{ marginBottom: "16px" }}>Web Concierge Widget</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "680px" }}>
              Convert passive web traffic into <span className="serif-italic">qualified conversations.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "32px" }}>
              A lightweight, beautifully styled web concierge that guides visitors, answers in-depth business questions, and calendars appointments directly inside your website.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Install Web Concierge <ArrowRight size={15} />
              </Link>
              <Link href="/how-it-works" className="btn-secondary">
                View Setup Guide <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "80px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              No forms. Just <span className="serif-italic">instant helpful dialogue.</span>
            </span>
          </div>
        </section>

        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="web-grid">
              {[
                { title: "Zero-Latency Script", desc: "Installs via a single 10KB lightweight tag with zero impact on Google Lighthouse page speed metrics." },
                { title: "Dynamic Lead Qualification", desc: "Identifies visitor intent and collects company size, timeline, and budget parameters before booking meetings." },
                { title: "Custom Brand Theming", desc: "Matches your exact typography, dark/light themes, and color palette for a seamless native feel." },
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
      <style>{`@media (max-width: 900px) { .web-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
