import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import Glass from '../components/ui/Glass';
import ClosingBand from '../components/ui/ClosingBand';

const STRIPE_URL = import.meta.env.VITE_STRIPE_CHECKOUT_URL_PRO_OS_PE || '/demo';

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const CAPABILITIES = [
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Fund-wide standard, portco-specific deployment',
    description:
      'One operating layer, configured per portco, observable from the fund. Same architecture, different surfaces. You see the whole portfolio.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: '60-day pilot, zero risk',
    description:
      'Three portcos. Sixty days. ≥$100K combined annual savings or you pay nothing. Documented, attributed, defensible — to operators and to LPs.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'EBITDA impact you can report to LPs',
    description:
      'Documented operational improvements with line-item attribution. Roll forward into investor letters, value-creation plans, and board materials.',
  },
];

const OUTCOMES = [
  {
    when: '60 days',
    body: '≥$100K combined annual savings documented across three pilot portcos. Operational baseline established.',
  },
  {
    when: '6 months',
    body: 'Cross-portco patterns identified. Best practices replicating across companies. Fund-level operational fluency.',
  },
  {
    when: '12 months',
    body: 'Fund-level operational intelligence. Documented EBITDA improvement. A standardized AI operating layer across the portfolio.',
  },
];

export default function ProOSPrivateEquity() {
  return (
    <>
      <PageHero
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 25%"
        overlay="cool"
        logoSize={104}
        logoGlow="blue"
        eyebrow="Pro OS · Private Equity"
        eyebrowColor="#2563A8"
        headline="One AI operating layer. Every portfolio company."
        subhead="Pro OS for PE deploys a standard intelligence layer across your portcos — customized per company, controlled at the fund level. We guarantee ≥$100K combined annual savings across three portfolio companies in 60 days. Zero risk."
        ctas={[
          { label: 'Book a discovery call', href: '/demo' },
          { label: 'Download the PE playbook', href: '#playbook', variant: 'ghost' },
        ]}
        minHeight="82vh"
        glassMaxWidth={780}
      />

      <section className="relative overflow-hidden">
        <AmbientBlobs
          blobs={[
            { color: 'blue', size: 240, top: '8%', right: '6%' },
            { color: 'green', size: 200, bottom: '10%', left: '4%' },
          ]}
        />
        <div className="relative mx-auto px-6" style={{ maxWidth: 680, padding: '100px 24px' }}>
          <motion.p
            {...fadeInUp}
            className="mb-8"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#2563A8' }}
          >
            The problem
          </motion.p>
          {[
            "Every PE firm has the same problem with AI right now. Portco leadership is curious. Some are experimenting. Most are wasting money on tools that don't talk to each other and don't move the EBITDA needle.",
            "There's no standard. There's no leverage across the portfolio. There's no fund-level visibility into what's working.",
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
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            style={{ fontSize: 19, lineHeight: 1.75, fontWeight: 400, color: '#1A6B4A', marginTop: 16 }}
          >
            Pro OS solves this at the fund level.
          </motion.p>
        </div>
      </section>

      <Section background="linear-gradient(180deg, #FAF7F0 0%, #FDFCF8 100%)" maxWidth={1080}>
        <AmbientBlobs blobs={[{ color: 'blue', size: 200, top: '10%', left: '8%' }]} />
        <motion.div {...fadeInUp} className="text-center mb-12">
          <p
            className="mb-3"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#2563A8' }}
          >
            What Pro OS does for PE
          </p>
          <h2 className="section-heading text-brand-text" style={{ fontSize: 'clamp(26px, 3.5vw, 32px)' }}>
            Three things, fund-level.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
            >
              <Glass variant="blue" className="h-full" style={{ padding: 32 }}>
                <div style={{ color: '#2563A8', marginBottom: 16 }}>{cap.icon}</div>
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

      <Section background="linear-gradient(135deg, #D0E7F5 0%, #FAF7F0 100%)" maxWidth={920}>
        <AmbientBlobs
          blobs={[
            { color: 'blue', size: 220, top: '15%', right: '8%' },
            { color: 'green', size: 180, bottom: '15%', left: '8%' },
          ]}
        />
        <motion.div {...fadeInUp} className="text-center mb-12">
          <p
            className="mb-3"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#2563A8' }}
          >
            Outcomes
          </p>
          <h2 className="section-heading text-brand-text" style={{ fontSize: 'clamp(26px, 3.5vw, 32px)' }}>
            60-day pilot, 12-month trajectory.
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
                  style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#2563A8' }}
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

      <Section id="playbook" background="linear-gradient(180deg, #FDFCF8 0%, #D0E7F5 100%)" maxWidth={560}>
        <AmbientBlobs blobs={[{ color: 'blue', size: 200, top: '10%', right: '10%' }]} />
        <motion.div {...fadeInUp}>
          <Glass variant="glow" className="text-center" style={{ padding: 'clamp(36px, 5vw, 48px)' }}>
            <p
              className="mb-4"
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#2563A8' }}
            >
              Engagement
            </p>
            <h3
              className="text-brand-text mb-4"
              style={{ fontSize: 'clamp(24px, 3vw, 30px)', fontWeight: 200, letterSpacing: '-0.3px', lineHeight: 1.2 }}
            >
              The 60-day pilot.
            </h3>
            <p className="text-brand-text-sec mb-8 mx-auto" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: '44ch' }}>
              Three portcos. $100K combined annual savings or you pay nothing. We document everything you can report to your LPs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/demo" className="btn-primary-emerald">
                Book a discovery call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={STRIPE_URL} className="btn-ghost-sky" rel="noopener">
                Download the playbook
              </a>
            </div>
            <p className="text-brand-text-muted mt-5" style={{ fontSize: 10, letterSpacing: '0.5px' }}>
              {/* Playbook: lead-magnet stub. Wire to gated download when ready. */}
              Playbook delivery wires to lead-magnet flow at launch.
            </p>
          </Glass>
        </motion.div>
      </Section>

      <ClosingBand
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 40%"
        logoSize={84}
        logoGlow="blue"
        headline="One operating layer. Whole portfolio."
        cta={{ label: 'Book a discovery call', href: '/demo' }}
      />
    </>
  );
}
