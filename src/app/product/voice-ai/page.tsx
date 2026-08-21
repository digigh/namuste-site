import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PhoneCall, Mic, Volume2, ShieldCheck, ArrowRight, CheckCircle2, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Multilingual Voice AI Engine — Namuste",
  description:
    "Namuste Voice AI handles inbound telephone calls, qualifies callers, resolves FAQs, books appointments, and routes transfers with sub-second human cadence.",
};

export default function VoiceAIPage() {
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
            <div className="pill" style={{ marginBottom: "16px" }}>Voice AI Engine</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "680px" }}>
              Human-like voice conversations at <span className="serif-italic">infinite concurrent scale.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "32px" }}>
              Inbound and outbound telephone calls that understand interruptions, speak in natural regional accents, and complete concrete business tasks during the call.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Test Live Voice Call <ArrowRight size={15} />
              </Link>
              <Link href="/industries/doctors-and-clinics" className="btn-secondary">
                See Clinic Receptionist Demo <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "80px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Zero hold music. <span className="serif-italic">Instant answers.</span>
            </span>
          </div>
        </section>

        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="voice-grid">
              {[
                { title: "Interruption & Speech Cadence", desc: "Allows callers to interrupt naturally just like speaking with a human receptionist without awkward pauses." },
                { title: "Telephony PBX Integration", desc: "Integrates with existing phone numbers (Airtel, Jio, Tata, Exotel, Twilio) in minutes with simple call-forwarding." },
                { title: "Live Warm Call Transfers", desc: "Connects complex or high-priority calls to human staff with immediate screen-pop context." },
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
      <style>{`@media (max-width: 900px) { .voice-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
