import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryOverview from "@/components/IndustryOverview";
import { PackageSearch, Headset, Truck, MapPinned } from "lucide-react";

export const metadata: Metadata = {
  title: "Distribution & Field Teams AI Assistant — Namuste",
  description:
    "Voice and chat support for order status, delivery tracking, and dealer helplines across distribution networks and field teams.",
};

export default function DistributionPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryOverview
          breadcrumbLabel="Distribution & Field"
          eyebrow="DISTRIBUTION & FIELD TEAMS"
          headline="Every dealer call answered,"
          headlineAccent="every route covered."
          description="Namuste handles order status checks, dealer helplines, and dispatch updates around the clock — so your distribution network never waits on hold."
          capabilities={[
            {
              icon: <PackageSearch size={20} />,
              title: "Order Status Checks",
              desc: "Answers where an order stands — placed, dispatched, or delivered — without a call to your ops team.",
            },
            {
              icon: <Headset size={20} />,
              title: "Dealer Support Helpline",
              desc: "Handles routine dealer questions on pricing, stock, and account status in their own language.",
            },
            {
              icon: <Truck size={20} />,
              title: "Dispatch & Delivery Tracking",
              desc: "Gives real-time updates on dispatch schedules and expected delivery windows.",
            },
            {
              icon: <MapPinned size={20} />,
              title: "Territory Routing Enquiries",
              desc: "Directs enquiries to the right regional contact or warehouse based on territory.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
