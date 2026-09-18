import type { Metadata } from "next";
import PrivacyPolicyPage from "@/app/privacy-policy/page";

export const metadata: Metadata = {
  title: "Privacy Policy — Namuste Technologies",
  description:
    "Privacy Policy for Namuste Technologies Pvt. Ltd. Detailed information on data protection, payment processing, voice & chat conversation handling, and DPDP compliance.",
};

export default function PrivacyPage() {
  return <PrivacyPolicyPage />;
}
