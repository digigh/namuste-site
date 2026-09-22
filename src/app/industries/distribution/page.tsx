import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryComingSoon from "@/components/IndustryComingSoon";
import { Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Distribution & Field Teams AI Assistant — Coming Soon | Namuste",
  description:
    "Voice and chat support for order status, delivery tracking and dealer helplines across distribution networks — coming soon to Namuste.",
};

export default function DistributionPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryComingSoon
          breadcrumbLabel="Distribution & Field"
          headline="Every route,"
          headlineAccent="mapped soon."
          description="Field team support, delivery status and dealer helplines — in the pipeline."
          icon={<Truck size={26} />}
          chips={["Order Status", "Dealer Support", "Dispatch Tracking", "Territory Routing"]}
        />
      </main>
      <Footer />
    </>
  );
}
