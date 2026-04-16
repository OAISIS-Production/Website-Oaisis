import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Glass from './components/ui/Glass';
import AmbientBlob from './components/ui/AmbientBlob';
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
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({ name: '', company: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
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

      {/* About Section — Tan frost glass on warm background */}
      <section id="about" className="relative py-24 overflow-hidden">
        <AmbientBlob color="tan" size={220} top="10%" right="10%" />
        <AmbientBlob color="green" size={160} bottom="15%" left="5%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[8.5px] font-semibold tracking-[2.5px] uppercase text-emerald mb-3">About OAISIS</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-brand-text mb-6" style={{ letterSpacing: '-0.3px' }}>
              We are your AI Transformation Partners
            </h2>
            <p className="text-base text-brand-text-sec max-w-3xl mx-auto leading-relaxed">
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
              <p className="text-[13px] text-brand-text-sec leading-[1.8]">
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
                  >
                    <Glass variant="tan" className="group hover:shadow-lg transition-all duration-300 !p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-emerald font-bold text-lg flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">◆</span>
                        <span className="text-[13px] text-brand-text-sec group-hover:text-brand-text transition-colors">{point}</span>
                      </div>
                    </Glass>
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
              <div className="aspect-square rounded-glass overflow-hidden shadow-2xl">
                <img
                  src="/assets/images/Data_Oaisis.jpeg"
                  alt="AI Innovation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 photo-overlay" />
                <div className="absolute inset-0 photo-vignette" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section — Green tinted glass cards */}
      <section id="services" className="relative py-24 overflow-hidden">
        <AmbientBlob color="emerald" size={200} top="5%" left="15%" />
        <AmbientBlob color="blue" size={160} bottom="10%" right="20%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[8.5px] font-semibold tracking-[2.5px] uppercase text-emerald mb-3">Solutions</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-brand-text mb-6" style={{ letterSpacing: '-0.3px' }}>
              Strategic AI Solutions Tailored to You
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Cpu className="h-7 w-7" />, title: 'Custom AI System Architecture', description: 'Designing and implementing bespoke AI architectures that align with your business objectives. Our solutions seamlessly integrate with your existing infrastructure while providing scalability for future growth.', link: '#/services/custom-ai-architecture' },
              { icon: <Cog className="h-7 w-7" />, title: 'Intelligent Process Automation', description: 'Transform manual workflows into intelligent, automated processes that learn and improve over time. Reduce operational costs while increasing accuracy and efficiency across your organization.', link: '#/services/process-automation' },
              { icon: <ChartBar className="h-7 w-7" />, title: 'Predictive & Prescriptive Analytics', description: 'Harness the power of advanced analytics to forecast trends and receive actionable recommendations. Turn your data into a strategic asset that drives informed decision-making.', link: '#/services/predictive-analytics' },
              { icon: <Gauge className="h-7 w-7" />, title: 'AI Dashboards & Decision Support Tools', description: 'Custom-built interfaces that visualize complex data and AI insights in real-time. Empower your team with intuitive tools that make AI-driven decision-making accessible and actionable.', link: '#/services/dashboards' },
              { icon: <Bot className="h-7 w-7" />, title: 'Natural Language & Chatbot Systems', description: 'Deploy sophisticated conversational AI solutions that understand and respond to natural language. Create meaningful interactions that enhance customer experience and streamline support operations.', link: '#/services/chatbot' },
              { icon: <GitMerge className="h-7 w-7" />, title: 'Legacy System AI Integration', description: 'Modernize existing systems with cutting-edge AI capabilities without disrupting core operations. Bridge the gap between legacy infrastructure and modern AI solutions seamlessly.', link: '#/services/legacy-integration' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Glass variant="green" className="group hover:shadow-lg transition-all duration-300 h-full">
                  <div className="inline-block p-3 rounded-glass bg-emerald/[0.08] text-emerald mb-5 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-semibold mb-4 text-brand-text">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-brand-text-sec leading-[1.8] mb-6">
                    {service.description}
                  </p>
                  <a href={service.link} className="inline-flex items-center text-emerald text-[13px] font-medium hover:text-emerald-deep transition-colors group/link">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Section — Blue tinted glass (premium feel) */}
      <section id="method" className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAF7F0 0%, #F5EFE0 50%, #EDE2CC 100%)' }}>
        <AmbientBlob color="blue" size={240} top="20%" left="5%" />
        <AmbientBlob color="tan" size={180} bottom="10%" right="10%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-[8.5px] font-semibold tracking-[2.5px] uppercase text-emerald mb-3">Our Process</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-brand-text mb-6" style={{ letterSpacing: '-0.3px' }}>
              Proven Process. Precision Results.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-sky/20 -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {[
                { icon: <Search className="h-7 w-7" />, title: 'Discovery & Diagnosis', description: 'Deep dive into your operations, data, and goals.' },
                { icon: <Lightbulb className="h-7 w-7" />, title: 'Strategic Design', description: 'Craft AI system blueprints tailored to your objectives.' },
                { icon: <Code className="h-7 w-7" />, title: 'Model Development', description: 'Custom AI built, trained, and validated for real-world use.' },
                { icon: <Network className="h-7 w-7" />, title: 'System Integration', description: 'Seamless connection to your tech stack with minimal disruption.' },
                { icon: <Rocket className="h-7 w-7" />, title: 'Launch & Optimization', description: 'Deployment, performance monitoring, and continuous refinement.' },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald text-white text-sm font-semibold shadow-lg" style={{ boxShadow: '0 0 20px rgba(26,107,74,0.3)' }}>
                      {index + 1}
                    </div>
                  </div>

                  <Glass variant="blue" className="group-hover:shadow-lg transition-all duration-300">
                    <div className="text-sky mb-5 transform group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <h3 className="text-base font-semibold mb-3 text-brand-text group-hover:text-emerald transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-brand-text-sec leading-[1.7]">
                      {step.description}
                    </p>
                  </Glass>

                  {index < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-sky/40" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section — Default glass on sand background */}
      <section id="case-studies" className="relative py-24 overflow-hidden">
        <AmbientBlob color="green" size={200} top="15%" right="5%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[8.5px] font-semibold tracking-[2.5px] uppercase text-emerald mb-3">Success Stories</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-brand-text mb-6" style={{ letterSpacing: '-0.3px' }}>
              Success Stories in AI Integration
            </h2>
            <p className="text-base text-brand-text-sec max-w-3xl mx-auto">
              Real results from real businesses transforming their operations with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Truck className="h-5 w-5" />, industry: 'Logistics', company: 'GlobalFreight Solutions', result: 'Saved $1.2M/year through predictive routing', description: 'AI-powered route optimization and demand forecasting transformed delivery efficiency across 12 distribution centers.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600', link: '#/case-studies/globalfreight' },
              { icon: <Building2 className="h-5 w-5" />, industry: 'Finance', company: 'CapitalTech Bank', result: 'Reduce operational overhead by 42%', description: 'Automated risk assessment and fraud detection systems streamlined operations while improving accuracy.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600', link: '#/case-studies/capitaltech' },
              { icon: <Stethoscope className="h-5 w-5" />, industry: 'Healthcare', company: 'MedFirst Analytics', result: 'Increased diagnostic accuracy by 18%', description: 'Machine learning models enhanced medical imaging analysis and patient outcome prediction.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600', link: '#/case-studies/medfirst' },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Glass className="!p-0 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={study.image} alt={study.company} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 photo-overlay" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 text-white mb-2">
                        <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                          {study.icon}
                        </div>
                        <span className="text-[13px] font-medium">{study.industry}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {study.company}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="p-1 rounded-lg bg-emerald/[0.08]">
                        <TrendingUp className="h-4 w-4 text-emerald" />
                      </div>
                      <span className="text-[13px] font-semibold text-emerald">{study.result}</span>
                    </div>
                    <p className="text-[13px] text-brand-text-sec leading-[1.7] mb-6">{study.description}</p>
                    <a href={study.link} className="inline-flex items-center text-emerald text-[13px] font-medium hover:text-emerald-deep transition-colors group/link">
                      <span>Read case study</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section — Tan frost glass */}
      <section id="insights" className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDFCF8 0%, #F5EFE0 50%, #EDE2CC 100%)' }}>
        <AmbientBlob color="tan" size={200} top="10%" left="10%" />
        <AmbientBlob color="blue" size={150} bottom="20%" right="15%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[8.5px] font-semibold tracking-[2.5px] uppercase text-emerald mb-3">Resources</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-brand-text mb-6" style={{ letterSpacing: '-0.3px' }}>
              Insights. Strategy. Clarity.
            </h2>
            <p className="text-base text-brand-text-sec max-w-3xl mx-auto">
              Articles, whitepapers, and intelligence from the frontlines of AI implementation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <BookOpen className="h-5 w-5" />, title: 'Why Custom AI Beats Off-the-Shelf Tools', description: 'Discover why tailored AI solutions deliver superior ROI and performance compared to generic alternatives.', readTime: '8 min read', category: 'Strategy', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1600', link: '#/insights/custom-ai-vs-off-the-shelf' },
              { icon: <ChartBar className="h-5 w-5" />, title: 'The True Cost of Not Adopting AI in 2025', description: 'Analysis of market data revealing the growing competitive gap between AI adopters and traditional businesses.', readTime: '12 min read', category: 'Research', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600', link: '#/insights/true-cost-of-not-adopting-ai' },
              { icon: <Users2 className="h-5 w-5" />, title: 'How to Build a Culture of Intelligence', description: 'A framework for creating an organization that embraces and effectively utilizes AI technologies.', readTime: '10 min read', category: 'Leadership', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600', link: '#/insights/building-intelligence-culture' },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Glass variant="tan" className="!p-0 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-[1.5px] uppercase bg-white/80 backdrop-blur-sm text-emerald">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-brand-text-muted mb-4">
                      {article.icon}
                      <span className="text-[10px] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-brand-text mb-3 group-hover:text-emerald transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[13px] text-brand-text-sec leading-[1.7] mb-6">
                      {article.description}
                    </p>
                    <a href={article.link} className="inline-flex items-center text-emerald text-[13px] font-medium hover:text-emerald-deep transition-colors group/link">
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section — Glow glass CTA */}
      <section id="contact" className="relative py-24 overflow-hidden">
        <AmbientBlob color="emerald" size={250} top="10%" right="20%" />
        <AmbientBlob color="blue" size={180} bottom="15%" left="10%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Glass variant="glow" className="relative">
                {formSubmitted && (
                  <div className="absolute top-4 right-4 left-4 bg-emerald text-white px-4 py-3 rounded-glass text-sm">
                    Thank you! We'll contact you shortly to schedule your discovery call.
                  </div>
                )}

                <p className="text-[8.5px] font-semibold tracking-[2.5px] uppercase text-emerald mb-3">Get Started</p>
                <h2 className="text-3xl md:text-4xl font-extralight text-brand-text mb-4" style={{ letterSpacing: '-0.3px' }}>
                  Start Your AI Journey With Confidence
                </h2>
                <p className="text-[13px] text-brand-text-sec mb-8 leading-[1.7]">
                  Whether you're exploring or scaling — OAISIS is your partner in strategic AI transformation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-2">Name</label>
                      <input type="text" id="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-glass text-[13px]" placeholder="John Smith" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-2">Company</label>
                      <input type="text" id="company" required value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 rounded-glass text-[13px]" placeholder="Acme Corp" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-2">Email</label>
                    <input type="email" id="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-glass text-[13px]" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-semibold uppercase tracking-[2.5px] text-emerald mb-2">What are you looking to achieve with AI?</label>
                    <textarea id="message" required value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-glass text-[13px] resize-none" placeholder="Tell us about your goals and challenges..." />
                  </div>
                  <button type="submit" className="w-full bg-emerald text-white px-8 py-4 rounded-glass text-[13px] font-medium hover:bg-emerald-deep transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Schedule a Discovery Call</span>
                    </div>
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center">
                  <button onClick={handleDownloadBrief} className="inline-flex items-center space-x-2 text-brand-text-muted hover:text-emerald transition-colors group text-[13px]">
                    <Download className="w-4 h-4" />
                    <span>Download Our Executive Brief</span>
                    <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Glass>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Glass variant="blue">
                <h3 className="text-xl font-extralight text-brand-text mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sky" />
                  Enterprise-Grade Security
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: <Lock className="w-4 h-4" />, title: 'SOC 2 Type II Certified', description: 'Rigorous security controls and practices' },
                    { icon: <FileText className="w-4 h-4" />, title: 'GDPR & CCPA Compliant', description: 'Full data privacy regulation adherence' },
                    { icon: <Building className="w-4 h-4" />, title: 'Enterprise Infrastructure', description: 'Built on secure, scalable architecture' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-sky">{item.icon}</div>
                      <div>
                        <h4 className="text-[13px] font-medium text-brand-text">{item.title}</h4>
                        <p className="text-[13px] text-brand-text-sec">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>

              <Glass variant="green">
                <h3 className="text-xl font-extralight text-brand-text mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald" />
                  Ethical AI Commitment
                </h3>
                <ul className="space-y-3">
                  {[
                    'Transparent AI decision-making processes',
                    'Regular ethical impact assessments',
                    'Bias detection and mitigation protocols',
                    'Human-centered AI development approach',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-emerald text-sm">◆</span>
                      <span className="text-[13px] text-brand-text-sec">{item}</span>
                    </li>
                  ))}
                </ul>
              </Glass>
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
    <div className="min-h-screen">
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
