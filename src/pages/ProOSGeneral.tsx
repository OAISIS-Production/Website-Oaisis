import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plug, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import InnerPageShell from '../components/ui/InnerPageShell';
import Glass from '../components/ui/Glass';

const CAPABILITIES = [
  {
    icon: Plug,
    title: 'Connects to what you already use',
    body: 'CRM, accounting, calendar, comms, custom databases. Oaisis reads from all of it. No rip-and-replace.',
  },
  {
    icon: MessageSquare,
    title: 'Configures to how you actually work',
    body: 'Workflows, voice, cadences, escalations — set in conversation, not code. Learns your operation like a new hire.',
  },
  {
    icon: TrendingUp,
    title: 'Scales with what you become',
    body: 'Start with the operation you have. Add capabilities as you grow. More useful the more your company runs through it.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function ProOSGeneral() {
  return (
    <InnerPageShell
      eyebrow="Oaisis OS · Any industry"
      lines={[
        { text: 'Your industry.' },
        { text: 'Your operation.' },
        { text: 'Your OAISIS.', glow: true },
      ]}
      subhead="Industry-agnostic at its core. If your company runs on customers, data, and decisions, Oaisis configures to it. Tell us what you do — we'll show you what it looks like deployed."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {CAPABILITIES.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            >
              <Glass variant="sky" className="h-full" style={{ padding: 28 }}>
                <div style={{ color: '#2563A8', marginBottom: 14 }}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className="mb-2"
                  style={{ fontSize: 18, fontWeight: 600, color: '#0F2A4A', letterSpacing: '-0.01em' }}
                >
                  {cap.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(15,42,74,0.75)' }}>{cap.body}</p>
              </Glass>
            </motion.div>
          );
        })}
      </div>

      <motion.div {...fadeUp} className="text-center">
        <Link to="/demo" className="btn-primary-emerald">
          Book a discovery call
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </InnerPageShell>
  );
}
