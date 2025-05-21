import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Stethoscope, TrendingUp, Brain, LineChart, Search, FileText, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function MedFirstCaseStudy() {
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
                Healthcare
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Stethoscope className="w-4 h-4 mr-2" />
                MedFirst Analytics
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Enhanced Diagnostics Boost Accuracy by 18%
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed">
                How MedFirst Analytics leveraged machine learning to enhance medical imaging analysis and improve patient outcome prediction.
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
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600"
                alt="MedFirst Analytics Healthcare Facility"
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
                metric: "18%",
                label: "Increased Diagnostic Accuracy",
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                metric: "32%",
                label: "Faster Analysis Time",
                icon: <Brain className="w-6 h-6" />
              },
              {
                metric: "93%",
                label: "Patient Outcome Prediction",
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
              MedFirst Analytics faced several critical challenges in their diagnostic processes:
            </p>
            <ul className="space-y-4 mb-12">
              {[
                "Time-intensive manual analysis of medical imaging",
                "Variability in diagnostic interpretations",
                "Complex patient data correlation",
                "Need for faster, more accurate patient outcome predictions"
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
              We implemented a comprehensive AI-powered diagnostic system:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: <Search className="h-6 w-6" />,
                  title: "Advanced Image Analysis",
                  description: "AI-powered detection and classification of medical imaging anomalies."
                },
                {
                  icon: <Brain className="h-6 w-6" />,
                  title: "Predictive Analytics",
                  description: "Machine learning models for patient outcome prediction."
                },
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "Clinical Decision Support",
                  description: "Intelligent assistance for diagnostic decision-making."
                },
                {
                  icon: <Activity className="h-6 w-6" />,
                  title: "Real-time Monitoring",
                  description: "Continuous analysis of patient vital signs and metrics."
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
                  phase: "Phase 1: Data Collection",
                  duration: "8 weeks",
                  activities: [
                    "Historical medical imaging analysis",
                    "Patient outcome data compilation",
                    "Clinical workflow assessment"
                  ]
                },
                {
                  phase: "Phase 2: AI Model Development",
                  duration: "12 weeks",
                  activities: [
                    "Custom diagnostic model creation",
                    "Prediction algorithm development",
                    "Integration framework design"
                  ]
                },
                {
                  phase: "Phase 3: Clinical Validation",
                  duration: "16 weeks",
                  activities: [
                    "Controlled testing in clinical environment",
                    "Performance benchmarking",
                    "Healthcare provider training"
                  ]
                },
                {
                  phase: "Phase 4: Full Deployment",
                  duration: "8 weeks",
                  activities: [
                    "System-wide implementation",
                    "Workflow integration",
                    "Ongoing monitoring setup"
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
              The implementation of our AI solution delivered significant improvements across all diagnostic areas:
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <ul className="space-y-6">
                {[
                  {
                    metric: "Diagnostic Accuracy",
                    value: "18% increase",
                    description: "In correct diagnosis rates across all imaging types"
                  },
                  {
                    metric: "Analysis Speed",
                    value: "32% faster",
                    description: "Reduction in image analysis time"
                  },
                  {
                    metric: "Patient Outcomes",
                    value: "93% accuracy",
                    description: "In predicting patient treatment responses"
                  },
                  {
                    metric: "Provider Efficiency",
                    value: "45% improvement",
                    description: "In clinical workflow efficiency"
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
              Ready to Transform Your Healthcare Analytics?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can enhance your diagnostic accuracy and patient care.
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