import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, TrendingUp, Shield, LineChart, Brain, Users, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function CapitalTechCaseStudy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <Navbar scrolled={true} />
      
      <main className="pt-32 pb-24">
        {/* Case Study Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-accent hover:text-accent-hover transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">
                Finance
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                CapitalTech Bank
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Driven Operations Reduce Overhead by 42%
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed">
                How CapitalTech Bank revolutionized their operational efficiency through automated risk assessment and intelligent fraud detection systems.
              </p>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
                alt="CapitalTech Bank Headquarters"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Key Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                metric: "42%",
                label: "Operational Cost Reduction",
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                metric: "99.9%",
                label: "Fraud Detection Accuracy",
                icon: <Shield className="w-6 h-6" />
              },
              {
                metric: "85%",
                label: "Faster Risk Assessment",
                icon: <LineChart className="w-6 h-6" />
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 text-center">
                <div className="text-accent mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.metric}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Case Study Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              The Challenge
            </h2>
            <p className="text-gray-300 mb-8">
              CapitalTech Bank faced several critical challenges in their operations:
            </p>
            <ul className="space-y-4 mb-12">
              {[
                "Time-consuming manual risk assessment processes",
                "Rising operational costs in fraud detection",
                "Increasing regulatory compliance requirements",
                "Growing customer demand for faster service"
              ].map((point, index) => (
                <li key={index} className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-bold text-white mb-6">
              Our Solution
            </h2>
            <p className="text-gray-300 mb-8">
              We implemented a comprehensive AI-powered operational system:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: <Brain className="h-6 w-6" />,
                  title: "Intelligent Risk Assessment",
                  description: "AI-driven analysis of credit risks and market conditions."
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Advanced Fraud Detection",
                  description: "Real-time transaction monitoring and anomaly detection."
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Customer Behavior Analysis",
                  description: "Predictive modeling of customer financial patterns."
                },
                {
                  icon: <Lock className="h-6 w-6" />,
                  title: "Compliance Automation",
                  description: "Automated regulatory compliance checking and reporting."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-6">
                  <div className="text-accent mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              Implementation Process
            </h2>
            <div className="space-y-8 mb-12">
              {[
                {
                  phase: "Phase 1: System Assessment",
                  duration: "6 weeks",
                  activities: [
                    "Comprehensive audit of existing processes",
                    "Data infrastructure evaluation",
                    "Regulatory compliance review"
                  ]
                },
                {
                  phase: "Phase 2: AI Model Development",
                  duration: "8 weeks",
                  activities: [
                    "Custom risk assessment model creation",
                    "Fraud detection system development",
                    "Integration architecture design"
                  ]
                },
                {
                  phase: "Phase 3: Controlled Testing",
                  duration: "10 weeks",
                  activities: [
                    "Parallel testing with existing systems",
                    "Performance optimization",
                    "Staff training initiation"
                  ]
                },
                {
                  phase: "Phase 4: Full Implementation",
                  duration: "12 weeks",
                  activities: [
                    "System-wide deployment",
                    "Real-time monitoring setup",
                    "Comprehensive staff training"
                  ]
                }
              ].map((phase, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
                    <span className="text-accent">{phase.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="text-gray-300">• {activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              Results & Impact
            </h2>
            <p className="text-gray-300 mb-8">
              The implementation of our AI solution delivered significant improvements across all operational areas:
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <ul className="space-y-6">
                {[
                  {
                    metric: "Operational Efficiency",
                    value: "42% reduction",
                    description: "In operational overhead through process automation"
                  },
                  {
                    metric: "Risk Assessment",
                    value: "85% faster",
                    description: "Processing time for credit risk evaluation"
                  },
                  {
                    metric: "Fraud Prevention",
                    value: "$4.2M saved",
                    description: "In prevented fraudulent transactions annually"
                  },
                  {
                    metric: "Customer Satisfaction",
                    value: "92% increase",
                    description: "In positive feedback on service speed"
                  }
                ].map((result, index) => (
                  <li key={index} className="flex items-center space-x-6">
                    <div className="w-32 text-accent font-bold">{result.value}</div>
                    <div>
                      <h4 className="text-white font-semibold">{result.metric}</h4>
                      <p className="text-gray-400">{result.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </article>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-accent/20 backdrop-blur-md rounded-2xl p-12 border border-accent/30 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Financial Operations?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can optimize your processes and reduce operational costs.
            </p>
            <Link
              to="/#contact"
              className="inline-block bg-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}