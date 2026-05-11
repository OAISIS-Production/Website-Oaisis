/**
 * Shared Framer Motion variants for v3 reveal animations.
 *
 * Default reveal:
 *   - opacity 0 -> 1
 *   - translateY 24 -> 0
 *   - 800ms cubic-bezier(0.16, 1, 0.3, 1)
 *   - triggers when element is 80% in-view
 *
 * Reduced motion: opacity only, instant.
 */
import type { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE_GENTLE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_GENTLE },
  },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_GENTLE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_GENTLE } },
};

export const staggerChildren = (delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const viewportOnce = { once: true, amount: 0.4 } as const;

/**
 * Hook: returns true when user prefers reduced motion.
 * Components can use this to conditionally swap to opacity-only / instant variants.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
