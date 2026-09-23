import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryOverview from "@/components/IndustryOverview";
import { Languages, Truck, ClipboardList, Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Agriculture & Rural Commerce AI Assistant — Namuste",
  description:
    "Multilingual voice and chat support for farmers, dealers, and rural commerce — crop advisory, dealer orders, and field survey assistance in Hindi, Bengali, and more.",
};

export default function AgriculturePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <IndustryOverview
          breadcrumbLabel="Agriculture & Rural Commerce"
          eyebrow="AGRICULTURE & RURAL COMMERCE"
          headline="Vernacular voice support for"
          headlineAccent="farmers, dealers & field teams."
          description="Namuste answers calls and messages in regional languages — helping with crop advisory queries, dealer orders, and field data collection — so rural commerce never waits on a callback."
          capabilities={[
            {
              icon: <Languages size={20} />,
              title: "Vernacular Voice Support",
              desc: "Converses naturally in Hindi, Bengali, and other regional languages farmers and dealers actually speak.",
            },
            {
              icon: <Cloud size={20} />,
              title: "Crop Advisory Enquiries",
              desc: "Answers common questions on seasonal guidance, weather-linked advice, and pricing based on your knowledge base.",
            },
            {
              icon: <Truck size={20} />,
              title: "Dealer & Distributor Orders",
              desc: "Handles order status checks, stock availability, and delivery updates for your dealer network.",
            },
            {
              icon: <ClipboardList size={20} />,
              title: "Field Survey Assistance",
              desc: "Captures structured data from field agents and farmers through simple voice or WhatsApp conversations.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
