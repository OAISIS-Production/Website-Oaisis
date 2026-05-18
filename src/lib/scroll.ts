import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isMobile = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches ||
    /Mobi|Android/i.test(navigator.userAgent));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Initialize Lenis smooth scroll + bind GSAP ScrollTrigger to it.
 * Skips Lenis on mobile and when prefers-reduced-motion is set.
 */
export function useLenisScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable Lenis on mobile or when reduced motion requested — use native scroll.
    if (isMobile() || prefersReducedMotion()) {
      // Make sure ScrollTrigger still works with native scroll.
      ScrollTrigger.refresh();
      return;
    }

    // Standard Lenis + GSAP wiring — no scrollerProxy.
    // The prior scrollerProxy(document.body, …) told ScrollTrigger to treat
    // document.body as the scroll container, but the actual scroll happens
    // on window. The proxy's getBoundingClientRect returned the viewport
    // rect instead of body's, so trigger boundaries were computed against a
    // rect that disagreed with where scroll actually moves — producing the
    // perceived "freeze at top". Removing the proxy lets ScrollTrigger use
    // its default window-based scroller, which matches Lenis's behavior.
    // No duration, no custom easing → Lenis becomes near-instant on wheel
    // input. With gsap.ticker driving the rAF loop and ScrollTrigger
    // listening to lenis 'scroll' events, scroll input maps 1:1 to motion.
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });
    lenisInstance = lenis;

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    (window as unknown as { __ScrollTrigger?: typeof ScrollTrigger }).__ScrollTrigger = ScrollTrigger;

    // Bridge: every Lenis scroll event triggers a ScrollTrigger update.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (single rAF source, no drift).
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}

export { ScrollTrigger, gsap };
