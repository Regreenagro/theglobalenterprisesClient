import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  PhoneCall,
  ChevronDown,
  Video,
  Tv,
  Flame,
  Armchair,
  CheckCircle2,
  ChevronRight,
  Zap,
  Calendar,
  Server,
  Boxes
} from 'lucide-react';

export default function Navbar({ onOpenSchedule }) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeMenuService, setActiveMenuService] = useState(0);

  const dropdownTimeoutRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const location = useLocation();

  const servicesMegaMenu = [
    {
      id: 'security',
      title: 'Security & Monitoring Systems',
      category: 'CCTV, BODY-WORN & ACCESS',
      icon: Video,
      image: '/images/cctv.jpg',
      badge: '4K CCTV & ACCESS CONTROL',
      desc: '4K CCTV surveillance, body-worn cameras, access control systems, and Dorset smart door locks.',
      points: ['Strategic 4K Camera Placement', 'LTE Body-Worn Video Equipment', 'Biometric Access & Smart Locks']
    },
    {
      id: 'av',
      title: 'Audio & Video Solutions',
      category: 'CONFERENCING & DISPLAY',
      icon: Tv,
      image: '/images/av_room.jpg',
      badge: 'HD CONFERENCING & PA',
      desc: 'High-definition video conferencing, interactive presentations, public address (PA), digital signage, and EPABX.',
      points: ['Video & Audio Conferencing', 'Digital Signage & Video Walls', 'Conference Hall Integration & EPABX']
    },
    {
      id: 'firesafety',
      title: 'Fire Safety & Leakage Management',
      category: 'DETECTION & SUPPRESSION',
      icon: Flame,
      image: '/images/firesafety.jpg',
      badge: 'FIRE, WATER & RODENT',
      desc: 'Addressable and conventional fire alarms, automated sprinkler suppression, water leak detection, and rodent control.',
      points: ['Early Warning Fire Alarm Panels', 'Water Leakage Detection Sensors', 'Corporate Rodent Netting & Control']
    },
    {
      id: 'network',
      title: 'Network & Connectivity Services',
      category: 'CORE IT & VOIP',
      icon: Server,
      image: '/images/headquarters.jpg',
      badge: 'CORE IT & NETWORK',
      desc: 'Wireless network planning, router and switch configuration, VoIP implementation, and server room design.',
      points: ['Structured Network Architecture', 'Enterprise VoIP & Wireless Links', 'Server Rack & Cable Dressing']
    },
    {
      id: 'fitout',
      title: 'Fit-out & Leasehold Improvements',
      category: 'OFFICE INTERIORS',
      icon: Armchair,
      image: '/images/workspace.jpg',
      badge: 'WORKSPACE FIT-OUT',
      desc: 'Office space planning, structural partitions, painting, flooring, electrical lighting, and modular workstations.',
      points: ['Modular Workstations & Furniture', 'Custom Demountable Partitions', 'Complete MEP & Flooring Finishes']
    },
    {
      id: 'injection',
      title: 'Injection Moulding Solutions',
      category: 'PRECISION MANUFACTURING',
      icon: Boxes,
      image: '/images/injection_moulding.jpg',
      badge: 'JOB WORK & CUSTOM MOULDS',
      desc: 'Job work for existing moulds and custom plastics product manufacturing from prototype to full production.',
      points: ['Running Customer Moulds (Job Work)', 'Custom Product & Tooling Design', 'Certified Quality Assurance']
    }
  ];

  const currentPreview = servicesMegaMenu[activeMenuService];

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 220);
  };

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 ${mobileMenuOpen ? 'h-[100dvh] inset-0 z-[999999] bg-[#0c0317] flex flex-col overflow-hidden' : 'h-auto bg-[#120722]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl z-50'}`}>
      <nav className={`w-full px-3 sm:px-5 lg:px-6 2xl:px-8 py-2 sm:py-2.5 relative max-w-[1800px] mx-auto shrink-0 ${mobileMenuOpen ? 'border-b border-white/10' : ''}`}>
        <div className="w-full flex items-center justify-between gap-1.5 sm:gap-3">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl bg-white/95 border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.45)] group-hover:scale-105 transition-all duration-300 overflow-hidden p-0.5 shrink-0">
              <img
                src="/logo.png"
                alt="Global Enterprises Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs sm:text-sm 2xl:text-base font-black tracking-wider text-white font-heading uppercase group-hover:text-amber-300 transition-colors whitespace-nowrap">
                Global Enterprises
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.16em] text-amber-400 font-extrabold uppercase whitespace-nowrap">
                Smart Solutions, Secure Spaces
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2 2xl:gap-3.5 flex-nowrap font-bold">
            <Link
              to="/"
              className={`text-[11px] 2xl:text-xs font-bold transition-colors py-1 whitespace-nowrap relative group ${location.pathname === '/' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                }`}
            >
              Home
              {location.pathname === '/' ? (
                <motion.span
                  layoutId="activeNavbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
              )}
            </Link>

            <Link
              to="/about"
              className={`text-[11px] 2xl:text-xs font-bold transition-colors py-1 whitespace-nowrap relative group ${location.pathname === '/about' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                }`}
            >
              About Us
              {location.pathname === '/about' ? (
                <motion.span
                  layoutId="activeNavbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
              )}
            </Link>

            <div
              ref={dropdownContainerRef}
              className="relative py-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  to="/services"
                  className={`text-[11px] 2xl:text-xs font-bold transition-colors flex items-center gap-0.5 cursor-pointer py-1 whitespace-nowrap relative group ${location.pathname === '/services' || servicesDropdownOpen ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                    }`}
                >
                  <span>What We Do</span>
                  {(location.pathname === '/services' || servicesDropdownOpen) ? (
                    <motion.span
                      layoutId="activeNavbarUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setServicesDropdownOpen(prev => !prev);
                  }}
                  className="p-0.5 text-[#d1c4e9] hover:text-amber-300 focus:outline-none cursor-pointer"
                  aria-label="Toggle What We Do dropdown"
                >
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
              </div>

              {servicesDropdownOpen && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="fixed top-full left-0 right-0 w-full bg-[#110620] border-y border-amber-400/40 shadow-[0_30px_70px_rgba(0,0,0,0.98)] z-50 animate-fadeIn px-6 sm:px-12 lg:px-16 py-7 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-stretch">
                    <div className="col-span-12 lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>SPECIALIZED SERVICE AREAS</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {servicesMegaMenu.map((item, idx) => {
                            const Icon = item.icon;
                            const isHovered = activeMenuService === idx;
                            return (
                              <Link
                                key={item.id}
                                to={`/services?service=${item.id}`}
                                onMouseEnter={() => setActiveMenuService(idx)}
                                onClick={() => setServicesDropdownOpen(false)}
                                className={`relative p-3 rounded-2xl border transition-colors duration-200 flex items-start gap-3 group/item ${isHovered
                                  ? 'border-amber-400 shadow-lg translate-x-1'
                                  : 'bg-[#180830]/80 border-white/10 hover:border-white/20'
                                  }`}
                              >
                                {isHovered && (
                                  <motion.div
                                    layoutId="activeMegaMenuPill"
                                    className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-purple-600/20 to-amber-400/10 border border-amber-400 rounded-2xl pointer-events-none -z-0"
                                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                  />
                                )}
                                <div className={`relative z-10 p-2 rounded-xl transition-colors ${isHovered ? 'bg-amber-400 text-[#120722]' : 'bg-white/10 text-amber-400'}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="relative z-10 flex-1 min-w-0">
                                  <div className="text-xs font-bold text-white group-hover/item:text-amber-300 truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-[10px] text-[#b8a7dc] truncate">
                                    {item.category}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#c4b5fd]">
                        <span>Need all-in-one turnkey architectural execution?</span>
                        <Link
                          to="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                          <span>View All Services &rarr;</span>
                        </Link>
                      </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 flex flex-col justify-between pl-0 lg:pl-4">
                      <div>
                        <div className="relative rounded-2xl overflow-hidden aspect-[16/9.5] border border-white/20 shadow-2xl mb-3 group/img bg-black">
                          <img
                            src={currentPreview.image}
                            alt={currentPreview.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#120722]/95 via-[#120722]/20 to-transparent pointer-events-none"></div>

                          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-[#120722]/95 border border-amber-400/60 text-[9px] font-extrabold text-amber-300 uppercase tracking-widest backdrop-blur-md shadow-lg">
                            {currentPreview.badge}
                          </div>

                          <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-[#160829]/90 backdrop-blur-md border border-white/10">
                            <h4 className="text-xs font-bold font-heading text-white">
                              {currentPreview.title}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs text-[#d1c4e9] leading-relaxed mb-3">
                          {currentPreview.desc}
                        </p>

                        <div className="space-y-1.5">
                          {currentPreview.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 text-[11px] text-amber-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        to={`/services?service=${currentPreview.id}`}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="btn-gold w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 mt-4 shadow-lg"
                      >
                        <span>Explore {currentPreview.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/capabilities"
              className={`text-[11px] 2xl:text-xs font-bold transition-colors py-1 whitespace-nowrap relative group ${location.pathname === '/capabilities' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                }`}
            >
              Capabilities
              {location.pathname === '/capabilities' ? (
                <motion.span
                  layoutId="activeNavbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
              )}
            </Link>

            <Link
              to="/values"
              className={`text-[11px] 2xl:text-xs font-bold transition-colors py-1 whitespace-nowrap relative group ${location.pathname === '/values' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                }`}
            >
              Core Values
              {location.pathname === '/values' ? (
                <motion.span
                  layoutId="activeNavbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
              )}
            </Link>

            <Link
              to="/mission"
              className={`text-[11px] 2xl:text-xs font-bold transition-colors py-1 whitespace-nowrap relative group ${location.pathname === '/mission' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                }`}
            >
              Mission
              {location.pathname === '/mission' ? (
                <motion.span
                  layoutId="activeNavbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
              )}
            </Link>

            <Link
              to="/clients"
              className={`text-[11px] 2xl:text-xs font-bold transition-colors py-1 whitespace-nowrap relative group ${location.pathname === '/clients' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                }`}
            >
              Client Trust
              {location.pathname === '/clients' ? (
                <motion.span
                  layoutId="activeNavbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
              )}
            </Link>

            <Link
              to="/contact"
              className={`text-[11px] 2xl:text-xs font-bold transition-colors py-1 whitespace-nowrap relative group ${location.pathname === '/contact' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-amber-300'
                }`}
            >
              Contact
              {location.pathname === '/contact' ? (
                <motion.span
                  layoutId="activeNavbarUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all"></span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="tel:+919899933768"
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-[#1b0a36] border border-white/15 hover:border-amber-400 text-white hover:text-amber-300 transition-all shadow-md shrink-0"
              title="Call Us: +91 98999 33768"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden 2xl:inline text-xs font-bold whitespace-nowrap">+91 98999 33768</span>
            </a>


            <button
              onClick={() => onOpenSchedule({ type: 'meeting', title: 'Schedule Strategy Consultation' })}
              className="btn-gold p-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-xs flex items-center gap-1.5 cursor-pointer font-extrabold shadow-xl shrink-0 whitespace-nowrap"
              title="Schedule a meeting"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Schedule a meeting</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#220e3f] border border-amber-400/40 text-amber-300 hover:text-white hover:bg-amber-400/20 transition-all shrink-0 cursor-pointer shadow-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="xl:hidden flex-1 w-full bg-[#0c0317] px-4 sm:px-6 py-5 overflow-y-auto flex flex-col justify-between shadow-inner relative animate-mobile-menu">
          {/* Ambient Glows */}
          <div className="bg-glow-orb w-[260px] h-[260px] bg-purple-600/15 top-10 right-0 pointer-events-none"></div>
          <div className="bg-glow-orb w-[220px] h-[220px] bg-amber-500/10 bottom-20 left-0 pointer-events-none"></div>

          <div className="flex flex-col space-y-2 text-sm pb-10 relative z-10">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: '30ms' }}
              className={`animate-nav-item py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all duration-300 ${location.pathname === '/'
                ? 'bg-gradient-to-r from-amber-400/25 to-purple-600/25 text-amber-300 border-amber-400/60 shadow-lg translate-x-1'
                : 'bg-[#180930]/90 text-[#d1c4e9] border-white/5 hover:text-white hover:border-amber-400/30 hover:bg-[#1f0b3e]'
                }`}
            >
              <span>Home</span>
              <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-white/20'}`}></span>
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: '70ms' }}
              className={`animate-nav-item py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all duration-300 ${location.pathname === '/about'
                ? 'bg-gradient-to-r from-amber-400/25 to-purple-600/25 text-amber-300 border-amber-400/60 shadow-lg translate-x-1'
                : 'bg-[#180930]/90 text-[#d1c4e9] border-white/5 hover:text-white hover:border-amber-400/30 hover:bg-[#1f0b3e]'
                }`}
            >
              <span>About Us</span>
              <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/about' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-white/20'}`}></span>
            </Link>

            <div style={{ animationDelay: '110ms' }} className="animate-nav-item rounded-xl border border-white/10 bg-[#180930]/90 overflow-hidden">
              <div className="flex items-center justify-between py-3 px-4">
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-bold flex items-center gap-2 ${location.pathname === '/services' ? 'text-amber-400' : 'text-[#d1c4e9] hover:text-white'
                    }`}
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>What We Do</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="p-1.5 rounded-lg bg-white/5 text-amber-400 hover:text-white active:scale-95 transition-transform"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="p-2 pt-0 space-y-1.5 border-t border-white/10 bg-[#120722]/95 animate-fadeIn">
                  {servicesMegaMenu.map((item, mIdx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        to={`/services?service=${item.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: `${mIdx * 30}ms` }}
                        className="animate-nav-item flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-amber-400/20 active:bg-amber-400/30 text-xs text-[#d1c4e9] hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-semibold text-white truncate">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/capabilities"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: '150ms' }}
              className={`animate-nav-item py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all duration-300 ${location.pathname === '/capabilities'
                ? 'bg-gradient-to-r from-amber-400/25 to-purple-600/25 text-amber-300 border-amber-400/60 shadow-lg translate-x-1'
                : 'bg-[#180930]/90 text-[#d1c4e9] border-white/5 hover:text-white hover:border-amber-400/30 hover:bg-[#1f0b3e]'
                }`}
            >
              <span>Capabilities</span>
              <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/capabilities' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-white/20'}`}></span>
            </Link>

            <Link
              to="/values"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: '190ms' }}
              className={`animate-nav-item py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all duration-300 ${location.pathname === '/values'
                ? 'bg-gradient-to-r from-amber-400/25 to-purple-600/25 text-amber-300 border-amber-400/60 shadow-lg translate-x-1'
                : 'bg-[#180930]/90 text-[#d1c4e9] border-white/5 hover:text-white hover:border-amber-400/30 hover:bg-[#1f0b3e]'
                }`}
            >
              <span>Core Values</span>
              <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/values' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-white/20'}`}></span>
            </Link>

            <Link
              to="/mission"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: '230ms' }}
              className={`animate-nav-item py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all duration-300 ${location.pathname === '/mission'
                ? 'bg-gradient-to-r from-amber-400/25 to-purple-600/25 text-amber-300 border-amber-400/60 shadow-lg translate-x-1'
                : 'bg-[#180930]/90 text-[#d1c4e9] border-white/5 hover:text-white hover:border-amber-400/30 hover:bg-[#1f0b3e]'
                }`}
            >
              <span>Mission</span>
              <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/mission' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-white/20'}`}></span>
            </Link>

            <Link
              to="/clients"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: '270ms' }}
              className={`animate-nav-item py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all duration-300 ${location.pathname === '/clients'
                ? 'bg-gradient-to-r from-amber-400/25 to-purple-600/25 text-amber-300 border-amber-400/60 shadow-lg translate-x-1'
                : 'bg-[#180930]/90 text-[#d1c4e9] border-white/5 hover:text-white hover:border-amber-400/30 hover:bg-[#1f0b3e]'
                }`}
            >
              <span>Client Trust</span>
              <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/clients' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-white/20'}`}></span>
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: '310ms' }}
              className={`animate-nav-item py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all duration-300 ${location.pathname === '/contact'
                ? 'bg-gradient-to-r from-amber-400/25 to-purple-600/25 text-amber-300 border-amber-400/60 shadow-lg translate-x-1'
                : 'bg-[#180930]/90 text-[#d1c4e9] border-white/5 hover:text-white hover:border-amber-400/30 hover:bg-[#1f0b3e]'
                }`}
            >
              <span>Contact</span>
              <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/contact' ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-white/20'}`}></span>
            </Link>


            <div style={{ animationDelay: '390ms' }} className="animate-nav-item pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSchedule({ type: 'meeting', title: 'Schedule Strategy Consultation' });
                }}
                className="btn-gold w-full py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Meeting</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {servicesDropdownOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-black/50 backdrop-blur-[2px] z-40"
          onClick={() => setServicesDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
}
