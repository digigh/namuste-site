import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryOverview from "@/components/IndustryOverview";
import { UserPlus, CalendarClock, FileText, MessageCircleQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Services AI Client Intake — Namuste",
  description:
    "AI-assisted client intake and scheduling for lawyers, accountants, architects, and consultants — captures enquiries and books consultations 24/7.",
};

export default function ProfessionalServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryOverview
          breadcrumbLabel="Professional Services"
          eyebrow="LAW, ACCOUNTING, CONSULTING & ARCHITECTURE"
          headline="Client intake that never"
          headlineAccent="misses an enquiry."
          description="Namuste answers new client calls, captures case or engagement details, and books consultations — so your practice never loses a lead to an unanswered call."
          capabilities={[
            {
              icon: <UserPlus size={20} />,
              title: "New Client Intake",
              desc: "Captures the essentials of a new enquiry — matter type, background, and urgency — before your first call with them.",
            },
            {
              icon: <CalendarClock size={20} />,
              title: "Consultation Scheduling",
              desc: "Books and confirms consultation slots directly against your calendar, with automatic reminders.",
            },
            {
              icon: <FileText size={20} />,
              title: "Document Request Coordination",
              desc: "Tells clients exactly what documents to bring or upload ahead of their appointment.",
            },
            {
              icon: <MessageCircleQuestion size={20} />,
              title: "Status & FAQ Handling",
              desc: "Answers routine questions on fees, process, and case or engagement status without pulling your team away from billable work.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
