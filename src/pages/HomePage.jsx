import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import DraggableMarquee from '../components/DraggableMarquee';
import TestimonialSlider from '../components/TestimonialSlider';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  Building2,
  CheckCircle,
  CheckCircle2,
  Award,
  Video,
  Scan,
  Tv,
  Flame,
  Armchair,
  Shield,
  Plane,
  ChevronRight,
  ChevronDown,
  Clock,
  Star,
  Calculator,
  Layers,
  ArrowUpRight,
  Lock,
  PhoneCall,
  Server,
  Users,
  Check,
  Boxes
} from 'lucide-react';

export default function HomePage({ onOpenSchedule }) {
  const [activeSolutionTab, setActiveSolutionTab] = useState(0);
  const [estimateArea, setEstimateArea] = useState(10000);
  const [selectedEstimatorServices, setSelectedEstimatorServices] = useState(['cctv', 'av', 'fire']);
  const [openFaq, setOpenFaq] = useState(0);

  const comprehensiveSolutions = [
    {
      id: 'cctv',
      title: 'Corporate Surveillance & Monitoring',
      headline: 'Complete Corporate Surveillance & 24/7 Security',
      subtitle: 'IP, HD & STANDALONE CCTV SYSTEMS',
      category: 'SURVEILLANCE',
      icon: Video,
      image: '/images/cctv.jpg',
      badge: 'COMPLETE COVERAGE / AMC',
      desc: "Imagine feeling completely secure, no matter where you are. Strategic camera placement, expert system configuration, and remote live viewing from mobile/computer — we install IP, HD, and standalone CCTV systems tailored for complete protection.",
      features: [
        'Strategic camera placement & optimal coverage assessments',
        'Expert recording setup & effortless mobile remote viewing',
        'IP, HD & Standalone systems with Bullet, Dome, and PTZ optics'
      ]
    },
    {
      id: 'body_worn',
      title: 'Body-Worn Cameras',
      headline: 'Airline-Grade Body Cameras & Evidence Security',
      subtitle: 'FIELD DEPLOYMENT & STORAGE',
      category: 'BODY CAMERAS',
      icon: Shield,
      image: '/images/hero_bg.jpg',
      badge: 'AIRLINE TRUSTED & LTE',
      desc: "If you need body cameras, we'll show your team how to use them, so they're comfortable and confident, while handling secure, compliant video storage.",
      features: [
        'Hands-on staff training for operational confidence',
        'Secure encrypted video archival and footage management',
        'Trusted by Interglobe Aviation Limited (Indigo), Fedex Express Transportation, Air India & Etihad'
      ]
    },
    {
      id: 'fire_safety',
      title: 'Fire Safety, Leakage & Rodent Control',
      headline: 'Addressable Fire Alarms, Sprinklers & Leakage Protection',
      subtitle: 'DETECTION, SUPPRESSION & RESILIENCE',
      category: 'FIRE SAFETY',
      icon: Flame,
      image: '/images/firesafety.jpg',
      badge: 'EARLY DETECTION & RAPID RESPONSE',
      desc: 'Comprehensive Protection Against Fire, Water, and Rodent. Protecting your assets and ensuring business continuity with advanced addressable early warning, automated sprinkler suppression, continuous leak detection, and preventative rodent defense.',
      features: [
        'Advanced addressable & conventional fire alarm panels (NBC 2016)',
        'Automated sprinkler suppression & staff extinguisher training',
        'Continuous sensor water leak detection & corporate rodent management'
      ]
    },
    {
      id: 'av_solutions',
      title: 'Audio & Video Solutions',
      headline: 'Smart Boardrooms, Video Walls & Immersive AV',
      subtitle: 'CONFERENCING, DISPLAY & EPABX',
      category: 'SMART AV',
      icon: Tv,
      image: '/images/av_room.jpg',
      badge: 'PREMIER AV INTEGRATION',
      desc: 'Leading Audio & Video Solutions in India — driving productivity through seamless connectivity and immersive experiences. High-definition video conferencing, interactive displays, digital signage, noise-cancelling audio, and EPABX call routing.',
      features: [
        'High-definition video meetings & speaker-tracking smart cameras',
        'Large displays, wireless presentation & digital signage with CMS',
        'Sophisticated DSP audio, PA systems & streamlined EPABX routing'
      ]
    },
    {
      id: 'access_control',
      title: 'Access Control Systems',
      headline: 'Biometric Readers, RFID & Zoned Visitor Management',
      subtitle: 'CARD READERS & BIOMETRICS',
      category: 'ACCESS CONTROL',
      icon: Scan,
      image: '/images/speedgates.jpg',
      badge: 'INTELLIGENT ACCESS CONTROL',
      desc: "Card readers, fingerprint, and face recognition access control systems to ensure only the right people get in and every visitor is accounted for.",
      features: [
        'Smart card readers & zoned access authorization',
        'High-accuracy fingerprint and facial recognition',
        'Digital visitor management and logging verification'
      ]
    },
    {
      id: 'smart_locks',
      title: 'Smart Door Locks',
      headline: 'Dorset Smart Locks & Keyless Digital Access',
      subtitle: 'ENTERPRISE KEYLESS ENTRY',
      category: 'SMART LOCKS',
      icon: Lock,
      image: '/images/speedgates.jpg',
      badge: 'AUTHORIZED DORSET INSTALLER',
      desc: 'Enterprise keyless entry, remote management, audit logs, and integrated digital locks for robust premises management. Authorized installer and partner for Dorset.',
      features: [
        'Keyless entry, PIN keypads, and biometric locks',
        'Robust remote access configuration & audit trail logs',
        'Integrated video doorbell with two-way communication'
      ]
    },
    {
      id: 'public_access',
      title: 'Public Access & Attendance Systems',
      headline: 'Speed Gates, Turnstiles & Digital Shift Attendance',
      subtitle: 'TIME TRACKING & TURNSTILES',
      category: 'ATTENDANCE',
      icon: Users,
      image: '/images/speedgates.jpg',
      badge: 'USER-FRIENDLY SET-UPS',
      desc: 'Effortless digital time tracking, controlled access turnstiles, and real-time video monitoring and intercom for corporate entrances.',
      features: [
        'Effortless digital shift logs and time tracking',
        'Turnstiles for controlled high-throughput access',
        'Real-time entrance video monitoring and mobile integration'
      ]
    },
    {
      id: 'epabx',
      title: 'EPABX',
      headline: 'Enterprise EPABX Routing & Free Internal Calling',
      subtitle: 'OFFICE COMMUNICATIONS',
      category: 'EPABX',
      icon: PhoneCall,
      image: '/images/av_room.jpg',
      badge: 'FREE INTERNAL CALLS',
      desc: 'Simplify your office communications with our EPABX (Electronic Private Automatic Branch Exchange) service. Enjoy free internal calls, effortless call management, and a more productive workday',
      features: [
        'Simplify office communications with EPABX service',
        'Enjoy free internal calls between departments',
        'Effortless call management for a more productive workday'
      ]
    },
    {
      id: 'leasehold_fitout',
      title: 'Leasehold Improvements',
      headline: 'Turnkey Leasehold Interiors, Partitions & Acoustic Finishing',
      subtitle: 'OFFICE INTERIORS & FINISHING',
      category: 'INTERIOR FIT-OUT',
      icon: Armchair,
      image: '/images/workspace.jpg',
      badge: 'PERFECT ENVIRONMENT',
      desc: 'Get the most out of your leased space. Our leasehold improvement services deliver the perfect environment for your business, including painting, flooring, and partition installations etc.',
      features: [
        'Get the most out of your leased commercial space',
        'Delivers the perfect environment for your business',
        'Including painting, flooring, and partition installations'
      ]
    },
    {
      id: 'network_integration',
      title: 'Network Integration',
      headline: 'High-Speed Server Rooms, Cabling & Core Network Integration',
      subtitle: 'CORE IT & INFRASTRUCTURE',
      category: 'NETWORKING',
      icon: Server,
      image: '/images/headquarters.jpg',
      badge: 'RELIABLE EFFICIENT NETWORKS',
      desc: 'We build reliable, efficient networks. Implementing core infrastructure from switches and patch panel cabling to Wi-Fi and DVR integration, ensuring your business stays seamlessly connected.',
      features: [
        'Managed switches, patch panels & clean wire connections',
        'High-speed Wi-Fi access points & DVR network cabling',
        'Server room rack dressing & reliable EPABX connectivity'
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: 'Your Workplace, Secured',
      desc: 'A suite of security solutions – CCTV, fire detection, and access control – all working in harmony to optimise security. We take a holistic approach to security, ensuring every vulnerability is addressed.'
    },
    {
      icon: Zap,
      title: 'Innovation Meets Execution',
      desc: "We leverage international-grade tech and back it up with exceptional customer service. With seamless implementation and continuous support, we're with you every step of the way."
    },
    {
      icon: Layers,
      title: 'One-Stop Shop',
      desc: 'Why juggle multiple vendors when you can get everything you need from one trusted partner? We handle all your security and connectivity needs, saving you time, money, and hassle.'
    },
    {
      icon: Award,
      title: 'Focus on What Matters',
      desc: 'Focus on growing your business, knowing that your workplace is secure, connected, and operating at peak efficiency. We provide the peace of mind you need to thrive.'
    }
  ];

  const clientCommunity = [
    { name: 'Interglobe Aviation Limited (Indigo)', tag: 'Aviation Infrastructure', logo: '/logos/clients/indigo.svg' },
    { name: 'Fedex Express Transportation', tag: 'Global Logistics & Supply Chain', logo: '/logos/clients/fedex.svg' },
    { name: 'Air India', tag: 'National Flag Carrier Fleet', logo: '/logos/clients/airindia.svg' },
    { name: 'Cosmo First Limited', tag: 'Specialty Films & Chemicals', logo: '/logos/clients/cosmofirst.svg' },
    { name: 'Etihad', tag: 'Global Airline Fleet', logo: '/logos/clients/etihad.svg' },
    { name: 'Impetus Technologies India Pvt. Ltd.', tag: 'Enterprise Cloud & Big Data', logo: '/logos/clients/impetus.svg' },
    { name: 'Gulf Air', tag: 'International Aviation Fleet', logo: '/logos/clients/gulfair.svg' },
    { name: 'Qatar AirWays', tag: 'International Commercial Airline', logo: '/logos/clients/qatarairways.jpg' },
    { name: 'Aadharshila India', tag: 'Social & Education Infrastructure', logo: '/logos/clients/aadharshila.svg' },
    { name: 'Air France', tag: 'Global Aviation Fleet', logo: '/logos/clients/airfrance.svg' },
    { name: 'KLM', tag: 'Royal Dutch Airlines', logo: '/logos/clients/klm.svg' },
    { name: 'Akasa Air', tag: 'Commercial Airline', logo: '/logos/clients/akasa.svg' },
    { name: 'Agile Airport Services', tag: 'Airport Ground Operations', logo: '/logos/clients/agile.svg' },
    { name: 'Rio Tinto', tag: 'Industrial Facility Safety', logo: '/logos/clients/riotinto.svg' },
    { name: 'Divine Interiors', tag: 'Commercial Space Design', logo: '/logos/clients/divine.svg' },
    { name: 'Aadharshila India', tag: 'Infrastructure Development', logo: '/logos/clients/aadharshila.svg' },
    { name: 'Civil Defence', tag: 'Public Safety & Defense', logo: '/logos/clients/civildefense.svg' },
    { name: 'Scoot Air', tag: 'International Airline', logo: '/logos/clients/scoot.svg' },
    { name: 'Rafi Ahmed Kidwai National Postal Acadamy', tag: 'Central Training Academy', logo: '/logos/clients/raknpa.jpg' },
    { name: 'National Disaster Response Force (NDRF)', tag: 'Disaster Response Force', logo: '/logos/clients/ndrf.svg' },
  ];

  const brandPartners = [
    { name: 'Hikvision (Ptama Hikvision)', category: 'CCTV & Video Security', logo: '/logos/brands/hikvision.svg' },
    { name: 'Prama (Prama Hikvision)', category: 'Indigenous Security & Surveillance', logo: '/logos/brands/prama.png' },
    { name: 'Sparsh (Smariddhi Automations)', category: 'Surveillance Electronics', logo: '/logos/brands/sparsh.png' },
    { name: 'Honeywell', category: 'Building Automation & Fire', logo: '/logos/brands/honeywell.svg' },
    { name: 'Bosch', category: 'Security & PA Systems', logo: '/logos/brands/bosch.svg' },
    { name: 'Ahuja', category: 'Public Address & Audio', logo: '/logos/brands/ahuja.png' },
    { name: 'Dorset', category: 'Smart Door Locks & Architectural Hardware', logo: '/logos/brands/dorset.svg' },
    { name: 'Ozone', category: 'Digital Locks & Architectural Hardware', logo: '/logos/brands/ozone.avif' },
    { name: 'Harison', category: 'Security Locks & Hardware', logo: '/logos/brands/harison.svg' },
    { name: 'Vivotek', category: 'Optical Surveillance (Delta Group)', logo: '/logos/brands/vivotek.svg' },
    { name: 'Polycab', category: 'Wires & Structured Cables', logo: '/logos/brands/polycab.png' },
    { name: 'DLINK', category: 'Networking & Switches', logo: '/logos/brands/dlink.webp' },
  ];

  const clientTestimonials = [
    {
      quote: 'Global Enterprises transformed our flight operations security with robust body-worn cameras and CCTV systems. Their single-point turnkey accountability eliminated vendor friction entirely.',
      author: 'Senior Infrastructure Director',
      org: 'Aviation Fleet Partner',
      rating: 5
    },
    {
      quote: 'Their smart access control, fire detection, and rapid AMC support have kept our facilities secure and 100% operational for years. True professionals.',
      author: 'Head of Workplace Infrastructure',
      org: 'Corporate Enterprise Hub',
      rating: 5
    },
    {
      quote: 'From Dorset smart locks to complete network and server room integration, Sachin and his team delivered on time and within budget. Highly recommended!',
      author: 'Director of Operations',
      org: 'NCR Commercial Space',
      rating: 5
    }
  ];

  const faqItems = [
    {
      q: 'What are the components of a good security system?',
      a: 'A comprehensive security system majorly includes elements like access control, surveillance (CCTV), intrusion detection, fire detection, and emergency response plans. It should also consider cybersecurity.'
    },
    {
      q: 'How can I learn more or get a demo?',
      a: 'You can book a demo by calling/emailing us directly. Look for a "Book a Demo" button or contact information on our website or marketing materials.'
    },
    {
      q: 'What are the benefits of using a single vendor for multiple solutions?',
      a: 'Using a single vendor helps with procurement, makes communication easy, and often results in quality integration and support for the overall system.'
    }
  ];

  const currentSolution = comprehensiveSolutions[activeSolutionTab];

  const toggleEstimatorService = (id) => {
    if (selectedEstimatorServices.includes(id)) {
      if (selectedEstimatorServices.length > 1) {
        setSelectedEstimatorServices(selectedEstimatorServices.filter(s => s !== id));
      }
    } else {
      setSelectedEstimatorServices([...selectedEstimatorServices, id]);
    }
  };

  const calculateEstimate = () => {
    let baseRate = 0;
    if (selectedEstimatorServices.includes('cctv') || selectedEstimatorServices.includes('security')) baseRate += 45;
    if (selectedEstimatorServices.includes('av')) baseRate += 60;
    if (selectedEstimatorServices.includes('fire')) baseRate += 40;
    if (selectedEstimatorServices.includes('network') || selectedEstimatorServices.includes('turnkey')) baseRate += 35;
    if (selectedEstimatorServices.includes('workspace') || selectedEstimatorServices.includes('fitout')) baseRate += 120;
    if (selectedEstimatorServices.includes('moulding') || selectedEstimatorServices.includes('injection')) baseRate += 50;

    const est = (estimateArea * baseRate);
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(est);
  };

  return (
    <div className="relative">
      <Hero onOpenSchedule={onOpenSchedule} />

      <section className="py-4 sm:py-5 bg-gradient-to-r from-[#17082e] via-[#210c40] to-[#17082e] border-y border-amber-400/30 relative overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold shrink-0 shadow-lg">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs sm:text-base font-black font-heading text-white tracking-wide">
                  14+ Years of Serving &nbsp;|&nbsp; All-in-one Integration Solutions &nbsp;|&nbsp; Trusted by 200+ Businesses
                </div>
                <div className="text-[11px] sm:text-xs text-[#c4b5fd] mt-0.5 font-medium">
                  Next-Gen Workspace Solutions engineered and maintained under one accountable roof.
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenSchedule({ type: 'meeting', title: 'Schedule Strategy Consultation' })}
              className="btn-gold px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-xl shrink-0"
            >
              <span>Schedule a meeting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="comprehensive-solutions" className="py-10 sm:py-12 bg-[#120722] bg-tech-grid relative overflow-hidden">
        <div className="bg-glow-orb w-[600px] h-[600px] bg-purple-700/15 top-20 right-0"></div>
        <div className="bg-glow-orb w-[500px] h-[500px] bg-amber-500/10 bottom-10 left-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 gap-4">
            <div>
              <div className="section-badge mb-1.5">SECTION 3 / ENTERPRISE PORTFOLIO</div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                OUR COMPREHENSIVE <span className="text-gold-gradient">SOLUTIONS</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#d1c4e9] mt-2 max-w-3xl">
                Integrated corporate solutions for security, communication, and productivity.
              </p>
            </div>

            <Link
              to="/services"
              className="btn-gold px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 w-fit shadow-xl"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card rounded-2xl sm:rounded-3xl border border-white/15 overflow-hidden shadow-2xl p-4 sm:p-6 bg-[#180933]/90 backdrop-blur-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-5">
              {comprehensiveSolutions.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = activeSolutionTab === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.currentTarget.blur();
                      const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                      setActiveSolutionTab(idx);
                      window.scrollTo({ top: currentY, behavior: 'instant' });
                      requestAnimationFrame(() => {
                        window.scrollTo({ top: currentY, behavior: 'instant' });
                      });
                    }}
                    className={`relative p-3 rounded-2xl text-left transition-colors duration-200 cursor-pointer border ${isSelected
                      ? 'border-transparent text-[#10061e] font-extrabold z-10'
                      : 'bg-[#120722]/80 text-[#c4b5fd] border-white/10 hover:border-amber-400/40 hover:text-white'
                      }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeSolutionTabPill"
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl border border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.45)] pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32
                        }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-between mb-1">
                      <span className={`text-[10px] uppercase tracking-wider font-mono ${isSelected ? 'text-[#10061e]/85 font-bold' : 'opacity-80'}`}>
                        {idx < 9 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#10061e]' : 'text-amber-400'}`} />
                    </div>
                    <div className={`relative z-10 text-xs font-bold font-heading truncate ${isSelected ? 'text-[#10061e]' : ''}`}>
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/11] min-h-[250px] sm:min-h-[290px] border border-white/15 shadow-2xl group bg-black">
                <img
                  src={currentSolution.image}
                  alt={`${currentSolution.title} - Global Enterprises Infrastructure Solutions`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10061e] via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-[#10061e]/90 border border-amber-400/60 text-[10px] font-extrabold text-amber-300 uppercase tracking-widest backdrop-blur-md shadow-lg">
                  {currentSolution.badge}
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#17082e]/90 backdrop-blur-md border border-white/10">
                  <span className="text-xs text-white font-semibold">
                    {currentSolution.subtitle}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{currentSolution.badge || currentSolution.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white mb-3 tracking-tight leading-snug">
                    {currentSolution.headline || currentSolution.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-5 bg-[#140828] p-4 rounded-2xl border border-white/10">
                    {currentSolution.desc}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {currentSolution.features.map((feat, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-xl bg-[#120722] border border-white/10 flex items-start gap-2.5 text-xs text-[#d1c4e9]">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#230e3d] border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#e9d5ff] font-medium text-center sm:text-left">
                    Ready to enhance your workplace security and efficiency?
                  </div>
                  <button
                    onClick={() => onOpenSchedule({ 
                      type: 'inquiry', 
                      service: currentSolution.title, 
                      title: `Inquire: ${currentSolution.title}`,
                      subtitle: `Direct engineering inquiry for ${currentSolution.category}`
                    })}
                    className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#10061e] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="section-badge justify-center mb-1.5">SECTION 4 / THE DIFFERENCE</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              WHY CHOOSE <span className="text-gold-gradient">GLOBAL ENTERPRISES?</span>
            </h2>
            <div className="inline-block mt-2.5 px-3.5 py-1 rounded-full bg-[#200c3b] border border-amber-400/30 text-amber-300 font-bold text-xs tracking-wide uppercase">
              Because You Deserve More Than Just a Vendor.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 bg-[#16082c]"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1 font-mono">
                      PILLAR 0{idx + 1}
                    </div>

                    <h3 className="text-base font-bold font-heading text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#d1c4e9] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>Verified Value</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#280f47] via-[#1a0b32] to-[#280f47] border border-amber-400/40 text-center max-w-3xl mx-auto shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-1.5">
              Experience the Global Enterprises difference.
            </h3>
            <p className="text-xs sm:text-sm text-[#d1c4e9] mb-4 max-w-xl mx-auto">
              Contact our directors to assess your facility and receive an itemized, transparent proposal.
            </p>
            <button
              onClick={() => onOpenSchedule({ 
                type: 'quote', 
                title: 'Request Itemized Turnkey Quote',
                subtitle: 'Transparent, itemized commercial BOQ proposal for your workspace'
              })}
              className="btn-gold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xl"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#140828] relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-badge justify-center mb-1.5">SECTION 5 / CLIENT COMMUNITY</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              OUR COMMUNITY <span className="text-gold-gradient">OF CLIENTS</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c4e9] mt-1.5">
              Trusted by international aviation leaders, corporate enterprises, and premier brands across India.
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden mb-6 sm:mb-8">
          <DraggableMarquee
            items={clientCommunity}
            speed={1.25}
            renderItem={(client, idx) => (
              <div
                key={idx}
                className="w-[200px] min-w-[200px] sm:w-[230px] sm:min-w-[230px] h-[92px] sm:h-[102px] px-5 py-3 rounded-2xl border border-white/10 hover:border-amber-400/60 transition-all duration-300 flex items-center justify-center group bg-[#180830]/80 backdrop-blur-md shrink-0 shadow-lg"
                title={`${client.name} - ${client.tag}`}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} - Trusted Corporate Client of Global Enterprises`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={`max-h-10 sm:max-h-12 max-w-[165px] sm:max-w-[185px] object-contain filter drop-shadow group-hover:scale-110 transition-transform duration-300 pointer-events-none rounded-md ${
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

        <div className="text-center relative z-10">
          <button
            onClick={() => onOpenSchedule({ 
              type: 'general', 
              title: 'Join Global Enterprises Client Network',
              subtitle: 'Corporate vendor onboarding, client contracts & multi-facility management'
            })}
            className="btn-gold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-2xl cursor-pointer"
            aria-label="Join Global Enterprises Corporate Client Network"
          >
            <span>Join Us Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="py-8 sm:py-10 bg-[#10061e] border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-badge justify-center mb-1.5">SECTION 6 / BRAND ECOSYSTEM</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
              OUR TRUSTED <span className="text-gold-gradient">BRAND PARTNERS</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c4e9] mt-1.5">
              Offering a comprehensive selection of products from leading brands, including:
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <DraggableMarquee
            items={brandPartners}
            speed={1.25}
            direction="right"
            renderItem={(brand, idx) => (
              <div
                key={idx}
                className="w-[200px] min-w-[200px] sm:w-[230px] sm:min-w-[230px] h-[92px] sm:h-[102px] px-5 py-3 rounded-2xl border border-white/10 hover:border-amber-400/60 transition-all duration-300 flex items-center justify-center group bg-[#16082c]/80 backdrop-blur-md shrink-0 shadow-lg"
                title={brand.name}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} - Authorized Technology Hardware Partner`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={`max-h-11 sm:max-h-13 max-w-[165px] sm:max-w-[185px] object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300 pointer-events-none ${
                    brand.logo.includes('ahuja') || brand.logo.includes('vivotek') ? 'bg-white px-2.5 py-1 rounded-xl shadow-md' : ''
                  }`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          />
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#140828] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
            <div className="section-badge justify-center mb-1.5">SECTION 7 / TESTIMONIALS</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              SEE WHAT OUR <span className="text-gold-gradient">SATISFIED CLIENTS ARE SAYING</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c4e9] mt-1.5">
              Verified corporate reviews across aviation, logistics, and industrial safety infrastructure.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#10061e] border-t border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5 sm:mb-6">
            <div className="section-badge justify-center mb-1.5">SECTION 8 / FAQ</div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              FREQUENTLY ASKED <span className="text-gold-gradient">QUESTIONS (FAQ)</span>
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all bg-[#17082f]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white flex items-start gap-2.5">
                      <span className="text-amber-400 font-mono font-bold">Q:</span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs text-[#d1c4e9] leading-relaxed border-t border-white/5 pt-2.5">
                      <span className="text-emerald-400 font-mono font-bold mr-1.5">A:</span>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#120722] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="section-badge mb-1.5">INSTANT BUDGET ESTIMATOR</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white leading-tight mb-2.5">
                CALCULATE YOUR <span className="text-gold-gradient">FACILITY SCOPE</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-4 sm:mb-5">
                Select your required technology and architectural modules along with your facility size for an indicative turnkey budget estimate.
              </p>

              <div className="space-y-2.5 text-xs text-[#c4b5fd]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Itemized Bill of Quantities (BOQ) with zero hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Includes full Turnkey AMC and compliance handover</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Guaranteed on-time milestone delivery record</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-400/40 bg-[#1b0a36] shadow-2xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-white">
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span>Indicative Turnkey Estimator</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                    REAL-TIME
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs font-bold text-white mb-1.5">
                    <span>Approx. Facility Area:</span>
                    <span className="text-amber-400 font-mono text-sm">{estimateArea.toLocaleString()} SQ. FT</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={estimateArea}
                    onChange={(e) => setEstimateArea(Number(e.target.value))}
                    className="w-full h-2 bg-[#2d1253] rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-[#9c8eb9] mt-1">
                    <span>1,000 sq.ft (Boutique)</span>
                    <span>25,000 sq.ft (Mid-Scale)</span>
                    <span>50,000+ sq.ft (Tower)</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] sm:text-[11px] font-bold text-[#d1c4e9] uppercase tracking-wider mb-2">
                    Select Required Systems:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'cctv', label: '1. Security & Surveillance' },
                      { id: 'av', label: '2. Audio & Video Suites' },
                      { id: 'fire', label: '3. Fire Safety & Rodent' },
                      { id: 'network', label: '4. Network & Connectivity' },
                      { id: 'workspace', label: '5. Fit-out & Leasehold' },
                      { id: 'moulding', label: '6. Injection Moulding' },
                    ].map((svc) => {
                      const isSelected = selectedEstimatorServices.includes(svc.id);
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => toggleEstimatorService(svc.id)}
                          className={`p-2 sm:p-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border ${isSelected
                            ? 'bg-amber-400 text-[#10061e] border-amber-300 shadow'
                            : 'bg-[#120722] text-[#c4b5fd] border-white/10 hover:border-amber-400/30'
                            }`}
                        >
                          <div className="truncate">{svc.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 sm:p-4.5 rounded-2xl bg-[#120722] border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                      INDICATIVE TURNKEY SCOPE
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-heading text-white mt-0.5">
                      {calculateEstimate()}*
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#9c8eb9]">
                      *Includes certified hardware, labor, wiring &amp; compliance testing. Final pricing may vary based on site conditions, specifications, and selected systems.
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const serviceNameMap = {
                        cctv: 'Security & Surveillance',
                        av: 'Audio & Video Suites',
                        fire: 'Fire Safety & Rodent Defense',
                        network: 'Network & IT Infrastructure',
                        workspace: 'Workspace Fit-Out & Partitions',
                        moulding: 'Precision Injection Moulding'
                      };
                      const selectedLabels = selectedEstimatorServices.map(id => serviceNameMap[id] || id).join(', ');
                      const formattedEstimate = calculateEstimate();
                      const formattedArea = `${estimateArea.toLocaleString()} sq.ft`;

                      onOpenSchedule({
                        type: 'quote',
                        title: 'Inquire for Exact Pricing & BOQ',
                        subtitle: `Scope: ${formattedArea} • Indicative ${formattedEstimate}`,
                        service: `Turnkey Scope: ${selectedLabels}`,
                        metadata: {
                          fromEstimator: true,
                          estimatedArea: formattedArea,
                          targetBudget: formattedEstimate,
                          selectedServiceIds: selectedEstimatorServices,
                          selectedServiceNames: selectedLabels,
                          scopeNotes: `Scope configured via Instant Budget Estimator:\n• Facility Built-Up Area: ${formattedArea}\n• Indicative Turnkey Budget: ${formattedEstimate}\n• Selected Systems: ${selectedLabels}`
                        }
                      });
                    }}
                    className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl shrink-0"
                  >
                    <span>Inquire for Exact Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-gradient-to-r from-[#290e4f] via-[#16082b] to-[#290e4f] border-t border-amber-400/30 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#3b156e] border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GLOBAL ENTERPRISES &bull; CR PARK, NEW DELHI</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight mb-2.5">
            Your Workplace. Our Expertise., <span className="text-gold-gradient">One Integrated Solution.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#d1c4e9] max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-6">
            Consult directly with our engineering team to design, deploy, and maintain an integrated workplace environment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/about"
              className="btn-glass px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold"
            >
              About Global Enterprises
            </Link>

            <button
              onClick={() => onOpenSchedule({ type: 'meeting', title: 'Schedule Executive Consultation' })}
              className="btn-gold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-2xl"
            >
              <span>Schedule a meeting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
