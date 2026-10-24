"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "98%", label: "Customer satisfaction", color: "text-[#f59e0b]" },
  { value: "3x", label: "Faster delivery", color: "text-[#38bdf8]" },
  { value: "75%", label: "Cost reduction", color: "text-[#4ade80]" },
  { value: "24/7", label: "Support", color: "text-[#f472b6]" },
];

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Load Animation (short)
      // Headline fades in and moves up slightly
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });

      // Stats fade in one by one with a small delay
      gsap.from(".stat-box", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.3,
        ease: "power2.out",
      });

      // 2. Scroll Animation (The Core Feature)
      // Pinned for ~300% scroll distance:
      // Scrolling DOWN moves car RIGHT. Scrolling UP moves car LEFT.
      // One-way linear translation, car always points right, no flips or rotations.
      const getTravelDistance = () => {
        const car = carRef.current;
        if (!car) return 600;
        return window.innerWidth - car.offsetWidth;
      };

      gsap.to(carRef.current, {
        x: getTravelDistance,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-screen bg-[#0f172a] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top / Center Area: Headline & Stats (stay visible the whole time) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full px-6 pt-6">
        {/* Headline with wide letter-spacing and amber accent on ITZ FIZZ */}
        <h1
          ref={headlineRef}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-white mb-8 sm:mb-12 leading-tight"
        >
          W E L C O M E &nbsp;
          <span className="text-[#f59e0b]">I T Z &nbsp; F I Z Z</span>
        </h1>

        {/* 4 Stats in a row (stack on mobile) */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-box flex flex-col items-center justify-center p-4 sm:p-5 bg-[#1e293b] border border-slate-700/60 rounded"
            >
              <span className={`text-3xl sm:text-4xl font-extrabold ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Road (Aerial View, full width, solid dark gray with yellow dashed line) */}
      <div className="relative w-full bg-[#334155] py-4 overflow-hidden">
        {/* Dashed Center Line (solid yellow, flat, no glow) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b-2 border-dashed border-[#facc15]" />

        {/* Flat 2D Top-Down (Aerial View) Car pointing RIGHT */}
        <div
          ref={carRef}
          className="relative z-10 w-44 sm:w-56 md:w-64 will-change-transform"
        >
          <svg
            viewBox="0 0 220 90"
            className="w-full h-auto block select-none pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 4 Wheels (small near-black rectangles at the corners) */}
            <rect x="35" y="4" width="34" height="12" rx="3" fill="#111827" />
            <rect x="35" y="74" width="34" height="12" rx="3" fill="#111827" />
            <rect x="150" y="4" width="34" height="12" rx="3" fill="#111827" />
            <rect x="150" y="74" width="34" height="12" rx="3" fill="#111827" />

            {/* Side Mirrors (flat red #ef4444) */}
            <rect x="142" y="6" width="10" height="7" rx="2" fill="#ef4444" />
            <rect x="142" y="77" width="10" height="7" rx="2" fill="#ef4444" />

            {/* Main Car Body (solid red #ef4444 rounded rectangle) */}
            <rect x="20" y="14" width="180" height="62" rx="20" fill="#ef4444" />

            {/* Headlights (front right, flat yellow #fef08a) */}
            <rect x="194" y="20" width="6" height="10" rx="2" fill="#fef08a" />
            <rect x="194" y="60" width="6" height="10" rx="2" fill="#fef08a" />

            {/* Taillights (rear left, flat dark red #991b1b) */}
            <rect x="20" y="20" width="4" height="8" rx="1" fill="#991b1b" />
            <rect x="20" y="62" width="4" height="8" rx="1" fill="#991b1b" />

            {/* Cabin / Roof Area (smaller rounded rectangle) */}
            <rect x="62" y="22" width="92" height="46" rx="8" fill="#dc2626" />

            {/* Rear Window (light blue #bae6fd) */}
            <rect x="68" y="26" width="14" height="38" rx="3" fill="#bae6fd" />

            {/* Front Windshield (light blue #bae6fd) */}
            <rect x="134" y="26" width="16" height="38" rx="4" fill="#bae6fd" />

            {/* Side Windows (light blue #bae6fd) */}
            <rect x="85" y="23" width="46" height="4" rx="1" fill="#bae6fd" />
            <rect x="85" y="63" width="46" height="4" rx="1" fill="#bae6fd" />

            {/* Roof Center Panel (solid red #ef4444) */}
            <rect x="86" y="28" width="44" height="34" rx="3" fill="#ef4444" />
          </svg>
        </div>
      </div>
    </section>
  );
}
