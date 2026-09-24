import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import OrbitalSystem from './OrbitalSystem';

export default function Hero({ onOpenSchedule }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSpotlights = [
    {
      id: 'security',
      serviceSlug: 'security_monitoring',
      title: '4K Optical Surveillance & Smart Access',
      category: 'SECURITY & MONITORING',
      badge: '4K CCTV & ACCESS CONTROL',
      image: '/images/cctv.jpg',
      specs: ['3840x2160 Ultra-HD Starlight CCTV', 'Biometric Speed Gates & Turnstiles', 'Dorset Smart Locks & Cloud VMS'],
      tagline: '24/7 visual surveillance, access control, and perimeter protection.'
    },
    {
      id: 'av',
      serviceSlug: 'audio_video',
      title: 'Boardroom & Conference Collaboration',
      category: 'AUDIO & VIDEO',
      badge: '4K CONFERENCING & PA',
      image: '/images/av_room.jpg',
      specs: ['Ceiling Beamforming Audio Array', 'Wireless Screen Sharing & Presentation', 'Digital Signage & Sound Systems'],
      tagline: 'Smart boardrooms, video conferencing walls, and public address systems.'
    },
    {
      id: 'firesafety',
      serviceSlug: 'fire_safety_rodent',
      title: 'Certified Fire Alarm & Hazard Systems',
      category: 'FIRE SAFETY & RESILIENCE',
      badge: 'NBC 2016 COMPLIANT',
      image: '/images/firesafety.jpg',
      specs: ['Optical Thermal Smoke Detection', 'Addressable Fire Panels & Sprinklers', 'Water Leak Sensing & Rodent Control'],
      tagline: 'Early warning detection, automated suppression, and complete code compliance.'
    },
    {
      id: 'network',
      serviceSlug: 'network_connectivity',
      title: 'High-Speed Enterprise Network & IT',
      category: 'NETWORK & CONNECTIVITY',
      badge: 'ENTERPRISE IT & WI-FI 6',
      image: '/images/headquarters.jpg',
      specs: ['Enterprise Wi-Fi 6 & Managed Switching', 'VoIP Telephony & Wireless P2P Links', 'High-Density Server Room Infrastructure'],
      tagline: 'Scalable wireless network architecture, high-bandwidth links, and clean cabling.'
    },
    {
      id: 'fitout',
      serviceSlug: 'fitout_leasehold',
      title: 'Ergonomic Workspace Fit-Outs',
      category: 'FIT-OUT & INTERIORS',
      badge: 'WORKSPACE FIT-OUT',
      image: '/images/workspace.jpg',
      specs: ['Modular Workstations & Ergonomic Furniture', 'Acoustic Glass Partitions & Ceilings', 'Full MEP, Lighting & Commercial Flooring'],
      tagline: 'Workspaces designed for comfort, collaboration, and productivity.'
    },
    {
      id: 'injection',
      serviceSlug: 'injection_moulding',
      title: 'Precision Injection Moulding Solutions',
      category: 'INJECTION MOULDING',
      badge: 'PRECISION MANUFACTURING',
      image: '/images/injection_moulding.jpg',
      specs: ['Job Work on Existing Client Moulds', 'Design for Manufacturing & Prototyping', 'Certified Precision Quality Control'],
      tagline: 'Agile injection moulding job work and custom end-to-end product manufacturing.'
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % heroSpotlights.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSpotlights.length, isHovered]);

  const current = heroSpotlights[activeTab];

  return (
    <section id="home" className="relative pt-14 sm:pt-16 lg:pt-[66px] pb-8 sm:pb-10 flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.jpg"
          alt="Global Enterprises Integrated Workspace & 4K CCTV Security Infrastructure"
          width="1920"
          height="1080"
          fetchpriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0419]/95 via-[#120722]/85 to-[#120722]"></div>
        <div className="absolute inset-0 bg-radial-hero"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-60"></div>
      </div>

      <div className="bg-glow-orb w-[600px] h-[600px] bg-purple-700/25 top-20 -left-32"></div>
      <div className="bg-glow-orb w-[700px] h-[700px] bg-amber-500/15 top-40 -right-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-6 sm:mb-8">
          <div className="lg:col-span-7 flex flex-col justify-start text-left">
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-3.5 px-2.5 sm:px-3 py-1 rounded-lg bg-[#251044]/90 border border-amber-400/40 max-w-full backdrop-blur-md">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.18em] text-amber-300 uppercase font-heading truncate">
                GLOBAL ENTERPRISES &bull; SMART SOLUTIONS, SECURE SPACES
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.75rem] font-extrabold font-heading text-white leading-[1.15] sm:leading-[1.08] tracking-tight mb-2.5 sm:mb-4 drop-shadow-md">
              Your Workplace. <br className="hidden sm:inline" />
              Our Expertise. <br className="hidden sm:inline" />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                One Integrated Solution.
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#d1c4e9] max-w-2xl leading-relaxed mb-5 sm:mb-6 font-normal">
              One accountable partner for the systems that keep your workplace secure, connected, and productive &mdash; designed, installed, and maintained under one roof.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <button
                onClick={() => onOpenSchedule({ type: 'meeting', title: 'Schedule Strategy Consultation' })}
                className="btn-gold px-4.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer group font-bold shadow-lg w-full sm:w-auto"
              >
                <span>Schedule a Meeting</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="btn-glass px-4.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:border-amber-400 w-full sm:w-auto"
              >
                <span>Explore our services</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-6 text-xs sm:text-sm text-[#d8b4fe]">
              {/* Row 1 on mobile: 2 items */}
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]"></span>
                  <span className="font-bold text-white">14+ Years</span>
                  <span className="text-[#c4b5fd]">of Serving</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]"></span>
                  <span className="font-bold text-white">All-in-one</span>
                  <span className="text-[#c4b5fd]">Solutions</span>
                </div>
              </div>

              {/* Row 2 on mobile: 1 item */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]"></span>
                <span className="font-bold text-white">Trusted by</span>
                <span className="text-[#c4b5fd]">200+ Businesses</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center relative">
            <OrbitalSystem
              activeNodeId={heroSpotlights[activeTab]?.id}
              onSelectNode={(nodeId) => {
                const foundIndex = heroSpotlights.findIndex(s =>
                  s.id === nodeId ||
                  (nodeId === 'security' && s.id === 'security') ||
                  (nodeId === 'speedgate' && s.id === 'security') ||
                  (nodeId === 'lock' && s.id === 'security') ||
                  (nodeId === 'cctv' && s.id === 'security') ||
                  (nodeId === 'defense' && s.id === 'security') ||
                  (nodeId === 'av' && s.id === 'av') ||
                  (nodeId === 'fire' && s.id === 'firesafety') ||
                  (nodeId === 'integration' && s.id === 'network') ||
                  (nodeId === 'network' && s.id === 'network') ||
                  (nodeId === 'furniture' && s.id === 'fitout') ||
                  (nodeId === 'fitout' && s.id === 'fitout') ||
                  (nodeId === 'moulding' && s.id === 'injection') ||
                  (nodeId === 'injection' && s.id === 'injection')
                );
                if (foundIndex !== -1) {
                  setActiveTab(foundIndex);
                }
              }}
            />
          </div>
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="glass-card rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden shadow-2xl p-4 sm:p-5 bg-[#1b0a36]/90 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-1 sm:pt-1.5 pb-2 sm:pb-2.5 mb-3.5 border-b border-white/10 no-scrollbar">
            {heroSpotlights.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.currentTarget.blur();
                  const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                  setActiveTab(idx);
                  window.scrollTo({ top: currentY, behavior: 'instant' });
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: currentY, behavior: 'instant' });
                  });
                }}
                className={`relative px-3 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeTab === idx
                    ? 'text-[#120722]'
                    : 'bg-white/5 text-[#c4b5fd] hover:text-white hover:bg-white/10'
                  }`}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeHeroSpotlightPill"
                    className="absolute inset-0 bg-amber-400 rounded-lg sm:rounded-xl shadow-[0_0_14px_rgba(245,158,11,0.4)] pointer-events-none"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.category}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group aspect-[16/10] sm:aspect-[16/9.5] min-h-[250px] sm:min-h-[290px] border border-white/15 bg-black/40 shadow-xl">
              <img
                src={current.image}
                alt={`${current.title} - Global Enterprises ${current.category} Solutions`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#120722]/90 via-transparent to-transparent pointer-events-none"></div>

              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                  {current.badge}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#140828]/90 backdrop-blur-md border border-white/10">
                <p className="text-xs text-white font-medium">
                  {current.tagline}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">
                  Core Solution
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-3">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-4">
                  End-to-end design, installation, and ongoing maintenance support.
                </p>

                <div className="space-y-2 mb-6">
                  {current.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-[#c4b5fd]">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenSchedule({ 
                    type: 'meeting', 
                    service: current.title, 
                    title: `Schedule Consultation: ${current.category}`,
                    subtitle: `30-minute technical session on ${current.title}`
                  })}
                  className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  to={`/services?service=${current.serviceSlug}`}
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4 flex items-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
