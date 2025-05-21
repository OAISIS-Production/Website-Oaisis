import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useState } from 'react';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-dark to-gray-900">
      {/* Animated background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,0.7),rgba(24,24,27,0.9))]" />
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-screen filter blur-xl opacity-70 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${i % 2 ? '#00a3ff' : '#7000ff'}22, transparent 70%)`,
                width: `${Math.random() * 400 + 100}px`,
                height: `${Math.random() * 400 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-32 left-8 md:left-16 bg-primary-light/5 backdrop-blur-md rounded-full py-2 px-4 shadow-lg border border-primary-light/10 flex items-center z-10"
      >
        <Trophy className="h-5 w-5 text-accent mr-2" />
        <span className="text-sm font-medium text-gray-200">
          Trusted by forward-thinking companies in 20+ industries
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Perfection in every solution
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Crafting professional grade AI solutions with cutting edge technology for unmatched performance, precision, and strategic clarity.
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            OAISIS delivers enterprise-grade AI solutions that streamline operations, enhance decision-making, and unlock scalable value.
            We don't just implement AI — we engineer business intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleScheduleCall}
              className="bg-accent/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-accent/30 transition-all border border-accent/30 shadow-lg shadow-accent/10 hover:shadow-xl hover:shadow-accent/20 transform hover:-translate-y-0.5"
            >
              Schedule a Discovery Call
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleExploreCapabilities}
              className="relative bg-primary-light/5 backdrop-blur-md text-primary-light border border-primary-light/20 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-primary-light/10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light/0 via-primary-light/30 to-primary-light/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-[glow_2s_ease-in-out_infinite] blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-[glow_2s_ease-in-out_infinite] delay-75 blur-lg" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Explore Our Capabilities</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-12 left-0 right-0 text-center z-10"
      >
        <p className="text-lg text-gray-400 italic bg-primary-light/5 backdrop-blur-md inline-block px-6 py-3 rounded-full border border-primary-light/10">
          Building the bridge that leads businesses into the age of intelligence
        </p>
      </motion.div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Your Discovery Call</h2>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can transform your business with AI. Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Here you would typically handle the form submission
              setIsModalOpen(false);
              alert('Thank you! We will contact you shortly.');
            }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    rows={4}
                    placeholder="Tell us about your project or challenges..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                >
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