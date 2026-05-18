import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import InnerPageShell from '../components/ui/InnerPageShell';
import Glass from '../components/ui/Glass';

const CAPABILITIES = [
  {
    icon: Layers,
    title: 'Fund-wide standard, portco-specific deployment',
    body: 'One operating layer across the portfolio. Configured per company. Observable at the fund level.',
  },
  {
    icon: ShieldCheck,
    title: '60-day pilot, zero risk',
    body: 'Three portcos. Sixty days. ≥$100K combined annual savings — or you pay nothing.',
  },
  {
    icon: BarChart3,
    title: 'EBITDA impact you can report to LPs',
    body: 'Documented improvement. Fund-level visibility into what is working across the portfolio.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function ProOSPrivateEquity() {
  return (
    <InnerPageShell
      eyebrow="Oaisis OS · Private Equity"
      lines={[
        { text: 'Fund-wide AI deployment.' },
        { text: 'Portco-specific.' },
        { text: 'LP-reportable.' },
      ]}
      subhead="A standard intelligence layer across your portcos, customized per company, observable at the fund level. ≥$100K combined annual savings across three portcos in 60 days. Zero risk."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {CAPABILITIES.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <motion.div key={cap.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
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
          Talk to us
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </InnerPageShell>
  );
}
