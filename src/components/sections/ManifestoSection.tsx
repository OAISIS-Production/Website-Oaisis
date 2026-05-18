import { useEffect, useRef } from 'react';
import Clouds from '../ui/Clouds';
import PersonAtDesk from '../demos/PersonAtDesk';
import { gsap, ScrollTrigger } from '../../lib/scroll';

// Two-stage reveal for the Manifesto's opening statement:
//   Stage 1: "Finally" — 7 per-character spans, each tumbling in from a 3D
//            rotation (rotateX -60deg) with a blur-clear and a forward y
//            translate. Power4.out, staggered 0.05s.
//   Stage 2: Text-shadow "ignition" pulse on the full "Finally" line as the
//            cascade lands — peak brightens and slightly bluifies the glow.
//   Stage 3: "The future of your operations." — 5 per-word spans, each
//            fading up with blur clearing and a subtle scale-in. Begins as
//            Stage 2's pulse peaks ('-=0.4' on the timeline).
//   Stage 4: Whole-headline breath — subtle scale 1.0 → 1.015 → 1.0 over
//            1.2s, sine.inOut. The statement has landed and is breathing.
const FINALLY_CHARS = 'Finally'.split('');
const FUTURE_WORDS = 'The future of your operations.'.split(/\s+/);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineWrapRef = useRef<HTMLDivElement>(null);
  const finallyRef = useRef<HTMLSpanElement>(null);
  const futureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!headlineWrapRef.current || !finallyRef.current || !futureRef.current) return;
    const wrap = headlineWrapRef.current;
    const finallyEl = finallyRef.current;
    const futureEl = futureRef.current;
    const chars = finallyEl.querySelectorAll<HTMLSpanElement>('[data-finally-char]');
    const words = futureEl.querySelectorAll<HTMLSpanElement>('[data-future-word]');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      chars.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
        c.style.filter = 'none';
      });
      words.forEach((w) => {
        w.style.opacity = '1';
        w.style.transform = 'none';
        w.style.filter = 'none';
      });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stage 1: "Finally" character cascade — 3D tumble + blur clear.
      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 80,
          rotateX: -60,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.05,
          ease: 'power4.out',
        },
        0
      );

      // Stage 2: sustained ignition glow on the FULL "Finally" line.
      // Builds up to the peak value over 0.6s and HOLDS there — the
      // statement stays lit for as long as the section is in view
      // (reversed automatically by toggleActions on scroll-out).
      tl.to(
        finallyEl,
        {
          textShadow:
            '0 4px 36px rgba(120,180,230,0.65), 0 0 60px rgba(255,255,255,0.2)',
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Stage 3: "The future of your operations." per-word stagger.
      // Starts as the ignition pulse peaks so the two lines feel composed.
      tl.fromTo(
        words,
        {
          opacity: 0,
          y: 50,
          scale: 0.94,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // Stage 4: whole-headline breath — the statement has landed.
      tl.to(wrap, {
        scale: 1.015,
        duration: 0.6,
        ease: 'sine.inOut',
      }).to(wrap, {
        scale: 1,
        duration: 0.6,
        ease: 'sine.inOut',
      });
    }, wrap);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <Clouds opacity={0.22} />

      <div
        className="relative mx-auto px-6"
        style={{
          maxWidth: 1200,
          minHeight: '100vh',
          paddingTop: 0,
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(40px, 6vh, 80px)',
        }}
      >
        <div
          className="text-center"
          ref={headlineWrapRef}
          style={{
            width: '100%',
            // preserve-3d so per-character rotateX in Stage 1 renders as
            // actual 3D depth rather than a flat skew.
            transformStyle: 'preserve-3d',
            perspective: '1200px',
            willChange: 'transform',
          }}
        >
          {/* Two-line headline. Bigger, bolder. Spacing unchanged from prior
              round: tight to the hero CTAs above, MUCH more breathing room
              below before "Software was supposed to help.". */}
          <span
            ref={finallyRef}
            // text-[…] mobile-first; md:text-[…] restores the original
            // desktop clamp. Desktop (≥768px) renders the unchanged
            // clamp(140px, 18vw, 280px). Mobile gets a 72px floor so the
            // single-word line doesn't overflow at 375–390px viewports.
            className="block text-[clamp(72px,18vw,280px)] md:text-[clamp(140px,18vw,280px)]"
            style={{
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              lineHeight: 0.95,
              marginTop: 'clamp(40px, 6vh, 80px)',
              marginBottom: 'clamp(24px, 4vh, 48px)',
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 2px 22px rgba(15,42,74,0.45)',
              transformStyle: 'preserve-3d',
              willChange: 'transform, text-shadow',
            }}
          >
            {FINALLY_CHARS.map((ch, i) => (
              <span
                key={i}
                data-finally-char
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(80px) rotateX(-60deg)',
                  transformOrigin: '50% 50% -40px',
                  filter: 'blur(8px)',
                  willChange: 'transform, opacity, filter',
                }}
              >
                {ch}
              </span>
            ))}
          </span>
          <span
            ref={futureRef}
            // Desktop clamp preserved at md:; mobile reduces the 96px floor
            // to 48px so the longer second line wraps gracefully on 375–390px.
            className="block text-[clamp(48px,12vw,200px)] md:text-[clamp(96px,12vw,200px)]"
            style={{
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
              lineHeight: 1.0,
              marginBottom: 'clamp(280px, 32vh, 420px)',
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 2px 18px rgba(15,42,74,0.40)',
              willChange: 'transform',
            }}
          >
            {FUTURE_WORDS.map((word, i) => (
              <span
                key={i}
                data-future-word
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(50px) scale(0.94)',
                  filter: 'blur(6px)',
                  whiteSpace: 'pre',
                  willChange: 'transform, opacity, filter',
                }}
              >
                {word}
                {i < FUTURE_WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
          {/* Existing Manifesto beat — left-aligned per prior layout. */}
          <h3
            className="bolder-on-scroll"
            style={{
              fontSize: 'clamp(48px, 6.5vw, 104px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              color: '#FFFFFF',
              lineHeight: 0.95,
              margin: 0,
              textAlign: 'left',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Software was supposed to help.
          </h3>
          <p
            style={{
              fontSize: 'clamp(20px, 2.2vw, 30px)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.3,
              marginTop: 18,
              textAlign: 'left',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Instead, your team runs the software.
          </p>
        </div>

        <PersonAtDesk />
      </div>
    </section>
  );
}
