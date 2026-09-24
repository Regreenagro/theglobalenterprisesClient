import React from 'react';
import DraggableMarquee from './DraggableMarquee';
import {
  Plane,
  Truck,
  Factory,
  Shield,
  AlertOctagon,
  CheckCircle,
  Award,
  Building2,
  ArrowRight
} from 'lucide-react';

export default function ClientsSection({ onOpenSchedule }) {
  const communityClients = [
    { name: 'Interglobe Aviation Limited (Indigo)', sector: 'Aviation Infrastructure', logo: '/logos/clients/indigo.svg' },
    { name: 'Fedex Express Transportation', sector: 'Global Logistics & Supply Chain', logo: '/logos/clients/fedex.svg' },
    { name: 'Air India', sector: 'National Flag Carrier', logo: '/logos/clients/airindia.svg' },
    { name: 'Cosmo First Limited', sector: 'Specialty Films & Chemicals', logo: '/logos/clients/cosmofirst.svg' },
    { name: 'Etihad', sector: 'Global Airline Fleet', logo: '/logos/clients/etihad.svg' },
    { name: 'Impetus Technologies India Pvt. Ltd.', sector: 'Enterprise Cloud & Big Data', logo: '/logos/clients/impetus.svg' },
    { name: 'Gulf Air', sector: 'International Aviation Fleet', logo: '/logos/clients/gulfair.svg' },
    { name: 'Qatar AirWays', sector: 'International Commercial Airline', logo: '/logos/clients/qatarairways.jpg' },
    { name: 'Aadharshila India', sector: 'Social & Education Infrastructure', logo: '/logos/clients/aadharshila.svg' },
    { name: 'Air France', sector: 'Global Airline Fleet', logo: '/logos/clients/airfrance.svg' },
    { name: 'KLM', sector: 'Royal Dutch Airlines', logo: '/logos/clients/klm.svg' },
    { name: 'Akasa Air', sector: 'Commercial Airline', logo: '/logos/clients/akasa.svg' },
    { name: 'Agile Airport Services', sector: 'Airport Ground Operations', logo: '/logos/clients/agile.svg' },
    { name: 'Rio Tinto', sector: 'Industrial Enterprise', logo: '/logos/clients/riotinto.svg' },
    { name: 'Divine Interiors', sector: 'Commercial Space Design', logo: '/logos/clients/divine.svg' },
    { name: 'Aadharshila India', sector: 'Infrastructure Development', logo: '/logos/clients/aadharshila.svg' },
    { name: 'Civil Defence', sector: 'Public Safety Agency', logo: '/logos/clients/civildefense.svg' },
    { name: 'Scoot Air', sector: 'International Airline', logo: '/logos/clients/scoot.svg' },
    { name: 'Rafi Ahmed Kidwai National Postal Acadamy', sector: 'Central Training Academy', logo: '/logos/clients/raknpa.jpg' },
    { name: 'National Disaster Response Force (NDRF)', sector: 'Disaster Response Force', logo: '/logos/clients/ndrf.svg' },
  ];

  const featuredEnterpriseClients = [
    {
      category: 'Aviation Infrastructure',
      name: 'Interglobe Aviation Limited (Indigo)',
      icon: Plane,
      image: '/images/cctv.jpg',
      desc: 'LTE body-worn cameras, operations command centers & airport workspace security technology.',
      tier: 'AVIATION STANDARDS',
    },
    {
      category: 'Global Logistics Security',
      name: 'Fedex Express Transportation',
      icon: Truck,
      image: '/images/speedgates.jpg',
      desc: 'Continuous tracking, access control barriers, distribution hub surveillance & rapid maintenance support.',
      tier: 'LOGISTICS STANDARD',
    },
    {
      category: 'Industrial Enterprise',
      name: 'Rio Tinto',
      icon: Factory,
      image: '/images/headquarters.jpg',
      desc: 'Industrial facility safety, integrated access architecture & hazardous zone optical monitoring nodes.',
      tier: 'INDUSTRIAL SPEC',
    },
    {
      category: 'Government Agency',
      name: 'Civil Defence',
      icon: Shield,
      image: '/images/firesafety.jpg',
      desc: 'Emergency response coordination systems, fire safety, automated alerting & emergency gear deployment.',
      tier: 'PUBLIC SAFETY',
    },
    {
      category: 'Disaster Response',
      name: 'National Disaster Response Force (NDRF)',
      icon: AlertOctagon,
      image: '/images/hero_bg.jpg',
      desc: 'Thermal monitoring, ruggedized body-worn cameras & disaster command center infrastructure.',
      tier: 'EMERGENCY SERVICES',
    }
  ];

  return (
    <section id="clients" className="relative py-12 sm:py-16 bg-[#120722] bg-tech-grid overflow-hidden">
      <div className="bg-glow-orb w-[600px] h-[600px] bg-amber-500/10 -top-20 -right-20"></div>
      <div className="bg-glow-orb w-[600px] h-[600px] bg-purple-700/15 bottom-0 left-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="section-badge justify-center mb-2">OUR CLIENTS &amp; PARTNERS</div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-3">
            OUR COMMUNITY <span className="text-gold-gradient">OF CLIENTS</span>
          </h2>
          <div className="inline-block px-3 py-1 text-amber-300 font-bold text-xs tracking-widest uppercase mb-3">
            WHY CLIENTS TRUST US ?
          </div>
          <p className="text-xs sm:text-sm text-[#d1c4e9]">
            We are proud to work with leading organizations across India &ndash; from growing businesses to established airlines, industrial corporations, and public services.
          </p>
        </div>

        <div className="relative w-full overflow-hidden mb-12">
          <DraggableMarquee
            items={communityClients}
            speed={1.25}
            renderItem={(client, idx) => (
              <div
                key={idx}
                className="w-[210px] min-w-[210px] sm:w-[245px] sm:min-w-[245px] h-[98px] sm:h-[110px] px-6 py-4 rounded-2xl border border-white/10 hover:border-amber-400/60 transition-all duration-300 flex items-center justify-center group bg-[#16082c]/80 backdrop-blur-md shrink-0 shadow-lg"
                title={`${client.name} - ${client.sector}`}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  draggable={false}
                  className={`max-h-11 sm:max-h-13 max-w-[175px] sm:max-w-[195px] object-contain filter drop-shadow group-hover:scale-110 transition-transform duration-300 pointer-events-none rounded-md ${
                    client.logo.includes('raknpa') ? 'bg-white p-0.5 rounded-full shadow-md' : ''
                  }`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredEnterpriseClients.map((client, idx) => {
            const Icon = client.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 group hover:-translate-y-1.5 relative overflow-hidden bg-[#180933]"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/15 bg-black shadow-lg">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120722] via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-[#120722]/90 border border-amber-400/50 backdrop-blur-md flex items-center justify-center text-amber-400 font-bold shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300 px-2.5 py-1 rounded-full bg-[#120722]/90 border border-amber-400/40 font-mono backdrop-blur-md">
                        {client.tier}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-1">
                    {client.category}
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                    {client.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed">
                    {client.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Project</span>
                  </div>
                  <span className="text-amber-400/90 font-mono text-[11px]">
                    Turnkey AMC
                  </span>
                </div>
              </div>
            );
          })}

          <div className="glass-card p-6 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-[#2b1250] to-[#17082e] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-amber-400/30 bg-black shadow-lg">
                <img
                  src="/images/workspace.jpg"
                  alt="Enterprise Onboarding"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17082e] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-amber-400 text-[#120722] flex items-center justify-center font-bold shadow-xl">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-1">
                ENTERPRISE PARTNERSHIP
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-2.5">
                Join Our Client Network
              </h3>
              <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed">
                Upgrade your corporate security, 4K CCTV surveillance, access barriers, and workspace fit-outs with our experienced engineering team.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => onOpenSchedule({ 
                  type: 'general', 
                  title: 'Join Global Enterprises Client Network',
                  subtitle: 'Corporate vendor onboarding, client contracts & multi-facility management'
                })}
                className="btn-gold w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Join Us Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
