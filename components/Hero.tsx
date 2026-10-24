"use client";

import React, { useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import HeroHeadline from "./HeroHeadline";
import StatsGrid from "./StatsGrid";
import CarVisual from "./CarVisual";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  // Invoke all GSAP animation choreography
  useHeroAnimation({
    containerRef,
    trackRef,
    carRef,
    trailRef,
    headlineRef,
    statsRef,
    scrollHintRef,
  });

  return (
    <div
      id="hero-pin-container"
      ref={containerRef}
      className="relative w-full h-screen min-h-[100svh] bg-[#07090e] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] radial-spotlight pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />

      {/* Top Navigation Brand Bar */}
      <header className="relative z-30 w-full px-6 py-5 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-sans font-black tracking-widest text-lg sm:text-xl text-white">
            ITZ<span className="text-cyan-400">FIZZ</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE DEMO
          </span>
          <a
            href="https://github.com/paraschaturvedi/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
          >
            Ref: car-scroll
          </a>
        </div>
      </header>

      {/* Hero Content Stack */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto w-full px-4">
        {/* 1. Letter-Spaced Animated Headline */}
        <div ref={headlineRef} className="w-full">
          <HeroHeadline />
        </div>

        {/* 2. Kinetic Car Track Section */}
        <div ref={trackRef} className="w-full my-2 sm:my-4">
          <CarVisual />
        </div>

        {/* 3. High Impact Key Performance Metrics */}
        <div ref={statsRef} className="w-full">
          <StatsGrid />
        </div>
      </div>

      {/* Interactive Bottom Scroll Prompt */}
      <div
        id="hero-scroll-hint"
        ref={scrollHintRef}
        className="relative z-30 pb-6 flex flex-col items-center justify-center gap-1.5 opacity-0 will-change-transform pointer-events-none"
      >
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
          Scroll to Accelerate
        </span>
        <div className="flex flex-col items-center animate-bounce">
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
