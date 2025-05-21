import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import CustomAIService from './pages/CustomAIService';
import ProcessAutomationService from './pages/ProcessAutomationService';
import PredictiveAnalyticsService from './pages/PredictiveAnalyticsService';
import DashboardService from './pages/DashboardService';
import ChatbotService from './pages/ChatbotService';
import LegacyIntegrationService from './pages/LegacyIntegrationService';
import CustomAIArticle from './pages/CustomAIArticle';
import AICostArticle from './pages/AICostArticle';
import IntelligenceCultureArticle from './pages/IntelligenceCultureArticle';
import GlobalFreightCaseStudy from './pages/GlobalFreightCaseStudy';
import CapitalTechCaseStudy from './pages/CapitalTechCaseStudy';
import MedFirstCaseStudy from './pages/MedFirstCaseStudy';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, BarChart as ChartBar, Clock, Users2, Truck, Building2, Stethoscope, TrendingUp, Search, Lightbulb, Code, Network, Rocket, Brain, Shield, Lock, FileText, Building, Download, Calendar, Cpu, Cog, Bot, Gauge, GitMerge } from 'lucide-react';

function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      message: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const handleDownloadBrief = () => {
    const link = document.createElement('a');
    link.href = '/assets/OAISIS-Executive-Brief.pdf';
    link.download = 'OAISIS_Executive_Brief.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Hero />
      {/* About Section */}
      <section id="about" className="relative py-24 overflow-hidden bg-[#fafafc]">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(30deg,#77469b_12%,transparent_12.5%,transparent_87%,#77469b_87.5%,#77469b),linear-gradient(150deg,#77469b_12%,transparent_12.5%,transparent_87%,#77469b_87.5%,#77469b),linear-gradient(30deg,#77469b_12%,transparent_12.5%,transparent_87%,#77469b_87.5%,#77469b),linear-gradient(150deg,#77469b_12%,transparent_12.5%,transparent_87%,#77469b_87.5%,#77469b),linear-gradient(60deg,#77469b77_25%,transparent_25.5%,transparent_75%,#77469b77_75%,#77469b77),linear-gradient(60deg,#77469b77_25%,transparent_25.5%,transparent_75%,#77469b77_75%,#77469b77)] bg-[length:80px_140px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We are your AI Transformation Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OAISIS specializes in the design, deployment, and integration of tailored AI systems that enhance the intelligence of your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                We work with executive teams and operational leaders to build AI tools that fit seamlessly into existing systems.
                From predictive analytics to automation frameworks — our solutions don't just add features, they transform function.
              </p>

              <div className="space-y-4">
                {[
                  'Founded by innovators at the intersection of AI, systems engineering, and business strategy.',
                  'Trusted by leading organizations across finance, healthcare, logistics, and SaaS.',
                  'Built for scale, engineered for precision.',
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-accent/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-[glow_2s_ease-in-out_infinite] blur-xl" />
                    <div className="relative flex items-start space-x-3">
                      <span className="text-accent font-bold text-lg flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">◆</span>
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors">{point}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <img
                  src="/assets/images/Data_Oaisis.jpeg"
                  alt="AI Innovation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#77469b_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Strategic AI Solutions Tailored to You
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="h-8 w-8" />,
                title: 'Custom AI System Architecture',
                description: 'Designing and implementing bespoke AI architectures that align with your business objectives. Our solutions seamlessly integrate with your existing infrastructure while providing scalability for future growth.',
                link: '#/services/custom-ai-architecture'
              },
              {
                icon: <Cog className="h-8 w-8" />,
                title: 'Intelligent Process Automation',
                description: 'Transform manual workflows into intelligent, automated processes that learn and improve over time. Reduce operational costs while increasing accuracy and efficiency across your organization.',
                link: '#/services/process-automation'
              },
              {
                icon: <ChartBar className="h-8 w-8" />,
                title: 'Predictive & Prescriptive Analytics',
                description: 'Harness the power of advanced analytics to forecast trends and receive actionable recommendations. Turn your data into a strategic asset that drives informed decision-making.',
                link: '#/services/predictive-analytics'
              },
              {
                icon: <Gauge className="h-8 w-8" />,
                title: 'AI Dashboards & Decision Support Tools',
                description: 'Custom-built interfaces that visualize complex data and AI insights in real-time. Empower your team with intuitive tools that make AI-driven decision-making accessible and actionable.',
                link: '#/services/dashboards'
              },
              {
                icon: <Bot className="h-8 w-8" />,
                title: 'Natural Language & Chatbot Systems',
                description: 'Deploy sophisticated conversational AI solutions that understand and respond to natural language. Create meaningful interactions that enhance customer experience and streamline support operations.',
                link: '#/services/chatbot'
              },
              {
                icon: <GitMerge className="h-8 w-8" />,
                title: 'Legacy System AI Integration',
                description: 'Modernize existing systems with cutting-edge AI capabilities without disrupting core operations. Bridge the gap between legacy infrastructure and modern AI solutions seamlessly.',
                link: '#/services/legacy-integration'
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/40 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="relative">
                  <div className="inline-block p-3 rounded-lg bg-accent/5 text-accent mb-5 group-hover:scale-110 transition-transform backdrop-blur-md">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <a
                    href={service.link}
                    className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors group/link rounded-2xl"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="method" className="relative py-24 overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#77469b_12%,transparent_0),linear-gradient(-45deg,#77469b_12%,transparent_0)] bg-[length:60px_60px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proven Process. Precision Results.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-accent/20 -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {[
                {
                  icon: <Search className="h-8 w-8" />,
                  title: 'Discovery & Diagnosis',
                  description: 'Deep dive into your operations, data, and goals.',
                },
                {
                  icon: <Lightbulb className="h-8 w-8" />,
                  title: 'Strategic Design',
                  description: 'Craft AI system blueprints tailored to your objectives.',
                },
                {
                  icon: <Code className="h-8 w-8" />,
                  title: 'Model Development',
                  description: 'Custom AI built, trained, and validated for real-world use.',
                },
                {
                  icon: <Network className="h-8 w-8" />,
                  title: 'System Integration',
                  description: 'Seamless connection to your tech stack with minimal disruption.',
                },
                {
                  icon: <Rocket className="h-8 w-8" />,
                  title: 'Launch & Optimization',
                  description: 'Deployment, performance monitoring, and continuous refinement.',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Step Number - Moved above the card */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white text-xl font-bold shadow-[0_0_20px_rgba(82,165,118,0.5)]">
                      {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-primary-light/5 backdrop-blur-md rounded-xl p-8 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 relative z-10 border border-primary-light/10 group-hover:border-primary-light/20 group-hover:bg-primary-light/10">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 via-primary-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="text-accent mb-6 transform group-hover:scale-110 transition-transform">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-accent transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connection Arrow (except for last item) */}
                  {index < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-8 h-8 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#77469b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories in AI Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real businesses transforming their operations with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="h-6 w-6" />,
                industry: 'Logistics',
                company: 'GlobalFreight Solutions',
                result: 'Saved $1.2M/year through predictive routing',
                description: 'AI-powered route optimization and demand forecasting transformed delivery efficiency across 12 distribution centers.',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600',
                color: 'blue',
                link: '#/case-studies/globalfreight'
              },
              {
                icon: <Building2 className="h-6 w-6" />,
                industry: 'Finance',
                company: 'CapitalTech Bank',
                result: 'Reduce operational overhead by 42%',
                description: 'Automated risk assessment and fraud detection systems streamlined operations while improving accuracy.',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
                color: 'green',
                link: '#/case-studies/capitaltech'
              },
              {
                icon: <Stethoscope className="h-6 w-6" />,
                industry: 'Healthcare',
                company: 'MedFirst Analytics',
                result: 'Increased diagnostic accuracy by 18%',
                description: 'Machine learning models enhanced medical imaging analysis and patient outcome prediction.',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
                color: 'indigo',
                link: '#/case-studies/medfirst'
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-primary-light/5 backdrop-blur-md rounded-xl overflow-hidden shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 border border-primary-light/10"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.company}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/30 to-transparent backdrop-blur-[2px]" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-white mb-2">
                      <div className="p-2 rounded-lg bg-primary-light/10 backdrop-blur-sm border border-primary-light/20">
                        {study.icon}
                      </div>
                      <span className="font-medium">{study.industry}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                      {study.company}
                    </h3>
                  </div>
                </div>
                <div className="p-6 relative">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="p-1.5 rounded-lg bg-accent/10 backdrop-blur-sm">
                        <TrendingUp className="h-5 w-5 text-accent" />
                      </div>
                      <span className="font-semibold text-accent">{study.result}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{study.description}</p>
                    <a
                      href={study.link}
                      className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors group/link"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="relative py-24 overflow-hidden bg-[#fafafc]">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,#77469b_12%,transparent_0),linear-gradient(-45deg,#77469b_12%,transparent_0)] bg-[length:48px_48px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Insights. Strategy. Clarity.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Articles, whitepapers, and intelligence from the frontlines of AI implementation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: 'Why Custom AI Beats Off-the-Shelf Tools',
                description: 'Discover why tailored AI solutions deliver superior ROI and performance compared to generic alternatives.',
                readTime: '8 min read',
                category: 'Strategy',
                image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1600',
                link: '#/insights/custom-ai-vs-off-the-shelf'
              },
              {
                icon: <ChartBar className="h-6 w-6" />,
                title: 'The True Cost of Not Adopting AI in 2025',
                description: 'Analysis of market data revealing the growing competitive gap between AI adopters and traditional businesses.',
                readTime: '12 min read',
                category: 'Research',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
                link: '#/insights/true-cost-of-not-adopting-ai'
              },
              {
                icon: <Users2 className="h-6 w-6" />,
                title: 'How to Build a Culture of Intelligence',
                description: 'A framework for creating an organization that embraces and effectively utilizes AI technologies.',
                readTime: '10 min read',
                category: 'Leadership',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600',
                link: '#/insights/building-intelligence-culture'
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-accent">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-gray-500 mb-4">
                    {article.icon}
                    <span className="text-sm flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {article.description}
                  </p>
                  <a
                    href={article.link}
                    className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors group/link"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 overflow-hidden bg-[#f5f5f7]">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#77469b_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 relative"
            >
              {formSubmitted && (
                <div className="absolute top-4 right-4 left-4 bg-accent/90 text-white px-4 py-3 rounded-lg shadow-lg">
                  Thank you! We'll contact you shortly to schedule your discovery call.
                </div>
              )}

              <h2 className="text-3xl md: text-4xl font-bold text-gray-900 mb-4">
                Start Your AI Journey With Confidence
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're exploring or scaling — OAISIS is your partner in strategic AI transformation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    What are you looking to achieve with AI?
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your goals and challenges..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent/80 to-accent backdrop-blur-sm text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-accent hover:to-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transform hover:-translate-y-0.5 border border-accent/20 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_50%)] group-hover:scale-150 transition-transform duration-500 ease-out" />
                  <div className="relative flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Schedule a Discovery Call</span>
                  </div>
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center">
                <button
                  onClick={handleDownloadBrief}
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors group"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Our Executive Brief</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Security & Ethics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-accent mr-2" />
                  Enterprise-Grade Security
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Lock className="w-5 h-5" />,
                      title: 'SOC 2 Type II Certified',
                      description: 'Rigorous security controls and practices',
                    },
                    {
                      icon: <FileText className="w-5 h-5" />,
                      title: 'GDPR & CCPA Compliant',
                      description: 'Full data privacy regulation adherence',
                    },
                    {
                      icon: <Building className="w-5 h-5" />,
                      title: 'Enterprise Infrastructure',
                      description: 'Built on secure, scalable architecture',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-accent">{item.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Brain className="w-6 h-6 text-accent mr-2" />
                  Ethical AI Commitment
                </h3>
                <ul className="space-y-4">
                  {[
                    'Transparent AI decision-making processes',
                    'Regular ethical impact assessments',
                    'Bias detection and mitigation protocols',
                    'Human-centered AI development approach',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-accent text-lg">◆</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <Navbar scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/custom-ai-architecture" element={<CustomAIService />} />
        <Route path="/services/process-automation" element={<ProcessAutomationService />} />
        <Route path="/services/predictive-analytics" element={<PredictiveAnalyticsService />} />
        <Route path="/services/dashboards" element={<DashboardService />} />
        <Route path="/services/chatbot" element={<ChatbotService />} />
        <Route path="/services/legacy-integration" element={<LegacyIntegrationService />} />
        <Route path="/insights/custom-ai-vs-off-the-shelf" element={<CustomAIArticle />} />
        <Route path="/insights/true-cost-of-not-adopting-ai" element={<AICostArticle />} />
        <Route path="/insights/building-intelligence-culture" element={<IntelligenceCultureArticle />} />
        <Route path="/case-studies/globalfreight" element={<GlobalFreightCaseStudy />} />
        <Route path="/case-studies/capitaltech" element={<CapitalTechCaseStudy />} />
        <Route path="/case-studies/medfirst" element={<MedFirstCaseStudy />} />
      </Routes>
    </div>
  );
}

export default App;