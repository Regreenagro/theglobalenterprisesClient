import React from 'react';
import MissionSection from '../components/MissionSection';
import {
  Target,
  Leaf,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function MissionPage({ onOpenSchedule }) {
  const visionRoadmap = [
    {
      horizon: 'HORIZON 2026',
      title: 'AI Optical Telemetry & Biometric Unification',
      desc: 'Deploying edge-AI cameras with automated intrusion detection and frictionless palm-vein & 3D facial speed gates across enterprise towers.',
      metric: '0.2s Frictionless Transit'
    },
    {
      horizon: 'HORIZON 2028',
      title: 'Zero-Waste Modular Workspaces',
      desc: '100% relocatable demountable glass partition systems and recyclable steel desk frames, eliminating construction demolition waste completely.',
      metric: 'Zero Demolition Landfill'
    },
    {
      horizon: 'HORIZON 2030',
      title: 'Unified IoT Autonomous Facilities',
      desc: 'Centralized smart building command hubs connecting HVAC, lighting, fire safety, and CCTV into an energy-autonomous ecosystem.',
      metric: '35% Energy Reduction'
    }
  ];

  const ecoPractices = [
    {
      title: 'Demountable Architectural Partitions',
      desc: 'Eliminates gypsum drywall demolition waste when offices reconfigure. Tracks can be relocated and reused indefinitely.'
    },
    {
      title: 'Energy-Star Certified AV & Display Codecs',
      desc: 'Low-power 4K displays and intelligent standby modes cutting facility kilowatt consumption during off-hours.'
    },
    {
      title: 'BIFMA Level 3 Sustainable Ergonomics',
      desc: 'Forest-certified commercial desktop surfaces, recyclable aluminum mechanisms, and low-VOC powder coatings.'
    },
    {
      title: 'Intelligent HVAC & Fire Interlocks',
      desc: 'Automated thermal linkage instantly halts ventilation in affected zones, saving energy and preserving fire safety.'
    }
  ];

  return (
    <div className="pt-20">
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.jpg"
            alt="Global Technology & Sustainable Infrastructure"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d041a]/95 via-[#120722]/85 to-[#120722]"></div>
          <div className="absolute inset-0 bg-tech-grid opacity-60"></div>
        </div>

        <div className="bg-glow-orb w-[500px] h-[500px] bg-purple-700/20 -top-20 right-1/3"></div>
        <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/15 bottom-0 left-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-10 sm:py-12">
          <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#261047]/90 border border-amber-400/40 backdrop-blur-md">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-black tracking-[0.2em] text-amber-300 uppercase">
              04 &bull; PURPOSE &amp; SUSTAINABILITY ROADMAP
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
            OUR <span className="text-gold-gradient">MISSION &amp; VISION</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c4e9] max-w-3xl mx-auto leading-relaxed">
            Providing a single accountable one-stop solution for all technological and office infrastructure needs by combining cutting-edge innovations with sustainable, lifecycle-tested execution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 text-xs text-[#d8b4fe]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Quality &amp; Variety</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Sustainable Eco-Practices</span>
            </div>
          </div>
        </div>
      </div>

      <MissionSection onOpenSchedule={onOpenSchedule} />

      <section className="py-14 sm:py-16 bg-[#10061e] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="section-badge justify-center mb-2">FUTURE-READY ENGINEERING</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              VISION 2030: <span className="text-gold-gradient">SMART AUTONOMOUS SPACES</span>
            </h2>
            <p className="text-sm text-[#d1c4e9] mt-2">
              How Global Enterprises is pioneering the next evolution of connected commercial facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visionRoadmap.map((v, idx) => (
              <div
                key={idx}
                className="glass-card p-7 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                    {v.horizon}
                  </span>

                  <h3 className="text-xl font-bold font-heading text-white mt-4 mb-2">
                    {v.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-6">
                    {v.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#a895be]">Benchmark:</span>
                  <span className="font-bold text-emerald-400 font-mono">{v.metric}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-24 bg-[#140828] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-5">
              <div className="section-badge mb-2">ENVIRONMENTAL STEWARDSHIP</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight mb-4">
                SUSTAINABLE <span className="text-gold-gradient">WORKSPACE DESIGNS</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-6">
                Modern enterprise technology and comfortable office aesthetics shouldn&apos;t come at an environmental cost. We integrate low-energy hardware and modular demountable architecture into every deployment.
              </p>

              <button
                onClick={() => onOpenSchedule({
                  type: 'inquiry',
                  service: 'Sustainable Workspace Designs',
                  title: 'Inquire: Sustainable Workspace Designs'
                })}
                className="btn-gold px-7 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Inquire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ecoPractices.map((eco, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                    <Leaf className="w-4 h-4" />
                    <span>ECO-STANDARD 0{idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold font-heading text-white mb-1.5">
                    {eco.title}
                  </h4>
                  <p className="text-xs text-[#d1c4e9] leading-relaxed">
                    {eco.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
