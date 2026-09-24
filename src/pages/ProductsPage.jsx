import React from 'react';
import CapabilitiesMatrix from '../components/CapabilitiesMatrix';
import { Cpu, CheckCircle, ShieldCheck } from 'lucide-react';

export default function ProductsPage({ onOpenSchedule }) {
  return (
    <div className="pt-20">
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/speedgates.jpg"
            alt="Biometric Optical Speed Gates & Access Hardware"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d041a]/95 via-[#120722]/85 to-[#120722]"></div>
          <div className="absolute inset-0 bg-tech-grid opacity-60"></div>
        </div>

        <div className="bg-glow-orb w-[500px] h-[500px] bg-purple-700/20 -top-20 right-1/4"></div>
        <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/15 bottom-0 left-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-10 sm:py-12">
          <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#261047]/90 border border-amber-400/40 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-black tracking-[0.2em] text-amber-300 uppercase">
              HARDWARE &amp; ARCHITECTURAL CATALOG
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
            CAPABILITIES &amp; <span className="text-gold-gradient">SYSTEMS MATRIX</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c4e9] max-w-3xl mx-auto leading-relaxed">
            Browse certified commercial hardware lines including 4K AI starlight dome cameras, high-throughput optical speed gates, addressable fire alarm panels, and BIFMA Level 3 motorized sit-stand workstations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 text-xs text-[#d8b4fe]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>In-Stock Commercial Deployments</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Civil Defense &amp; UL Listed</span>
            </div>
          </div>
        </div>
      </div>

      <CapabilitiesMatrix onOpenSchedule={onOpenSchedule} />
    </div>
  );
}
