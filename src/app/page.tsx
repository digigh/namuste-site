import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <About />
      <Testimonials />
      <Contact />
      <section style={{ padding: "80px 24px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 52px" }}>
            <span className="pill" style={{ marginBottom: "16px" }}>Common Queries</span>
            <h2 className="hf" style={{ fontWeight: 900, color: "var(--ink)", fontSize: "clamp(26px, 3.5vw, 38px)", letterSpacing: "-0.8px" }}>
              Frequently Asked <span className="gt">Questions</span>
            </h2>
          </div>
          <Faq />
        </div>
      </section>
      <Footer />
    </main>
  );
}
