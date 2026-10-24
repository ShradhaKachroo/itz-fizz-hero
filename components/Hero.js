"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "98%", label: "Customer satisfaction", color: "text-amber-500" },
  { value: "3x", label: "Faster delivery", color: "text-sky-400" },
  { value: "75%", label: "Cost reduction", color: "text-green-400" },
  { value: "24/7", label: "Support", color: "text-pink-400" },
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
      gsap.from(".stat-card", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.3,
        ease: "power2.out",
      });

      // 2. Scroll Animation (The Core Feature)
      // Pinned for ~300% scroll distance:
      // First half: car moves left edge -> right edge
      // Second half: car moves right edge -> left edge back to start
      const getTravelDistance = () => {
        const car = carRef.current;
        if (!car) return 600;
        // Distance to reach the far right edge of the viewport
        return window.innerWidth - car.offsetWidth - 48;
      };

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // First half: move from left to right (facing right)
      scrollTl.to(carRef.current, {
        x: getTravelDistance,
        ease: "none",
        duration: 1,
      });

      // Turn around to face left
      scrollTl.set(carRef.current, {
        scaleX: -1,
      });

      // Second half: move from right back to left (facing left)
      scrollTl.to(carRef.current, {
        x: 0,
        ease: "none",
        duration: 1,
      });

      // Reset facing direction to right
      scrollTl.set(carRef.current, {
        scaleX: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-screen bg-[#0f172a] text-white flex flex-col justify-between overflow-hidden p-6 sm:p-12 select-none"
    >
      {/* Top / Center Section: Headline & Stats */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full pt-4">
        {/* Headline with wide letter-spacing */}
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
              className="stat-card flex flex-col items-center justify-center p-4 sm:p-5 bg-[#1e293b] border border-slate-700/60 rounded"
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

      {/* Bottom Track Area: Flat 2D Car & Flat Road */}
      <div className="relative w-full pb-6">
        {/* The Animated Flat 2D Car (origin at center so scaleX flip is seamless) */}
        <div
          ref={carRef}
          className="w-48 sm:w-60 md:w-68 will-change-transform"
          style={{ transformOrigin: "center center" }}
        >
          {/* Inline Flat 2D Side-View Car SVG */}
          <svg
            viewBox="0 0 240 90"
            className="w-full h-auto block select-none pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Front Headlight (flat solid yellow) */}
            <polygon points="228,48 236,49 236,55 228,56" fill="#fef08a" />

            {/* Rear Taillight (flat solid dark red) */}
            <rect x="4" y="47" width="6" height="8" fill="#991b1b" />

            {/* Main Car Body (solid bright red #ef4444) */}
            <path
              d="M 6 56 
                 L 6 48 
                 L 20 48 
                 L 52 40 
                 L 80 14 
                 L 145 14 
                 L 178 40 
                 L 225 43 
                 L 236 49 
                 L 236 64 
                 L 220 64 
                 A 18 18 0 0 0 184 64 
                 L 86 64 
                 A 18 18 0 0 0 50 64 
                 L 6 64 Z"
              fill="#ef4444"
            />

            {/* Rear Window (flat light blue #bae6fd) */}
            <polygon
              points="84,18 120,18 120,38 58,38"
              fill="#bae6fd"
            />

            {/* Front Window (flat light blue #bae6fd) */}
            <polygon
              points="126,18 143,18 172,38 126,38"
              fill="#bae6fd"
            />

            {/* Door Handle (flat red accent) */}
            <rect x="128" y="44" width="12" height="3" fill="#b91c1c" />

            {/* Rear Wheel (solid dark gray with light gray hub) */}
            <circle cx="68" cy="64" r="16" fill="#1e293b" />
            <circle cx="68" cy="64" r="6" fill="#cbd5e1" />

            {/* Front Wheel (solid dark gray with light gray hub) */}
            <circle cx="202" cy="64" r="16" fill="#1e293b" />
            <circle cx="202" cy="64" r="6" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Flat Road Strip (plain solid dark gray strip) */}
        <div className="w-full h-3 bg-[#334155] mt-1" />
      </div>
    </section>
  );
}
