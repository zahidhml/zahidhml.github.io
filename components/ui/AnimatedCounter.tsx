'use client';

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * AnimatedCounter — counts up from 0 to `end` when scrolled into view.
 */
export default function AnimatedCounter({
  end,
  suffix = '',
  duration = 1800,
  className = '',
}: AnimatedCounterProps) {
  const { count, elementRef } = useAnimatedCounter({ end, suffix, duration });

  return (
    <div ref={elementRef} className={className} aria-label={`${end}${suffix}`}>
      {count}
    </div>
  );
}
