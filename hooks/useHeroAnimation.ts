"use client";

import { useEffect, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UseHeroAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  carRef: RefObject<HTMLDivElement | null>;
  trailRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLHeadingElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  scrollHintRef: RefObject<HTMLDivElement | null>;
}

/**
 * Custom hook isolating all GSAP initial load and scroll-driven animation logic.
 * Adheres strictly to performance standards:
 * - Mutates only transform (x, y, scale, rotate) and opacity.
 * - Handles React 18/19 Strict Mode via gsap.context() and ctx.revert().
 * - Uses gsap.matchMedia() for responsive desktop vs mobile choreographies.
 * - Respects prefers-reduced-motion.
 * - Triggers ScrollTrigger.refresh() on font and layout readiness.
 */
export function useHeroAnimation({
  containerRef,
  trackRef,
  carRef,
  trailRef,
  headlineRef,
  statsRef,
  scrollHintRef,
}: UseHeroAnimationProps) {
  useEffect(() => {
    const container = containerRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const scrollHint = scrollHintRef.current;
    const statsContainer = statsRef.current;

    if (!container || !car) return;

    // Detect user accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Handle Reduced Motion: show static layout without scroll locking or intensive transforms
    if (prefersReducedMotion) {
      gsap.set(
        [
          ".headline-badge",
          ".headline-letter",
          ".headline-sub",
          ".stat-card",
          car,
          scrollHint,
        ],
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          clearProps: "all",
        }
      );
      if (trail) {
        gsap.set(trail, { width: "100%", opacity: 0.3 });
      }
      return;
    }

    // Isolate GSAP animations within a context for safe cleanup & StrictMode compatibility
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==========================================
      // 1. MASTER INTRO LOAD TIMELINE
      // ==========================================
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        id: "heroIntroTimeline",
      });

      // Target individual letter spans for stagger
      const letters = container.querySelectorAll(".headline-letter");
      const statCards = container.querySelectorAll(".stat-card");

      introTl
        .to(".headline-badge", {
          opacity: 1,
          y: 0,
          duration: 0.6,
        })
        .to(
          letters,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.035,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        )
        .to(
          ".headline-sub",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .fromTo(
          car,
          {
            opacity: 0,
            x: -80,
            scale: 0.94,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            force3D: true,
          },
          "-=0.6"
        )
        .to(
          statCards,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.6"
        )
        .to(
          scrollHint,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.2"
        );

      // ==========================================
      // 2. RESPONSIVE SCROLL-DRIVEN TIMELINE
      // ==========================================
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };

          // Build master scroll timeline tied to scroll progress
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              pin: true,
              start: "top top",
              end: "+=240%", // Pins for ~240vh scroll depth
              scrub: 1.2, // Smooth interpolation (1.2s lag)
              anticipatePin: 1,
              invalidateOnRefresh: true, // Recalculates viewport dimensions dynamically
            },
          });

          // A. Fade out scroll prompt immediately on user scroll
          if (scrollHint) {
            scrollTl.to(
              scrollHint,
              {
                opacity: 0,
                y: -15,
                duration: 0.1,
                ease: "power1.out",
              },
              0
            );
          }

          // B. Calculate responsive end distance for the car
          const calculateDistance = () => {
            const viewportWidth = window.innerWidth;
            const carWidth = isDesktop ? 480 : 260;
            // Travel across the full width with edge padding
            return Math.max(viewportWidth - carWidth, 240);
          };

          // C. Car translation, dynamic aerodynamic tilt & scale
          scrollTl.to(
            car,
            {
              x: calculateDistance,
              ease: "none",
              force3D: true,
              duration: 1,
            },
            0
          );

          // Subtle suspension pitch/tilt simulating acceleration then deceleration
          scrollTl.to(
            car,
            {
              keyframes: [
                { rotation: 1.2, scale: isDesktop ? 1.04 : 1.02, duration: 0.4 },
                { rotation: -0.6, scale: 1.02, duration: 0.3 },
                { rotation: 0, scale: 1, duration: 0.3 },
              ],
              ease: "sine.inOut",
            },
            0
          );

          // D. Unroll glowing speed trail behind car dynamically
          if (trail) {
            scrollTl.to(
              trail,
              {
                width: () => {
                  const carX = calculateDistance();
                  const offset = isDesktop ? 240 : 130;
                  return `${carX + offset}px`;
                },
                ease: "none",
                duration: 1,
              },
              0
            );
          }

          // E. Headline letters reaction / light-up wave as car passes
          if (letters.length > 0) {
            scrollTl.to(
              letters,
              {
                color: "#38bdf8",
                textShadow: "0 0 25px rgba(0, 240, 255, 0.8)",
                stagger: {
                  each: 0.03,
                  from: "start",
                },
                duration: 0.5,
                ease: "power1.inOut",
              },
              0.1
            );

            // Headline parallax shift and gentle fade toward final scroll
            scrollTl.to(
              headlineRef.current,
              {
                y: isDesktop ? -45 : -25,
                opacity: 0.45,
                ease: "power2.inOut",
                duration: 0.7,
              },
              0.3
            );
          }

          // F. Stats cards parallax elevation and reactive glow
          if (statCards.length > 0) {
            scrollTl.to(
              statCards,
              {
                y: isDesktop ? -30 : -15,
                stagger: {
                  each: 0.04,
                  from: "start",
                },
                ease: "power1.out",
                duration: 0.7,
              },
              0.2
            );
          }

          return () => {
            // Context cleanup handles sub-timelines
          };
        }
      );
    }, container);

    // Refresh ScrollTrigger once fonts and images are ready to ensure rock-solid layout coordinates
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(handleRefresh);
    }
    window.addEventListener("resize", handleRefresh);

    return () => {
      window.removeEventListener("resize", handleRefresh);
      ctx.revert(); // Completely cleans up all GSAP timelines and ScrollTrigger instances
    };
  }, [
    containerRef,
    trackRef,
    carRef,
    trailRef,
    headlineRef,
    statsRef,
    scrollHintRef,
  ]);
}

export default useHeroAnimation;
