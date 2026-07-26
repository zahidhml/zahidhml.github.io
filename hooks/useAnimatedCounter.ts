'use client';

import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number; // ms
  start?: number;
  decimals?: number;
  suffix?: string;
}

/**
 * Custom hook that animates a number from `start` to `end` using
 * an easeOut curve. Starts counting when the element enters the viewport.
 */
export function useAnimatedCounter({
  end,
  duration = 1800,
  start = 0,
  decimals = 0,
  suffix = '',
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasStarted]);

  // Count-up animation with easeOut
  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const range = end - start;

    const step = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + range * ease;
      setCount(parseFloat(current.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, end, start, duration, decimals]);

  const formatted =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return { count: formatted + suffix, elementRef };
}
