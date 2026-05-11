import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import ProductCard from '../components/ui/ProductCard';
import ClosingBand from '../components/ui/ClosingBand';

const INVOICE_INTELLIGENCE_URL = 'https://invoiceoasis.com';

const PRODUCTS = [
  {
    variant: 'tan' as const,
    eyebrow: 'For restaurant operators',
    eyebrowColor: '#A08050',
    title: 'Invoice Intelligence',
    description:
      'AI-powered invoice processing for multi-unit restaurants. Reconcile in minutes, not weeks. Catch every variance before it costs you.',
    cta: { label: 'Learn more', href: INVOICE_INTELLIGENCE_URL, external: true },
    ctaColor: '#A08050',
  },
  {
    variant: 'green' as const,
    eyebrow: 'For every other operator',
    eyebrowColor: '#1A6B4A',
    title: 'Pro OS',
    description:
      'The AI Operating System for your business. It wakes up before you do, runs your operations, finds your next customer, and answers any question you can ask of your own company.',
    cta: { label: 'Learn more', href: '/pro-os' },
    ctaColor: '#1A6B4A',
  },
  {
    variant: 'blue' as const,
    eyebrow: 'For enterprise',
    eyebrowColor: '#2563A8',
    title: 'Built for you',
    description:
      "For organizations whose problems don't fit a product page. We build operating systems for industries no one's built one for yet.",
    cta: { label: 'Talk to us', href: '/demo' },
    ctaColor: '#2563A8',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export default function HomePage() {
  return (
    <>
      <PageHero
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 40%"
        overlay="default"
        logoSize={160}
        logoGlow="green"
        eyebrow="The Intelligent Enterprise"
        headline="The future of business, installed."
        subhead="OAISIS builds the operating systems for the next era of business. Not chatbots. Not copilots. Real systems that do the work — sourcing, deciding, drafting, deploying — while you focus on what only you can do."
        ctas={[
          { label: 'See the products', href: '#products' },
          { label: 'Book a demo', href: '/demo', variant: 'ghost' },
        ]}
        minHeight="85vh"
      />

      <section id="manifesto" className="relative overflow-hidden">
        <AmbientBlobs
          blobs={[
            { color: 'green', size: 220, top: '5%', right: '6%' },
            { color: 'blue', size: 200, bottom: '8%', left: '4%' },
            { color: 'tan', size: 180, top: '40%', left: '10%', opacityClass: 'opacity-70' },
          ]}
        />
        <div className="relative mx-auto px-6" style={{ maxWidth: 680, padding: '100px 24px' }}>
          {[
            'Every era of business has its operating layer. Paper. Spreadsheets. Software. Now intelligence.',
            "Most companies are bolting AI onto the side of how they already work. Adding a chatbot. Buying a copilot. Hoping it sticks. It doesn't. The companies that win this era won't be the ones that use AI. They'll be the ones whose operating layer is AI.",
          ].map((para, i) => (
            <motion.p
              key={i}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
              className="text-brand-text-sec"
              style={{
                fontSize: 18,
                lineHeight: 1.85,
                fontWeight: 300,
                marginBottom: 32,
              }}
            >
              {para}
            </motion.p>
          ))}

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            style={{
              fontSize: 22,
              lineHeight: 1.55,
              fontWeight: 400,
              color: '#1A6B4A',
              letterSpacing: '-0.2px',
              marginTop: 12,
            }}
          >
            That's what we build.
          </motion.p>
        </div>
      </section>

      <Section
        id="products"
        background="linear-gradient(135deg, #F5EFE0 0%, #D4F0DC 25%, #D0E7F5 50%, #D0E7F5 75%, #EDE2CC 100%)"
        maxWidth={1080}
      >
        <AmbientBlobs
          blobs={[
            { color: 'emerald', size: 280, top: '8%', left: '5%' },
            { color: 'blue', size: 240, bottom: '12%', right: '8%' },
            { color: 'tan', size: 200, top: '50%', right: '40%' },
          ]}
        />

        <motion.div {...fadeInUp} className="text-center mb-12">
          <p
            className="mb-3"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1A6B4A',
            }}
          >
            Products
          </p>
          <h2
            className="section-heading text-brand-text mx-auto"
            style={{
              fontSize: 'clamp(26px, 3.5vw, 34px)',
              maxWidth: 720,
            }}
          >
            Two products. Built for operators. Shipping now.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
            >
              <ProductCard
                variant={product.variant}
                eyebrow={product.eyebrow}
                eyebrowColor={product.eyebrowColor}
                title={product.title}
                description={product.description}
                cta={product.cta}
                ctaColor={product.ctaColor}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      <ClosingBand
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 55%"
        logoSize={80}
        logoGlow="green"
        headline={
          <>
            The intelligent enterprise isn't coming.
            <br />
            It's shipping.
          </>
        }
        cta={{ label: 'Book a demo', href: '/demo' }}
      />
    </>
  );
}
