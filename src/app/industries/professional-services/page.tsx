import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryComingSoon from "@/components/IndustryComingSoon";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Services AI Client Intake — Coming Soon | Namuste",
  description:
    "AI client intake for lawyers, accountants, architects and consultants — coming soon to Namuste.",
};

export default function ProfessionalServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryComingSoon
          breadcrumbLabel="Professional Services"
          headline="Your practice,"
          headlineAccent="perfected soon."
          description="Client intake for lawyers, accountants, architects and consultants — currently in the works."
          icon={<Briefcase size={26} />}
          chips={["Client Intake", "Case Scheduling", "Document Requests", "Consultations"]}
        />
      </main>
      <Footer />
    </>
  );
}
