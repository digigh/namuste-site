import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://namuste.co"),
  title: "Namuste Technologies — Counter OS for Rural Retail",
  description: "Namuste Technologies digitizes rural retail transactions, captures real-time demand data, enables brand campaigns, and unlocks fintech across millions of retailers.",
  openGraph: {
    title: "Namuste Technologies — Counter OS for Rural Retail",
    description: "Namuste Technologies digitizes rural retail transactions, captures real-time demand data, enables brand campaigns, and unlocks fintech across millions of retailers.",
    images: [
      {
        url: "/logo-icon.png",
        width: 512,
        height: 512,
        alt: "Namuste Technologies Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Namuste Technologies — Counter OS for Rural Retail",
    description: "Namuste Technologies digitizes rural retail transactions, captures real-time demand data, enables brand campaigns, and unlocks fintech across millions of retailers.",
    images: ["/logo-icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
