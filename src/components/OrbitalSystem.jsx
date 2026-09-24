import React, { useState, useEffect } from 'react';
import { 
  Video, 
  ShieldCheck, 
  Lock, 
  PhoneCall, 
  Flame, 
  Building2, 
  Network,
  Scan
} from 'lucide-react';

export default function OrbitalSystem({ activeNodeId, onSelectNode }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth continuous rotation angle update
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused) {
        setRotationAngle((prev) => (prev + delta * 10) % 360); // 10 degrees per sec
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Orbit nodes configuration
  const nodes = [
    // Outer orbit nodes
    {
      id: 'lock',
      title: 'Secure Access Control',
      category: 'ACCESS CONTROL',
      icon: Lock,
      orbit: 'outer',
      orbitRadius: 220,
      baseAngle: 0,
      image: '/images/speedgates.jpg',
      desc: 'Encrypted smart locks and multi-factor authentication.'
    },
    {
      id: 'av',
      title: 'Audio-Visual Collaboration',
      category: 'SMART CONFERENCING',
      icon: PhoneCall,
      orbit: 'outer',
      orbitRadius: 220,
      baseAngle: 72,
      image: '/images/av_room.jpg',
      desc: 'Executive boardrooms & ultra-HD conference video walls.'
    },
    {
      id: 'furniture',
      title: 'Ergonomic Workspaces',
      category: 'INTERIOR FIT-OUTS',
      icon: Building2,
      orbit: 'outer',
      orbitRadius: 220,
      baseAngle: 144,
      image: '/images/workspace.jpg',
      desc: 'Custom glass partitioning & height-adjustable workstations.'
    },
    {
      id: 'defense',
      title: 'Perimeter Defense',
      category: 'PERIMETER SECURITY',
      icon: ShieldCheck,
      orbit: 'outer',
      orbitRadius: 220,
      baseAngle: 216,
      image: '/images/cctv.jpg',
      desc: 'Physical and digital security infrastructure.'
    },
    {
      id: 'cctv',
      title: '4K CCTV & Body Cameras',
      category: 'VIDEO SURVEILLANCE',
      icon: Video,
      orbit: 'outer',
      orbitRadius: 220,
      baseAngle: 288,
      image: '/images/cctv.jpg',
      desc: 'High-definition 4K optical surveillance & body-worn cameras.'
    },

    // Inner orbit nodes
    {
      id: 'integration',
      title: 'Turnkey System Integration',
      category: 'SYSTEM INTEGRATION',
      icon: Network,
      orbit: 'inner',
      orbitRadius: 155,
      baseAngle: 300,
      image: '/images/speedgates.jpg',
      desc: 'Unified ecosystem connecting security, IoT and IT nodes.'
    },
    {
      id: 'speedgate',
      title: 'Speed Gates & Access',
      category: 'ACCESS CONTROL',
      icon: Scan,
      orbit: 'inner',
      orbitRadius: 155,
      baseAngle: 60,
      image: '/images/speedgates.jpg',
      desc: 'Biometric, RFID & automated turnstiles for fast entry.'
    },
    {
      id: 'fire',
      title: 'Fire Safety & Thermal Alarm',
      category: 'FIRE SAFETY',
      icon: Flame,
      orbit: 'inner',
      orbitRadius: 155,
      baseAngle: 180,
      image: '/images/firesafety.jpg',
      desc: 'Certified thermal early-warning detection & suppression.'
    }
  ];

  const isNodeActive = (node) => {
    if (!activeNodeId) return false;
    const active = String(activeNodeId).toLowerCase();
    const nid = String(node.id).toLowerCase();
    
    if (active === nid) return true;
    // Map speedgates / access control to single speedgate node
    if ((active === 'speedgates' || active === 'access' || active === 'access_control') && nid === 'speedgate') {
      return true;
    }
    // Map fire safety to single fire node
    if ((active === 'firesafety' || active === 'fire' || active === 'fire_safety') && nid === 'fire') {
      return true;
    }
    // Map workspace / interior fitout to single furniture node
    if ((active === 'workspace' || active === 'furniture' || active === 'fitout' || active === 'interior') && nid === 'furniture') {
      return true;
    }
    // Map cctv / surveillance to single cctv node
    if ((active === 'cctv' || active === 'security' || active === 'surveillance') && nid === 'cctv') {
      return true;
    }
    // Map av to single av node
    if ((active === 'av' || active === 'audio_video' || active === 'conferencing') && nid === 'av') {
      return true;
    }
    
    return false;
  };

  const activeOrHovered = hoveredNode || nodes.find(n => isNodeActive(n)) || null;

  // Dynamic tooltip placement: always opens inward into the spacious orbital circle
  const getTooltipPositionClass = (x, y) => {
    if (y < -30) {
      // Top half: ALWAYS open downward into the circle so it never overlaps top/navbar
      if (x > 50) {
        return "top-full mt-2.5 right-0"; // opens down, aligns right edge to extend inward left
      } else if (x < -50) {
        return "top-full mt-2.5 left-0"; // opens down, aligns left edge to extend inward right
      } else {
        return "top-full mt-2.5 left-1/2 -translate-x-1/2"; // opens down centered
      }
    } else if (y > 30) {
      // Bottom half: ALWAYS open upward into the circle so it never overflows bottom
      if (x > 50) {
        return "bottom-full mb-2.5 right-0"; // opens up, aligns right edge to extend inward left
      } else if (x < -50) {
        return "bottom-full mb-2.5 left-0"; // opens up, aligns left edge to extend inward right
      } else {
        return "bottom-full mb-2.5 left-1/2 -translate-x-1/2"; // opens up centered
      }
    } else {
      // Near vertical center: open horizontally inward towards the circle center
      if (x > 0) {
        return "right-full mr-2.5 top-1/2 -translate-y-1/2"; // right edge node -> open to the left
      } else {
        return "left-full ml-2.5 top-1/2 -translate-y-1/2"; // left edge node -> open to the right
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center overflow-visible py-0 sm:py-1">
      <div 
        className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none scale-[0.62] xs:scale-75 sm:scale-85 md:scale-95 lg:scale-100 origin-center transition-transform"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredNode(null);
        }}
      >
        <div className="absolute w-72 h-72 rounded-full bg-purple-900/30 blur-3xl -z-10 pointer-events-none animate-pulse"></div>
        <div className="absolute w-52 h-52 rounded-full bg-amber-500/10 blur-2xl -z-10 pointer-events-none"></div>

        <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#2b1052] via-[#15062c] to-[#0e0419] border-2 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.7),inset_0_0_20px_rgba(168,85,247,0.4)]">
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-400/80 animate-spin-slow pointer-events-none"></div>
            
            <div className="w-19 h-19 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#ffffff] via-[#fcf8f0] to-[#f5ecda] shadow-[0_0_22px_rgba(245,158,11,0.65),inset_0_0_8px_rgba(217,119,6,0.25)] flex items-center justify-center p-1.5 relative z-10 border border-amber-400/80">
              <img
                src="/logo.png"
                alt="Global Enterprises Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>

          <div className="mt-2 text-center flex items-center justify-center">
            <span className="text-[9px] sm:text-[10px] font-bold font-mono tracking-[0.22em] text-amber-400 uppercase text-center block">
              INTEGRATED WORKSPACE
            </span>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0" viewBox="0 0 540 540">
          <circle
            cx="270"
            cy="270"
            r="95"
            fill="none"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          <circle
            cx="270"
            cy="270"
            r="155"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1.2"
          />

          <circle
            cx="270"
            cy="270"
            r="220"
            fill="none"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />

          {nodes.filter(n => isNodeActive(n) || (hoveredNode && hoveredNode.id === n.id)).map(activeNode => {
            const isOuter = activeNode.orbit === 'outer';
            const calcAngle = isOuter
              ? (activeNode.baseAngle + rotationAngle) % 360
              : (activeNode.baseAngle - rotationAngle) % 360;
            const rad = ((calcAngle - 90) * Math.PI) / 180;
            return (
              <line
                key={activeNode.id}
                x1="270"
                y1="270"
                x2={270 + activeNode.orbitRadius * Math.cos(rad) * 0.9}
                y2={270 + activeNode.orbitRadius * Math.sin(rad) * 0.9}
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const isOuter = node.orbit === 'outer';
          const currentAngle = isOuter
            ? (node.baseAngle + rotationAngle) % 360
            : (node.baseAngle - rotationAngle) % 360;

          const angleInRadians = (currentAngle - 90) * (Math.PI / 180);
          const x = node.orbitRadius * Math.cos(angleInRadians);
          const y = node.orbitRadius * Math.sin(angleInRadians);
          const isHovered = hoveredNode?.id === node.id;
          const isSelected = isNodeActive(node);
          const IconComponent = node.icon;

          return (
            <div
              key={node.id}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transition: isPaused ? 'transform 0.15s ease-out' : 'none',
              }}
              className={`absolute transition-all ${isHovered || isSelected ? 'z-[100]' : 'z-20'}`}
            >
              <div className="relative group">
                <button
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => {
                    if (onSelectNode) onSelectNode(node.id, node);
                  }}
                  aria-label={node.title}
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 cursor-pointer ${
                    isHovered || isSelected
                      ? 'bg-[#2b1250] border-2 border-amber-400 text-amber-300 scale-125 shadow-[0_0_25px_rgba(245,158,11,0.85)] z-50'
                      : 'bg-[#190933]/90 backdrop-blur-md border border-amber-400/40 text-amber-400 hover:text-white hover:border-amber-300 shadow-xl'
                  }`}
                >
                  <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>

                {isHovered && (
                  <div 
                    className={`absolute w-48 sm:w-52 p-2 sm:p-2.5 rounded-xl bg-[#1a0933]/98 border border-amber-400/80 shadow-[0_15px_35px_rgba(0,0,0,0.95)] backdrop-blur-2xl pointer-events-none z-[120] animate-fadeIn text-left flex items-center gap-2.5 ${getTooltipPositionClass(x, y)}`}
                  >
                    <img
                      src={node.image}
                      alt={node.title}
                      className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400 truncate">
                        {node.category}
                      </div>
                      <div className="text-xs font-bold text-white leading-tight truncate">
                        {node.title}
                      </div>
                      <div className="text-[10px] text-[#c4b5fd] mt-0.5 leading-tight truncate">
                        Click to inspect
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-amber-400/80 animate-ping"></div>
        <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-purple-400/80 animate-pulse"></div>
      </div>
    </div>
  );
}


