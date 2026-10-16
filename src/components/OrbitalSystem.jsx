import React, { useState, useRef } from 'react';
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

/**
 * GPU-Accelerated Zero-Lag Orbital System
 * - Offloads all 360-degree orbital motion to GPU Compositor thread via pure CSS transforms.
 * - 0% React Main-Thread CPU Overhead: Eliminates continuous 60fps setState reconciliation.
 * - Dynamic Collision-Free Tooltip: Accurately placed in static container space to prevent overlap with bottom cards, center logo, and top boundaries.
 */
export default function OrbitalSystem({ activeNodeId, onSelectNode }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoverState, setHoverState] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Orbit nodes configuration
  const nodes = [
    // Outer orbit nodes (Radius: 220px, 38s clockwise rotation)
    {
      id: 'lock',
      title: 'Secure Access Control',
      category: 'ACCESS CONTROL',
      icon: Lock,
      orbit: 'outer',
      orbitRadius: 220,
      baseAngle: 0,
      image: '/images/speedgates.webp',
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
      image: '/images/av_room.webp',
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
      image: '/images/workspace.webp',
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
      image: '/images/cctv.webp',
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
      image: '/images/cctv.webp',
      desc: 'High-definition 4K optical surveillance & body-worn cameras.'
    },

    // Inner orbit nodes (Radius: 155px, 30s counter-clockwise rotation)
    {
      id: 'integration',
      title: 'Turnkey System Integration',
      category: 'SYSTEM INTEGRATION',
      icon: Network,
      orbit: 'inner',
      orbitRadius: 155,
      baseAngle: 300,
      image: '/images/speedgates.webp',
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
      image: '/images/speedgates.webp',
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
      image: '/images/firesafety.webp',
      desc: 'Certified thermal early-warning detection & suppression.'
    }
  ];

  const isNodeActive = (node) => {
    if (!activeNodeId) return false;
    const active = String(activeNodeId).toLowerCase();
    const nid = String(node.id).toLowerCase();
    
    if (active === nid) return true;
    if ((active === 'speedgates' || active === 'access' || active === 'access_control') && nid === 'speedgate') return true;
    if ((active === 'firesafety' || active === 'fire' || active === 'fire_safety') && nid === 'fire') return true;
    if ((active === 'workspace' || active === 'furniture' || active === 'fitout' || active === 'interior') && nid === 'furniture') return true;
    if ((active === 'cctv' || active === 'security' || active === 'surveillance') && nid === 'cctv') return true;
    if ((active === 'av' || active === 'audio_video' || active === 'conferencing') && nid === 'av') return true;
    
    return false;
  };

  const outerNodes = nodes.filter(n => n.orbit === 'outer');
  const innerNodes = nodes.filter(n => n.orbit === 'inner');

  // Calculates a safe, collision-free tooltip coordinate inside the 540x540 container space
  const handleNodeHover = (node, event) => {
    setIsPaused(true);
    setHoveredNode(node);

    if (!containerRef.current || !event?.currentTarget) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = event.currentTarget.getBoundingClientRect();

    // Scale ratio for responsiveness (container base size: 540px)
    const scale = containerRect.width > 0 ? containerRect.width / 540 : 1;

    // Button position in 540x540 virtual space
    const nodeLeft = (buttonRect.left - containerRect.left) / scale;
    const nodeTop = (buttonRect.top - containerRect.top) / scale;
    const nodeWidth = buttonRect.width / scale;
    const nodeHeight = buttonRect.height / scale;

    const nx = nodeLeft + nodeWidth / 2;
    const ny = nodeTop + nodeHeight / 2;

    const tw = 186; // tooltip card width
    const th = 56;  // tooltip card height
    const W = 540;
    const H = 540;
    const PAD = 10;

    const minLeft = PAD;
    const maxLeft = W - tw - PAD;
    const minTop = PAD;
    const maxTop = H - th - PAD;

    // Center logo protected zone (270, 270)
    const logoBox = {
      left: 195,
      right: 345,
      top: 195,
      bottom: 358
    };

    const collidesWithLogo = (l, t) => {
      return !(l + tw < logoBox.left || l > logoBox.right || t + th < logoBox.top || t > logoBox.bottom);
    };

    const dx = nx - 270;
    const dy = ny - 270;

    let left = nx - tw / 2;
    let top = 0;

    // Placement logic based on vertical hemisphere:
    if (dy > 30) {
      // Lower hemisphere: NEVER place below outer bottom nodes (prevents bottom overlap)
      const topAbove = nodeTop - th - 10;
      const leftAbove = Math.max(minLeft, Math.min(maxLeft, nx - tw / 2));

      if (!collidesWithLogo(leftAbove, topAbove) && topAbove >= minTop) {
        top = topAbove;
        left = leftAbove;
      } else {
        // Inner bottom node: place below if strictly inside safe container bounds
        const topBelow = nodeTop + nodeHeight + 10;
        if (topBelow <= maxTop) {
          top = topBelow;
          left = leftAbove;
        } else {
          top = Math.max(minTop, Math.min(maxTop, topAbove));
          left = dx < 0
            ? Math.max(minLeft, Math.min(logoBox.left - tw - 6, leftAbove))
            : Math.min(maxLeft, Math.max(logoBox.right + 6, leftAbove));
        }
      }
    } else if (dy < -30) {
      // Upper hemisphere: NEVER place above outer top nodes (prevents top boundary overflow)
      const topBelow = nodeTop + nodeHeight + 10;
      const leftBelow = Math.max(minLeft, Math.min(maxLeft, nx - tw / 2));

      if (!collidesWithLogo(leftBelow, topBelow) && topBelow <= maxTop) {
        top = topBelow;
        left = leftBelow;
      } else {
        // Inner top node: place above if strictly inside safe container bounds
        const topAbove = nodeTop - th - 10;
        if (topAbove >= minTop) {
          top = topAbove;
          left = leftBelow;
        } else {
          top = Math.max(minTop, Math.min(maxTop, topBelow));
          left = dx < 0
            ? Math.max(minLeft, Math.min(logoBox.left - tw - 6, leftBelow))
            : Math.min(maxLeft, Math.max(logoBox.right + 6, leftBelow));
        }
      }
    } else {
      // Equator region: position vertically clear and offset horizontally
      const topEquator = dy <= 0 ? nodeTop - th - 8 : nodeTop + nodeHeight + 8;
      top = Math.max(minTop, Math.min(maxTop, topEquator));

      if (dx < 0) {
        left = Math.max(minLeft, Math.min(logoBox.left - tw - 6, nx - tw / 2));
      } else {
        left = Math.min(maxLeft, Math.max(logoBox.right + 6, nx - tw / 2));
      }
    }

    // Safety clamps
    left = Math.max(minLeft, Math.min(maxLeft, left));
    top = Math.max(minTop, Math.min(maxTop, top));

    // Logo collision prevention fallback
    if (collidesWithLogo(left, top)) {
      if (dy > 30) {
        top = Math.min(maxTop, Math.max(top, logoBox.bottom + 8));
      } else if (dy < -30) {
        top = Math.max(minTop, Math.min(top, logoBox.top - th - 8));
      } else if (dx < 0) {
        left = Math.max(minLeft, Math.min(left, logoBox.left - tw - 8));
      } else {
        left = Math.min(maxLeft, Math.max(left, logoBox.right + 8));
      }
      left = Math.max(minLeft, Math.min(maxLeft, left));
      top = Math.max(minTop, Math.min(maxTop, top));
    }

    setHoverState({
      node,
      tooltipLeft: Math.round(left),
      tooltipTop: Math.round(top)
    });
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
    setHoverState(null);
  };

  const renderNode = (node, isOuter) => {
    const angleInRadians = (node.baseAngle - 90) * (Math.PI / 180);
    const x = Math.round(node.orbitRadius * Math.cos(angleInRadians));
    const y = Math.round(node.orbitRadius * Math.sin(angleInRadians));
    const isHovered = hoveredNode?.id === node.id;
    const isSelected = isNodeActive(node);
    const IconComponent = node.icon;

    // Counter-rotation style to keep icon upright during orbit
    const counterSpinStyle = {
      animation: isOuter 
        ? 'spin-reverse-slow 38s linear infinite' 
        : 'spin-slow 30s linear infinite',
      animationPlayState: isPaused ? 'paused' : 'running',
      willChange: 'transform'
    };

    return (
      <div
        key={node.id}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        className={`absolute pointer-events-auto transition-transform ${isHovered || isSelected ? 'z-[100]' : 'z-20'}`}
      >
        <div style={counterSpinStyle} className="relative group">
          <button
            onMouseEnter={(e) => handleNodeHover(node, e)}
            onMouseLeave={handleNodeLeave}
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
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex items-center justify-center overflow-visible py-0 sm:py-1">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none scale-[0.62] xs:scale-75 sm:scale-85 md:scale-95 lg:scale-100 origin-center transition-transform"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredNode(null);
          setHoverState(null);
        }}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute w-72 h-72 rounded-full bg-purple-900/30 blur-3xl -z-10 pointer-events-none animate-pulse"></div>
        <div className="absolute w-52 h-52 rounded-full bg-amber-500/10 blur-2xl -z-10 pointer-events-none"></div>

        {/* Center Logo Hub */}
        <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#2b1052] via-[#15062c] to-[#0e0419] border-2 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.7),inset_0_0_20px_rgba(168,85,247,0.4)]">
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-400/80 animate-spin-slow pointer-events-none"></div>
            
            <div className="w-19 h-19 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#ffffff] via-[#fcf8f0] to-[#f5ecda] shadow-[0_0_22px_rgba(245,158,11,0.65),inset_0_0_8px_rgba(217,119,6,0.25)] flex items-center justify-center p-1.5 relative z-10 border border-amber-400/80">
              <img
                src="/logo.png"
                alt="Global Enterprises Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
                width={88}
                height={88}
              />
            </div>
          </div>

          <div className="mt-2 text-center flex items-center justify-center">
            <span className="text-[9px] sm:text-[10px] font-bold font-mono tracking-[0.22em] text-amber-400 uppercase text-center block">
              INTEGRATED WORKSPACE
            </span>
          </div>
        </div>

        {/* SVG Orbital Rings Guide */}
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
        </svg>

        {/* OUTER ORBIT TRACK (Hardware accelerated CSS spin, 38s) */}
        <div 
          style={{
            animation: 'spin-slow 38s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform'
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          {outerNodes.map(node => renderNode(node, true))}
        </div>

        {/* INNER ORBIT TRACK (Hardware accelerated CSS reverse spin, 30s) */}
        <div 
          style={{
            animation: 'spin-reverse-slow 30s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform'
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          {innerNodes.map(node => renderNode(node, false))}
        </div>

        <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-amber-400/80 animate-ping"></div>
        <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-purple-400/80 animate-pulse"></div>

        {/* Dynamic Collision-Free Tooltip (Container Coordinate Space, Guaranteed Zero Overlap) */}
        {hoverState && hoverState.node && (
          <div 
            style={{
              transform: `translate3d(${hoverState.tooltipLeft}px, ${hoverState.tooltipTop}px, 0)`,
            }}
            className="absolute top-0 left-0 w-[186px] p-2 rounded-xl bg-[#1a0933]/98 border border-amber-400/80 shadow-[0_12px_32px_rgba(0,0,0,0.95)] backdrop-blur-2xl pointer-events-none z-[130] animate-fadeIn text-left flex items-center gap-2.5 transition-all duration-150"
          >
            <img
              src={hoverState.node.image}
              alt={hoverState.node.title}
              className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[8.5px] font-extrabold uppercase tracking-wider text-amber-400 truncate">
                {hoverState.node.category}
              </div>
              <div className="text-[11.5px] font-bold text-white leading-tight truncate">
                {hoverState.node.title}
              </div>
              <div className="text-[9.5px] text-[#c4b5fd] mt-0.5 leading-tight truncate flex items-center gap-1">
                <span>Click to inspect</span>
                <span className="text-amber-400">&bull;</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
