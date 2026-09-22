import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductChannelHero from "@/components/ProductChannelHero";
import { Mic, PhoneCall, Users } from "lucide-react";

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
        <ProductChannelHero
          eyebrow="VOICE AI ENGINE"
          headline="Human-like voice conversations at"
          headlineAccent="infinite concurrent scale."
          description="Inbound and outbound telephone calls that understand interruptions, speak in natural regional accents, and complete concrete business tasks during the call."
          primaryCta={{ label: "Test Live Voice Call", href: "/contact" }}
          secondaryCta={{ label: "See Clinic Receptionist Demo", href: "/industries/doctors-and-clinics" }}
          closingLine="Zero hold music."
          closingAccent="Instant answers."
          cards={[
            { icon: <Mic size={18} />, title: "Interruption & Speech Cadence", desc: "Allows callers to interrupt naturally just like speaking with a human receptionist without awkward pauses." },
            { icon: <PhoneCall size={18} />, title: "Telephony PBX Integration", desc: "Integrates with existing phone numbers (Airtel, Jio, Tata, Exotel, Twilio) in minutes with simple call-forwarding." },
            { icon: <Users size={18} />, title: "Live Warm Call Transfers", desc: "Connects complex or high-priority calls to human staff with immediate screen-pop context." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
