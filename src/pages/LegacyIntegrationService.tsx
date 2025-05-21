import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GitMerge, Database, Code, Shield, Zap, Network, LineChart, Layers, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function LegacyIntegrationService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <Navbar scrolled={true} />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-accent hover:text-accent-hover transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Legacy System AI Integration
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Modernize existing systems with cutting-edge AI capabilities without disrupting core operations. Bridge the gap between legacy infrastructure and modern AI solutions seamlessly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <GitMerge className="h-8 w-8" />,
                  title: "Seamless Integration",
                  description: "Non-disruptive integration that preserves existing workflows while adding AI capabilities."
                },
                {
                  icon: <Database className="h-8 w-8" />,
                  title: "Data Migration",
                  description: "Secure and efficient transfer of historical data to modern AI-ready formats."
                },
                {
                  icon: <Code className="h-8 w-8" />,
                  title: "API Modernization",
                  description: "Updated interfaces that enable AI functionality while maintaining compatibility."
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Security Preservation",
                  description: "Enhanced security measures that protect both legacy and new AI components."
                },
                {
                  icon: <Network className="h-8 w-8" />,
                  title: "System Connectivity",
                  description: "Robust connections between legacy systems and modern AI infrastructure."
                },
                {
                  icon: <LineChart className="h-8 w-8" />,
                  title: "Performance Monitoring",
                  description: "Comprehensive tracking of system performance and AI integration metrics."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-accent mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Approaches */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Integration Approaches
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Flexible strategies for modernizing legacy systems with AI
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Middleware Integration",
                  description: "Bridge legacy systems with modern AI through intelligent middleware layers.",
                  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "API-First Modernization",
                  description: "Modernize interfaces while preserving core functionality and data integrity.",
                  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Microservices Architecture",
                  description: "Decompose monolithic systems into AI-enabled microservices.",
                  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Hybrid Cloud Integration",
                  description: "Leverage cloud AI services while maintaining on-premise legacy systems.",
                  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600"
                }
              ].map((approach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0">
                    <img
                      src={approach.image}
                      alt={approach.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                  </div>
                  <div className="relative p-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">{approach.title}</h3>
                    <p className="text-gray-300">{approach.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Integration Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our systematic approach to modernizing legacy systems with AI
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "System Assessment",
                  description: "Comprehensive analysis of existing systems and integration requirements."
                },
                {
                  step: "02",
                  title: "Architecture Design",
                  description: "Creating a robust integration architecture that preserves system stability."
                },
                {
                  step: "03",
                  title: "Phased Implementation",
                  description: "Gradual integration of AI capabilities with minimal disruption."
                },
                {
                  step: "04",
                  title: "Testing & Validation",
                  description: "Rigorous testing to ensure system stability and AI functionality."
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-8"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30">
                    <span className="text-2xl font-bold text-accent">{phase.step}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{phase.title}</h3>
                    <p className="text-gray-300">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-accent/20 backdrop-blur-md rounded-2xl p-12 border border-accent/30 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Modernize Your Legacy Systems?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can enhance your existing infrastructure with modern AI capabilities.
              </p>
              <Link
                to="/#contact"
                className="inline-block bg-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
              >
                Schedule a Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}