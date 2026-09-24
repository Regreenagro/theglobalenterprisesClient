import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Shield,
  CheckCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServicesSection({ onOpenSchedule }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialHandledRef = useRef(false);

  useEffect(() => {
    const serviceParam = searchParams.get('service') || '';
    if (!serviceParam || initialHandledRef.current) return;

    const s = serviceParam.toLowerCase();
    let targetIdx = -1;

    if (['security', 'security_monitoring', 'cctv', 'surveillance', 'access', 'access_control', 'speedgates', 'smart_locks', 'smartlock', 'attendance'].includes(s)) targetIdx = 0;
    else if (['av', 'audio_video', 'audio', 'video', 'epabx', 'conference', 'conferencing', 'display', 'av_solutions'].includes(s)) targetIdx = 1;
    else if (['firesafety', 'fire_safety', 'fire_safety_rodent', 'fire', 'leakage', 'rodent', 'fire_detection'].includes(s)) targetIdx = 2;
    else if (['network', 'network_connectivity', 'connectivity', 'it', 'networking', 'network_integration', 'cabling'].includes(s)) targetIdx = 3;
    else if (['fitout', 'fitout_leasehold', 'interiors', 'workspace', 'leasehold', 'leasehold_fitout', 'leasehold_improvements', 'furniture'].includes(s)) targetIdx = 4;
    else if (['injection', 'injection_moulding', 'moulding', 'manufacturing', 'plastics'].includes(s)) targetIdx = 5;

    if (targetIdx !== -1) {
      initialHandledRef.current = true;
      setActiveTab(targetIdx);
      setTimeout(() => {
        const el = document.getElementById('services-interactive');
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 150);
    }
  }, [searchParams]);

  // Track scroll position to show floating left drawer ONLY on desktop screens when scrolled deeply down
  useEffect(() => {
    const handleScroll = () => {
      // Only active on desktop (lg and above >= 1024px)
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        if (showFloatingMenu) setShowFloatingMenu(false);
        return;
      }

      const el = document.getElementById('services-interactive');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      
      // Show ONLY when user has scrolled deeply into the capabilities/middle section (rect.top < -350)
      if (rect.top < -350 && rect.bottom > 300) {
        setShowFloatingMenu(true);
      } else {
        setShowFloatingMenu(false);
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleTabChange = useCallback((idx) => {
    const savedY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    setActiveTab(idx);

    // Keep screen position completely locked so no shifting occurs
    window.scrollTo({ top: savedY, behavior: 'instant' });
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedY, behavior: 'instant' });
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedY, behavior: 'instant' });
      });
    });
  }, []);

  const current = useMemo(() => servicesData[activeTab] || servicesData[0], [activeTab]);

  return (
    <section id="services-interactive" className="relative py-12 sm:py-16 bg-[#120722] bg-tech-grid overflow-hidden" style={{ overflowAnchor: 'none' }}>
      <div className="bg-glow-orb w-[600px] h-[600px] bg-purple-700/15 top-1/4 -right-40"></div>
      <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/10 bottom-20 -left-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="section-badge justify-center mb-2">SERVICES DIRECTORY</div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-3">
            OUR SPECIALIZED <span className="text-gold-gradient">SERVICE DOMAINS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#d1c4e9] mb-3">
            Select any domain below to explore detailed offerings, technical capabilities, and tailored solutions.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#230d42] border border-amber-400/35 text-xs text-[#d1c4e9] shadow-md">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 font-mono bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30">
              AMC Available
            </span>
            <span className="hidden sm:inline">All systems backed by 24/7 preventative maintenance &amp; 4-hr SLA.</span>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('amc-tiers');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 cursor-pointer flex items-center gap-1"
            >
              <span>View AMC Plans</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Top 6 Services Grid Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {servicesData.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={s.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.currentTarget.blur();
                  handleTabChange(idx);
                }}
                className={`relative p-3.5 rounded-2xl text-left transition-colors duration-200 cursor-pointer border flex flex-col justify-between group ${
                  isSelected
                    ? 'border-transparent text-[#10061e] font-extrabold z-10'
                    : 'bg-[#180933]/90 text-[#c4b5fd] border-white/10 hover:border-amber-400/40 hover:text-white hover:bg-[#230e3f]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeServiceDomainTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl border border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.45)] pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-[#10061e]/85 font-bold' : 'opacity-80'}`}>0{idx + 1}</span>
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isSelected ? 'text-[#10061e]' : 'text-amber-400'}`} />
                </div>
                <div className={`relative z-10 text-xs font-bold font-heading line-clamp-2 ${isSelected ? 'text-[#10061e]' : ''}`}>
                  {s.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Detailed Service Content Card */}
        <div className="glass-card rounded-3xl border border-white/15 overflow-hidden shadow-2xl p-6 sm:p-10 bg-gradient-to-br from-[#1b0a36] via-[#140828] to-[#1c0b38] min-h-[580px]" style={{ overflowAnchor: 'none' }}>
          <div className="mb-8 pb-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="leading-snug">{current.subHeadline}</span>
              </div>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-snug mb-2 sm:mb-3">
                {current.headline}
              </h3>
              {current.introTitle && (
                <h4 className="text-xs sm:text-sm lg:text-base font-bold text-amber-300 mb-2 leading-snug">
                  {current.introTitle}
                </h4>
              )}
              <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed">
                {current.intro}
              </p>
            </div>

            <button
              onClick={() => onOpenSchedule({
                type: 'inquiry',
                service: current.title,
                title: `Inquire: ${current.title}`,
                subtitle: `Direct engineering inquiry for ${current.title}`
              })}
              className="btn-gold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-xl shrink-0 self-start lg:self-center"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>CORE SERVICE CAPABILITIES</span>
              </div>

              {current.coreOfferings.map((offering, oIdx) => (
                <div key={oIdx} className="p-4 sm:p-6 rounded-2xl bg-[#140828] border border-white/10 space-y-3.5 sm:space-y-4">
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold font-heading text-white text-gold-gradient">
                      {offering.name}
                    </h4>
                    {offering.subtitle && (
                      <div className="text-xs text-amber-300/90 font-medium mt-0.5">
                        {offering.subtitle}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2.5">
                    {offering.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#d1c4e9] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {offering.subgroups && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{offering.subgroupTitle || 'Key Deployments & Options:'}</span>
                      </div>
                      <div className={`grid grid-cols-1 ${offering.subgroups.length === 2 ? 'sm:grid-cols-2 gap-3.5' : 'sm:grid-cols-3 gap-2.5'}`}>
                        {offering.subgroups.map((sub, sIdx) => (
                          <div 
                            key={sIdx} 
                            className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between group/sub ${
                              offering.subgroups.length === 2
                                ? 'bg-gradient-to-br from-[#230e3f] via-[#1a0833] to-[#120524] border-amber-400/40 hover:border-amber-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.2)] hover:-translate-y-1 ring-1 ring-amber-400/20'
                                : 'p-3 rounded-xl bg-[#10061e]/90 border-white/10 hover:border-amber-400/40'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="font-bold text-white text-xs sm:text-sm font-heading group-hover/sub:text-amber-300 transition-colors">
                                  {sub.title}
                                </span>
                                {sub.badge ? (
                                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/40 text-amber-300 shrink-0">
                                    {sub.badge}
                                  </span>
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_#f59e0b] shrink-0"></span>
                                )}
                              </div>
                              <p className="text-[#d8cceb] text-xs leading-relaxed font-normal">
                                {sub.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {offering.integrationNote && (
                    <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 leading-relaxed flex items-start gap-2">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{offering.integrationNote}</span>
                    </div>
                  )}

                  {offering.tags && (
                    <div className="pt-3 border-t border-white/10">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span>{offering.tagTitle || 'Key Featured Technologies:'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {offering.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-[#251047] border border-amber-400/40 text-amber-200 text-xs font-medium shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/11.5] min-h-[220px] sm:min-h-[260px] border border-white/15 shadow-xl bg-black">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120722] via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#140828]/90 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                  {current.title}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#17082e] border border-amber-400/30 flex-1 flex flex-col justify-start">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>{current.benefitsTitle}</span>
                  </h4>
                  {current.benefitsSubtitle && (
                    <p className="text-xs text-[#c4b5fd] font-medium mb-4 italic">
                      {current.benefitsSubtitle}
                    </p>
                  )}
                  <div className="space-y-3">
                    {current.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#d1c4e9] leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#2a0e4c] via-[#1a0833] to-[#2a0e4c] border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
            <div className="text-center sm:text-left">
              <div className="text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-1">
                {current.closingBadge || 'EXPERT INSTALLATION & AMC SUPPORT'}
              </div>
              <h4 className="text-base sm:text-xl font-extrabold font-heading text-white">
                {current.closingHeadline || 'Peace of mind starts here. Tailored infrastructure installations.'}
              </h4>
            </div>
            <button
              onClick={() => onOpenSchedule({ 
                type: 'meeting', 
                service: current.title, 
                title: `Schedule Consultation: ${current.title}` 
              })}
              className="btn-gold px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-2xl shrink-0"
            >
              <span>{current.closingCta || 'Schedule Consultation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Quick Service Switcher Drawer on Left Edge (Appears only on Desktop when Scrolled Down) */}
      {showFloatingMenu && (
        <div 
          className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 items-center transition-all duration-300"
          onMouseEnter={() => setIsDrawerOpen(true)}
          onMouseLeave={() => setIsDrawerOpen(false)}
        >
          {/* Peeking Floating Tab with Arrow */}
          <div
            onClick={() => setIsDrawerOpen(prev => !prev)}
            className={`group cursor-pointer flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-r-2xl bg-[#1d0a38]/95 border-y border-r border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.5)] backdrop-blur-xl transition-all duration-300 select-none ${
              isDrawerOpen ? 'opacity-0 pointer-events-none -translate-x-full' : 'opacity-100 translate-x-0 hover:px-2.5'
            }`}
            title="Hover to switch services"
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span 
              className="text-[10px] font-black uppercase font-mono text-amber-300 tracking-[0.2em]"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              SERVICES
            </span>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform animate-bounce" />
          </div>

          {/* Slide-out Menu Panel */}
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-64 sm:w-72 p-3.5 rounded-r-3xl bg-[#16082c]/98 border-y-2 border-r-2 border-amber-400/70 shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.35)] backdrop-blur-2xl transition-all duration-300 ease-out origin-left flex flex-col gap-2 overflow-visible ${
              isDrawerOpen 
                ? 'opacity-100 translate-x-0 pointer-events-auto scale-100' 
                : 'opacity-0 -translate-x-full pointer-events-none scale-95'
            }`}
          >
            <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10 text-xs font-bold text-amber-300">
              <div className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Service Switcher</span>
              </div>
              <ChevronLeft 
                onClick={() => setIsDrawerOpen(false)}
                className="w-4 h-4 text-white/50 hover:text-white cursor-pointer" 
              />
            </div>

            <div className="flex flex-col gap-2 py-1 overflow-visible">
              {servicesData.map((s, idx) => {
                const Icon = s.icon;
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.currentTarget.blur();
                      setIsDrawerOpen(false);
                      handleTabChange(idx);
                    }}
                    className={`relative p-2.5 rounded-xl text-left transition-colors duration-200 cursor-pointer border flex items-center justify-between group ${
                      isSelected
                        ? 'border-transparent text-[#10061e] font-extrabold z-20 translate-x-4 sm:translate-x-5'
                        : 'bg-[#120722]/90 text-[#c4b5fd] border-white/10 hover:border-amber-400/70 hover:text-white hover:bg-[#251044] hover:scale-[1.03] hover:translate-x-3.5 hover:z-10 hover:shadow-[5px_4px_18px_rgba(0,0,0,0.6)] shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeDrawerServiceTabPill"
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 rounded-xl shadow-[6px_4px_22px_rgba(245,158,11,0.65),0_0_15px_rgba(245,158,11,0.35)] pointer-events-none ring-1 ring-amber-300/60"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32
                        }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        isSelected 
                          ? 'bg-[#10061e] text-amber-400 shadow-sm' 
                          : 'bg-white/5 border border-white/10 text-amber-400 group-hover:border-amber-400/50'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-[9px] font-mono uppercase ${
                          isSelected ? 'text-[#10061e]/80 font-bold' : 'text-amber-400/80'
                        }`}>
                          0{idx + 1}
                        </div>
                        <div className="text-xs font-bold font-heading truncate">
                          {s.shortTitle}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className={`relative z-10 w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected ? 'text-[#10061e] translate-x-0.5' : 'text-white/30 group-hover:text-amber-300 group-hover:translate-x-1'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
