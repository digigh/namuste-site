import type { Metadata } from "next";
import NamoExperience from "@/components/NamoExperience";

// Standalone event/kiosk page — deliberately no Navbar or Footer. This is
// meant to be shown full-screen on a stand at an event, not browsed as a
// normal site page, so none of the site chrome (promo banner, call timer,
// "Book a demo", menu, footer links) belongs here.
export const metadata: Metadata = {
  title: "Agent Live — talk to our AI receptionist | Namuste",
  description:
    "Agent Live: talk or chat with Namuste's live AI receptionist for clinics, salons, and agri inputs — book an appointment or ask a question, right here.",
};

export default function AgentLivePage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <NamoExperience />
    </main>
  );
}
