import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';
import CroppedWordmark from '../ui/CroppedWordmark';
import Clouds from '../ui/Clouds';
import ParticleField from './ParticleField';
import { gsap, ScrollTrigger } from '../../lib/scroll';

const FOOTER_LINKS = [
  { label: 'Products', href: '/pro-os' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Demo', href: '/demo' },
];

// The destination. Transparent over the body sky gradient — clouds drift
// through the final beat so the journey ends in sky, not jungle.
//
// Closing reveal — slow, intentional, cinematic. Single GSAP timeline tied
// to ONE ScrollTrigger on the section wrapper:
//   Stage 1: headline ("Finally, the future of your operations.") — soft
//            blur + y + letter-spacing decompression over 2.2s power3.out.
//   Stage 2: CTA stack — opacity + y over 1.4s power2.out, overlap '-=1.4'.
//   Stage 3: bottom OAISIS wordmark — opacity fade-in over 2.0s power2.inOut,
//            overlap '-=1.0' (begins as the headline lands).
// scrub: false, toggleActions: 'play none none reverse'.
// prefers-reduced-motion snaps every element to its final state.
export default function FinalOasis() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current || !ctaRef.current || !wordmarkRef.current || !logoRef.current) return;
    const section = sectionRef.current;
    const logo = logoRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;
    const wordmark = wordmarkRef.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Just remove the pre-reveal hide class — the CSS-defined final
      // styles (including letterSpacing -0.05em inline in JSX) take over.
      [logo, headline, cta, wordmark].forEach((el) =>
        el.classList.remove('gsap-reveal-init')
      );
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
        onComplete: () => {
          // Clear ONLY the properties GSAP actually animated (opacity,
          // transform, filter). NOT letter-spacing — clearing it would wipe
          // the JSX-inline letterSpacing:-0.05em and the text would snap to
          // the browser-default `normal`, visibly retightening (the
          // previously-reported "font size changes / layout restructures").
          // The is-revealed class holds opacity:1 so clearing inline opacity
          // doesn't re-hide the element.
          gsap.set([logo, headline, cta, wordmark], {
            clearProps: 'transform,filter,opacity,scale,y',
          });
          [logo, headline, cta, wordmark].forEach((el) => {
            el.classList.remove('gsap-reveal-init');
            el.classList.add('is-revealed');
          });
        },
        onReverseComplete: () => {
          // On scroll-out, drop is-revealed so the next forward play starts
          // from a clean hidden state (gsap-reveal-init re-applied by next
          // render? Actually we add it back here to keep the cycle clean).
          [logo, headline, cta, wordmark].forEach((el) => {
            el.classList.remove('is-revealed');
            el.classList.add('gsap-reveal-init');
          });
        },
      });
      // Logo glow lands first — soft scale-in alongside Stage 1.
      tl.fromTo(
        logo,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' },
        0
      );
      // Stage 1: headline soft materialization — opacity + y + blur only.
      // Letter-spacing animation REMOVED (was the glitch source). The
      // CSS-defined letter-spacing of -0.05em from JSX inline stays
      // constant throughout the entire reveal — no string-unit interp,
      // no post-animation snap.
      tl.fromTo(
        headline,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(14px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 2.2,
          ease: 'power3.out',
        },
        0.2
      );
      // Stage 2: CTA stack — overlapping cascade off the headline's tail.
      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
        '-=1.4'
      );
      // Stage 3: bottom OAISIS wordmark — long, slow opacity fade-in.
      // Wrapper holds CSS opacity; the wordmark's color alpha (0.30) is
      // preserved as the rendered resting transparency.
      tl.fromTo(
        wordmark,
        { opacity: 0 },
        { opacity: 1, duration: 2.0, ease: 'power2.inOut' },
        '-=1.0'
      );
    }, section);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
        aria-label="The Oasis"
      >
        <Clouds opacity={0.32} />

        {/* Soft center glow lifts the logo/headline off the sky for legibility.
            The gradient ALSO fades to transparent at the section's TOP edge
            so no perceived band appears at the BreathMoment → Oasis boundary;
            the ellipse is contained well within the section interior. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at center 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 75%)',
          }}
        />

        <ParticleField />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <div
            ref={logoRef}
            className="oasis-logo-float gsap-reveal-init"
          >
            <GlowLogo size={160} glow="white" />
          </div>

          <p
            ref={headlineRef}
            // Mobile floor reduced to 28px; desktop clamp(44px,6vw,96px)
            // preserved at md: and above (≥768px) so desktop is untouched.
            className="mx-auto mt-10 gsap-reveal-init text-[clamp(28px,6vw,96px)] md:text-[clamp(44px,6vw,96px)]"
            style={{
              fontWeight: 800,
              color: '#FFFFFF',
              // FINAL letter-spacing — GSAP animates inline letter-spacing
              // from 0.1em → -0.05em during the reveal, then clearProps
              // strips that inline override on complete. The CSS-defined
              // letter-spacing below remains as the final resting value
              // with no visible snap.
              letterSpacing: '-0.05em',
              textShadow: '0 2px 14px rgba(10,40,80,0.55), 0 0 32px rgba(255,255,255,0.18)',
              maxWidth: 1100,
              lineHeight: 0.95,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Finally, the future of your operations.
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-col items-center gap-4 gsap-reveal-init"
          >
            <Link to="/demo" className="btn-oasis-hero btn-magnetic" data-idle-pulse>
              Book a demo
            </Link>
            <Link
              to="/demo"
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Or talk to us about your operation →
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative">
        {/* Wordmark is wrapped so the GSAP timeline can fade ONLY the
            wordmark layer in (Stage 3) while the wordmark's own color alpha
            stays at the resting 0.30 transparency. */}
        <div ref={wordmarkRef} className="gsap-reveal-init">
          <CroppedWordmark background="transparent" color="rgba(255,255,255,0.30)" height={200} />
        </div>
        <div
          style={{
            background: 'transparent',
            paddingTop: 40,
            paddingBottom: 36,
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-center gap-3">
                <GlowLogo size={32} glow="white" />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 300,
                    letterSpacing: 5,
                    color: 'rgba(255,255,255,0.85)',
                    textTransform: 'uppercase',
                  }}
                >
                  OAISIS
                </span>
              </div>

              <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="transition-colors"
                    style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.85)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)';
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <a
                href="mailto:hello@openoaisis.com"
                className="inline-flex items-center gap-2 transition-colors"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.3px' }}
              >
                <Mail className="w-3.5 h-3.5" />
                hello@openoaisis.com
              </a>
            </div>

            <div
              className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
              style={{ borderTop: '1px solid rgba(91,160,212,0.25)' }}
            >
              <p
                style={{
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                &copy; 2026 OAISIS
              </p>
              <p
                style={{
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Built in Dallas-Fort Worth · Guiding people into the Age of Intelligence
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
