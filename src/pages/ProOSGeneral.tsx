import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plug, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import Glass from '../components/ui/Glass';
import ClosingBand from '../components/ui/ClosingBand';

const STRIPE_URL = import.meta.env.VITE_STRIPE_CHECKOUT_URL_PRO_OS_GENERAL || '/demo';

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const CAPABILITIES = [
  {
    icon: <Plug className="h-6 w-6" />,
    title: 'Connects to what you already use',
    description:
      'CRM, accounting, calendar, comms, custom databases. Pro OS reads from all of it. No rip-and-replace. No data migration project that takes a year.',
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Configures to how you actually work',
    description:
      'Workflows, voice, cadences, escalations — all set in conversation, not code. Pro OS learns your operation the way a new hire would, only faster.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Scales with what you become',
    description:
      'Start with the operation you have. Add capabilities as you grow. Pro OS becomes more useful the more your business runs through it.',
  },
];

export default function ProOSGeneral() {
  return (
    <>
      <PageHero
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 35%"
        overlay="default"
        logoSize={104}
        logoGlow="green"
        eyebrow="Pro OS · Any industry"
        eyebrowColor="#1A6B4A"
        headline="Your industry. Your operation. Your Pro OS."
        subhead="Pro OS is industry-agnostic at its core. If your business runs on customers, data, and decisions — which is to say, every business — Pro OS configures to it. Tell us what you do. We'll show you what it looks like."
        ctas={[
          { label: 'Book a discovery call', href: '/demo' },
          { label: 'Tell us about your business', href: '/demo', variant: 'ghost' },
        ]}
        minHeight="82vh"
        glassMaxWidth={780}
      />

      <section className="relative overflow-hidden">
        <AmbientBlobs
          blobs={[
            { color: 'green', size: 240, top: '8%', right: '6%' },
            { color: 'blue', size: 200, bottom: '10%', left: '4%' },
            { color: 'tan', size: 180, top: '45%', left: '12%' },
          ]}
        />
        <div className="relative mx-auto px-6" style={{ maxWidth: 680, padding: '100px 24px' }}>
          <motion.p
            {...fadeInUp}
            className="mb-8"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#1A6B4A' }}
          >
            The problem
          </motion.p>
          {[
            'Most AI products solve one problem. A chatbot here. An analytics dashboard there. A scheduling tool. A copywriter. None of them know about each other. None of them know about your business as a whole.',
          ].map((para, i) => (
            <motion.p
              key={i}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.06 }}
              className="text-brand-text-sec"
              style={{ fontSize: 18, lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}
            >
              {para}
            </motion.p>
          ))}
          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.18 }}
            style={{ fontSize: 19, lineHeight: 1.75, fontWeight: 400, color: '#1A6B4A', marginTop: 16 }}
          >
            Pro OS isn't a product solving a problem. It's an operating layer for everything your business does.
          </motion.p>
        </div>
      </section>

      <Section background="linear-gradient(180deg, #FAF7F0 0%, #FDFCF8 100%)" maxWidth={1080}>
        <AmbientBlobs blobs={[{ color: 'green', size: 200, top: '10%', left: '8%' }]} />
        <motion.div {...fadeInUp} className="text-center mb-12">
          <p
            className="mb-3"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#1A6B4A' }}
          >
            What Pro OS does
          </p>
          <h2 className="section-heading text-brand-text" style={{ fontSize: 'clamp(26px, 3.5vw, 32px)' }}>
            Three properties. Every deployment.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
            >
              <Glass variant="green" className="h-full" style={{ padding: 32 }}>
                <div style={{ color: '#1A6B4A', marginBottom: 16 }}>{cap.icon}</div>
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

      <Section background="linear-gradient(135deg, #D4F0DC 0%, #FAF7F0 100%)" maxWidth={760}>
        <AmbientBlobs
          blobs={[
            { color: 'green', size: 220, top: '15%', right: '8%' },
            { color: 'tan', size: 180, bottom: '15%', left: '8%' },
          ]}
        />
        <motion.div {...fadeInUp}>
          <Glass variant="default" className="text-center" style={{ padding: 'clamp(36px, 5vw, 52px)' }}>
            <p
              className="mb-4"
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#1A6B4A' }}
            >
              Outcomes
            </p>
            <h2
              className="text-brand-text mb-6"
              style={{ fontSize: 'clamp(26px, 3.5vw, 32px)', fontWeight: 200, letterSpacing: '-0.3px', lineHeight: 1.2 }}
            >
              Custom — built around your specific operation.
            </h2>
            <p className="text-brand-text-sec mx-auto" style={{ fontSize: 15, lineHeight: 1.75, maxWidth: '52ch' }}>
              Because the configuration is specific to your business, so are the outcomes. The first conversation maps your operation; the second sketches what Pro OS does for you; the third becomes a pilot scope. We've done this enough to scope fast — and to commit to outcomes you can measure.
            </p>
          </Glass>
        </motion.div>
      </Section>

      <Section background="linear-gradient(180deg, #FDFCF8 0%, #D4F0DC 100%)" maxWidth={560}>
        <AmbientBlobs blobs={[{ color: 'green', size: 200, top: '10%', right: '10%' }]} />
        <motion.div {...fadeInUp}>
          <Glass variant="glow" className="text-center" style={{ padding: 'clamp(36px, 5vw, 48px)' }}>
            <p
              className="mb-4"
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#1A6B4A' }}
            >
              Get started
            </p>
            <h3
              className="text-brand-text mb-4"
              style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 200, letterSpacing: '-0.3px', lineHeight: 1.2 }}
            >
              Tell us what you do.
            </h3>
            <p className="text-brand-text-sec mb-8 mx-auto" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: '40ch' }}>
              One conversation. We sketch what Pro OS looks like for your specific operation. No deck, no generic demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/demo" className="btn-primary-emerald">
                Book a discovery call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={STRIPE_URL} className="btn-ghost-sky" rel="noopener">
                Tell us about your business
              </a>
            </div>
          </Glass>
        </motion.div>
      </Section>

      <ClosingBand
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 50%"
        logoSize={84}
        logoGlow="green"
        headline="An operating system for what only you do."
        cta={{ label: 'Book a discovery call', href: '/demo' }}
      />
    </>
  );
}
