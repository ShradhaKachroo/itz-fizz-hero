import React from "react";

export interface StatItem {
  id: string;
  value: string;
  label: string;
  accent: "cyan" | "emerald" | "amber" | "violet";
  subtext?: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: "stat-1",
    value: "98%",
    label: "Customer Satisfaction",
    accent: "cyan",
    subtext: "Verified CSAT score across enterprise deployments",
  },
  {
    id: "stat-2",
    value: "3x",
    label: "Faster Delivery",
    accent: "emerald",
    subtext: "Accelerated release velocity with CI/CD automation",
  },
  {
    id: "stat-3",
    value: "75%",
    label: "Cost Reduction",
    accent: "amber",
    subtext: "Optimized infrastructure and operational overhead",
  },
  {
    id: "stat-4",
    value: "24/7",
    label: "Support & Uptime",
    accent: "violet",
    subtext: "Continuous monitoring with 99.99% SLA guarantee",
  },
];

interface StatsGridProps {
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ className = "" }) => {
  const accentStyles = {
    cyan: {
      text: "text-cyan-400 group-hover:text-cyan-300",
      border: "hover:border-cyan-500/40",
      glow: "hover:shadow-[0_0_25px_-5px_rgba(0,240,255,0.25)]",
      badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    },
    emerald: {
      text: "text-emerald-400 group-hover:text-emerald-300",
      border: "hover:border-emerald-500/40",
      glow: "hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    amber: {
      text: "text-amber-400 group-hover:text-amber-300",
      border: "hover:border-amber-500/40",
      glow: "hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]",
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    violet: {
      text: "text-violet-400 group-hover:text-violet-300",
      border: "hover:border-violet-500/40",
      glow: "hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.25)]",
      badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    },
  };

  return (
    <div
      id="hero-stats-grid"
      className={`w-full max-w-6xl mx-auto px-4 z-20 ${className}`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {STATS_DATA.map((stat) => {
          const style = accentStyles[stat.accent];
          return (
            <div
              key={stat.id}
              className={`stat-card opacity-0 translate-y-6 group relative p-4 sm:p-5 md:p-6 rounded-2xl glass-panel border transition-all duration-300 ${style.border} ${style.glow} will-change-transform`}
            >
              {/* Subtle top indicator corner */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-500">
                  METRIC
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
              </div>

              {/* Stat Big Number */}
              <div
                className={`text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight ${style.text} transition-colors duration-200`}
              >
                {stat.value}
              </div>

              {/* Stat Description */}
              <div className="mt-1.5 text-xs sm:text-sm font-medium text-slate-200 uppercase tracking-wider font-mono">
                {stat.label}
              </div>

              {/* Detailed Context */}
              <p className="mt-1 hidden sm:block text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-2">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsGrid;
