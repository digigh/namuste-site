import type { Metadata } from "next";
import TermsOfUsePage from "@/app/terms-of-use/page";

export const metadata: Metadata = {
  title: "Terms of Use — Namuste Technologies",
  description:
    "Terms of Use and Service Agreement for Namuste Technologies Pvt. Ltd. Details on SaaS subscriptions, payment gateway terms, billing, refund & cancellation policies.",
};

export default function TermsPage() {
  return <TermsOfUsePage />;
}
