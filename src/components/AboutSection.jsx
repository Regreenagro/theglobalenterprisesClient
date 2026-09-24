import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  MapPin,
  Sparkles,
  Quote,
  Award,
  CheckCircle2,
  Shield,
  ArrowRight,
  Zap,
  Building,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  HeartHandshake
} from 'lucide-react';

export default function AboutSection({ onOpenSchedule }) {
  const [activeValIndex, setActiveValIndex] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    if (diffX > 40) {
      // Swiped left -> next
      setActiveValIndex((prev) => (prev + 1) % coreValues.length);
    } else if (diffX < -40) {
      // Swiped right -> prev
      setActiveValIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
    }
    touchStartX.current = null;
  };

  const nextValue = () => {
    setActiveValIndex((prev) => (prev + 1) % coreValues.length);
  };

  const prevValue = () => {
    setActiveValIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
  };

  const stats = [
    {
      icon: Calendar,
      label: 'ESTABLISHED',
      value: '2012',
      sub: 'Years of continuous industry excellence'
    },
    {
      icon: Users,
      label: 'FOUNDERS',
      value: 'Mr. Sachin Arora',
      sub: 'Visionary leadership & client relationships'
    },
    {
      icon: MapPin,
      label: 'HEADQUARTERS',
      value: 'CR Park, New Delhi',
      sub: 'Serving enterprises nationwide'
    }
  ];

  const whatWeDoTech = [
    'Security systems including CCTV, body-worn cameras and access control',
    'Audio-visual solutions for seamless communication',
    'Fire safety Installation at your workplace so that you can sleep peacefully at home',
    'System integration that brings everything together'
  ];

  const whatWeDoSpaces = [
    "Interior fit-outs that reflects your company's personality",
    'Ergonomic furniture that keeps your team comfortable',
    'Custom partitioning to create the perfect layout',
    "All those office essentials you can't work without"
  ];

  const coreValues = [
    { num: '01', title: 'Quality', statement: "We don't cut corners. Ever.", icon: Award },
    { num: '02', title: 'Timeliness', statement: 'We respect your deadlines because we know they matter.', icon: Clock },
    { num: '03', title: 'Value', statement: "Fair pricing for exceptional results – that's our promise.", icon: Coins },
    { num: '04', title: 'Dedication', statement: "We're invested in your success and work closely with you every step of the way.", icon: HeartHandshake },
    { num: '05', title: 'Integrity', statement: 'Straightforward communication and honest practices are non-negotiable.', icon: Shield },
  ];

  return (
    <section id="about" className="relative py-12 sm:py-16 bg-[#140827] overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="section-badge justify-center mb-2">ABOUT GLOBAL ENTERPRISES</div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            OUR STORY &amp; <span className="text-gold-gradient">VISION</span>
          </h2>
          <div className="inline-flex items-center gap-2 mt-3 px-3.5 py-1.5 rounded-xl bg-[#230e3d] border border-amber-400/30 text-amber-300 font-bold text-xs uppercase tracking-wider shadow-lg">
            <Award className="w-4 h-4 text-amber-400" />
            <span>One-Stop Enterprise Partner</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          <div className="lg:col-span-6 relative flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 h-full min-h-[500px] sm:min-h-[540px] bg-[#1a0b32] group shadow-2xl">
              <img
                src="/images/headquarters.jpg"
                alt="Global Enterprises Corporate Headquarters in CR Park, New Delhi"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120722] via-[#120722]/30 to-transparent"></div>

              <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#140828]/95 backdrop-blur-xl border border-amber-400/40 shadow-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/95 border border-amber-400/50 shadow-md flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Global Enterprises Corporate Logo"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading tracking-wide">
                    GLOBAL ENTERPRISES
                  </div>
                  <div className="text-[10px] text-amber-300/90 font-medium">
                    Smart Solutions, Secure Spaces
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-[#160829]/95 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    HEADQUARTERS
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" />
                    Est. 2012 &bull; New Delhi
                  </span>
                </div>
                <p className="text-xs text-[#d1c4e9] leading-snug">
                  52/21 Basement, Pocket 52, CR Park, New Delhi-110019
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="glass-card p-8 sm:p-9 rounded-3xl border border-white/10 relative overflow-hidden bg-[#1a0a33]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#271047] border border-amber-400/30 text-amber-300 text-xs font-bold mb-5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Our Story</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug mb-4">
                When Mr. Sachin Arora and Mrs. Rajni Arora founded <span className="text-white">Global Enterprises</span> in 2012, they had a clear vision: <span className="text-purple-200">to build an entity that truly makes business life easier.</span>
              </h3>

              <p className="text-sm sm:text-base text-[#d1c4e9] leading-relaxed mb-4">
                And that&apos;s exactly what we&apos;ve become – your one-stop solution for everything from cutting-edge technology to smart &amp; secure office spaces.
              </p>

              <p className="text-sm sm:text-base text-[#d1c4e9] leading-relaxed">
                We believe that every business deserves access to quality equipment, expert support, and environments that inspire productivity. That&apos;s why we&apos;ve built our company around understanding your unique needs and delivering solutions that actually work for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card p-4 rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 group bg-[#16082c]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#28114b] border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-[#120722] transition-all mb-3 shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      {stat.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold font-heading text-white mt-0.5 leading-snug">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-[#b8a7dc] mt-1 line-clamp-2">
                      {stat.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#240e44] via-[#1a0b32] to-[#240e44] border border-amber-400/30 flex items-start gap-4 shadow-xl">
              <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 shrink-0">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm italic text-amber-200 font-medium leading-relaxed">
                  &ldquo;And because we believe in relationships, not just transactions, we offer full turnkey project management and maintenance services to keep everything on track for years to come.&rdquo;
                </p>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-amber-400/80">
                  &mdash; Founders: Mr. Sachin Arora
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="section-badge justify-center mb-2">WHAT WE DO</div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-3">
              SPEND YOUR TIME ON <span className="text-gold-gradient">WHAT MATTERS MOST</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#d1c4e9]">
              We&apos;ll take care of your workspace setup and maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#190933]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold font-heading text-white">
                  Tech That Works For You
                </h4>
              </div>

              <div className="space-y-3">
                {whatWeDoTech.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#120722] border border-white/5 flex items-start gap-3 text-xs sm:text-sm text-[#d1c4e9]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#190933]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold font-heading text-white">
                  Spaces That Inspire
                </h4>
              </div>

              <div className="space-y-3">
                {whatWeDoSpaces.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#120722] border border-white/5 flex items-start gap-3 text-xs sm:text-sm text-[#d1c4e9]">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="section-badge justify-center mb-2">OUR VALUES</div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-2">
              WE&apos;RE REAL PEOPLE WHO CARE ABOUT <span className="text-gold-gradient">DELIVERING REAL RESULTS</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#d1c4e9]">
              The core principles that guide our everyday work:
            </p>
          </div>

          {/* Desktop View: 5 Cards in a Row */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 bg-[#17082e] flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-[#120722] transition-colors mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h5 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {val.title}
                    </h5>
                    <p className="text-xs text-[#d1c4e9] leading-relaxed">
                      {val.statement}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile & Tablet View: Single Interactive Box */}
          <div className="lg:hidden">
            {/* Quick-Select Tabs Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none no-scrollbar justify-start sm:justify-center px-1">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.currentTarget.blur();
                      const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                      setActiveValIndex(idx);
                      window.scrollTo({ top: currentY, behavior: 'instant' });
                      requestAnimationFrame(() => {
                        window.scrollTo({ top: currentY, behavior: 'instant' });
                      });
                    }}
                    className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      activeValIndex === idx
                        ? 'text-[#120722] z-10'
                        : 'bg-[#1b0a36] text-[#c4b5fd] border border-white/10 hover:border-amber-400/30'
                    }`}
                  >
                    {activeValIndex === idx && (
                      <motion.div
                        layoutId="activeCoreValuePill"
                        className="absolute inset-0 bg-amber-400 rounded-xl shadow-lg shadow-amber-400/20 pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32
                        }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 relative z-10 ${activeValIndex === idx ? 'text-[#120722]' : 'text-amber-400'}`} />
                    <span className="relative z-10">{val.title}</span>
                  </button>
                );
              })}
            </div>

            {/* The Single Box Container with Swipe Support */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#220c42] via-[#17082e] to-[#200a3d] shadow-2xl relative overflow-hidden transition-all duration-300"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Active Value Content */}
              {(() => {
                const currentVal = coreValues[activeValIndex];
                const Icon = currentVal.icon;
                return (
                  <div key={activeValIndex} className="relative z-10 flex flex-col justify-between min-h-[175px] animate-fadeIn">
                    <div>
                      {/* Title and Icon */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#2b1050] border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                          {currentVal.title}
                        </h4>
                      </div>

                      {/* Statement */}
                      <p className="text-sm sm:text-base text-[#dcd1f5] leading-relaxed mb-6 font-medium">
                        &ldquo;{currentVal.statement}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Controls: Dots Indicator + Prev/Next Buttons */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      {/* Dots */}
                      <div className="flex items-center gap-1.5">
                        {coreValues.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={() => setActiveValIndex(dotIdx)}
                            aria-label={`Go to value ${dotIdx + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeValIndex === dotIdx
                              ? 'w-6 bg-amber-400 shadow-md shadow-amber-400/40'
                              : 'w-2 bg-white/20 hover:bg-white/40'
                              }`}
                          />
                        ))}
                      </div>

                      {/* Prev / Next Nav Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={prevValue}
                          aria-label="Previous Value"
                          className="p-2.5 rounded-xl bg-[#240e44] border border-white/15 text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextValue}
                          aria-label="Next Value"
                          className="p-2.5 rounded-xl bg-amber-400 text-[#120722] font-bold hover:bg-amber-300 active:scale-95 transition-all shadow-md shadow-amber-400/20 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#270f49] via-[#17082e] to-[#270f49] border border-amber-400/30 mb-16 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>WHY OUR CLIENTS TRUST US</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-4">
              Trusted by Amazing Organisations Across India
            </h3>

            <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-4">
              We&apos;re incredibly proud to work with amazing organisations across India &ndash; from growing startups to established corporations like <span className="text-white font-semibold">Interglobe Aviation Limited (Indigo)</span>, <span className="text-white font-semibold">Fedex Express Transportation</span>, and <span className="text-white font-semibold">Rio Tinto</span>, as well as vital government services like <span className="text-white font-semibold">Civil Defence</span>, <span className="text-white font-semibold">Rafi Ahmed Kidwai National Postal Acadamy</span>, and the <span className="text-white font-semibold">National Disaster Response Force</span>.
            </p>

            <p className="text-xs sm:text-sm text-[#c4b5fd] leading-relaxed">
              They choose us because we deliver what we promise: quality products, excellent relationship, and solutions that genuinely make their businesses better.
            </p>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="section-badge justify-center mb-3">LOOKING FORWARD</div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-3">
            Did you like our vision?
          </h3>
          <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-6">
            As technology evolves and workplace needs change, we&apos;re committed to staying ahead. We&apos;re constantly exploring new approaches to help your business breathe in an ever-changing world. Let&apos;s help you create an environment where your business can truly flourish.
          </p>
          <div className="p-4 sm:p-6 rounded-2xl bg-[#1b0a36] border border-amber-400/30 inline-block">
            <button
              onClick={() => onOpenSchedule({ type: 'meeting', title: 'Schedule a Meeting' })}
              className="btn-gold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <span>Schedule a Meeting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
