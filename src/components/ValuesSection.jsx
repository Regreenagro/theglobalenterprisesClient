import React from 'react';
import {
  Award,
  Clock,
  Eye,
  Coins,
  HeartHandshake,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function ValuesSection() {
  return (
    <section id="values" className="relative py-12 sm:py-16 bg-[#120722] bg-tech-grid overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-800/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="section-badge justify-center mb-2">03 / CORE VALUES</div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-3">
            THAT DRIVE <span className="text-gold-gradient">EVERYTHING WE DO</span>
          </h2>
          {/* <div className="inline-block px-3 py-1 rounded-full bg-[#240e44] border border-amber-400/30 text-amber-300 font-bold text-xs tracking-widest uppercase">
            OUR CORE VALUES
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#240f42] to-[#16082b] flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-5 border border-white/15 bg-black shadow-lg">
                <img
                  src="/images/cctv.jpg"
                  alt="Quality Engineering"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#240f42] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400 font-bold shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest px-3 py-1 rounded-full bg-[#120722]/90 border border-amber-400/30 backdrop-blur-md">
                    PILLAR 01
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-2">
                Quality
              </h3>
              <p className="text-base sm:text-xl font-bold text-amber-300 mb-3 leading-snug">
                &ldquo;We don&apos;t cut corners. Ever.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed max-w-xl">
                From certified optics and heavy-gauge mounting hardware to fire-rated cabling and precision joinery, zero-compromise engineering is our standard.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Check className="w-4 h-4" />
              <span>Certified Commercial Grade Standard</span>
            </div>
          </div>

          <div className="md:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 group">
            <div>
              <div className="relative aspect-[16/9.5] rounded-2xl overflow-hidden mb-5 border border-white/15 bg-black shadow-lg">
                <img
                  src="/images/speedgates.jpg"
                  alt="Timeliness Milestone Delivery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120722] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400 font-bold shadow-md">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-[#c4b5fd] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#120722]/90 border border-white/10 backdrop-blur-md">
                    PILLAR 02
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-heading text-white mb-2">
                Timeliness
              </h3>
              <p className="text-base font-semibold text-amber-200 mb-2">
                &ldquo;We respect your deadlines because we know they matter.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed">
                Disciplined milestone tracking ensures smooth office handovers on schedule.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              <span>100% On-Time Milestone Record</span>
            </div>
          </div>

          <div className="md:col-span-4 glass-card p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 group">
            <div>
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 border border-white/15 bg-black shadow-md">
                <img
                  src="/images/av_room.jpg"
                  alt="Transparency"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120722] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400 font-bold shadow-md">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">PILLAR 03</span>
              <h3 className="text-xl font-bold font-heading text-white mt-1 mb-2">
                Transparency
              </h3>
              <p className="text-sm font-semibold text-amber-200 mb-2">
                &ldquo;We build trust through honest communication and ethical practices.&rdquo;
              </p>
              <p className="text-xs text-[#d1c4e9] leading-relaxed">
                Itemized BOQ billing with zero hidden costs or surprise change-orders.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 glass-card p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 group">
            <div>
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 border border-white/15 bg-black shadow-md">
                <img
                  src="/images/workspace.jpg"
                  alt="Value"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120722] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400 font-bold shadow-md">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">PILLAR 04</span>
              <h3 className="text-xl font-bold font-heading text-white mt-1 mb-2">
                Value
              </h3>
              <p className="text-sm font-semibold text-amber-200 mb-2">
                &ldquo;Fair pricing for exceptional results &ndash; that’s our promise.&rdquo;
              </p>
              <p className="text-xs text-[#d1c4e9] leading-relaxed">
                Maximum lifecycle efficiency and energy savings across all installations.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 glass-card p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 group">
            <div>
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 border border-white/15 bg-black shadow-md">
                <img
                  src="/images/headquarters.jpg"
                  alt="Dedication"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120722] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400 font-bold shadow-md">
                  <HeartHandshake className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">PILLAR 05</span>
              <h3 className="text-xl font-bold font-heading text-white mt-1 mb-2">
                Dedication
              </h3>
              <p className="text-sm font-semibold text-amber-200 mb-2">
                &ldquo;We&apos;re invested in your success and work closely with you every step of the way.&rdquo;
              </p>
              <p className="text-xs text-[#d1c4e9] leading-relaxed">
                Dedicated account managers with priority emergency support.
              </p>
            </div>
          </div>

          <div className="md:col-span-12 glass-card p-6 sm:p-8 rounded-3xl border border-amber-400/30 bg-gradient-to-r from-[#200c3b] via-[#16082b] to-[#200c3b] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl overflow-hidden group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full sm:w-auto">
              <div className="relative w-full sm:w-36 aspect-[16/9] rounded-2xl overflow-hidden border border-amber-400/30 shrink-0 bg-black">
                <img
                  src="/images/firesafety.jpg"
                  alt="Integrity"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#200c3b] via-transparent to-transparent"></div>
                <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">PILLAR 06 &bull; UNCOMPROMISING PRINCIPLE</span>
                <h3 className="text-2xl font-bold font-heading text-white mt-0.5">Integrity</h3>
                <p className="text-sm font-semibold text-amber-200 mt-1">
                  &ldquo;Straightforward communication and honest practices are non-negotiable.&rdquo;
                </p>
              </div>
            </div>
            <div className="text-xs text-left sm:text-right text-[#c4b5fd] max-w-xs shrink-0">
              Certified ethical compliance, data protection NDA guarantees, and genuine hardware sourcing.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
