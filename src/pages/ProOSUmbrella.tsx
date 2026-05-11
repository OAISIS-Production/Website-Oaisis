import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sunrise, MessageCircle, Search, Mail, Bell, Settings, ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import CapabilityTile from '../components/ui/CapabilityTile';
import Glass from '../components/ui/Glass';
import ClosingBand from '../components/ui/ClosingBand';

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

interface Capability {
  icon: ReactNode;
  accent: 'green' | 'blue' | 'gold';
  title: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: <Sunrise className="h-7 w-7" />,
    accent: 'gold',
    title: 'Morning briefs that read your whole business',
    description:
      'Wake up to a single brief that pulls from every system you run. Revenue, pipeline, operations, anomalies, what needs your attention. Not a dashboard. A read.',
  },
  {
    icon: <MessageCircle className="h-7 w-7" />,
    accent: 'green',
    title: 'Ask anything. Get a real answer.',
    description:
      '"How did the West region perform last quarter compared to the same period last year, and what\'s driving the variance?" Pro OS reads your data, thinks, and answers. Like having a CFO, a COO, and an analyst on call.',
  },
  {
    icon: <Search className="h-7 w-7" />,
    accent: 'blue',
    title: 'Lead sourcing that never stops',
    description:
      'Pro OS scours the web continuously, identifying companies and decision-makers that match your ideal customer profile. It builds your pipeline while you sleep.',
  },
  {
    icon: <Mail className="h-7 w-7" />,
    accent: 'green',
    title: 'Outreach written for the person, not the segment',
    description:
      'For every lead, Pro OS researches their digital footprint — company, role, recent news, posts, signals — and drafts a personalized message in your voice. You approve and send. Or it sends on a schedule you set.',
  },
  {
    icon: <Bell className="h-7 w-7" />,
    accent: 'gold',
    title: 'Continuous monitoring, smart alerts',
    description:
      "Pro OS watches your business in real time and only interrupts when it matters. A customer churn signal. A margin compression. A deal gone cold. The things you'd want to know if you had time to look.",
  },
  {
    icon: <Settings className="h-7 w-7" />,
    accent: 'blue',
    title: 'Custom workflows, no engineers required',
    description:
      'Tell Pro OS what you want it to do. It builds the workflow. Onboarding sequences, follow-up cadences, reporting cycles, escalation paths — all configurable in conversation, not code.',
  },
];

interface VerticalCard {
  variant: 'tan' | 'blue' | 'green';
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  description: string;
  href: string;
  ctaColor: string;
}

const VERTICALS: VerticalCard[] = [
  {
    variant: 'tan',
    eyebrow: 'For service operators',
    eyebrowColor: '#A08050',
    title: 'Home Services',
    description:
      'For HVAC, plumbing, electrical, and field service businesses. Phone agents that never sleep, quotes that close themselves, a business that answers you back.',
    href: '/pro-os/home-services',
    ctaColor: '#A08050',
  },
  {
    variant: 'blue',
    eyebrow: 'For PE firms',
    eyebrowColor: '#2563A8',
    title: 'Private Equity',
    description:
      'For PE firms deploying AI across portfolio companies. A standard operating layer, customized per portco, with ≥$100K combined annual savings guaranteed in 60 days.',
    href: '/pro-os/private-equity',
    ctaColor: '#2563A8',
  },
  {
    variant: 'green',
    eyebrow: 'For every other industry',
    eyebrowColor: '#1A6B4A',
    title: 'Every other industry',
    description:
      "Don't see yours? Pro OS is industry-agnostic at its core. We've built it to be configured to any operation that runs on customers, data, and decisions.",
    href: '/pro-os/general',
    ctaColor: '#1A6B4A',
  },
];

export default function ProOSUmbrella() {
  return (
    <>
      <PageHero
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 20%"
        overlay="cool"
        logoSize={108}
        logoGlow="green"
        eyebrow="Pro OS"
        headline="Your business, fully online."
        subhead="Pro OS is an AI Operating System — a single intelligent layer that connects every tool you already use, watches everything happening across your business in real time, and acts on it. Not when you ask. While you sleep."
        ctas={[
          { label: 'Book a demo', href: '/demo' },
          { label: 'See capabilities ↓', href: '#capabilities', variant: 'ghost' },
        ]}
        minHeight="86vh"
        glassMaxWidth={760}
      />

      <section id="what-it-is" className="relative overflow-hidden">
        <AmbientBlobs
          blobs={[
            { color: 'green', size: 240, top: '6%', right: '8%' },
            { color: 'blue', size: 220, top: '45%', left: '4%' },
            { color: 'tan', size: 200, bottom: '8%', right: '12%' },
          ]}
        />
        <div className="relative mx-auto px-6" style={{ maxWidth: 680, padding: '110px 24px' }}>
          <motion.p
            {...fadeInUp}
            className="mb-8"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1A6B4A',
            }}
          >
            What it is
          </motion.p>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
            className="text-brand-text-sec"
            style={{ fontSize: 18, lineHeight: 1.85, fontWeight: 300, marginBottom: 40 }}
          >
            Think about how a business runs today. Your CRM holds the customers. Your accounting software holds the money. Your calendar holds the schedule. Your inbox holds the conversations. Your team holds everything that hasn't been written down yet. None of them talk to each other. You're the integration.
          </motion.p>

          <motion.blockquote
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            style={{
              borderLeft: '3px solid #1A6B4A',
              paddingLeft: 24,
              marginBottom: 40,
              fontSize: 19,
              lineHeight: 1.7,
              fontWeight: 400,
              color: '#2A1F38',
              letterSpacing: '-0.1px',
            }}
          >
            Pro OS is the integration. It connects to all of it — every tool, every data source, every channel — and runs underneath your business as a single, intelligent system. It doesn't replace your software. It <em style={{ color: '#1A6B4A', fontStyle: 'italic' }}>operates</em> it.
          </motion.blockquote>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.15 }}
            className="text-brand-text-sec"
            style={{ fontSize: 18, lineHeight: 1.85, fontWeight: 300, marginBottom: 0 }}
          >
            Ask it anything about your business and it answers. Tell it to do something and it does it. Leave it alone and it keeps working — sourcing leads, drafting outreach, flagging anomalies, briefing you before your day starts. The same way an operating system runs everything underneath your laptop without you thinking about it, Pro OS runs everything underneath your business.
          </motion.p>
        </div>
      </section>

      <Section
        id="capabilities"
        background="linear-gradient(180deg, #FAF7F0 0%, #FDFCF8 100%)"
        maxWidth={1080}
      >
        <AmbientBlobs
          blobs={[
            { color: 'green', size: 200, top: '8%', left: '6%' },
            { color: 'blue', size: 180, bottom: '12%', right: '8%' },
          ]}
        />

        <motion.div {...fadeInUp} className="text-center mb-14">
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
            What it does
          </p>
          <h2
            className="section-heading text-brand-text"
            style={{ fontSize: 'clamp(26px, 3.5vw, 34px)' }}
          >
            Six capabilities. One system.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.05 }}
            >
              <CapabilityTile
                icon={cap.icon}
                accent={cap.accent}
                title={cap.title}
                description={cap.description}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        id="verticals"
        background="linear-gradient(135deg, #D4F0DC 0%, #F5EFE0 50%, #D0E7F5 100%)"
        maxWidth={1080}
      >
        <AmbientBlobs
          blobs={[
            { color: 'emerald', size: 240, top: '6%', right: '6%' },
            { color: 'tan', size: 220, bottom: '8%', left: '6%' },
            { color: 'blue', size: 180, top: '50%', right: '40%' },
          ]}
        />

        <motion.div {...fadeInUp} className="text-center mb-14 mx-auto" style={{ maxWidth: 720 }}>
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
            Built for operators. In every industry.
          </p>
          <h2
            className="section-heading text-brand-text mb-5"
            style={{ fontSize: 'clamp(24px, 3vw, 30px)' }}
          >
            Pro OS deploys in three configurations.
          </h2>
          <p className="text-brand-text-sec mx-auto" style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 580 }}>
            Pick the one closest to your business, or talk to us about a custom build.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {VERTICALS.map((vert, i) => (
            <motion.div
              key={vert.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
            >
              <Glass
                variant={vert.variant}
                className="h-full flex flex-col hover:-translate-y-0.5 transition-transform duration-300"
                style={{ padding: 36 }}
              >
                <p
                  className="mb-4"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: vert.eyebrowColor,
                  }}
                >
                  {vert.eyebrow}
                </p>
                <h3
                  className="text-brand-text mb-4"
                  style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.2px', lineHeight: 1.2 }}
                >
                  {vert.title}
                </h3>
                <p
                  className="text-brand-text-sec flex-1 mb-8"
                  style={{ fontSize: 14, lineHeight: 1.7 }}
                >
                  {vert.description}
                </p>
                <Link
                  to={vert.href}
                  className="inline-flex items-center group/cta"
                  style={{ fontSize: 13, fontWeight: 500, color: vert.ctaColor }}
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </Glass>
            </motion.div>
          ))}
        </div>
      </Section>

      <ClosingBand
        photoSrc="/assets/images/oasis.jpg"
        photoPosition="center 45%"
        logoSize={88}
        logoGlow="green"
        headline="The future of business, installed."
        cta={{ label: 'Book a demo', href: '/demo' }}
      />
    </>
  );
}
