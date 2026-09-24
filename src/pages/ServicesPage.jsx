import React, { useState } from 'react';
import ServicesSection from '../components/ServicesSection';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Building,
  ChevronDown,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function ServicesPage({ onOpenSchedule }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'What are the components of a complete security system?',
      a: 'A complete security system includes access control, video surveillance (CCTV), intrusion detection, fire alarms, and emergency egress protocols, supported by proper network configuration.'
    },
    {
      q: 'How can I schedule a consultation or site audit?',
      a: 'You can schedule a consultation by calling or emailing us directly, or using the "Schedule a meeting" button on our website.'
    },
    {
      q: 'What are the benefits of using a single vendor for multiple infrastructure needs?',
      a: 'Using a single vendor simplifies project coordination, eliminates finger-pointing between contractors, and ensures smooth integration across security, IT, and interior fit-outs.'
    },
    {
      q: 'What is included in a Global Enterprises Turnkey AMC contract?',
      a: 'Our Turnkey AMC includes scheduled preventative maintenance, sensor calibration, optical lens cleaning, emergency technician dispatch, and dedicated account management.'
    },
    {
      q: 'Are your fire safety installations certified according to safety codes?',
      a: 'Yes. All fire safety installations, control panels, smoke detectors, and emergency linkages comply with statutory safety guidelines and National Building Code (NBC 2016) standards.'
    }
  ];

  const amcTiers = [
    {
      tier: 'Standard Maintenance AMC',
      target: 'Commercial & Retail Facilities',
      response: 'Within 12 Hours',
      visits: 'Quarterly Checkup (4/year)',
      spareParts: 'Standard OEM Rate',
      vmsMonitoring: 'Local Client Access',
      features: [
        'Preventative hardware inspections',
        'Camera lens cleaning & refocusing',
        'Fire alarm bell & zone testing',
        'Direct telephone & email support'
      ]
    },
    {
      tier: 'Enterprise Platinum AMC',
      target: 'Aviation, Logistics & Corporate Campuses',
      badge: 'RECOMMENDED',
      response: 'Guaranteed 4-Hour On-Site SLA',
      visits: 'Bi-Monthly Checkup (6/year)',
      spareParts: 'Priority Sourcing & Direct Replacement',
      vmsMonitoring: 'Central Cloud Monitoring Support',
      features: [
        'Dedicated Lead Systems Engineer',
        'Guaranteed 4-hour emergency dispatch',
        'Full compliance & sensor calibration audits',
        'Hot-swap spare buffer availability',
        'Priority technical phone hotline',
        'Comprehensive multi-year contract options'
      ]
    }
  ];

  return (
    <div className="pt-20">
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cctv.jpg"
            alt="Security Surveillance & Smart Workspace Technology"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d041a]/95 via-[#120722]/85 to-[#120722]"></div>
          <div className="absolute inset-0 bg-tech-grid opacity-60"></div>
        </div>

        <div className="bg-glow-orb w-[500px] h-[500px] bg-purple-700/20 -top-20 left-1/3"></div>
        <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/15 bottom-0 right-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-10 sm:py-12">
          <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#261047]/90 border border-amber-400/40 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-black tracking-[0.2em] text-amber-300 uppercase">
              COMPREHENSIVE ENTERPRISE SERVICES
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
            Let's Make Your Place <span className="text-gold-gradient">Safer, Together.</span>
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-[#d1c4e9] max-w-3xl mx-auto leading-relaxed">
            Surveillance &amp; Monitoring Systems Installed for Your Protection and Convenience. Imagine feeling completely secure, no matter where you are &mdash; we make that happen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-5 text-xs text-[#d8b4fe]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Tech That Works For You</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Building className="w-4 h-4 text-purple-300" />
              <span>Spaces That Inspire</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Single Accountable Partner</span>
            </div>
          </div>
        </div>
      </div>

      <ServicesSection onOpenSchedule={onOpenSchedule} />

      <section id="amc-tiers" className="py-12 sm:py-16 bg-[#10061e] border-t border-white/10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="section-badge justify-center mb-2">LIFECYCLE ASSURANCE</div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
              ANNUAL MAINTENANCE <span className="text-gold-gradient">CONTRACT (AMC) TIERS</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c4e9] mt-2">
              Guaranteed technician response times and preventative care for corporate and industrial infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {amcTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`glass-card p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${tier.badge
                  ? 'border-2 border-amber-400 bg-gradient-to-br from-[#2a1150] via-[#1a0934] to-[#120722] shadow-[0_0_35px_rgba(245,158,11,0.22)] md:scale-[1.02] ring-1 ring-amber-400/40'
                  : 'border-white/10 bg-[#16082c] hover:border-white/20'
                  }`}
              >
                {tier.badge && (
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#10061e] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.55)] flex items-center gap-1 border border-amber-200">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#10061e] text-[#10061e]" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    SERVICE LEVEL AGREEMENT
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-1">
                    {tier.tier}
                  </h3>
                  <div className="text-xs text-[#b8a7dc] mb-5">
                    Designed for: {tier.target}
                  </div>

                  <div className="space-y-3 p-4 rounded-2xl bg-[#10061e]/80 border border-white/10 mb-5 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[#c4b5fd] text-xs font-medium shrink-0">Response SLA:</span>
                      <span className="text-[#c4b5fd] text-xs font-medium text-right leading-snug">{tier.response}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[#c4b5fd] text-xs font-medium shrink-0">Preventative Audits:</span>
                      <span className="text-[#c4b5fd] text-xs font-medium text-right leading-snug">{tier.visits}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[#c4b5fd] text-xs font-medium shrink-0">VMS &amp; Telemetry:</span>
                      <span className="text-[#c4b5fd] text-xs font-medium text-right leading-snug">{tier.vmsMonitoring}</span>
                    </div>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#d1c4e9] mb-3">
                    Deliverables Included:
                  </div>
                  <div className="space-y-2 mb-6">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#d1c4e9]">
                        <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenSchedule({
                    type: 'quote',
                    service: tier.name,
                    title: `Inquire: ${tier.name}`,
                    subtitle: `Turnkey commercial quote for ${tier.subtitle}`
                  })}
                  className="btn-gold w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#140828] border-t border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 sm:mb-12">
            <div className="section-badge justify-center mb-2">COMMON INQUIRIES</div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              FREQUENTLY ASKED <span className="text-gold-gradient">QUESTIONS</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4 cursor-pointer hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#d1c4e9] leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#17082e] via-[#240f42] to-[#17082e] border-t border-amber-400/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white mb-3">
            Peace of mind starts here. <span className="text-gold-gradient">Expert security and monitoring installations.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#d1c4e9] max-w-2xl mx-auto mb-6">
            Get in touch with our friendly professionals for custom site assessments, 4K CCTV surveillance, turnstiles, and turnkey facility protection.
          </p>
          <button
            onClick={() => onOpenSchedule({ type: 'meeting', title: 'Schedule Strategy Consultation' })}
            className="btn-gold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-2xl cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
