import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, ShieldCheck, ArrowRight, Building, Mail, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Founding Story — Namuste Technologies",
  description:
    "Learn about Namuste Technologies, founded by Saswati and Dipanjan. Building the industry-agnostic AI voice and chat assistant platform for business conversations.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section
          style={{
            minHeight: "80vh",
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
            <div className="pill" style={{ marginBottom: "16px" }}>Our Mission & Story</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "720px" }}>
              Turning fragmented conversations into <span className="serif-italic">organised business outcomes.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "580px", marginBottom: "32px" }}>
              Every day, businesses invest heavily in generating demand and customer relationships—only to lose trust when calls go unanswered, WhatsApp messages sit unread, and follow-ups are forgotten.
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Founded on the belief that <span className="serif-italic">every customer query deserves an intelligent next step.</span>
            </span>
          </div>
        </section>

        {/* FOUNDING STORY & DIGICIDES CONTEXT */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "64px",
                alignItems: "center",
              }}
              className="about-grid"
            >
              <div>
                <div className="pill" style={{ marginBottom: "16px" }}>The Insight</div>
                <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "20px" }}>
                  Where the problem was <span className="serif-italic">revealed.</span>
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" }}>
                  Namuste Technologies was founded by <strong>Saswati</strong> and <strong>Dipanjan</strong> following years of operational experience building large-scale commercial distribution and communication networks at Digicides.
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" }}>
                  While coordinating thousands of retailers, clinic desks, and field partners, one fundamental breakdown was undeniable: <strong style={{ color: "var(--text-ivory)" }}>businesses were drowning in unstructured incoming enquiries</strong> that human front-desks simply could not answer in real time.
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.8 }}>
                  We built Namuste as an industry-agnostic AI platform that sits quietly beside your team, turning high-volume voice calls, WhatsApp messages, and web enquiries into verified, structured next actions.
                </p>
              </div>

              <div
                className="glass-card"
                style={{
                  padding: "40px",
                  borderRadius: "20px",
                  background: "rgba(16, 20, 16, 0.8)",
                  border: "1px solid rgba(118, 192, 67, 0.25)",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
                  Core Operating Principles
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    { title: "Problem First, Technology Second", desc: "We design for the actual failure points of human front desks and busy practices." },
                    { title: "Zero Hallucination Tolerance", desc: "AI must never guess or make promises outside verified business guidelines." },
                    { title: "Calm, Restrained Engineering", desc: "No noisy gimmicks. Just quiet, dependable automation that respects human attention." },
                  ].map((p, i) => (
                    <div key={i} style={{ borderBottom: i < 2 ? "1px solid var(--border)" : "none", paddingBottom: i < 2 ? "16px" : 0 }}>
                      <h4 className="serif" style={{ fontSize: "17px", color: "var(--text-ivory)", marginBottom: "4px" }}>{p.title}</h4>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REGISTERED CORPORATE OFFICE */}
        <section style={{ padding: "80px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div className="pill" style={{ marginBottom: "16px" }}>Corporate Headquarters</div>
            <h3 className="serif" style={{ fontSize: "28px", color: "var(--text-ivory)", marginBottom: "16px" }}>
              Namuste Technologies Pvt. Ltd.
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
              245 B/1, Raipur Road, Kolkata 700047, West Bengal, India <br />
              Email: <strong style={{ color: "var(--text-ivory)" }}>connect@namuste.com</strong>
            </p>
            <Link href="/contact" className="btn-primary">
              Book a Consultation with Founders <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media (max-width: 860px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
