import { useEffect, useRef } from 'react';
import Clouds from '../ui/Clouds';
import { gsap, ScrollTrigger } from '../../lib/scroll';

// Smoother field-quote reveal — GSAP timeline tied to one ScrollTrigger on
// the section wrapper.
//   Stage 1: blockquote body — opacity + y + blur clear, 1.6s power3.out
//   Stage 2: attribution — opacity + y, 1.0s power2.out, '-=1.0' (overlaps)
//   Stage 3: "From the field" eyebrow (decorative) — opacity + scaleY 0.6→1,
//            1.2s power2.out, at timeline start (cascades alongside body).
// onComplete strips GSAP's inline overrides so each element settles onto
// its CSS-defined final style (font-size clamp, letter-spacing, etc.) with
// no visible inline-style snap. The .gsap-reveal-init class hides each
// element pre-reveal and is removed in the same onComplete cleanup.
export default function CustomerProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current || !eyebrowRef.current) return;
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const quote = quoteRef.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      [eyebrow, quote].forEach((el) => {
        el.classList.remove('gsap-reveal-init');
      });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
        onComplete: () => {
          gsap.set([eyebrow, quote], {
            clearProps: 'transform,filter,opacity,scaleY,y',
          });
          [eyebrow, quote].forEach((el) =>
            el.classList.remove('gsap-reveal-init')
          );
        },
      })
        .fromTo(
          eyebrow,
          { opacity: 0, scaleY: 0.6, transformOrigin: '50% 100%' },
          { opacity: 1, scaleY: 1, duration: 1.2, ease: 'power2.out' },
          0
        )
        .fromTo(
          quote,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
          0
        );
    }, section);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '80vh',
        background: 'transparent',
      }}
      aria-label="From the field"
    >
      <Clouds opacity={0.32} />

      <div
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: '80vh', zIndex: 3, padding: 'clamp(80px, 12vh, 140px) 24px' }}
      >
        <div style={{ maxWidth: 1100 }}>
          <p
            ref={eyebrowRef}
            className="gsap-reveal-init"
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 44,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            From the field
          </p>

          <blockquote
            ref={quoteRef}
            className="bolder-on-scroll gsap-reveal-init"
            style={{
              fontSize: 'clamp(40px, 5vw, 84px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            “We replaced four tools, three spreadsheets, and two anxious Sunday mornings.”
          </blockquote>

        </div>
      </div>
    </section>
  );
}
