import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryComingSoon from "@/components/IndustryComingSoon";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Education & Admissions AI Assistant — Coming Soon | Namuste",
  description:
    "AI-driven admissions counselling, campus tour scheduling and eligibility checks for education and academies — coming soon to Namuste.",
};

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryComingSoon
          breadcrumbLabel="Education & Academies"
          headline="Class is"
          headlineAccent="about to begin."
          description="Admissions counselling, campus tours and eligibility checks — in development."
          icon={<GraduationCap size={26} />}
          chips={["Admissions", "Campus Tours", "Eligibility Checks", "Counselling"]}
        />
      </main>
      <Footer />
    </>
  );
}
