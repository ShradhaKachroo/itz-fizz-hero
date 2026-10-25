"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "98%", label: "Customer satisfaction", color: "#f59e0b" },
  { value: "3x", label: "Faster delivery", color: "#38bdf8" },
  { value: "75%", label: "Cost reduction", color: "#4ade80" },
  { value: "24/7", label: "Support", color: "#f472b6" },
];

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    let scrollTl;

    const ctx = gsap.context(() => {
      // 1. Load Animation (headline only)
      // Only the headline fades in on load. Stat cards are hidden.
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });

      // Explicitly initialize stat cards to hidden state (opacity 0, y: 40)
      gsap.set(".stat-box", { opacity: 0, y: 40 });

      // 2. Setup ScrollTrigger Timeline
      // Car translates from 0 to travelDistance, scrubbed with ScrollTrigger pinned for ~300% distance
      // Each stat card reveals exactly as the car reaches it on the same scrubbed timeline.
      const setupScrollTimeline = () => {
        if (scrollTl) {
          scrollTl.scrollTrigger?.kill();
          scrollTl.kill();
        }

        const container = heroRef.current;
        const car = carRef.current;
        if (!container || !car) return;

        const travelDistance = window.innerWidth - car.offsetWidth;

        scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Car tween x: 0 -> travelDistance, duration: 1, ease: none, at position 0
        scrollTl.to(
          car,
          {
            x: travelDistance,
            ease: "none",
            duration: 1,
          },
          0
        );

        // 2 & 3. For each stat card, compute horizontal centre relative to container
        // and place tween (opacity 0 -> 1, y 40 -> 0) at position = (card centre x / travelDistance)
        const cards = gsap.utils.toArray(".stat-box");
        const containerRect = container.getBoundingClientRect();
        let lastPos = 0.02;

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX =
            cardRect.left - containerRect.left + cardRect.width / 2;
          let position = cardCenterX / travelDistance;

          // Keep position within safe timeline bounds [0.08, 0.92] so card finishes reveal before car ends
          position = Math.max(0.08, Math.min(position, 0.92));

          // Ensure strictly sequential reveal order (98% -> 3x -> 75% -> 24/7)
          if (position <= lastPos) {
            position = Math.min(0.92, lastPos + 0.06);
          }
          lastPos = position;

          scrollTl.fromTo(
            card,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.08,
              ease: "power1.out",
            },
            position
          );
        });
      };

      setupScrollTimeline();

      // Recalculate on window resize
      const handleResize = () => {
        setupScrollTimeline();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (scrollTl) {
          scrollTl.scrollTrigger?.kill();
          scrollTl.kill();
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-screen bg-[#0f172a] bg-grid-navy text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Area: Headline & Sub-line */}
      <div className="w-full flex justify-center pt-8 sm:pt-10 md:pt-14 px-4 z-10">
        <div
          ref={headlineRef}
          className="flex flex-col items-center text-center select-none"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-slate-400 mb-2 sm:mb-3">
            SCROLL TO DRIVE
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-white leading-tight">
            W E L C O M E &nbsp;
            <span className="text-[#f59e0b]">I T Z &nbsp; F I Z Z</span>
          </h1>
          <div className="w-[60px] h-[3px] bg-[#f59e0b] rounded-full mt-3 sm:mt-4" />
        </div>
      </div>

      {/* Middle Area: Stat Cards (Hidden on load, revealed one-by-one as car passes) */}
      <div className="w-full flex justify-center items-center px-4 sm:px-6 my-auto z-10">
        <div
          ref={statsRef}
          className="grid grid-flow-col grid-rows-2 md:grid-flow-row md:grid-rows-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-4xl lg:max-w-5xl"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-box relative flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden opacity-0"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              {/* 4px solid colour bar at top of card */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: stat.color }}
              />

              {/* Number: very large, extra-bold in card colour */}
              <span
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>

              {/* Description: small, light gray (#94a3b8), uppercase with slight letter-spacing */}
              <span className="text-[11px] sm:text-xs md:text-sm text-[#94a3b8] mt-2 uppercase tracking-wider text-center font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Area: Road (Aerial View) flanked by green grass */}
      <div className="w-full select-none z-10">
        {/* Darker green grass above road */}
        <div className="w-full h-3 sm:h-4 bg-[#14532d]" />

        {/* Road strip (dark gray with edge lines and white dashed centre line) */}
        <div className="relative w-full bg-[#374151] border-t-2 border-b-2 border-[#9ca3af] py-4 sm:py-5 overflow-hidden">
          {/* White dashed centre line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b-2 border-dashed border-white pointer-events-none" />

          {/* Flat 2D Top-Down Car pointing RIGHT */}
          <div
            ref={carRef}
            className="relative z-10 w-48 sm:w-60 md:w-72 will-change-transform"
          >
            <svg
              viewBox="0 0 220 90"
              className="w-full h-auto block select-none pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 4 Wheels */}
              <rect x="35" y="4" width="34" height="12" rx="3" fill="#111827" />
              <rect x="35" y="74" width="34" height="12" rx="3" fill="#111827" />
              <rect x="150" y="4" width="34" height="12" rx="3" fill="#111827" />
              <rect x="150" y="74" width="34" height="12" rx="3" fill="#111827" />

              {/* Side Mirrors */}
              <rect x="142" y="6" width="10" height="7" rx="2" fill="#ef4444" />
              <rect x="142" y="77" width="10" height="7" rx="2" fill="#ef4444" />

              {/* Main Car Body: solid red #ef4444 with thin darker-red #b91c1c outline */}
              <rect
                x="20"
                y="14"
                width="180"
                height="62"
                rx="20"
                fill="#ef4444"
                stroke="#b91c1c"
                strokeWidth="2"
              />

              {/* Headlights (front right) */}
              <rect x="194" y="20" width="6" height="10" rx="2" fill="#fef08a" />
              <rect x="194" y="60" width="6" height="10" rx="2" fill="#fef08a" />

              {/* Taillights (rear left) */}
              <rect x="20" y="20" width="4" height="8" rx="1" fill="#991b1b" />
              <rect x="20" y="62" width="4" height="8" rx="1" fill="#991b1b" />

              {/* Cabin / Roof Area */}
              <rect
                x="62"
                y="22"
                width="92"
                height="46"
                rx="8"
                fill="#dc2626"
                stroke="#b91c1c"
                strokeWidth="1.5"
              />

              {/* Rear Window */}
              <rect x="68" y="26" width="14" height="38" rx="3" fill="#bae6fd" />

              {/* Front Windshield */}
              <rect x="134" y="26" width="16" height="38" rx="4" fill="#bae6fd" />

              {/* Side Windows */}
              <rect x="85" y="23" width="46" height="4" rx="1" fill="#bae6fd" />
              <rect x="85" y="63" width="46" height="4" rx="1" fill="#bae6fd" />

              {/* Roof Center Panel */}
              <rect x="86" y="28" width="44" height="34" rx="3" fill="#ef4444" />

              {/* Flat roof stripe in white */}
              <rect x="86" y="42" width="44" height="6" fill="#ffffff" rx="1" />
            </svg>
          </div>
        </div>

        {/* Darker green grass below road */}
        <div className="w-full h-3 sm:h-4 bg-[#14532d]" />
      </div>
    </section>
  );
}
