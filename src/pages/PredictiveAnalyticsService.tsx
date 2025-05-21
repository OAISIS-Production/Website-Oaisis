import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart, Brain, LineChart, TrendingUp, Target, Database, Zap, PieChart as ChartPie, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function PredictiveAnalyticsService() {
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
                Predictive & Prescriptive Analytics
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transform your data into actionable insights with advanced analytics that not only predict future trends but also recommend optimal actions for success.
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
                  title: "Advanced AI Models",
                  description: "State-of-the-art machine learning algorithms for accurate predictions and insights."
                },
                {
                  icon: <TrendingUp className="h-8 w-8" />,
                  title: "Trend Analysis",
                  description: "Sophisticated pattern recognition to identify emerging trends and opportunities."
                },
                {
                  icon: <Target className="h-8 w-8" />,
                  title: "Strategic Recommendations",
                  description: "AI-driven suggestions for optimal business decisions and actions."
                },
                {
                  icon: <Database className="h-8 w-8" />,
                  title: "Data Integration",
                  description: "Seamless connection with multiple data sources for comprehensive analysis."
                },
                {
                  icon: <ChartPie className="h-8 w-8" />,
                  title: "Visual Analytics",
                  description: "Interactive dashboards and visualizations for clear insight communication."
                },
                {
                  icon: <Microscope className="h-8 w-8" />,
                  title: "Deep Analysis",
                  description: "Thorough examination of data patterns and correlations for better understanding."
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
                Our Analytics Implementation Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A comprehensive approach to implementing predictive and prescriptive analytics
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Data Assessment",
                  description: "Comprehensive evaluation of your data sources, quality, and potential for analytical insights."
                },
                {
                  step: "02",
                  title: "Model Development",
                  description: "Creating and training custom predictive models tailored to your specific needs."
                },
                {
                  step: "03",
                  title: "Integration & Testing",
                  description: "Seamless implementation and rigorous testing of analytics solutions."
                },
                {
                  step: "04",
                  title: "Continuous Optimization",
                  description: "Ongoing refinement of models and recommendations based on new data."
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Analytics in Action
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real-world applications of our predictive and prescriptive analytics
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Demand Forecasting",
                  description: "Accurate predictions of future demand patterns to optimize inventory and resources."
                },
                {
                  title: "Risk Assessment",
                  description: "Advanced risk analysis and mitigation strategies for better decision-making."
                },
                {
                  title: "Market Analysis",
                  description: "Deep insights into market trends and competitive positioning."
                },
                {
                  title: "Performance Optimization",
                  description: "Data-driven recommendations for improving operational efficiency."
                }
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">{useCase.title}</h3>
                  <p className="text-gray-300">{useCase.description}</p>
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
                Ready to Transform Your Data into Insights?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss how predictive and prescriptive analytics can drive your business forward.
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