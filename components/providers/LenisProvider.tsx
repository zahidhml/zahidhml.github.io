'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

type ScrollToTarget = string | number | HTMLElement;

interface LenisScrollContextValue {
  scrollTo: (target: ScrollToTarget, options?: Record<string, unknown>) => void;
}

const LenisScrollContext = createContext<LenisScrollContextValue>({
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(LenisScrollContext);
}

/**
 * LenisProvider — wraps the app with Lenis smooth scroll.
 * Exposes scrollTo via context for programmatic navigation.
 * Pauses the RAF loop when the browser tab is hidden for performance.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let rafId: number;
    let lenis: {
      raf: (time: number) => void;
      scrollTo: (target: ScrollToTarget, options?: Record<string, unknown>) => void;
      destroy: () => void;
    };

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis');

        // @ts-expect-error lenis types vary by version
        lenis = new Lenis({
          duration: 1.3,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.85,
          touchMultiplier: 1.5,
          infinite: false,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const handleVisibility = () => {
          if (document.hidden) {
            cancelAnimationFrame(rafId);
          } else {
            rafId = requestAnimationFrame(raf);
          }
        };
        document.addEventListener('visibilitychange', handleVisibility);
      } catch {
        // Lenis unavailable — native scroll works fine
      }
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      // @ts-expect-error dynamic ref
      lenisRef.current?.destroy?.();
    };
  }, []);

  const scrollTo = (target: ScrollToTarget, options?: Record<string, unknown>) => {
    if (lenisRef.current) {
      // @ts-expect-error dynamic ref
      lenisRef.current.scrollTo(target, { offset: -80, duration: 1.3, ...options });
    } else {
      // Native fallback
      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <LenisScrollContext.Provider value={{ scrollTo }}>
      {children}
    </LenisScrollContext.Provider>
  );
}
