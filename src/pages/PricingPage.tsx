import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Glass from '../components/ui/Glass';
import AmbientBlobs from '../components/ui/AmbientBlobs';

const TIERS = [
  {
    eyebrow: 'Pro OS',
    eyebrowColor: '#1A6B4A',
    variant: 'green' as const,
    price: 'From $1,499',
    priceUnit: '/month',
    description:
      'The AI Operating System for your business. Phone agents, morning briefs, lead sourcing, outreach, monitoring, custom workflows — all in one operating layer.',
    bullets: [
      'Six core capabilities, configured to your operation',
      'Standard integrations with your stack',
      'Onboarding + ongoing tuning included',
      'Custom configuration for your industry',
    ],
    cta: { label: 'Book a demo', href: '/demo', external: false },
  },
  {
    eyebrow: 'Invoice Intelligence',
    eyebrowColor: '#A08050',
    variant: 'tan' as const,
    price: '$100',
    priceUnit: '/location/month',
    description:
      'For multi-unit restaurants. AI-powered invoice processing. Reconcile in minutes. Catch every variance.',
    bullets: [
      'Auto-extract every line item, every supplier',
      'Reconciliation in minutes, not weeks',
      'Variance alerts before they cost you',
      'Already live and shipping to operators',
    ],
    cta: { label: 'Learn more', href: 'https://invoiceoasis.com', external: true },
  },
  {
    eyebrow: 'Custom Builds',
    eyebrowColor: '#2563A8',
    variant: 'blue' as const,
    price: 'Talk to us',
    priceUnit: '',
    description:
      "For organizations whose problems don't fit a product page. We build operating systems for industries no one's built one for yet.",
    bullets: [
      'Discovery + scoping with your team',
      'Pilot designed for documented outcomes',
      'Fixed-price engagement, no hidden hours',
      'Ongoing partnership after launch',
    ],
    cta: { label: 'Talk to us', href: '/demo', external: false },
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function PricingPage() {
  return (
    <main
      className="relative w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #D0E7F5 0%, #F5EFE0 25%, #FAF7F0 55%, #FDFCF8 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <AmbientBlobs
        blobs={[
          { color: 'green', size: 280, top: '6%', right: '6%' },
          { color: 'blue', size: 240, top: '40%', left: '4%' },
          { color: 'tan', size: 220, bottom: '8%', right: '12%' },
        ]}
      />

      <div className="relative mx-auto px-6" style={{ maxWidth: 1100, padding: '120px 24px 80px' }}>
        <motion.div {...fadeUp} className="text-center mb-16 mx-auto" style={{ maxWidth: 720 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1A6B4A',
              marginBottom: 14,
            }}
          >
            Pricing
          </p>
          <h1
            className="display-heading text-brand-text mb-6 mx-auto"
            style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}
          >
            Three ways to install your operating layer.
          </h1>
          <p
            className="mx-auto"
            style={{ fontSize: 15, lineHeight: 1.75, fontWeight: 300, color: '#4D4060', maxWidth: 560 }}
          >
            Pick the path closest to your business. Every engagement starts with a 30-minute conversation —
            no deck, no generic demo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.eyebrow}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            >
              <Glass
                variant={tier.variant}
                className="h-full flex flex-col"
                style={{ padding: 32 }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: tier.eyebrowColor,
                    marginBottom: 14,
                  }}
                >
                  {tier.eyebrow}
                </p>

                <div className="flex items-baseline gap-1 mb-3">
                  <span style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 200, letterSpacing: '-1px', color: '#0F4D35', lineHeight: 1 }}>
                    {tier.price}
                  </span>
                  {tier.priceUnit && (
                    <span style={{ fontSize: 13, color: '#4D4060', fontWeight: 400 }}>{tier.priceUnit}</span>
                  )}
                </div>

                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#4D4060', marginBottom: 22 }}>
                  {tier.description}
                </p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.eyebrowColor }} />
                      <span style={{ fontSize: 12.5, color: '#2A1F38', lineHeight: 1.55 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {tier.cta.external ? (
                  <a
                    href={tier.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                    style={{
                      padding: '12px 22px',
                      borderRadius: 999,
                      background: tier.eyebrowColor,
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: '0.2px',
                      textDecoration: 'none',
                      boxShadow: `0 6px 18px ${tier.eyebrowColor}30`,
                    }}
                  >
                    {tier.cta.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    to={tier.cta.href}
                    className="inline-flex items-center justify-center gap-2"
                    style={{
                      padding: '12px 22px',
                      borderRadius: 999,
                      background: tier.eyebrowColor,
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: '0.2px',
                      textDecoration: 'none',
                      boxShadow: `0 6px 18px ${tier.eyebrowColor}30`,
                    }}
                  >
                    {tier.cta.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </Glass>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          className="text-center mx-auto mt-14"
          style={{ fontSize: 12, color: '#8A7DA0', letterSpacing: '0.3px', maxWidth: 520, lineHeight: 1.7 }}
        >
          All Pro OS engagements include onboarding, ongoing tuning, and direct contact with the team that
          built it. We don't do offshore support tickets.
        </motion.p>
      </div>
    </main>
  );
}
