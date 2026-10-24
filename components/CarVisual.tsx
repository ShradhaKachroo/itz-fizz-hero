import React from "react";
import { getAssetPath } from "@/lib/utils";

interface CarVisualProps {
  className?: string;
}

/**
 * CarVisual component
 * Renders the high-performance car asset, ambient ground glow,
 * volumetric headlight illumination, and speed trail.
 */
export const CarVisual: React.FC<CarVisualProps> = ({ className = "" }) => {
  const carAssetSrc = getAssetPath("/images/car.svg");

  return (
    <div
      id="car-visual-wrapper"
      className={`relative w-full overflow-visible flex items-center select-none ${className}`}
    >
      {/* Dynamic Road Track Strip */}
      <div className="absolute inset-x-0 h-28 sm:h-36 md:h-44 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950/80 border-y border-cyan-500/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center overflow-hidden">
        {/* Subtle Asphalt Grid Texture */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30" />

        {/* Centerline Lane Markings (dashed) */}
        <div className="absolute inset-x-0 h-[2px] border-b-2 border-dashed border-slate-700/60" />

        {/* Dynamic Glowing Trail unrolling behind the car (width animated via GSAP) */}
        <div
          id="car-trail"
          className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-r from-cyan-500/5 via-cyan-400/20 to-cyan-300/40 border-r-2 border-cyan-300 shadow-[0_0_35px_rgba(0,240,255,0.4)] pointer-events-none will-change-transform"
        >
          {/* Internal light streaks within the trail */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,255,0.3)_90%,rgba(255,255,255,0.7)_100%)] opacity-70" />
        </div>
      </div>

      {/* The Animated Car Object */}
      <div
        id="car-vehicle"
        className="relative z-20 w-[240px] sm:w-[320px] md:w-[420px] lg:w-[480px] h-auto will-change-transform pointer-events-none transform-gpu"
        style={{ transformOrigin: "center center" }}
      >
        {/* Ambient Neon Ground Glow beneath car */}
        <div
          id="car-ground-glow"
          className="absolute -inset-4 sm:-inset-6 bg-cyan-400/25 blur-2xl rounded-full pointer-events-none -z-10 transition-opacity duration-300"
        />

        {/* High-Resolution Vector Supercar Image */}
        <img
          src={carAssetSrc}
          alt="ITZ FIZZ Kinetic Supercar"
          width={520}
          height={220}
          className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] select-none pointer-events-none"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default CarVisual;
