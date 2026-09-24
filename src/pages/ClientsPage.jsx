import React from 'react';
import ClientsSection from '../components/ClientsSection';
import TestimonialSlider from '../components/TestimonialSlider';
import {
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';

export default function ClientsPage({ onOpenSchedule }) {

  return (
    <div className="pt-20">
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/firesafety.jpg"
            alt="Mission Critical Security & Corporate Clients"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d041a]/95 via-[#120722]/85 to-[#120722]"></div>
          <div className="absolute inset-0 bg-tech-grid opacity-60"></div>
        </div>

        <div className="bg-glow-orb w-[500px] h-[500px] bg-purple-700/20 -top-20 left-1/3"></div>
        <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/15 bottom-0 right-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-10 sm:py-12">
          <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#261047]/90 border border-amber-400/40 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-black tracking-[0.2em] text-amber-300 uppercase">
              CLIENT COMMUNITY &amp; TRUST
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
            OUR COMMUNITY <span className="text-gold-gradient">OF CLIENTS</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c4e9] max-w-3xl mx-auto leading-relaxed">
            Proudly serving leading aviation leaders (<span className="text-white font-semibold">Interglobe Aviation Limited (Indigo), Air India, Etihad, Gulf Air, Qatar AirWays, Air France, KLM, Akasa Air, Scoot Air, Agile Airport Services</span>), corporations (<span className="text-white font-semibold">Fedex Express Transportation, Cosmo First Limited, Impetus Technologies India Pvt. Ltd., Rio Tinto, Divine Interiors, Aadharshila India</span>), and national safety forces &amp; academies (<span className="text-white font-semibold">Civil Defence, Rafi Ahmed Kidwai National Postal Acadamy, National Disaster Response Force (NDRF)</span>).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 text-xs text-[#d8b4fe]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-400" />
              <span>200+ Enterprise Installations</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Aviation &amp; Defense Trusted</span>
            </div>
          </div>
        </div>
      </div>

      <ClientsSection onOpenSchedule={onOpenSchedule} />

      <section className="py-14 sm:py-16 bg-[#140828] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="section-badge justify-center mb-2">SATISFIED CLIENTS</div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              SEE WHAT OUR SATISFIED <span className="text-gold-gradient">CLIENTS ARE SAYING</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c4e9] mt-2">
              Verified feedback from aviation authorities, logistics networks, and enterprise technology hubs across India.
            </p>
          </div>

          <TestimonialSlider />

        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#220c3d] via-[#16082b] to-[#220c3d] border-t border-amber-400/30 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-xl sm:text-3xl lg:text-4xl font-black font-heading text-white mb-3">
            Ready to enhance your workplace security and efficiency?
          </h3>
          <p className="text-xs sm:text-sm text-[#d1c4e9] max-w-xl mx-auto mb-6">
            Join over 200+ thriving enterprises, airlines, and corporate facilities.
          </p>
          <button
            onClick={() => onOpenSchedule({ 
              type: 'general', 
              title: 'Join Global Enterprises Client Network',
              subtitle: 'Corporate vendor onboarding, client contracts & multi-facility management'
            })}
            className="btn-gold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-2xl cursor-pointer"
          >
            <span>Join Us Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
