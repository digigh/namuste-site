import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryOverview from "@/components/IndustryOverview";
import { Mic, MessageSquare, ShieldCheck, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Multilingual Voice & Chat Survey Agent — Namuste",
  description:
    "Structured multilingual voice and chat surveys at scale with verified data capture — for market research, field studies, and large-scale polling.",
};

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryOverview
          breadcrumbLabel="Research & Surveys"
          eyebrow="RESEARCH & SURVEYS"
          headline="Multilingual surveys,"
          headlineAccent="run at scale."
          description="Namuste conducts structured voice and chat surveys across Indian languages, capturing verified, consistent responses without an army of field callers."
          capabilities={[
            {
              icon: <Mic size={20} />,
              title: "Multilingual Voice Surveys",
              desc: "Runs structured question-and-answer surveys naturally in the respondent's own language.",
            },
            {
              icon: <MessageSquare size={20} />,
              title: "WhatsApp Poll Distribution",
              desc: "Sends and collects poll responses directly over WhatsApp for higher completion rates.",
            },
            {
              icon: <ShieldCheck size={20} />,
              title: "Verified Response Capture",
              desc: "Flags inconsistent, duplicate, or low-confidence responses instead of accepting every answer blindly.",
            },
            {
              icon: <BarChart3 size={20} />,
              title: "Structured Data Output",
              desc: "Delivers responses in a clean, structured format ready for analysis, not raw transcripts to sift through.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
