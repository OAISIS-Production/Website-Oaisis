import { lazy, Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ScrollTrigger, gsap } from '../../lib/scroll';
import HeroClouds from './HeroClouds';

// HeroGlassWordmark bundles all of Three.js + R3F + Drei (~700KB minified).
// Lazy-load it so non-home pages skip the chunk entirely. While it loads,
// show the same static CSS fallback the wordmark uses on mobile / reduced-motion.
const HeroGlassWordmark = lazy(() => import('./HeroGlassWordmark'));

function WordmarkFallback() {
  return (
    <div
      className="flex items-center justify-center pointer-events-none select-none w-full h-full"
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 200,
        fontSize: 'clamp(56px, 14vw, 160px)',
        letterSpacing: '-2px',
        color: 'rgba(255,255,255,0.92)',
        textShadow:
          '0 2px 8px rgba(91,160,212,0.25), 0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(200,173,126,0.18)',
      }}
      aria-label="OAISIS"
    >
      OAISIS
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkWrapRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !wordmarkWrapRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Pin hero for an extra 60% of viewport, scale + fade wordmark on exit
      gsap.to(wordmarkWrapRef.current, {
        scale: 0.85,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=60%',
          pin: true,
          scrub: true,
          pinSpacing: true,
        },
      });

      // Fade out the scroll cue once user starts scrolling
      if (scrollCueRef.current) {
        gsap.to(scrollCueRef.current, {
          opacity: 0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=10%',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '100vh',
        background:
          'linear-gradient(180deg, #5BA0D4 0%, #93C5E8 40%, #D0E7F5 80%, #F5EFE0 100%)',
      }}
    >
      <HeroClouds />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
            textShadow: '0 1px 8px rgba(37,99,168,0.25)',
            marginBottom: 24,
          }}
        >
          The Intelligent Enterprise
        </motion.p>

        <div
          ref={wordmarkWrapRef}
          className="relative will-change-transform"
          style={{
            width: 'min(90vw, 1200px)',
            height: 'clamp(160px, 28vw, 320px)',
          }}
        >
          <Suspense fallback={<WordmarkFallback />}>
            <HeroGlassWordmark />
          </Suspense>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-6 mx-auto"
          style={{
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontWeight: 300,
            color: '#FFFFFF',
            letterSpacing: '-0.2px',
            textShadow: '0 2px 10px rgba(37,99,168,0.25)',
            maxWidth: 640,
            lineHeight: 1.35,
          }}
        >
          The future of business, installed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 mt-10"
        >
          <Link to="/demo" className="btn-hero-solid">
            Book a demo
          </Link>
          <Link to="/pro-os" className="btn-hero-ghost">
            See Pro OS
          </Link>
        </motion.div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute left-0 right-0 flex flex-col items-center pointer-events-none z-10"
        style={{ bottom: 32 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 8,
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  );
}
