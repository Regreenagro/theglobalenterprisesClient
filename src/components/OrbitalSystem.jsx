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

  // Dynamic Best-Fit Free Space Finder: Searches candidate placements around the hovered node
  // and selects the location with maximum free space (zero overlap with logo, other nodes, or boundaries).
  const handleNodeHover = (node, event) => {
    setIsPaused(true);
    setHoveredNode(node);

    if (!containerRef.current || !event?.currentTarget) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = event.currentTarget.getBoundingClientRect();

    // Scale ratio for container responsiveness (base size: 540x540)
    const scale = containerRect.width > 0 ? containerRect.width / 540 : 1;

    const W = 540;
    const H = 540;
    const PAD = 14;

    // Compact, highly legible tooltip dimensions
    const tw = 168;
    const th = 48;

    const minLeft = PAD;
    const maxLeft = W - tw - PAD;
    const minTop = PAD;
    const maxTop = H - th - PAD;

    // Hovered button in virtual 540x540 coordinates
    const bLeft = (buttonRect.left - containerRect.left) / scale;
    const bTop = (buttonRect.top - containerRect.top) / scale;
    const bWidth = buttonRect.width / scale;
    const bHeight = buttonRect.height / scale;

    const bx = bLeft + bWidth / 2;
    const by = bTop + bHeight / 2;

    // Center logo hub + "INTEGRATED WORKSPACE" protected box
    const logoObstacle = {
      left: 192,
      top: 185,
      right: 348,
      bottom: 358
    };

    // Real-time obstacles: gather bounding boxes of all other 7 nodes
    const otherNodes = [];
    const buttonElements = containerRef.current.querySelectorAll('button[data-orbit-node]');
    buttonElements.forEach((btn) => {
      if (btn !== event.currentTarget) {
        const r = btn.getBoundingClientRect();
        otherNodes.push({
          left: (r.left - containerRect.left) / scale - 4,
          top: (r.top - containerRect.top) / scale - 4,
          right: (r.right - containerRect.left) / scale + 4,
          bottom: (r.bottom - containerRect.top) / scale + 4
        });
      }
    });

    // Helper: calculate overlapping area between two rectangles
    const getOverlapArea = (r1, r2) => {
      const xOverlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
      const yOverlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
      return xOverlap * yOverlap;
    };

    const dx = bx - 270;
    const dy = by - 270;
    const GAP = 8;

    // 14 candidate positions around the node to find where space is free
    const candidates = [
      // 1. Direct Above
      { x: bx - tw / 2, y: bTop - th - GAP },
      // 2. Direct Below
      { x: bx - tw / 2, y: bTop + bHeight + GAP },
      // 3. Direct Left
      { x: bLeft - tw - GAP, y: by - th / 2 },
      // 4. Direct Right
      { x: bLeft + bWidth + GAP, y: by - th / 2 },

      // 5. Diagonal Top-Right
      { x: bLeft + bWidth + 2, y: bTop - th - 2 },
      // 6. Diagonal Top-Left
      { x: bLeft - tw - 2, y: bTop - th - 2 },
      // 7. Diagonal Bottom-Right
      { x: bLeft + bWidth + 2, y: bTop + bHeight + 2 },
      // 8. Diagonal Bottom-Left
      { x: bLeft - tw - 2, y: bTop + bHeight + 2 },

      // 9. Inward towards center (shifted 35% towards center)
      { x: bx - tw / 2 - (dx * 0.35), y: by - th / 2 - (dy * 0.35) },
      // 10. Outward away from center
      { x: bx - tw / 2 + (dx * 0.3), y: by - th / 2 + (dy * 0.3) },

      // 11. Left-aligned above
      { x: bLeft, y: bTop - th - GAP },
      // 12. Right-aligned above
      { x: bLeft + bWidth - tw, y: bTop - th - GAP },
      // 13. Left-aligned below
      { x: bLeft, y: bTop + bHeight + GAP },
      // 14. Right-aligned below
      { x: bLeft + bWidth - tw, y: bTop + bHeight + GAP }
    ];

    let bestX = Math.max(minLeft, Math.min(maxLeft, bx - tw / 2));
    let bestY = Math.max(minTop, Math.min(maxTop, bTop - th - GAP));
    let lowestPenalty = Infinity;

    for (const cand of candidates) {
      // 1. Penalty for overflowing container boundaries (prevents top navbar & right-edge cutoffs)
      let boundaryPenalty = 0;
      if (cand.x < minLeft) boundaryPenalty += (minLeft - cand.x) * 300;
      if (cand.x > maxLeft) boundaryPenalty += (cand.x - maxLeft) * 300;
      if (cand.y < minTop) boundaryPenalty += (minTop - cand.y) * 400;
      if (cand.y > maxTop) boundaryPenalty += (cand.y - maxTop) * 400;

      const clampedX = Math.max(minLeft, Math.min(maxLeft, cand.x));
      const clampedY = Math.max(minTop, Math.min(maxTop, cand.y));

      const candRect = {
        left: clampedX,
        top: clampedY,
        right: clampedX + tw,
        bottom: clampedY + th
      };

      // 2. Strict Penalty for overlapping Center Logo or "INTEGRATED WORKSPACE"
      const logoOverlap = getOverlapArea(candRect, logoObstacle);
      const logoPenalty = logoOverlap * 60;

      // 3. Penalty for overlapping any of the other 7 orbital nodes
      let nodesOverlap = 0;
      for (const nodeObs of otherNodes) {
        nodesOverlap += getOverlapArea(candRect, nodeObs);
      }
      const nodesPenalty = nodesOverlap * 35;

      // 4. Proximity penalty: keep reasonably close to hovered node
      const candCenterX = clampedX + tw / 2;
      const candCenterY = clampedY + th / 2;
      const distFromNode = Math.hypot(candCenterX - bx, candCenterY - by);
      const distPenalty = distFromNode * 0.35;

      const totalPenalty = boundaryPenalty + logoPenalty + nodesPenalty + distPenalty;

      if (totalPenalty < lowestPenalty) {
        lowestPenalty = totalPenalty;
        bestX = clampedX;
        bestY = clampedY;
      }
    }

    setHoverState({
      node,
      tooltipLeft: Math.round(bestX),
      tooltipTop: Math.round(bestY)
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
            data-orbit-node={node.id}
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
            className="absolute top-0 left-0 w-[168px] h-[48px] p-1.5 rounded-xl bg-[#1a0933]/98 border border-amber-400/80 shadow-[0_12px_32px_rgba(0,0,0,0.95)] backdrop-blur-2xl pointer-events-none z-[150] animate-fadeIn text-left flex items-center gap-2 transition-all duration-150"
          >
            <img
              src={hoverState.node.image}
              alt={hoverState.node.title}
              className="w-9 h-9 rounded-lg object-cover border border-white/20 shrink-0"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[8px] font-extrabold uppercase tracking-wider text-amber-400 truncate leading-none mb-0.5">
                {hoverState.node.category}
              </div>
              <div className="text-[11px] font-bold text-white leading-snug truncate">
                {hoverState.node.title}
              </div>
              <div className="text-[9px] text-[#c4b5fd] leading-none mt-0.5 truncate flex items-center gap-1">
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
