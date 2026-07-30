'use client';

import { useEffect, useRef } from 'react';

interface OrbState {
  el: HTMLDivElement | null;
  lerpX: number;
  lerpY: number;
  t: number;
  freq: number;
  amp: { x: number; y: number };
  offset: { x: number; y: number };
  mouseWeight: number;
}

/**
 * GradientOrbs — three large blurred gradient orbs (violet, indigo, cyan)
 * that slowly drift and subtly follow the cursor via lerp.
 * Fixed position, behind all content, invisible to pointer events.
 */
export default function GradientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = Array.from(container.children) as HTMLDivElement[];

    // Per-orb animation config
    const configs: Omit<OrbState, 'el'>[] = [
      { lerpX: 0, lerpY: 0, t: 0,    freq: 0.06, amp: { x: 40, y: 30 }, offset: { x: 0.1, y: 0.1 }, mouseWeight: 0.04 },
      { lerpX: 0, lerpY: 0, t: 1.4,  freq: 0.08, amp: { x: 50, y: 35 }, offset: { x: -0.03, y: -0.03 }, mouseWeight: 0.025 },
      { lerpX: 0, lerpY: 0, t: 2.8,  freq: 0.05, amp: { x: 30, y: 45 }, offset: { x: 0.02, y: 0.02 }, mouseWeight: 0.02 },
    ];

    const states: OrbState[] = configs.map((cfg, i) => ({
      ...cfg,
      el: orbs[i] ?? null,
    }));

    let mouseNX = 0.5; // normalized mouse x (0..1)
    let mouseNY = 0.5;

    const onMove = (e: MouseEvent) => {
      mouseNX = e.clientX / window.innerWidth;
      mouseNY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let rafId: number;
    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (paused) return;

      for (const s of states) {
        if (!s.el) continue;
        s.t += 0.008;

        // Slow sinusoidal drift
        const driftX = Math.sin(s.t * s.freq * 10) * s.amp.x;
        const driftY = Math.cos(s.t * s.freq * 8)  * s.amp.y;

        // Mouse influence (very slow lerp toward mouse direction)
        const targetX = (mouseNX - 0.5) * window.innerWidth  * s.mouseWeight * 100;
        const targetY = (mouseNY - 0.5) * window.innerHeight * s.mouseWeight * 100;

        s.lerpX += (targetX - s.lerpX) * 0.015;
        s.lerpY += (targetY - s.lerpY) * 0.015;

        const tx = driftX + s.lerpX;
        const ty = driftY + s.lerpY;

        s.el.style.transform = `translate(${tx}px, ${ty}px)`;
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Violet orb — top left */}
      <div style={{
        position: 'absolute',
        width: '900px', height: '900px',
        top: '-250px', left: '-300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(116,0,184,0.14) 0%, rgba(105,48,195,0.06) 40%, transparent 70%)',
        filter: 'blur(60px)',
        willChange: 'transform',
      }} />
      {/* Indigo orb — center right */}
      <div style={{
        position: 'absolute',
        width: '700px', height: '700px',
        top: '25%', right: '-200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(94,96,206,0.10) 0%, rgba(83,144,217,0.05) 40%, transparent 70%)',
        filter: 'blur(60px)',
        willChange: 'transform',
      }} />
      {/* Cyan orb — bottom center */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '600px',
        bottom: '-150px', left: '30%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(72,191,227,0.09) 0%, rgba(128,255,219,0.04) 40%, transparent 70%)',
        filter: 'blur(60px)',
        willChange: 'transform',
      }} />
    </div>
  );
}
