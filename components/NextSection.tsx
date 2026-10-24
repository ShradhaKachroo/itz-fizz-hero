import React from "react";
import { ArrowUpRight, Cpu, Gauge, ShieldCheck, Zap } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, tag }) => (
  <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,240,255,0.2)]">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
        {tag}
      </span>
    </div>
    <h3 className="text-lg sm:text-xl font-bold font-sans text-white mb-2 group-hover:text-cyan-300 transition-colors">
      {title}
    </h3>
    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
      {description}
    </p>
  </div>
);

export const NextSection: React.FC = () => {
  return (
    <section
      id="next-section"
      className="relative z-30 min-h-screen bg-[#07090e] border-t border-slate-800/80 py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Next Generation Systems
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white uppercase mb-6">
            Autonomous Speed. Zero Compromise.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
            The hero pin releases seamlessly into full-stack performance. Powered by hardware-accelerated transforms, modular microservices, and kinetic design systems engineered for scale.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            tag="PERFORMANCE"
            title="Sub-16ms Frame Times"
            description="Scrubbed ScrollTrigger timelines synchronized with high-refresh display cycles via GSAP ticker."
          />
          <FeatureCard
            icon={<Gauge className="w-5 h-5" />}
            tag="ARCHITECTURE"
            title="Next.js App Router"
            description="Pure static export ready for GitHub Pages hosting with automated CI/CD deployment pipelines."
          />
          <FeatureCard
            icon={<Cpu className="w-5 h-5" />}
            tag="ACCELERATION"
            title="GPU Composition"
            description="Transforms isolated strictly to transform and opacity with zero layout recalculation overhead."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-5 h-5" />}
            tag="ACCESSIBILITY"
            title="Motion Sensitivity"
            description="Full compliance with prefers-reduced-motion media queries and responsive viewport adaptations."
          />
        </div>

        {/* Call to Action Banner */}
        <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              READY FOR PRODUCTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-sans text-white mt-1">
              Explore the ITZ FIZZ Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              Inspect the clean codebase, test the motion mechanics across devices, or deploy to your own custom domain.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="#hero-pin-container"
              className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-sans font-bold text-sm hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,240,255,0.4)] inline-flex items-center gap-2 group"
            >
              Replay Journey
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextSection;
