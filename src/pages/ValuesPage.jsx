import React from 'react';
import ValuesSection from '../components/ValuesSection';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Eye,
  Coins,
  HeartHandshake,
  Shield
} from 'lucide-react';

export default function ValuesPage() {
  const valueBreakdowns = [
    {
      title: 'Quality',
      subtitle: 'Zero Compromise on Components',
      icon: Award,
      desc: 'We strictly source OEM-certified hardware, heavy-gauge steel mountings, fire-rated cabling, and BIFMA Level 3 commercial furniture.',
      onSitePractice: 'Mandatory 100% load testing and optical telemetry verification prior to client handover.'
    },
    {
      title: 'Timeliness',
      subtitle: 'Respect for Business Deadlines',
      icon: Clock,
      desc: 'We understand that workspace delays cost money. Our project managers track milestones via real-time Gantt tracking.',
      onSitePractice: '100% on-time milestone record with zero unscheduled disruption to existing enterprise operations.'
    },
    {
      title: 'Transparency',
      subtitle: 'Itemized Honest BOQs',
      icon: Eye,
      desc: 'No hidden clauses or surprise change orders. Every line-item specification is documented clearly before execution begins.',
      onSitePractice: 'Transparent billing and real-time client access to hardware test reports and material origin certificates.'
    },
    {
      title: 'Value',
      subtitle: 'Long-Term Lifecycle Efficiency',
      icon: Coins,
      desc: 'True value is measured over years, not just initial invoice cost. We select energy-efficient, durable infrastructure with lower total cost of ownership (TCO).',
      onSitePractice: 'Energy Star certified AV systems and low-power IoT optical sensors that cut utility costs.'
    },
    {
      title: 'Dedication',
      subtitle: 'Deep Partnership Beyond Handover',
      icon: HeartHandshake,
      desc: 'We don’t abandon clients post-installation. Our turnkey AMC contracts provide ongoing proactive care and direct access to senior directors.',
      onSitePractice: 'Guaranteed 4-hour on-site technician response SLA for all enterprise AMC partners.'
    },
    {
      title: 'Integrity',
      subtitle: 'Uncompromising Ethical Principles',
      icon: ShieldCheck,
      desc: 'Honest advice even when it means recommending a more economical solution. Complete NDA confidentiality on all facility blueprints.',
      onSitePractice: 'Strict compliance with Indian data protection laws, National Building Code, and Civil Defense fire regulations.'
    }
  ];

  return (
    <div className="pt-20">
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/workspace.jpg"
            alt="Modern Ergonomic Corporate Workspace"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d041a]/95 via-[#120722]/85 to-[#120722]"></div>
          <div className="absolute inset-0 bg-tech-grid opacity-60"></div>
        </div>

        <div className="bg-glow-orb w-[500px] h-[500px] bg-purple-700/20 -top-20 left-1/4"></div>
        <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/15 bottom-0 right-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-10 sm:py-12">
          <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#261047]/90 border border-amber-400/40 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-black tracking-[0.2em] text-amber-300 uppercase">
              03 &bull; PRINCIPLES THAT DEFINE US
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
            OUR <span className="text-gold-gradient">CORE VALUES</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c4e9] max-w-3xl mx-auto leading-relaxed">
            The 6 non-negotiable standards that drive every single project deliverable: <span className="text-white font-semibold">Quality, Timeliness, Transparency, Value, Dedication,</span> and <span className="text-white font-semibold">Integrity</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 text-xs text-[#d8b4fe]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>We don&apos;t cut corners. Ever.</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% On-Time Milestone Record</span>
            </div>
          </div>
        </div>
      </div>

      <ValuesSection />

      <section className="py-14 sm:py-16 bg-[#10061e] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="section-badge justify-center mb-2">FIELD EXECUTION</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              VALUES IN ACTION: <span className="text-gold-gradient">HOW WE DELIVER</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c4e9] mt-2">
              Abstract principles mean nothing without rigorous operational enforcement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueBreakdowns.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                        {item.title}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-white mb-2">
                      {item.subtitle}
                    </h3>

                    <p className="text-xs text-[#d1c4e9] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 p-3 rounded-xl bg-[#140828]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-0.5">
                      ON-SITE VERIFICATION:
                    </div>
                    <div className="text-[11px] text-[#c4b5fd]">
                      {item.onSitePractice}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 glass-card p-8 rounded-3xl border border-amber-400/40 bg-gradient-to-r from-[#200c3b] via-[#16082b] to-[#200c3b] shadow-2xl text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>FOUNDER&apos;S ETHICAL GOVERNANCE DECLARATION</span>
            </div>

            <p className="text-base sm:text-lg italic text-[#e9d5ff] leading-relaxed mb-6 font-medium">
              &ldquo;We guarantee that every camera, every speed gate, every fire sensor, and every workstation supplied by Global Enterprises is authentic, certified, and maintained with our direct personal reputation on the line.&rdquo;
            </p>

            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              &mdash; Mr. Sachin Arora (Founder &amp; Managing Director)
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
