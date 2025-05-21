import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, TrendingUp, Clock, LineChart, MapPin, BarChart, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function GlobalFreightCaseStudy() {
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
                Logistics
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Truck className="w-4 h-4 mr-2" />
                GlobalFreight Solutions
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Powered Route Optimization Saves $1.2M Annually
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed">
                How GlobalFreight Solutions transformed their delivery efficiency across 12 distribution centers using predictive routing and demand forecasting.
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
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600"
                alt="GlobalFreight Solutions Logistics Center"
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
                metric: "$1.2M",
                label: "Annual Savings",
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                metric: "27%",
                label: "Delivery Time Reduction",
                icon: <Clock className="w-6 h-6" />
              },
              {
                metric: "99.8%",
                label: "Route Optimization Accuracy",
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
              GlobalFreight Solutions faced significant challenges in optimizing their delivery operations across 12 distribution centers:
            </p>
            <ul className="space-y-4 mb-12">
              {[
                "Manual route planning leading to inefficient delivery paths",
                "Inability to predict and adapt to demand fluctuations",
                "High fuel costs due to suboptimal routes",
                "Customer dissatisfaction from delivery delays"
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
              We implemented a comprehensive AI-powered logistics optimization system:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Dynamic Route Optimization",
                  description: "Real-time route adjustments based on traffic, weather, and delivery priorities."
                },
                {
                  icon: <BarChart className="h-6 w-6" />,
                  title: "Demand Forecasting",
                  description: "Predictive analytics for optimal resource allocation and scheduling."
                },
                {
                  icon: <Brain className="h-6 w-6" />,
                  title: "Machine Learning Models",
                  description: "Custom algorithms learning from historical delivery patterns."
                },
                {
                  icon: <LineChart className="h-6 w-6" />,
                  title: "Performance Analytics",
                  description: "Real-time monitoring and optimization of delivery metrics."
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
                  phase: "Phase 1: Analysis & Planning",
                  duration: "4 weeks",
                  activities: [
                    "Comprehensive analysis of existing routes and delivery patterns",
                    "Data collection and preparation for AI model training",
                    "Infrastructure assessment and integration planning"
                  ]
                },
                {
                  phase: "Phase 2: AI Model Development",
                  duration: "6 weeks",
                  activities: [
                    "Custom machine learning model development",
                    "Route optimization algorithm creation",
                    "Integration with existing systems"
                  ]
                },
                {
                  phase: "Phase 3: Pilot Program",
                  duration: "8 weeks",
                  activities: [
                    "Initial deployment in 2 distribution centers",
                    "Real-world testing and optimization",
                    "Driver training and feedback collection"
                  ]
                },
                {
                  phase: "Phase 4: Full Deployment",
                  duration: "12 weeks",
                  activities: [
                    "Rollout to remaining distribution centers",
                    "System optimization based on pilot learnings",
                    "Comprehensive staff training program"
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
              The implementation of our AI solution led to significant improvements across all key metrics:
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <ul className="space-y-6">
                {[
                  {
                    metric: "Cost Reduction",
                    value: "$1.2M annually",
                    description: "Through optimized routes and reduced fuel consumption"
                  },
                  {
                    metric: "Delivery Efficiency",
                    value: "27% faster",
                    description: "Average delivery time reduction across all routes"
                  },
                  {
                    metric: "Customer Satisfaction",
                    value: "94% positive",
                    description: "Increase in positive customer feedback"
                  },
                  {
                    metric: "Environmental Impact",
                    value: "32% reduction",
                    description: "In carbon emissions through optimized routes"
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
              Ready to Transform Your Logistics Operations?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can optimize your delivery network and reduce costs.
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