import { RefObject, useEffect } from 'react';
import { getLenis } from './scroll';

/**
 * Apply scroll-driven translateY to an element via direct DOM manipulation.
 * No React re-renders; pulls from Lenis when active, otherwise window.scrollY.
 *
 * speed > 0 = element moves UP as user scrolls down (parallax-far)
 * Smaller speed = slower = appears farther away
 */
export function useParallax(ref: RefObject<HTMLElement>, speed: number) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      const lenis = getLenis();
      const y = lenis ? lenis.scroll : window.scrollY;
      if (ref.current) {
        ref.current.style.transform = `translate3d(0, ${-y * speed}px, 0)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [ref, speed]);
}
