import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CustomerProofSection() {
  return (
    <section
      id="proof"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #40A865 0%, #2D8B55 100%)',
        padding: 'clamp(64px, 10vh, 120px) 24px',
        minHeight: '50vh',
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 14,
          }}
        >
          Operators choosing Pro OS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontSize: 'clamp(22px, 3.2vw, 30px)',
            fontWeight: 200,
            letterSpacing: '-0.3px',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.3,
            marginBottom: 28,
          }}
        >
          Coming out of stealth.
          <br />
          Demos available now.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 transition-all"
            style={{
              padding: '12px 22px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.45)',
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.2px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.22)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Book the early-access demo
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginTop: 26,
          }}
        >
          Customer logos land here as the early-access cohort goes public
        </motion.p>
      </div>
    </section>
  );
}
