import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Mail } from 'lucide-react';
import Glass from '../components/ui/Glass';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import GlowLogo from '../components/ui/GlowLogo';

export default function ResourcesPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Resources signup (stub):', email);
    setSubmitted(true);
  };

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
          { color: 'green', size: 260, top: '10%', right: '8%' },
          { color: 'blue', size: 220, bottom: '15%', left: '6%' },
        ]}
      />

      <div className="relative mx-auto px-6" style={{ maxWidth: 640, padding: '140px 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Glass variant="glow" style={{ padding: 'clamp(36px, 5vw, 52px)' }} className="text-center">
            <div className="flex justify-center mb-6">
              <GlowLogo size={72} glow="green" />
            </div>
            <div
              className="inline-flex items-center justify-center gap-2 mb-5"
              style={{
                padding: '5px 12px',
                background: 'rgba(26,107,74,0.10)',
                border: '1px solid rgba(26,107,74,0.22)',
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: '#0F4D35',
              }}
            >
              <BookOpen className="w-3 h-3" />
              Resources · Coming Soon
            </div>
            <h1
              className="display-heading text-brand-text mb-5 mx-auto"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
            >
              Writing about how we build.
            </h1>
            <p
              className="mx-auto mb-8"
              style={{ fontSize: 14, lineHeight: 1.75, fontWeight: 300, color: '#4D4060', maxWidth: '48ch' }}
            >
              Deep dives on AI Operating Systems, manifestos, build journals, customer stories.
              Drop your email and we'll send the first one when it lands.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    fontSize: 14,
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(26,107,74,0.18)',
                    borderRadius: 12,
                    color: '#2A1F38',
                    outline: 'none',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#1A6B4A';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,139,85,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(26,107,74,0.18)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button type="submit" className="btn-primary-emerald" style={{ whiteSpace: 'nowrap' }}>
                  Notify me
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Mail className="w-6 h-6" style={{ color: '#1A6B4A' }} />
                <p style={{ fontSize: 14, fontWeight: 400, color: '#0F4D35' }}>
                  You're on the list. We'll be in touch when the first piece is ready.
                </p>
              </div>
            )}
          </Glass>
        </motion.div>
      </div>
    </main>
  );
}
