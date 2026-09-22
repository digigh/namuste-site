import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryComingSoon from "@/components/IndustryComingSoon";
import { BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Multilingual Voice & Chat Survey Agent — Coming Soon | Namuste",
  description:
    "Structured multilingual voice and chat surveys at scale with verified data capture — coming soon to Namuste.",
};

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryComingSoon
          breadcrumbLabel="Research & Surveys"
          headline="The data"
          headlineAccent="is on its way."
          description="Structured multilingual voice and chat surveys at scale — coming soon."
          icon={<BarChart3 size={26} />}
          chips={["Voice Surveys", "WhatsApp Polls", "Multilingual", "Verified Capture"]}
        />
      </main>
      <Footer />
    </>
  );
}
