import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, FileCheck, MessageSquare, ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import Glass from '../components/ui/Glass';
import ClosingBand from '../components/ui/ClosingBand';

const STRIPE_URL = import.meta.env.VITE_STRIPE_CHECKOUT_URL_PRO_OS_HOME_SERVICES || '/demo';

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const CAPABILITIES = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'The phone that never sleeps',
    description:
      'AI voice agents answer every call, qualify the job, book the slot. 24/7 — through the dinner rush, through the holiday weekend, through the after-hours storm.',
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Quotes that close themselves',
    description:
      "Send a quote, Pro OS follows up on a cadence, answers questions, asks for the booking. Stops chasing only when the customer says yes — or says no.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'The business that answers you back',
    description:
      'Ask Pro OS anything about your operation — bookings this week, churn risks, tech utilization, margin by job type. Get the answer instantly.',
  },
];

const OUTCOMES = [
  {
    when: '30 days',
    body: 'Every call answered. Booked appointments up 20–40%. No more after-hours voicemail black hole.',
  },
  {
    when: '60 days',
    body: 'Quote-to-close rate up. Follow-up entirely automated. You stop chasing — your business does.',
  },
  {
    when: '90 days',
    body: 'Owner hours reclaimed. Operational picture clear every morning. You spend the day on what only you can do.',
  },
];

export default function ProOSHomeServices() {
  return (
    <>
      <PageHero
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 30%"
        overlay="warm"
        logoSize={104}
        logoGlow="gold"
        eyebrow="Pro OS · Home Services"
        eyebrowColor="#A08050"
        headline="Your phone, your quotes, your follow-ups — all running themselves."
        subhead="Pro OS for home services answers your phone 24/7, sends quotes that get accepted, follows up with every lead until they convert, and tells you every morning where your trucks should be."
        ctas={[
          { label: 'Book a demo', href: '/demo' },
          { label: 'See pricing ↓', href: '#pricing', variant: 'ghost' },
        ]}
        minHeight="82vh"
        glassMaxWidth={760}
      />

      <section className="relative overflow-hidden">
        <AmbientBlobs
          blobs={[
            { color: 'tan', size: 240, top: '8%', right: '6%' },
            { color: 'green', size: 200, bottom: '10%', left: '4%' },
          ]}
        />
        <div className="relative mx-auto px-6" style={{ maxWidth: 680, padding: '100px 24px' }}>
          <motion.p
            {...fadeInUp}
            className="mb-8"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#A08050',
            }}
          >
            The problem
          </motion.p>
          {[
            "You're losing money on the phone. You don't know it because the calls that didn't ring through never showed up.",
            "You're losing money on quotes. You sent them. They sat. The customer went with whoever called back first.",
            "You're losing money on follow-up. You meant to. You didn't have time.",
          ].map((para, i) => (
            <motion.p
              key={i}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.06 }}
              className="text-brand-text-sec"
              style={{ fontSize: 18, lineHeight: 1.85, fontWeight: 300, marginBottom: 28 }}
            >
              {para}
            </motion.p>
          ))}
          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.25 }}
            style={{ fontSize: 19, lineHeight: 1.75, fontWeight: 400, color: '#1A6B4A', marginTop: 24 }}
          >
            Pro OS solves this. Not with a chatbot. With an operating layer that handles it all.
          </motion.p>
        </div>
      </section>

      <Section background="linear-gradient(180deg, #FAF7F0 0%, #FDFCF8 100%)" maxWidth={1080}>
        <AmbientBlobs blobs={[{ color: 'tan', size: 200, top: '10%', left: '8%' }]} />
        <motion.div {...fadeInUp} className="text-center mb-12">
          <p
            className="mb-3"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#A08050' }}
          >
            What Pro OS does for home services
          </p>
          <h2 className="section-heading text-brand-text" style={{ fontSize: 'clamp(26px, 3.5vw, 32px)' }}>
            Three jobs. Done by the system. Forever.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
            >
              <Glass variant="tan" className="h-full" style={{ padding: 32 }}>
                <div style={{ color: '#A08050', marginBottom: 16 }}>{cap.icon}</div>
                <h3 className="text-brand-text mb-3" style={{ fontSize: 17, fontWeight: 600 }}>
                  {cap.title}
                </h3>
                <p className="text-brand-text-sec" style={{ fontSize: 14, lineHeight: 1.7 }}>
                  {cap.description}
                </p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="linear-gradient(135deg, #F5EFE0 0%, #FAF7F0 100%)" maxWidth={920}>
        <AmbientBlobs
          blobs={[
            { color: 'tan', size: 220, top: '15%', right: '8%' },
            { color: 'green', size: 180, bottom: '15%', left: '8%' },
          ]}
        />
        <motion.div {...fadeInUp} className="text-center mb-12">
          <p
            className="mb-3"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#A08050' }}
          >
            Outcomes
          </p>
          <h2 className="section-heading text-brand-text" style={{ fontSize: 'clamp(26px, 3.5vw, 32px)' }}>
            What changes, and when.
          </h2>
        </motion.div>
        <div className="grid gap-4">
          {OUTCOMES.map((out, i) => (
            <motion.div
              key={out.when}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
            >
              <Glass variant="default" className="flex flex-col md:flex-row gap-6 md:items-baseline" style={{ padding: 28 }}>
                <p
                  className="md:w-36 flex-shrink-0"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: '#1A6B4A',
                  }}
                >
                  {out.when}
                </p>
                <p className="text-brand-text-sec flex-1" style={{ fontSize: 15, lineHeight: 1.7, fontWeight: 300 }}>
                  {out.body}
                </p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="pricing" background="linear-gradient(180deg, #FDFCF8 0%, #F5EFE0 100%)" maxWidth={560}>
        <AmbientBlobs blobs={[{ color: 'tan', size: 200, top: '10%', right: '10%' }]} />
        <motion.div {...fadeInUp}>
          <Glass variant="glow" className="text-center" style={{ padding: 'clamp(36px, 5vw, 48px)' }}>
            <p
              className="mb-4"
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#A08050' }}
            >
              Get started
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-brand-text" style={{ fontSize: 14, fontWeight: 400 }}>$</span>
              <span className="text-brand-text" style={{ fontSize: 44, fontWeight: 200, letterSpacing: '-1px', lineHeight: 1 }}>
                1,499
              </span>
              <span className="text-brand-text-sec" style={{ fontSize: 14, fontWeight: 400 }}>/mo</span>
            </div>
            <p className="text-brand-text-muted mb-8" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
              Starting price · all-in · cancel anytime
            </p>
            <p className="text-brand-text-sec mb-8 mx-auto" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: '40ch' }}>
              Phone agents, quote follow-up, daily briefs, full setup, and ongoing tuning. Talk to us about onboarding and the right tier for your fleet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/demo" className="btn-primary-emerald">
                Book a demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={STRIPE_URL} className="btn-ghost-sky" rel="noopener">
                Start subscription
              </a>
            </div>
            <p className="text-brand-text-muted mt-5" style={{ fontSize: 10, letterSpacing: '0.5px' }}>
              {/* Stripe Checkout: VITE_STRIPE_CHECKOUT_URL_PRO_OS_HOME_SERVICES — wire when billing ships */}
              Subscription opens in Stripe Checkout when wired.
            </p>
          </Glass>
        </motion.div>
      </Section>

      <ClosingBand
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 50%"
        logoSize={84}
        logoGlow="gold"
        headline="Your business, answering itself."
        cta={{ label: 'Book a demo', href: '/demo' }}
      />
    </>
  );
}
