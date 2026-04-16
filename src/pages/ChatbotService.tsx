import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Bot, Brain, Zap, Users, Shield, Network, Code, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ChatbotService() {
  return (
    <div className="min-h-screen">
      <Navbar scrolled={true} />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="inline-flex items-center text-emerald hover:text-emerald-deep transition-colors mb-8"
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
              <h1 className="text-4xl md:text-6xl font-extralight text-brand-text mb-6">
                Natural Language & Chatbot Systems
              </h1>
              <p className="text-base text-brand-text-sec max-w-3xl mx-auto">
                Deploy sophisticated conversational AI solutions that understand and respond to natural language, creating meaningful interactions that enhance customer experience.
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
                  icon: <Brain className="h-8 w-8" />,
                  title: "Advanced NLP Models",
                  description: "State-of-the-art natural language processing models for human-like understanding and responses."
                },
                {
                  icon: <Bot className="h-8 w-8" />,
                  title: "Contextual Understanding",
                  description: "Intelligent conversation tracking and context retention for more natural interactions."
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Multi-Language Support",
                  description: "Global communication capabilities with support for multiple languages and dialects."
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Enterprise Security",
                  description: "Robust security measures ensuring data protection and privacy compliance."
                },
                {
                  icon: <Network className="h-8 w-8" />,
                  title: "Seamless Integration",
                  description: "Easy integration with existing systems and communication channels."
                },
                {
                  icon: <LineChart className="h-8 w-8" />,
                  title: "Analytics & Insights",
                  description: "Comprehensive analytics for monitoring and improving conversation quality."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-glass p-8 border border-tan-light/30 hover:border-emerald/30 transition-all duration-300"
                >
                  <div className="text-emerald mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-brand-text mb-3">{feature.title}</h3>
                  <p className="text-brand-text-muted">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-extralight text-brand-text mb-6">
                Chatbot Solutions in Action
              </h2>
              <p className="text-[13px] text-brand-text-sec leading-[1.8] max-w-3xl mx-auto">
                Real-world applications of our conversational AI systems
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Customer Support",
                  description: "24/7 automated support with intelligent issue resolution and human handoff.",
                  image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Sales Assistance",
                  description: "Intelligent product recommendations and sales process automation.",
                  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Employee Support",
                  description: "Internal help desk automation and knowledge base integration.",
                  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Appointment Scheduling",
                  description: "Automated booking and calendar management with natural language interface.",
                  image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=1600"
                }
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-glass"
                >
                  <div className="absolute inset-0">
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 photo-overlay" />
                  </div>
                  <div className="relative p-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">{useCase.title}</h3>
                    <p className="text-brand-text-muted">{useCase.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-extralight text-brand-text mb-6">
                Chatbot Implementation Process
              </h2>
              <p className="text-[13px] text-brand-text-sec leading-[1.8] max-w-3xl mx-auto">
                Our systematic approach to creating intelligent conversational systems
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Requirements Analysis",
                  description: "Understanding your communication needs and defining conversation flows."
                },
                {
                  step: "02",
                  title: "NLP Model Development",
                  description: "Creating and training language models tailored to your domain."
                },
                {
                  step: "03",
                  title: "Integration & Testing",
                  description: "Seamless implementation and thorough testing of conversational flows."
                },
                {
                  step: "04",
                  title: "Deployment & Optimization",
                  description: "Launch and continuous improvement based on real-world interactions."
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
                  <div className="flex-shrink-0 w-16 h-16 bg-emerald/[0.12] rounded-full flex items-center justify-center border border-emerald/30">
                    <span className="text-2xl font-bold text-emerald">{phase.step}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-brand-text mb-3">{phase.title}</h3>
                    <p className="text-brand-text-muted">{phase.description}</p>
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
              className="bg-emerald/[0.12] backdrop-blur-md rounded-2xl p-12 border border-emerald/30 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-extralight text-brand-text mb-6">
                Ready to Transform Your Customer Interactions?
              </h2>
              <p className="text-base text-brand-text-sec mb-8 max-w-2xl mx-auto">
                Let's discuss how our chatbot solutions can enhance your customer experience.
              </p>
              <Link
                to="/#contact"
                className="inline-block bg-emerald text-white px-8 py-4 rounded-glass text-lg font-semibold hover:bg-emerald-deep transition-all duration-300 shadow-lg shadow-emerald/20 hover:shadow-xl hover:shadow-emerald/30"
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
