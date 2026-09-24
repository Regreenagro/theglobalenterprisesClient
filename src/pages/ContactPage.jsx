import React from 'react';
import ContactSection from '../components/ContactSection';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/headquarters.jpg"
            alt="Global Enterprises Executive Consultation Headquarters"
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
              DIRECT CONSULTATION &amp; SCOPE ESTIMATION
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
            CONTACT &amp; <span className="text-gold-gradient">TURNKEY PROPOSAL</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c4e9] max-w-3xl mx-auto leading-relaxed">
            Reach our national engineering directors at CR Park, New Delhi or submit your workspace specifications for an itemized BOQ estimate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-5 text-[11px] sm:text-xs text-[#d8b4fe]">
            {/* Top row on small screens (2 items) */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
              <a
                href="tel:+919899933768"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors backdrop-blur-md shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">+91 98999 33768</span>
              </a>
              <a
                href="mailto:globalenterprises010@gmail.com"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors backdrop-blur-md shrink-0 max-w-[195px] sm:max-w-none"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate sm:overflow-visible">globalenterprises010@gmail.com</span>
              </a>
            </div>

            {/* Bottom row on small screens (1 item) */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="whitespace-nowrap">HQ Open: Mon – Sat 9:00 AM – 7:00 PM IST</span>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />

      <section className="py-14 sm:py-16 bg-[#10061e] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-3xl border border-white/10 bg-[#16082c] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl mb-8">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">
                NATIONAL HEADQUARTERS
              </span>
              <h3 className="text-2xl font-bold font-heading text-white mt-1 mb-2">
                CR Park Experience Studio
              </h3>
              <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed max-w-2xl">
                52/21 Basement, Pocket 52, Chittaranjan Park (CR Park), New Delhi, Delhi 110019. Easily accessible via Greater Kailash &amp; Nehru Place metro links.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <a
                href="https://www.google.com/maps/search/?api=1&query=52%2F21+Basement%2C+Pocket+52%2C+Chittaranjan+Park%2C+New+Delhi%2C+Delhi+110019"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 hover:border-amber-400"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Embedded Interactive Map Viewport */}
          <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#140828] relative">
            <div className="p-4 bg-[#1b0a36] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-white font-bold">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Live Location Pin &bull; 52/21 Pocket 52, CR Park, New Delhi-110019</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=52%2F21+Basement%2C+Pocket+52%2C+Chittaranjan+Park%2C+New+Delhi%2C+Delhi+110019"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 font-bold hover:underline flex items-center gap-1"
              >
                <span>Get Driving Directions</span> &rarr;
              </a>
            </div>
            <iframe
              title="Global Enterprises Office Location"
              src="https://maps.google.com/maps?q=52/21+Pocket+52+Chittaranjan+Park+New+Delhi+110019&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="380"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
