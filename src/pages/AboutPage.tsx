import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Compass, ArrowRight } from 'lucide-react';
import Glass from '../components/ui/Glass';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import GlowLogo from '../components/ui/GlowLogo';

const TEAM = [
  { name: 'Chris', role: 'Founder · CEO', focus: 'Sales, strategy, Pro OS direction' },
  { name: 'Jeff', role: 'Technical Lead', focus: 'Architecture, delivery, engineering accountability' },
  { name: 'Sachin', role: 'Engineering Lead', focus: 'Security, code quality, kernel architecture' },
  { name: 'Yaw', role: 'DevOps', focus: 'Infrastructure, deployment, operational tooling' },
  { name: 'Sunrit', role: 'Engineer', focus: 'Feature implementation, rapid prototyping' },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function AboutPage() {
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
          { color: 'green', size: 280, top: '5%', right: '6%' },
          { color: 'tan', size: 240, top: '40%', left: '4%' },
          { color: 'blue', size: 220, bottom: '8%', right: '10%' },
        ]}
      />

      <div className="relative mx-auto px-6" style={{ maxWidth: 960, padding: '120px 24px 80px' }}>
        <motion.div {...fadeUp} className="text-center mb-14 mx-auto" style={{ maxWidth: 720 }}>
          <div className="flex justify-center mb-6">
            <GlowLogo size={84} glow="green" />
          </div>
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
            About
          </p>
          <h1
            className="display-heading text-brand-text mb-6 mx-auto"
            style={{ fontSize: 'clamp(32px, 4.8vw, 52px)' }}
          >
            A product company building the future of the intelligent enterprise.
          </h1>
          <p
            className="mx-auto"
            style={{ fontSize: 16, lineHeight: 1.75, fontWeight: 300, color: '#4D4060', maxWidth: 580 }}
          >
            OAISIS makes AI Operating Systems for operators. Not chatbots. Not copilots. Real systems that
            run underneath your business as a single intelligent layer.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mb-10">
          <Glass variant="default" style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
            <div className="flex items-start gap-4 mb-4">
              <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#1A6B4A' }} />
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#1A6B4A',
                    marginBottom: 8,
                  }}
                >
                  Mission
                </p>
                <p
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 19px)',
                    lineHeight: 1.75,
                    fontWeight: 300,
                    color: '#2A1F38',
                  }}
                >
                  Every era of business has its operating layer. Paper. Spreadsheets. Software. Now intelligence.
                  We build for the operators living through that shift — the ones who don't want another tool,
                  they want a system that runs the business with them.
                </p>
              </div>
            </div>
          </Glass>
        </motion.div>

        <motion.div {...fadeUp} className="mb-10">
          <Glass variant="tan" style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
            <div className="flex items-start gap-4 mb-6">
              <Briefcase className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#A08050' }} />
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#A08050',
                    marginBottom: 8,
                  }}
                >
                  The team
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#4D4060' }}>
                  Five people. Flat. Building product, shipping to operators, talking to customers every week.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  style={{
                    padding: 18,
                    background: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(220,201,160,0.5)',
                    borderRadius: 14,
                  }}
                >
                  <p style={{ fontSize: 15, fontWeight: 500, color: '#0F4D35' }}>{member.name}</p>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#A08050',
                      marginTop: 4,
                    }}
                  >
                    {member.role}
                  </p>
                  <p style={{ fontSize: 12, color: '#4D4060', lineHeight: 1.6, marginTop: 8 }}>
                    {member.focus}
                  </p>
                </div>
              ))}
            </div>
          </Glass>
        </motion.div>

        <motion.div {...fadeUp} className="mb-12">
          <Glass variant="blue" style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2563A8' }} />
              <div className="flex-1">
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#2563A8',
                    marginBottom: 8,
                  }}
                >
                  Where we are
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: '#2A1F38', fontWeight: 300 }}>
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
      </div>
    </main>
  );
}
