import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import Glass from '../components/ui/Glass';
import InnerPageShell from '../components/ui/InnerPageShell';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const sectionEyebrow: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#2563A8',
  marginBottom: 10,
  fontFamily: "'Inter', sans-serif",
};

export default function AboutPage() {
  return (
    <InnerPageShell
      eyebrow="About"
      lines={[
        { text: 'Built in DFW.' },
        { text: 'For the operators.' },
        { text: 'Who run things.' },
      ]}
      subhead="OAISIS makes AI Operating Systems for operators. Not chatbots. Not copilots. Real systems that run underneath your company as a single intelligent layer."
      maxWidth={960}
    >
      <motion.div {...fadeUp} className="mb-10">
        <Glass variant="default" style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
          <div className="flex items-start gap-4">
            <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2563A8' }} />
            <div>
              <p style={sectionEyebrow}>Mission</p>
              <p
                style={{
                  fontSize: 'clamp(16px, 1.6vw, 18px)',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  color: 'rgba(15,42,74,0.85)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Every era of business has its operating layer. Paper. Spreadsheets. Software. Now intelligence.
                We build for the operators living through that shift — the ones who don't want another tool,
                they want a system that runs the company with them.
              </p>
            </div>
          </div>
        </Glass>
      </motion.div>

      <motion.div {...fadeUp} className="mb-12">
        <Glass variant="blue" style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2563A8' }} />
            <div className="flex-1">
              <p style={sectionEyebrow}>Where we are</p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(15,42,74,0.85)',
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Headquartered in Dallas-Fort Worth. Building products that ship to operators across North America. Hiring engineers and operators who care about real outcomes more than demos.
              </p>
            </div>
          </div>
        </Glass>
      </motion.div>

      <motion.div {...fadeUp} className="text-center">
        <Link to="/demo" className="btn-primary-emerald">
          Book a conversation
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </InnerPageShell>
  );
}
