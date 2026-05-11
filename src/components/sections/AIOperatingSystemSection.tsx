import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Mail, DollarSign, Database } from 'lucide-react';
import GlowLogo from '../ui/GlowLogo';
import { gsap, ScrollTrigger } from '../../lib/scroll';

const APPS = [
  { id: 'crm', label: 'CRM', icon: Users, x: 50, y: 7 },
  { id: 'calendar', label: 'Calendar', icon: Calendar, x: 88, y: 30 },
  { id: 'inbox', label: 'Inbox', icon: Mail, x: 78, y: 80 },
  { id: 'accounting', label: 'Accounting', icon: DollarSign, x: 22, y: 80 },
  { id: 'database', label: 'Database', icon: Database, x: 12, y: 30 },
];

const STATES = [
  {
    eyebrow: 'WHAT IT IS',
    heading: 'Think about how a business runs today.',
    body: "Your CRM holds the customers. Your accounting software holds the money. Your calendar holds the schedule. Your inbox holds the conversations. Your team holds everything that hasn't been written down yet. None of them talk to each other. You're the integration.",
  },
  {
    eyebrow: 'WHAT IT BECOMES',
    heading: 'Pro OS is the integration.',
    body: "It connects to all of it — every tool, every data source, every channel — and runs underneath your business as a single, intelligent system. It doesn't replace your software. It operates it.",
  },
  {
    eyebrow: 'THE NEW LAYER',
    heading: "Your business, fully online.",
    body: 'The same way an operating system runs everything underneath your laptop without you thinking about it, Pro OS runs everything underneath your business. Ask it anything and it answers. Tell it anything and it does it. Leave it alone and it keeps working.',
  },
];

function AppTile({
  app,
  active,
  index,
}: {
  app: (typeof APPS)[number];
  active: boolean;
  index: number;
}) {
  const Icon = app.icon;
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${app.x}%`,
        top: `${app.y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      initial={false}
      animate={{
        opacity: 1,
        scale: active ? 0.9 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
    >
      <div
        style={{
          width: 'clamp(54px, 7vw, 76px)',
          height: 'clamp(54px, 7vw, 76px)',
          borderRadius: 14,
          background: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: '0 6px 22px rgba(160,128,80,0.10), inset 0 1px 0 rgba(255,255,255,0.7)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1A6B4A',
        }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <p
        className="text-center mt-2"
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#4D4060',
          opacity: 0.75,
        }}
      >
        {app.label}
      </p>
    </motion.div>
  );
}

function ConnectionLines({ visible }: { visible: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(26,107,74,0.85)" />
          <stop offset="100%" stopColor="rgba(91,160,212,0.85)" />
        </linearGradient>
      </defs>
      {APPS.map((app) => (
        <motion.line
          key={app.id}
          x1={app.x}
          y1={app.y}
          x2={50}
          y2={50}
          stroke="url(#connGrad)"
          strokeWidth={0.25}
          strokeLinecap="round"
          strokeDasharray="1 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: visible ? 1 : 0,
            opacity: visible ? 0.85 : 0,
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}

function YourBusinessRing({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ inset: '-6%', width: '112%', height: '112%' }}
      viewBox="0 0 100 100"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.96 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle
        cx={50}
        cy={50}
        r={48}
        fill="none"
        stroke="rgba(26,107,74,0.45)"
        strokeWidth={0.18}
        strokeDasharray="1.2 1.2"
      />
      <text
        x={50}
        y={3.5}
        fontSize={2.2}
        fontWeight={600}
        letterSpacing={0.5}
        textAnchor="middle"
        fill="rgba(15,77,53,0.7)"
        style={{ textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}
      >
        ◆ YOUR BUSINESS ◆
      </text>
    </motion.svg>
  );
}

export default function AIOperatingSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [stateIndex, setStateIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (prefersReduced || isMobile) {
      // No pinning: show the final state. Mobile gets a normal-flow card; the
      // section collapses to one screen instead of a 300vh pinned story.
      setStateIndex(2);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: ({ progress }) => {
          if (progress < 0.34) setStateIndex(0);
          else if (progress < 0.7) setStateIndex(1);
          else setStateIndex(2);
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  // Use a natural-height section on mobile / reduced motion; only set the 300vh
  // scroll length on desktop where pinning actually happens.
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tallSection = !isMobile && !prefersReduced;

  const current = STATES[stateIndex];
  const showLogo = stateIndex >= 1;
  const showLines = stateIndex >= 1;
  const showRing = stateIndex >= 2;
  const showSnippets = stateIndex >= 2;

  return (
    <section
      ref={sectionRef}
      id="what-it-is"
      className="relative w-full"
      style={{
        background:
          'linear-gradient(180deg, #FAF7F0 0%, #EDE2CC 50%, #DCC9A0 100%)',
        height: tallSection ? '300vh' : 'auto',
        paddingTop: tallSection ? 0 : 'clamp(80px, 12vh, 120px)',
        paddingBottom: tallSection ? 0 : 'clamp(80px, 12vh, 120px)',
      }}
    >
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden"
        style={{ height: tallSection ? '100vh' : 'auto', minHeight: tallSection ? undefined : 480 }}
      >
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-2 pointer-events-none">
          {STATES.map((_, i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === stateIndex ? 28 : 16,
                height: 3,
                background: i === stateIndex ? '#1A6B4A' : 'rgba(74,64,96,0.25)',
              }}
            />
          ))}
        </div>

        <div className="relative w-full h-full grid md:grid-cols-[42%_58%] grid-rows-1 items-center px-6 md:px-12 max-w-7xl mx-auto gap-10">
          <div className="relative h-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stateIndex}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: 460 }}
              >
                <p
                  className="mb-5"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#1A6B4A',
                  }}
                >
                  {current.eyebrow}
                </p>
                <h2
                  className="mb-6"
                  style={{
                    fontSize: 'clamp(26px, 3.4vw, 38px)',
                    fontWeight: 200,
                    letterSpacing: '-0.4px',
                    color: '#2A1F38',
                    lineHeight: 1.2,
                  }}
                >
                  {current.heading}
                </h2>
                <p
                  style={{
                    fontSize: 'clamp(14px, 1.4vw, 16px)',
                    lineHeight: 1.75,
                    fontWeight: 300,
                    color: '#4D4060',
                  }}
                >
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div
              className="relative"
              style={{
                width: 'min(520px, 90%)',
                aspectRatio: '1 / 1',
              }}
            >
              <YourBusinessRing visible={showRing} />
              <ConnectionLines visible={showLines} />

              {APPS.map((app, i) => (
                <AppTile key={app.id} app={app} active={stateIndex >= 1} index={i} />
              ))}

              <motion.div
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
                initial={false}
                animate={{
                  opacity: showLogo ? 1 : 0,
                  scale: showLogo ? 1 : 0.6,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <GlowLogo size={132} glow="green" />
              </motion.div>

              <AnimatePresence>
                {showSnippets && (
                  <>
                    {[
                      { txt: 'Morning brief ready.', x: '54%', y: '18%', delay: 0 },
                      { txt: 'Drafting outreach to Sarah at Acme…', x: '12%', y: '52%', delay: 0.3 },
                      { txt: 'Anomaly detected in Region 3.', x: '70%', y: '62%', delay: 0.6 },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: s.x,
                          top: s.y,
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'none',
                        }}
                        initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.5, delay: s.delay, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          style={{
                            padding: '6px 12px',
                            borderRadius: 10,
                            background: 'rgba(255,255,255,0.78)',
                            border: '1px solid rgba(255,255,255,0.9)',
                            boxShadow: '0 4px 14px rgba(26,107,74,0.10)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            fontSize: 11,
                            fontWeight: 500,
                            color: '#0F4D35',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {s.txt}
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
