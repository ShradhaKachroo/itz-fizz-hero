"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const statsData = [
  { value: "98%", label: "Customer satisfaction" },
  { value: "3x", label: "Faster delivery" },
  { value: "75%", label: "Cost reduction" },
  { value: "24/7", label: "Support" },
];

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Load Animation
      const loadTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Headline fades in and moves up slightly
      loadTl.from(headlineRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
      });

      // Stats fade in one by one with a small delay
      loadTl.from(
        ".stat-item",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.15,
        },
        "-=0.4"
      );

      // 2. Scroll Animation (Core Feature)
      // Pins the hero for 300% scroll distance; car moves left to right tied to scroll
      gsap.to(carRef.current, {
        x: () => {
          const car = carRef.current;
          if (!car) return 500;
          const carWidth = car.offsetWidth || 300;
          return window.innerWidth - carWidth - 48;
        },
        scale: 1.05,
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

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const carSrc = `${basePath}/car.svg`;

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-screen bg-neutral-950 text-white flex flex-col justify-between overflow-hidden p-6 sm:p-12 select-none"
    >
      {/* Top / Center Content: Headline & Stats */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full pt-8">
        {/* Headline with wide letter-spacing */}
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-white mb-10 leading-tight"
        >
          W E L C O M E &nbsp; I T Z &nbsp; F I Z Z
        </h1>

        {/* 4 Stats in a row (stack on mobile) */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl"
        >
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col items-center justify-center p-4 border border-neutral-800 rounded-lg bg-neutral-900/60"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-neutral-400 mt-1 uppercase tracking-wider text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Car near bottom-left of hero */}
      <div className="relative w-full pb-8">
        <div
          ref={carRef}
          className="w-56 sm:w-72 md:w-80 lg:w-96 will-change-transform"
        >
          <img
            src={carSrc}
            alt="Car"
            className="w-full h-auto block select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
