import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useState } from 'react';
import GlowLogo from '../ui/GlowLogo';
import AmbientBlob from '../ui/AmbientBlob';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScheduleCall = () => {
    setIsModalOpen(true);
  };

  const handleExploreCapabilities = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0C0A18 0%, #0A1525 40%, #081420 70%, #0C0A18 100%)',
      }}
    >
      {/* Ambient background blobs */}
      <AmbientBlob color="blue" size={400} top="10%" left="20%" className="opacity-40" />
      <AmbientBlob color="emerald" size={300} top="60%" right="15%" className="opacity-30" />
      <AmbientBlob color="blue" size={250} bottom="20%" left="10%" className="opacity-20" />

      {/* Trust badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-32 left-8 md:left-16 glass-night-blue py-2 px-4 !rounded-full !p-0 flex items-center z-10"
        style={{ padding: '8px 16px', borderRadius: '9999px' }}
      >
        <Trophy className="h-4 w-4 text-sky mr-2" />
        <span className="text-[13px] font-medium text-night-text">
          Trusted by forward-thinking companies in 20+ industries
        </span>
      </motion.div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <GlowLogo size={80} glow="moonlit" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extralight text-night-text mb-6 tracking-tight" style={{ letterSpacing: '-0.5px' }}>
            Perfection in every{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #C8AD7E 0%, #40A865 40%, #5BA0D4 70%, #93C5E8 100%)',
              }}
            >
              solution
            </span>
          </h1>
          <p className="text-lg md:text-xl text-night-text/70 mb-8 max-w-4xl mx-auto font-light leading-relaxed">
            Crafting professional-grade AI solutions with cutting-edge technology for unmatched performance, precision, and strategic clarity.
          </p>
          <p className="text-base text-night-muted mb-12 max-w-3xl mx-auto">
            OAISIS delivers enterprise-grade AI solutions that streamline operations, enhance decision-making, and unlock scalable value.
            We don't just implement AI — we engineer business intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleScheduleCall}
              className="glass-night-green !rounded-2xl px-8 py-4 text-base font-medium text-leaf hover:text-white transition-all hover:shadow-lg"
            >
              Schedule a Discovery Call
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleExploreCapabilities}
              className="glass-night-blue !rounded-2xl px-8 py-4 text-base font-medium text-sky-light hover:text-white transition-all hover:shadow-lg"
            >
              Explore Our Capabilities
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-12 left-0 right-0 text-center z-10"
      >
        <p className="text-sm text-night-muted italic glass-night !rounded-full inline-block px-6 py-2" style={{ padding: '8px 24px', borderRadius: '9999px' }}>
          Guiding people into the Age of Intelligence
        </p>
      </motion.div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-glow max-w-lg w-full mx-4 relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-text-muted hover:text-brand-text"
            >
              ✕
            </button>
            <h2 className="text-2xl font-extralight text-brand-text mb-4">Schedule Your Discovery Call</h2>
            <p className="text-brand-text-sec text-sm mb-6">
              Let's discuss how we can transform your business with AI. Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert('Thank you! We will contact you shortly.'); }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="modal-name" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-1">Name</label>
                  <input type="text" id="modal-name" required className="w-full px-4 py-2 rounded-glass" placeholder="John Smith" />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-1">Email</label>
                  <input type="email" id="modal-email" required className="w-full px-4 py-2 rounded-glass" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="modal-company" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-1">Company</label>
                  <input type="text" id="modal-company" required className="w-full px-4 py-2 rounded-glass" placeholder="Acme Inc." />
                </div>
                <div>
                  <label htmlFor="modal-message" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-1">How can we help?</label>
                  <textarea id="modal-message" required className="w-full px-4 py-2 rounded-glass" rows={4} placeholder="Tell us about your project or challenges..." />
                </div>
                <button type="submit" className="w-full bg-emerald text-white px-6 py-3 rounded-glass font-medium hover:bg-emerald-deep transition-colors">
                  Schedule Call
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
