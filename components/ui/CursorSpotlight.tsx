'use client';

import { useEffect, useRef } from 'react';

/**
 * CursorSpotlight — a radial gradient spotlight that follows the cursor,
 * creating a premium interactive lighting effect. Very subtle opacity.
 */
export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(116, 0, 184, 0.06), transparent 40%)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-300"
    />
  );
}
