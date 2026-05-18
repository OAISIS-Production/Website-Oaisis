import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sunrise, MessageCircle, Search, Mail, Bell, Settings, ArrowRight } from 'lucide-react';
import InnerPageShell from '../components/ui/InnerPageShell';
import CapabilityTile from '../components/ui/CapabilityTile';
import Glass from '../components/ui/Glass';

const CAPABILITIES = [
  { icon: <Sunrise className="h-6 w-6" />, accent: 'blue' as const, title: 'Morning briefs', description: 'One read across every system. Revenue, pipeline, ops, anomalies.' },
  { icon: <MessageCircle className="h-6 w-6" />, accent: 'blue' as const, title: 'Ask anything', description: 'Real answers from your data, with the reasoning shown.' },
  { icon: <Search className="h-6 w-6" />, accent: 'blue' as const, title: 'Lead sourcing', description: 'Continuous identification of accounts matching your ICP.' },
  { icon: <Mail className="h-6 w-6" />, accent: 'blue' as const, title: 'Outreach', description: 'Personalized drafts in your voice. You approve and send.' },
  { icon: <Bell className="h-6 w-6" />, accent: 'blue' as const, title: 'Monitoring', description: 'Continuous watch. Interrupts only when it matters.' },
  { icon: <Settings className="h-6 w-6" />, accent: 'blue' as const, title: 'Custom workflows', description: 'Onboarding, follow-up, escalations — all in conversation, not code.' },
];

const VERTICALS = [
  {
    title: 'Manufacturing',
    body: 'Production lines, supply chain, and warehouse intelligence in one operating layer. Real-time line awareness, anticipatory inventory, and a warehouse that answers you in a sentence — not a spreadsheet.',
    href: '/pro-os/manufacturing',
    cta: 'See Manufacturing',
  },
  {
    title: 'Private Equity',
    body: 'Portfolio-wide AI deployment. ≥$100K combined annual savings in 60 days. Zero risk.',
    href: '/pro-os/private-equity',
    cta: 'See the build',
  },
  {
    title: 'Every other industry',
    body: "If your company runs on customers, data, and decisions — Oaisis configures to it.",
    href: '/pro-os/general',
    cta: 'Talk to us',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function ProOSUmbrella() {
  return (
    <InnerPageShell
      eyebrow="Oaisis OS"
      lines={[
        { text: 'One operating layer.' },
        { text: 'Every workflow.' },
        { text: 'Your company, intelligent.' },
      ]}
      subhead="A single intelligent layer that connects every tool you already use, watches everything happening across your company in real time, and acts on it. Not when you ask. While you sleep."
    >
      <motion.div {...fadeUp} className="mb-14">
        <p
          className="text-center mb-6"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#2563A8',
          }}
        >
          Six capabilities. One system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <motion.div key={cap.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
              <CapabilityTile {...cap} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="mb-12">
        <p
          className="text-center mb-6"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#2563A8',
          }}
        >
          Three deployment paths
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {VERTICALS.map((v, i) => (
            <motion.div key={v.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <Glass variant="sky" className="h-full flex flex-col" style={{ padding: 28 }}>
                <h3
                  className="mb-3"
                  style={{ fontSize: 20, fontWeight: 600, color: '#0F2A4A', letterSpacing: '-0.01em' }}
                >
                  {v.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(15,42,74,0.75)', marginBottom: 16, flex: 1 }}>
                  {v.body}
                </p>
                <Link
                  to={v.href}
                  className="inline-flex items-center group/cta"
                  style={{ fontSize: 13, fontWeight: 600, color: '#2563A8' }}
                >
                  <span>{v.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </Glass>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="text-center">
        <Link to="/demo" className="btn-primary-emerald">
          Book a demo
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </InnerPageShell>
  );
}
