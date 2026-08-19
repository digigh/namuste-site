import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://namuste.com"),
  title: "Namuste — AI Voice & Chat Assistants for Customer Conversations",
  description: "Namuste turns customer conversations into organised business outcomes across Voice, WhatsApp and Web. Industry-agnostic AI assistants for clinics, professional services, distribution, and enterprise groups.",
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    title: "Namuste — AI Voice & Chat Assistants for Customer Conversations",
    description: "Every conversation receives an intelligent response and a clear next step. Purpose-built Voice, WhatsApp and Web AI assistants.",
    images: [
      {
        url: "https://namuste.com/revamp-assets/image1.png",
        width: 1200,
        height: 630,
        alt: "Namuste Platform Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namuste — AI Voice & Chat Assistants for Customer Conversations",
    description: "Turn customer enquiries into organised business outcomes across Voice, WhatsApp and Web.",
    images: ["https://namuste.com/revamp-assets/image1.png"],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
