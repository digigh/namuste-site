import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Namusté Technologies — Counter OS for Rural Retail",
  description: "Namusté Technologies digitizes rural retail transactions, captures real-time demand data, enables brand campaigns, and unlocks fintech across millions of retailers.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
