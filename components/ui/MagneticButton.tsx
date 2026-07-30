'use client';

import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * MagneticButton — ultra-subtle magnetic shift with 150-200ms transition.
 * No spring bouncing or wild displacement.
 */
export default function MagneticButton({
  children,
  strength = 0.08,
  className,
  style,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform  = `translate(${dx}px, ${dy}px)`;
    el.style.transition = 'transform 0.15s ease-out';
  };

  const handleMouseLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transform  = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.2s ease-out';
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </div>
  );
}
