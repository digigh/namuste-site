import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryOverview from "@/components/IndustryOverview";
import { GraduationCap, CalendarCheck, ListChecks, MessageCircleQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Education & Admissions AI Assistant — Namuste",
  description:
    "AI-driven admissions counselling, campus tour scheduling, and eligibility checks for schools, colleges, and academies.",
};

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryOverview
          breadcrumbLabel="Education & Academies"
          eyebrow="EDUCATION & ADMISSIONS"
          headline="Answer every admissions enquiry,"
          headlineAccent="day or night."
          description="Namuste guides prospective students through admissions questions, eligibility checks, and campus tour bookings — so your front office isn't the bottleneck during peak enquiry season."
          capabilities={[
            {
              icon: <GraduationCap size={20} />,
              title: "Admissions Counselling",
              desc: "Answers common questions on courses, fees, and application process based on your institution's own information.",
            },
            {
              icon: <ListChecks size={20} />,
              title: "Eligibility Checks",
              desc: "Walks prospective students through eligibility criteria before they ever call your admissions desk.",
            },
            {
              icon: <CalendarCheck size={20} />,
              title: "Campus Tour Scheduling",
              desc: "Books and confirms campus visit slots directly against your calendar.",
            },
            {
              icon: <MessageCircleQuestion size={20} />,
              title: "Parent & Student FAQs",
              desc: "Handles routine questions on timings, documents required, and application deadlines.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
