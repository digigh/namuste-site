import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Namusté Technologies — Counter OS for Rural Retail",
  description: "Namusté Technologies digitizes agri retail transactions, captures real-time demand data, enables brand campaigns, and unlocks fintech across millions of retailers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
