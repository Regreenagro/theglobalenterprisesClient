import React from 'react';
import AboutSection from '../components/AboutSection';
import {
  ShieldCheck,
  Award,
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building
} from 'lucide-react';

export default function AboutPage({ onOpenSchedule }) {
  const coreStrengths = [
    {
      icon: ShieldCheck,
      title: 'Tech That Works For You',
      desc: 'Security systems including CCTV, body-worn cameras, access control, fire safety, and full system integration.'
    },
    {
      icon: Building,
      title: 'Spaces That Inspire',
      desc: 'Interior fit-outs that reflect your company personality, ergonomic furniture, custom partitioning, and essential setups.'
    },
    {
      icon: Users,
      title: 'Relationships Over Transactions',
      desc: 'Full turnkey project management and ongoing maintenance services to keep everything running smoothly for years to come.'
    },
    {
      icon: Award,
      title: 'Proven Client Trust',
      desc: 'Trusted by Interglobe Aviation Limited (Indigo), Fedex Express Transportation, Rio Tinto, Civil Defence, National Disaster Response Force, and over 200+ thriving businesses across India.'
    }
  ];

  return (
    <div className="pt-20">
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/headquarters.jpg"
            alt="Global Enterprises Headquarters"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d041a]/95 via-[#120722]/85 to-[#120722]"></div>
          <div className="absolute inset-0 bg-tech-grid opacity-60"></div>
        </div>

        <div className="bg-glow-orb w-[500px] h-[500px] bg-purple-700/20 -top-20 left-1/4"></div>
        <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/15 bottom-0 right-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-10 sm:py-12">
          <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#261047]/90 border border-amber-400/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-black tracking-[0.2em] text-amber-300 uppercase">
              ABOUT GLOBAL ENTERPRISES
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
            MAKING BUSINESS LIFE <span className="text-gold-gradient">EASIER</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c4e9] max-w-3xl mx-auto leading-relaxed">
            Founded in 2012 by Mr. Sachin Arora and Mrs. Rajni Arora, Global Enterprises is your one-stop solution for modern workplace technology and secure office spaces.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-5 text-[11px] sm:text-xs text-[#d8b4fe]">
            {/* Top row on small screens (2 items) */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">Established 2012</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">CR Park, New Delhi</span>
              </div>
            </div>

            {/* Bottom row on small screens (1 item) */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="whitespace-nowrap">Trusted by 200+ Businesses</span>
            </div>
          </div>
        </div>
      </div>

      <AboutSection onOpenSchedule={onOpenSchedule} />

      <section className="py-24 bg-[#10061e] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-badge justify-center mb-2">OUR COMMITMENT</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-2">
              Why Companies Partner With Us
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c4e9]">
              Every project is managed with personal accountability, genuine craftsmanship, and long-term care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreStrengths.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between bg-[#16082c]">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-4 shadow">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold font-heading text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#d1c4e9] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 glass-card p-6 sm:p-8 rounded-3xl border border-amber-400/30 bg-gradient-to-r from-[#240e44] via-[#16082b] to-[#240e44] shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                <MapPin className="w-4 h-4" />
                <span>HEADQUARTERS &bull; CR PARK, NEW DELHI</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Visit Our Head Office in New Delhi
              </h3>
              <p className="text-xs sm:text-sm text-[#d1c4e9] max-w-2xl leading-relaxed">
                52/21 Basement, Pocket 52, CR Park, New Delhi-110019. Let&apos;s discuss your workspace technology, security, and interior design requirements.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onOpenSchedule({ type: 'meeting', title: 'Schedule a Meeting' })}
                className="btn-gold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-xl cursor-pointer w-full sm:w-auto"
              >
                <span>Schedule a Meeting</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
