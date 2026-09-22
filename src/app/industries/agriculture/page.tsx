import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryComingSoon from "@/components/IndustryComingSoon";
import { Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "Agriculture & Rural Commerce AI Assistant — Coming Soon | Namuste",
  description:
    "Multilingual voice and chat support for farmers, dealers and rural commerce — coming soon to Namuste.",
};

export default function AgriculturePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryComingSoon
          breadcrumbLabel="Agriculture & Rural Commerce"
          headline="The harvest is coming."
          headlineAccent="So is this."
          description="Vernacular voice support for farmers, dealers and rural commerce — currently being cultivated."
          icon={<Sprout size={26} />}
          chips={["Hindi & Bengali", "Crop Advisory", "Dealer Orders", "Field Surveys"]}
        />
      </main>
      <Footer />
    </>
  );
}
