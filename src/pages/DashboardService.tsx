import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Gauge, LineChart, PieChart, BarChart, Activity, Layers, Share2, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function DashboardService() {
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
                AI Dashboards & Decision Support Tools
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Custom-built interfaces that visualize complex data and AI insights in real-time, empowering your team with intuitive tools for data-driven decision-making.
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
                  icon: <LineChart className="h-8 w-8" />,
                  title: "Real-time Analytics",
                  description: "Live data visualization and analysis for immediate insights and decision-making."
                },
                {
                  icon: <PieChart className="h-8 w-8" />,
                  title: "Interactive Visualizations",
                  description: "Dynamic charts and graphs that respond to user interaction for deeper analysis."
                },
                {
                  icon: <Activity className="h-8 w-8" />,
                  title: "Performance Metrics",
                  description: "Key performance indicators tracked and displayed in real-time."
                },
                {
                  icon: <Layers className="h-8 w-8" />,
                  title: "Multi-dimensional Analysis",
                  description: "Complex data relationships visualized through intuitive interfaces."
                },
                {
                  icon: <Share2 className="h-8 w-8" />,
                  title: "Collaborative Features",
                  description: "Tools for sharing insights and collaborating on decisions across teams."
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Instant Alerts",
                  description: "Automated notifications for critical changes and important trends."
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

        {/* Dashboard Types Section */}
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
                Specialized Dashboard Solutions
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tailored dashboard types for different business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Executive Dashboards",
                  description: "High-level overview of key metrics and strategic insights for leadership teams.",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Operational Dashboards",
                  description: "Detailed monitoring of day-to-day operations and performance metrics.",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Analytics Dashboards",
                  description: "Deep dive analytics tools for data scientists and analysts.",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
                },
                {
                  title: "Customer Insights Dashboards",
                  description: "Real-time tracking of customer behavior and engagement metrics.",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600"
                }
              ].map((dashboard, index) => (
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
                      src={dashboard.image}
                      alt={dashboard.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                  </div>
                  <div className="relative p-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">{dashboard.title}</h3>
                    <p className="text-gray-300">{dashboard.description}</p>
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
                Dashboard Implementation Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our systematic approach to creating powerful decision support tools
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Requirements Analysis",
                  description: "Understanding your specific needs and identifying key metrics and visualizations."
                },
                {
                  step: "02",
                  title: "Design & Prototyping",
                  description: "Creating intuitive layouts and interactive features for optimal user experience."
                },
                {
                  step: "03",
                  title: "Development & Integration",
                  description: "Building robust dashboards with real-time data integration capabilities."
                },
                {
                  step: "04",
                  title: "Testing & Refinement",
                  description: "Rigorous testing and optimization based on user feedback and performance metrics."
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
                Ready to Transform Your Decision-Making?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss how our AI dashboards can empower your team with actionable insights.
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