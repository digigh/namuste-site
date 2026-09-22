import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductChannelHero from "@/components/ProductChannelHero";
import { Zap, Target, Palette } from "lucide-react";

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
        <ProductChannelHero
          eyebrow="WEB CONCIERGE WIDGET"
          headline="Convert passive web traffic into"
          headlineAccent="qualified conversations."
          description="A lightweight, beautifully styled web concierge that guides visitors, answers in-depth business questions, and calendars appointments directly inside your website."
          primaryCta={{ label: "Install Web Concierge", href: "/contact" }}
          secondaryCta={{ label: "View Setup Guide", href: "/how-it-works" }}
          closingLine="No forms. Just"
          closingAccent="instant helpful dialogue."
          cards={[
            { icon: <Zap size={18} />, title: "Zero-Latency Script", desc: "Installs via a single 10KB lightweight tag with zero impact on Google Lighthouse page speed metrics." },
            { icon: <Target size={18} />, title: "Dynamic Lead Qualification", desc: "Identifies visitor intent and collects company size, timeline, and budget parameters before booking meetings." },
            { icon: <Palette size={18} />, title: "Custom Brand Theming", desc: "Matches your exact typography, dark/light themes, and color palette for a seamless native feel." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
