import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Shield, Brain, Zap, LineChart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function CustomAIService() {
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
                Custom AI System Architecture
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Designing and implementing bespoke AI architectures that align perfectly with your business objectives while ensuring scalability and performance.
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
                  icon: <Cpu className="h-8 w-8" />,
                  title: "Scalable Architecture",
                  description: "Built to grow with your business, our systems adapt to increasing demands while maintaining peak performance."
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Enterprise Security",
                  description: "Military-grade security protocols protect your data and AI operations at every level."
                },
                {
                  icon: <Brain className="h-8 w-8" />,
                  title: "Advanced AI Models",
                  description: "Cutting-edge machine learning models customized for your specific use cases and data requirements."
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Real-time Processing",
                  description: "Lightning-fast data processing and decision-making capabilities for time-critical operations."
                },
                {
                  icon: <LineChart className="h-8 w-8" />,
                  title: "Performance Analytics",
                  description: "Comprehensive monitoring and analytics to ensure optimal system performance and ROI."
                },
                {
                  icon: <Settings className="h-8 w-8" />,
                  title: "Seamless Integration",
                  description: "Smooth integration with your existing infrastructure and third-party systems."
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

        {/* Process Section */}
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
                Our Implementation Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A systematic approach to building your custom AI architecture
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Requirements Analysis",
                  description: "Deep dive into your business processes, data infrastructure, and objectives to design the perfect solution."
                },
                {
                  step: "02",
                  title: "Architecture Design",
                  description: "Creating detailed blueprints for your AI system, including data flow, processing pipelines, and integration points."
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  description: "Building and rigorously testing each component to ensure reliability and performance."
                },
                {
                  step: "04",
                  title: "Deployment & Integration",
                  description: "Seamless implementation into your existing infrastructure with minimal disruption."
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss how our custom AI architecture can drive your business forward.
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