import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ITZ FIZZ — Kinetic Supercar Scroll Experience",
  description:
    "A precision-engineered, scroll-driven interactive hero section built with Next.js, GSAP ScrollTrigger, Tailwind CSS, and Lenis smooth scrolling.",
  keywords: [
    "Next.js",
    "GSAP",
    "ScrollTrigger",
    "Tailwind CSS",
    "Car Scroll Animation",
    "Frontend Engineering",
  ],
  authors: [{ name: "ITZ FIZZ Engineering Team" }],
  openGraph: {
    title: "ITZ FIZZ — Kinetic Supercar Scroll Experience",
    description:
      "A precision-engineered, scroll-driven interactive hero section animation.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-[#07090e] text-slate-100 font-sans min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
