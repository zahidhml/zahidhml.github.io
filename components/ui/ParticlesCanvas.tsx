'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  drift: number;
  driftAngle: number;
  color: 0 | 1 | 2;
}

const COLORS = [
  [128, 255, 219],  // aquamarine
  [116, 0, 184],    // violet
  [94, 96, 206],    // slate-indigo
];

const PARTICLE_COUNT   = 42;
const CONNECT_DISTANCE = 120;
const CURSOR_RADIUS    = 180;
const REPEL_STRENGTH   = 1.2;
const SPRING           = 0.04;
const DAMPING          = 0.82;

/**
 * ParticlesCanvas — fixed-position canvas with soft glow particles,
 * mouse repulsion, and connecting lines near the cursor.
 * Pauses when the browser tab is hidden.
 */
export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Distribute particles evenly across the viewport
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const col = i % 7;
      const row = Math.floor(i / 7);
      const baseX = (col / 6) * W + (Math.random() - 0.5) * (W / 6);
      const baseY = (row / 6) * H + (Math.random() - 0.5) * (H / 6);
      return {
        x: baseX, y: baseY,
        baseX, baseY,
        vx: 0, vy: 0,
        radius: 1.2 + Math.random() * 1.8,
        opacity: 0.12 + Math.random() * 0.18,
        drift: 0.04 + Math.random() * 0.06,
        driftAngle: Math.random() * Math.PI * 2,
        color: (i % 3) as 0 | 1 | 2,
      };
    });

    const mouse = { x: -999, y: -999 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    let rafId: number;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (paused) return;

      ctx.clearRect(0, 0, W, H);

      // ── Update particles ──────────────────────────────────────────────────
      for (const p of particles) {
        // Slow organic drift
        p.driftAngle += 0.008;
        p.baseX += Math.cos(p.driftAngle) * p.drift * 0.15;
        p.baseY += Math.sin(p.driftAngle) * p.drift * 0.15;

        // Wrap at edges
        if (p.baseX < -50)   p.baseX += W + 100;
        if (p.baseX > W + 50) p.baseX -= W + 100;
        if (p.baseY < -50)   p.baseY += H + 100;
        if (p.baseY > H + 50) p.baseY -= H + 100;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CURSOR_RADIUS * CURSOR_RADIUS && distSq > 0) {
          const dist  = Math.sqrt(distSq);
          const force = ((CURSOR_RADIUS - dist) / CURSOR_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Spring toward base position
        p.vx += (p.baseX - p.x) * SPRING;
        p.vy += (p.baseY - p.y) * SPRING;

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        p.x += p.vx;
        p.y += p.vy;
      }

      // ── Draw connecting lines near cursor ────────────────────────────────
      const near: Particle[] = [];
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        if (dx * dx + dy * dy < 220 * 220) near.push(p);
      }

      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const p1 = near[i], p2 = near[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(94, 96, 206, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ── Draw particles ───────────────────────────────────────────────────
      for (const p of particles) {
        const [r, g, b] = COLORS[p.color];
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grd.addColorStop(0, `rgba(${r},${g},${b},${p.opacity})`);
        grd.addColorStop(0.4, `rgba(${r},${g},${b},${p.opacity * 0.4})`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}
