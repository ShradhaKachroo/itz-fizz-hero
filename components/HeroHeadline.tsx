import React from "react";

interface HeroHeadlineProps {
  className?: string;
}

/**
 * HeroHeadline component
 * Displays "W E L C O M E   I T Z   F I Z Z" with each letter wrapped in an individual span
 * for GSAP stagger animations during intro and scroll-driven illumination.
 */
export const HeroHeadline: React.FC<HeroHeadlineProps> = ({ className = "" }) => {
  const words = [
    { text: "WELCOME", id: "word-welcome" },
    { text: "ITZ", id: "word-itz" },
    { text: "FIZZ", id: "word-fizz" },
  ];

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Category Micro-Label */}
      <div className="headline-badge opacity-0 translate-y-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[11px] md:text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-4 shadow-[0_0_15px_-3px_rgba(0,240,255,0.3)]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Scroll Driven Interactive Experience
      </div>

      {/* Main Letter-Spaced Headline */}
      <h1
        id="hero-main-headline"
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-sans uppercase tracking-[0.25em] md:tracking-[0.35em] text-white flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 md:gap-x-14 gap-y-2 leading-none will-change-transform"
      >
        {words.map((word) => (
          <span
            key={word.id}
            className="inline-flex items-center flex-nowrap"
            aria-label={word.text}
          >
            {word.text.split("").map((char, charIdx) => (
              <span
                key={`${word.id}-${charIdx}`}
                className="headline-letter inline-block opacity-0 will-change-transform transition-colors duration-300 transform-gpu"
                data-char={char}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      {/* Subtitle / Value Hook */}
      <p className="headline-sub opacity-0 translate-y-3 mt-4 text-xs sm:text-sm md:text-base font-mono tracking-widest text-slate-400 max-w-xl uppercase">
        Precision Engineering Meets Kinetic Web Motion
      </p>
    </div>
  );
};

export default HeroHeadline;
