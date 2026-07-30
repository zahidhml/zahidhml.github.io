'use client';

import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  size: number;
}

/**
 * MouseTrail — subtle, premium fading glow trail that follows the cursor.
 * Uses a lightweight canvas overlay with 60 FPS requestAnimationFrame.
 * Fades out gracefully after ~250-350ms with no harsh artifacts.
 */
export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const points: TrailPoint[] = [];
    let lastX = -9999;
    let lastY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Only add point if moved at least 4px
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 4) {
        points.push({
          x,
          y,
          age: 0,
          maxAge: 18 + Math.random() * 6, // ~20 frames
          size: 14 + Math.random() * 8,
        });
        lastX = x;
        lastY = y;

        // Keep maximum points low for performance
        if (points.length > 25) {
          points.shift();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let rafId: number;
    let paused = false;

    const handleVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      rafId = requestAnimationFrame(render);
      if (paused) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age += 1;

        if (p.age >= p.maxAge) {
          points.splice(i, 1);
          continue;
        }

        const progress = p.age / p.maxAge;
        const opacity = (1 - progress) * 0.12; // Extremely soft & subtle (max 12% opacity)
        const radius = p.size * (1 - progress * 0.3);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        gradient.addColorStop(0, `rgba(128, 255, 219, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(116, 0, 184, ${opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-35"
      style={{ willChange: 'transform' }}
    />
  );
}
