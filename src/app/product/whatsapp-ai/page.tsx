import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductChannelHero from "@/components/ProductChannelHero";
import { FileText, RotateCcw, Bell } from "lucide-react";

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
        <ProductChannelHero
          eyebrow="WHATSAPP AI WORKFLOWS"
          headline="Turn WhatsApp into an"
          headlineAccent="instant action desk."
          description="Official WhatsApp Business Cloud API integration with rich message templates, interactive quick-reply buttons, and persistent memory across conversations."
          primaryCta={{ label: "Configure WhatsApp AI", href: "/contact" }}
          secondaryCta={{ label: "See How It Works", href: "/how-it-works" }}
          closingLine="Where your customers already are."
          closingAccent="24 hours a day."
          cards={[
            { icon: <FileText size={18} />, title: "Automated Document Dispatch", desc: "Sends brochures, clinic location pins, invoice PDFs, and preparation guides the instant a customer requests them." },
            { icon: <RotateCcw size={18} />, title: "One-Click Rescheduling", desc: "Interactive buttons allow clients to confirm, reschedule, or cancel bookings without speaking to a human." },
            { icon: <Bell size={18} />, title: "Re-engagement & Nurturing", desc: "Follows up on unconfirmed appointments or abandoned inquiries with consent-aware notification flows." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
