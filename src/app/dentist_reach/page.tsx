import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DentistReachClient from "@/components/DentistReachClient";

export const metadata: Metadata = {
  title: "AI Receptionist for Dental Clinics — Never Miss a Patient Call | Namuste",
  description:
    "Namuste's AI receptionist answers patient calls, handles common enquiries, and helps book appointments 24/7 for dental clinics — even when your team is busy. Book a free demo.",
};

export default function DentistReachPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <DentistReachClient />
      </main>
      <Footer />
    </>
  );
}
