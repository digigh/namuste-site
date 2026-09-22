import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingClient from "@/components/PricingClient";

export const metadata: Metadata = {
  title: "Transparent Pricing & Plans — Namuste",
  description:
    "Explore transparent pricing for Namuste AI Voice and Chat Assistants. Predictable monthly subscriptions with pay-as-you-go usage.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <PricingClient />
      </main>
      <Footer />
    </>
  );
}
