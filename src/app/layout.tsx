import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Astro AI — Vedic Astrology Consultants",
  description:
    "Consult 10 specialized AI Vedic astrology advisors. Career, relationships, wealth, health, timing, spirituality, and more — powered by classical Jyotiṣa and Claude AI.",
  keywords: [
    "Vedic astrology",
    "Jyotish",
    "AI astrology",
    "birth chart",
    "horoscope",
    "Daśā",
    "Jaimini",
    "Parashara",
  ],
  openGraph: {
    title: "Astro AI — Vedic Astrology Consultants",
    description: "10 specialized AI advisors for every area of Vedic astrology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-neutral-950 text-neutral-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
