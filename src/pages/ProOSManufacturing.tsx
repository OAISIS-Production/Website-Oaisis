import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Truck, Warehouse } from 'lucide-react';
import Glass from '../components/ui/Glass';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import Clouds from '../components/ui/Clouds';
import GlowLogo from '../components/ui/GlowLogo';
import { gsap, ScrollTrigger } from '../lib/scroll';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.85)',
  marginBottom: 14,
  fontFamily: "'Inter', sans-serif",
  textShadow: '0 1px 8px rgba(15,42,74,0.30)',
};

const heroSubheadStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  fontWeight: 400,
  color: 'rgba(255,255,255,0.88)',
  fontFamily: "'Inter', sans-serif",
  textShadow: '0 1px 10px rgba(15,42,74,0.28)',
};

const cardEyebrow: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.78)',
  fontFamily: "'Inter', sans-serif",
};

const MOMENTS = [
  {
    icon: Factory,
    title: 'Production That Never Loses Sight.',
    body: "Real-time line awareness across every cell. When throughput drops, the system surfaces the root cause before your shift lead does.",
  },
  {
    icon: Truck,
    title: 'Supply Chain That Anticipates.',
    body: 'OAISIS reads inbound logistics, vendor patterns, and inventory drift continuously. The reorder happens before the stockout has a chance to.',
  },
  {
    icon: Warehouse,
    title: 'Warehouse That Answers You.',
    body: "Ask where any SKU is, what's moving today, what's stuck. Get the answer in a sentence, not a spreadsheet.",
  },
];

const BEFORE = [
  'Disconnected MES, ERP, WMS',
  'Manual handoffs between shifts',
  'Reports written, then ignored',
  'Stockouts found at receiving',
  'Production data lives in spreadsheets',
];

const WITH = [
  'One operating layer',
  'Continuous handoff intelligence',
  'Reports that act, not just inform',
  'Inventory anticipation',
  'Live production memory across every cell',
];

export default function ProOSManufacturing() {
  const heroRef = useRef<HTMLHeadingElement>(null);

  // Three-line hero stagger: animate each <span class="line-N"> in 0.15s
  // steps. clearProps + class-remove on complete so the lines settle onto
  // their CSS-defined styles (font-size clamp, weight) with no inline-snap.
  useEffect(() => {
    if (!heroRef.current) return;
    const headline = heroRef.current;
    const lines = headline.querySelectorAll<HTMLSpanElement>('.line-1, .line-2, .line-3');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      lines.forEach((el) => el.classList.remove('gsap-reveal-init'));
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
          // Play once on entry, never reverse, never re-fire. Identical
          // to the shared SubpageHeroHeadline config so all four subpage
          // heroes (this one + PE / General / Umbrella) behave the same.
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: () => {
          gsap.set(lines, { clearProps: 'transform,filter,opacity,y' });
          lines.forEach((el) => {
            el.classList.remove('gsap-reveal-init');
            el.classList.add('is-revealed');
          });
        },
      });
      tl.fromTo(
        lines,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.15,
        }
      );
    }, headline);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <main
      className="relative w-full overflow-hidden"
      style={{
        background: 'transparent',
        minHeight: '100vh',
      }}
    >
      <AmbientBlobs
        blobs={[
          { color: 'sky', size: 280, top: '6%', right: '6%' },
          { color: 'deep', size: 240, top: '40%', left: '4%' },
          { color: 'white', size: 220, bottom: '8%', right: '12%' },
        ]}
      />
      <Clouds opacity={0.32} />

      {/* Hero — eyebrow + three-line stacked headline + subhead + CTA. */}
      <section
        className="relative mx-auto px-6 flex flex-col items-center justify-center"
        style={{ maxWidth: 1200, padding: '160px 24px 120px', minHeight: '90vh' }}
      >
        <motion.div {...fadeUp} className="text-center mx-auto" style={{ maxWidth: 1080 }}>
          <p style={eyebrowStyle}>Manufacturing</p>
          <h1
            ref={heroRef}
            className="hero-headline mx-auto"
            style={{
              marginTop: 'clamp(40px, 6vh, 80px)',
              marginBottom: 'clamp(80px, 12vh, 160px)',
              textAlign: 'center',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span
              // Mobile clamp unchanged; desktop clamp widened to match the
              // shared SubpageHeroHeadline pattern (110/8.5vw/200) so the
              // headline keeps a consistent proportional size from 1280px
              // laptops up through 2560px monitors.
              className="line-1 block gsap-reveal-init text-[clamp(48px,9vw,160px)] md:text-[clamp(72px,6vw,144px)]"
              style={{
                display: 'block',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                color: '#FFFFFF',
                lineHeight: 1.0,
                textShadow: '0 2px 20px rgba(15,42,74,0.40)',
              }}
            >
              The Operating Layer
            </span>
            <span
              // Mobile clamp unchanged; desktop clamp widened to match the
              // shared SubpageHeroHeadline pattern (64/5vw/112) — same
              // proportional scaling as the heavy lines above and below.
              className="line-2 block gsap-reveal-init text-[clamp(28px,5vw,80px)] md:text-[clamp(40px,3.5vw,80px)]"
              style={{
                display: 'block',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.0,
                marginTop: 'clamp(8px, 1.5vh, 20px)',
                marginBottom: 'clamp(8px, 1.5vh, 20px)',
                textShadow: '0 1px 12px rgba(15,42,74,0.30)',
              }}
            >
              for
            </span>
            <span
              className="line-3 block gsap-reveal-init text-[clamp(48px,9vw,160px)] md:text-[clamp(72px,6vw,144px)]"
              style={{
                display: 'block',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                color: '#FFFFFF',
                lineHeight: 1.0,
                textShadow: '0 2px 20px rgba(15,42,74,0.40)',
              }}
            >
              the Factory Floor.
            </span>
          </h1>
          <p className="mx-auto mb-10" style={{ ...heroSubheadStyle, maxWidth: 720 }}>
            OAISIS runs the connective tissue between production, supply chain, and the warehouse —
            so your team stops chasing handoffs and starts running operations.
          </p>
          <Link to="/demo" className="btn-primary-emerald btn-magnetic" data-idle-pulse>
            Book a discovery call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Three product moments — luminescent glass cards stacked vertically. */}
      <section className="relative mx-auto px-6" style={{ maxWidth: 1080, padding: '40px 24px 80px' }}>
        <div className="flex flex-col gap-6">
          {MOMENTS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              >
                <Glass variant="luminescent" style={{ padding: 'clamp(32px, 4.4vw, 48px)' }}>
                  <div className="flex items-start gap-5">
                    <div
                      className="flex-shrink-0 inline-flex items-center justify-center"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        background: 'rgba(255,255,255,0.18)',
                        border: '1px solid rgba(255,255,255,0.30)',
                        color: '#FFFFFF',
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h2
                        className="mb-3"
                        style={{
                          fontSize: 'clamp(22px, 2.6vw, 32px)',
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          color: '#FFFFFF',
                          lineHeight: 1.2,
                          fontFamily: "'Inter', sans-serif",
                          textShadow: '0 2px 12px rgba(15,42,74,0.30)',
                        }}
                      >
                        {m.title}
                      </h2>
                      <p
                        style={{
                          fontSize: 'clamp(15px, 1.4vw, 17px)',
                          lineHeight: 1.7,
                          color: 'rgba(255,255,255,0.88)',
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {m.body}
                      </p>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* What this replaces — Before vs With, both luminescent. */}
      <section className="relative mx-auto px-6" style={{ maxWidth: 1080, padding: '60px 24px 80px' }}>
        <motion.div {...fadeUp} className="text-center mb-12 mx-auto" style={{ maxWidth: 760 }}>
          <p style={eyebrowStyle}>What this replaces</p>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.4vw, 56px)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
              lineHeight: 1.05,
              textAlign: 'center',
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 2px 20px rgba(15,42,74,0.40)',
            }}
          >
            Stop running your factory through 14 tabs.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { eyebrow: 'Before OAISIS', items: BEFORE, accent: 'rgba(255,255,255,0.45)', delay: 0 },
            { eyebrow: 'With OAISIS', items: WITH, accent: 'rgba(255,255,255,0.95)', delay: 0.1 },
          ].map((card) => (
            <motion.div
              key={card.eyebrow}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: card.delay }}
            >
              <Glass
                variant="luminescent"
                className="md:min-h-[480px]"
                style={{
                  padding: 'clamp(40px, 6vh, 72px)',
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(32px, 4vw, 56px)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    lineHeight: 1.05,
                    marginBottom: 'clamp(24px, 4vh, 40px)',
                    fontFamily: "'Inter', sans-serif",
                    textShadow: '0 2px 14px rgba(15,42,74,0.35)',
                  }}
                >
                  {card.eyebrow}
                </h3>
                <ul className="flex flex-col">
                  {card.items.map((line) => (
                    <li
                      key={line}
                      style={{
                        fontSize: 'clamp(18px, 1.6vw, 24px)',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.92)',
                        fontFamily: "'Inter', sans-serif",
                        paddingLeft: 24,
                        position: 'relative',
                        marginBottom: 16,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.65em',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: card.accent,
                        }}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing CTA — luminescent glass card, matches the rest of the page. */}
      <section className="relative mx-auto px-6" style={{ maxWidth: 880, padding: '40px 24px 80px' }}>
        <motion.div {...fadeUp}>
          <Glass variant="luminescent" className="text-center" style={{ padding: 'clamp(36px, 5vw, 56px)' }}>
            <p style={{ ...cardEyebrow, marginBottom: 18 }}>Talk to us</p>
            <h2
              className="mb-5"
              style={{
                fontSize: 'clamp(26px, 3.4vw, 40px)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                fontFamily: "'Inter', sans-serif",
                textShadow: '0 2px 14px rgba(15,42,74,0.35)',
              }}
            >
              Built for operators who actually run the floor.
            </h2>
            <p
              className="mx-auto mb-8"
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.88)',
                maxWidth: '54ch',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              OAISIS deploys with the team that built it. No offshore support tickets, no enterprise
              consulting maze. Direct line to engineering.
            </p>
            <Link to="/demo" className="btn-primary-emerald btn-magnetic" data-idle-pulse>
              Book a discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Glass>
        </motion.div>
      </section>

      {/* Sky continuation — matches Pricing page's closing rhythm. */}
      <section
        className="relative w-full overflow-hidden"
        style={{ marginTop: 40, height: 'min(70vh, 640px)', background: 'transparent' }}
        aria-label="Finally, the future of your operations"
      >
        <Clouds opacity={0.32} />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at center 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 75%)',
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <motion.div {...fadeUp} className="oasis-logo-float">
            <GlowLogo size={120} glow="white" />
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mx-auto mt-8"
            style={{
              fontSize: 'clamp(32px, 4.4vw, 64px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              textShadow: '0 2px 14px rgba(10,40,80,0.55), 0 0 32px rgba(255,255,255,0.18)',
              maxWidth: 900,
              lineHeight: 1.0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Finally, the future of your operations.
          </motion.p>
        </div>
      </section>
    </main>
  );
}
