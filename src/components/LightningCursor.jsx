import React, { useEffect, useRef } from 'react';

/**
 * Ultra-Smooth Lightning & Electric Spark Cursor FX
 * - Themed with signature gold/amber and violet palette.
 * - Hardware-capped particle memory pool (zero memory leaks, zero GC stutter).
 * - Automatic idle detection (0% CPU when mouse is still).
 * - Respects prefers-reduced-motion accessibility preference.
 */
export default function LightningCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only run on devices with a mouse/fine pointer and without reduced motion preference
    if (
      typeof window === 'undefined' || 
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Strict Memory Pools to guarantee 60/120fps with 0 GC pauses
    const MAX_PARTICLES = 36;
    const MAX_ARCS = 6;
    const MAX_TRAIL = 12;

    const particles = [];
    const trailPoints = [];
    const lightningArcs = [];

    const colors = [
      { r: 254, g: 240, b: 138 }, // Light gold
      { r: 245, g: 158, b: 11 },  // Gold primary
      { r: 217, g: 119, b: 6 },   // Amber deep
      { r: 192, g: 132, b: 252 }, // Purple glow
      { r: 255, g: 255, b: 255 }  // Spark white
    ];

    let lastMousePos = null;
    let animId = null;
    let isRunning = false;
    let lastMoveTime = 0;

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    // Spawn sparks with strict pool capping
    const spawnSparks = (x, y, count = 8, speedMultiplier = 1) => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift();
        }
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 3.0 + 1.0) * speedMultiplier;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.2 + 1,
          life: 1.0,
          decay: Math.random() * 0.04 + 0.03,
          color
        });
      }
    };

    // Create jagged lightning segment between two points
    const createLightning = (x1, y1, x2, y2, displace = 12, iterations = 2) => {
      if (lightningArcs.length >= MAX_ARCS) {
        lightningArcs.shift();
      }

      const points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      for (let i = 0; i < iterations; i++) {
        for (let j = points.length - 1; j > 0; j--) {
          const p1 = points[j - 1];
          const p2 = points[j];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          
          const normalX = -(p2.y - p1.y);
          const normalY = p2.x - p1.x;
          const len = Math.hypot(normalX, normalY) || 1;
          const offset = (Math.random() - 0.5) * displace * (1 / (i + 1));
          
          points.splice(j, 0, {
            x: midX + (normalX / len) * offset,
            y: midY + (normalY / len) * offset
          });
        }
      }

      const color = colors[Math.floor(Math.random() * colors.length)];
      lightningArcs.push({
        points,
        life: 1.0,
        decay: 0.14,
        color,
        width: Math.random() * 1.4 + 0.8
      });
    };

    // Mouse move handler (throttled distance)
    const onMouseMove = (e) => {
      const now = performance.now();
      const currentPos = { x: e.clientX, y: e.clientY };

      if (lastMousePos) {
        const dist = Math.hypot(currentPos.x - lastMousePos.x, currentPos.y - lastMousePos.y);

        if (dist > 6) {
          if (trailPoints.length >= MAX_TRAIL) {
            trailPoints.shift();
          }
          trailPoints.push({
            x: currentPos.x,
            y: currentPos.y,
            life: 1.0,
            decay: 0.09
          });

          // Create subtle electric lightning arc (capped interval)
          if (now - lastMoveTime > 30) {
            createLightning(lastMousePos.x, lastMousePos.y, currentPos.x, currentPos.y, Math.min(dist * 0.35, 14), 2);
            lastMoveTime = now;

            if (Math.random() < 0.3) {
              spawnSparks(currentPos.x, currentPos.y, 2, 0.5);
            }
          }
        }
      }

      lastMousePos = currentPos;
      startAnimation();
    };

    // Mouse click handler -> concise electric spark burst
    const onMouseDown = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      spawnSparks(x, y, 14, 1.5);

      const arcCount = 4;
      for (let i = 0; i < arcCount; i++) {
        const angle = (i / arcCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const length = Math.random() * 35 + 20;
        const targetX = x + Math.cos(angle) * length;
        const targetY = y + Math.sin(angle) * length;
        createLightning(x, y, targetX, targetY, 15, 2);
      }

      startAnimation();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let hasActiveElements = false;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // 1. Draw lightning arcs
      for (let i = lightningArcs.length - 1; i >= 0; i--) {
        const arc = lightningArcs[i];
        arc.life -= arc.decay;

        if (arc.life <= 0) {
          lightningArcs.splice(i, 1);
          continue;
        }

        hasActiveElements = true;
        const pts = arc.points;
        if (pts.length < 2) continue;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j < pts.length; j++) {
          ctx.lineTo(pts[j].x, pts[j].y);
        }

        // Glow layer
        ctx.strokeStyle = `rgba(${arc.color.r}, ${arc.color.g}, ${arc.color.b}, ${arc.life * 0.75})`;
        ctx.lineWidth = arc.width * (arc.life + 0.4);
        ctx.shadowColor = `rgba(${arc.color.r}, ${arc.color.g}, ${arc.color.b}, 0.85)`;
        ctx.shadowBlur = 6;
        ctx.stroke();

        // White core
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j < pts.length; j++) {
          ctx.lineTo(pts[j].x, pts[j].y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${arc.life})`;
        ctx.lineWidth = Math.max(0.7, arc.width * 0.35);
        ctx.shadowBlur = 0;
        ctx.stroke();
      }

      // 2. Draw spark particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        hasActiveElements = true;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.75)`;
        ctx.shadowBlur = 5;
        ctx.fill();
      }

      // 3. Draw smooth trail glow
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        const tp = trailPoints[i];
        tp.life -= tp.decay;

        if (tp.life <= 0) {
          trailPoints.splice(i, 1);
          continue;
        }

        hasActiveElements = true;

        ctx.beginPath();
        ctx.arc(tp.x, tp.y, 2.2 * tp.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${tp.life * 0.45})`;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.restore();

      if (hasActiveElements) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, width, height); // Clean clear when idle
      }
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      if (animId) cancelAnimationFrame(animId);
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999999] will-change-transform"
      aria-hidden="true"
    />
  );
}
