import { useEffect, useRef, useState } from 'react';
import Clouds from '../ui/Clouds';
import EmailTypewriter from '../demos/EmailTypewriter';
import InvoiceFlow from '../demos/InvoiceFlow';
import InboxReplies from '../demos/InboxReplies';
import NumbersTicking from '../demos/NumbersTicking';

// ---------- Step data ----------

interface Step {
  id: string;
  label: string;
  headline: string;
  body: string;
  Mockup: React.ComponentType;
}

const STEPS: Step[] = [
  {
    id: 'sell',
    label: 'Sell',
    headline: 'Pipeline that builds itself.',
    body: 'Outreach. Follow-ups. Closes.',
    Mockup: EmailTypewriter,
  },
  {
    id: 'operate',
    label: 'Operate',
    headline: 'Back office, handled.',
    body: 'Invoices. Approvals. Vendors.',
    Mockup: InvoiceFlow,
  },
  {
    id: 'support',
    label: 'Support',
    headline: 'Customers, answered.',
    body: 'Inbound. Resolutions. Escalations.',
    Mockup: InboxReplies,
  },
  {
    id: 'grow',
    label: 'Grow',
    headline: 'Decisions, surfaced.',
    body: 'Anomalies. Opportunities. Briefs.',
    Mockup: NumbersTicking,
  },
];

// ---------- Counter strip ----------

function StepCounter({ active }: { active: number }) {
  return (
    <div
      className="capabilities-step-counter absolute left-1/2 flex items-baseline gap-6"
      style={{ bottom: 80, transform: 'translateX(-50%)', zIndex: 10 }}
    >
      {STEPS.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.id}
            className="capabilities-step-label flex items-baseline gap-2"
            data-step-active={isActive ? 'true' : 'false'}
            style={{
              opacity: isActive ? 1 : 0.35,
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              transition: 'opacity 350ms ease, transform 350ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Main section ----------

// v13.7 — auto-cycle. The GSAP+Lenis pin bridge wasn't engaging reliably,
// so the section is now a single 100vh viewport with the 4 chapters
// rotating on a timer when the section is in view. Cleaner, more reliable,
// and works the same for every visitor regardless of scroll behavior.
const CYCLE_MS = 4500;
const FORCED_STEP_PARAM = 'capStep';

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Allow ?capStep=N to freeze on a specific step (useful for screenshots).
    const param = new URLSearchParams(window.location.search).get(FORCED_STEP_PARAM);
    if (param !== null) {
      setActive(Math.max(0, Math.min(STEPS.length - 1, Number(param))));
      return;
    }
    // Mobile cycle restored at 6000ms (vs 4500ms desktop). Each tick swaps
    // which chapter has data-active="true"; inactive chapters are display:
    // none on mobile (CSS rule above), so the swap is a cheap class flip
    // rather than an opacity cross-fade of stacked elements. StepCounter
    // labels also flip in lockstep via the same `active` state.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const interval = isMobile ? 6000 : CYCLE_MS;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full"
      style={{
        background: 'transparent',
        minHeight: 'min(100vh, 820px)',
        padding: 'clamp(72px, 10vh, 120px) 0',
      }}
    >
      <div
        className="capabilities-section-inner relative w-full overflow-hidden"
        style={{ minHeight: 'min(80vh, 720px)' }}
      >
        <Clouds opacity={0.22} />

        <div className="relative h-full grid grid-cols-1 md:grid-cols-[36%_64%] grid-rows-1 items-center px-6 md:px-12 max-w-7xl mx-auto gap-10 z-10">
          {/* Left column — all 4 headlines mounted, only active shown. No
              mount/unmount cycle means content never re-mounts from zero. */}
          <div className="relative h-full flex items-center">
            <div className="relative" style={{ width: '100%', maxWidth: 460 }}>
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className="capabilities-chapter"
                  data-active={i === active ? 'true' : 'false'}
                  style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    inset: i === 0 ? undefined : 0,
                    opacity: i === active ? 1 : 0,
                    pointerEvents: i === active ? 'auto' : 'none',
                    transition: 'opacity 200ms ease',
                  }}
                  aria-hidden={i !== active}
                >
                  <p
                    className="mb-5"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} · {s.label}
                  </p>
                  <h2
                    // Mobile floor reduced to 32px; desktop clamp preserved
                    // at md: and above so desktop renders untouched.
                    className="bolder-on-scroll text-[clamp(32px,6vw,88px)] md:text-[clamp(44px,6vw,88px)]"
                    style={{
                      fontWeight: 800,
                      letterSpacing: '-0.05em',
                      color: '#FFFFFF',
                      lineHeight: 0.95,
                      marginBottom: 22,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {s.headline}
                  </h2>
                  <p
                    style={{
                      fontSize: 'clamp(16px, 1.55vw, 19px)',
                      lineHeight: 1.6,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.88)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — all 4 mockups mounted; only active is visible.
              Each mockup's continuous animation runs from page load, so by
              the time a chapter becomes active the mockup is already alive. */}
          <div className="relative h-full flex items-center justify-center">
            <div className="relative w-full" style={{ maxWidth: 640 }}>
              {STEPS.map((s, i) => {
                const MockupComp = s.Mockup;
                return (
                  <div
                    key={s.id}
                    style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      inset: i === 0 ? undefined : 0,
                      opacity: i === active ? 1 : 0,
                      pointerEvents: i === active ? 'auto' : 'none',
                      transition: 'opacity 200ms ease',
                    }}
                    aria-hidden={i !== active}
                  >
                    <MockupComp />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <StepCounter active={active} />
      </div>
    </section>
  );
}

