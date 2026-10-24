import React from "react";
import Hero from "@/components/Hero";
import NextSection from "@/components/NextSection";

export default function Home() {
  return (
    <main className="relative w-full bg-[#07090e] text-white">
      {/* Pinned Hero Section with GSAP ScrollTrigger */}
      <Hero />

      {/* Subsequent Content Section providing natural unpin and context */}
      <NextSection />

      {/* Footer */}
      <footer className="relative z-30 border-t border-slate-900 bg-[#05070a] py-8 px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ITZ FIZZ. Built with Next.js, GSAP & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span className="text-cyan-400/80">ScrollTrigger Active</span>
            <span className="text-slate-600">•</span>
            <span>Lenis Kinetic Engine</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
