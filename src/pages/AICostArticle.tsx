import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, TrendingDown, Users, Target, Shield, Brain, LineChart, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function AICostArticle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <Navbar scrolled={true} />
      
      <main className="pt-32 pb-24">
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-accent hover:text-accent-hover transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">
                Research
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                12 min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The True Cost of Not Adopting AI in 2025
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed">
                In 2025, artificial intelligence is no longer a futuristic buzzword—it's the bedrock of competitive business. From Fortune 500 companies to lean startups, AI is transforming operations, redefining customer experience, and accelerating innovation.
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
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
                alt="AI Business Impact"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <p className="text-gray-300 mb-8">
              Yet many organizations still hesitate. Some cite budget limitations. Others fear complexity or losing the "human touch." But inaction comes at a steep price.
            </p>
            <p className="text-gray-300 mb-8">
              The true cost of not adopting AI is more than inefficiency—it's irrelevance.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: <TrendingDown className="h-6 w-6" />,
                  title: "Wasted Time, Missed Opportunities",
                  description: "Every day without AI is a day of wasted productivity. Teams spend hours on tasks that competitors complete in minutes."
                },
                {
                  icon: <LineChart className="h-6 w-6" />,
                  title: "Lost Revenue, Rising Costs",
                  description: "Companies that fail to adapt spend more to do less—and leave money on the table every quarter."
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Talent Drain",
                  description: "Top talent seeks forward-thinking companies with AI-powered workplaces and smarter tools."
                },
                {
                  icon: <Target className="h-6 w-6" />,
                  title: "Missing Customer Expectations",
                  description: "Modern customers expect AI-driven experiences, personalization, and proactive service."
                }
              ].map((impact, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-6">
                  <div className="text-accent mb-4">{impact.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{impact.title}</h3>
                  <p className="text-gray-300">{impact.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              1. Wasted Time, Missed Opportunities
            </h2>
            <p className="text-gray-300 mb-4">
              Every day without AI is a day of wasted productivity. AI is now automating tasks like:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• 24/7 customer support through smart agents</li>
              <li className="text-gray-300">• Real-time reporting and forecasting</li>
              <li className="text-gray-300">• Marketing content generation and optimization</li>
            </ul>
            <p className="text-gray-300 mb-8">
              These tools free teams to focus on higher-value work—strategy, innovation, and human connection. Without AI, employees spend hours on tasks that competitors completed in minutes.
            </p>
            <p className="text-gray-300 mb-8">
              Delay costs you momentum, and in business, momentum is everything.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              2. Lost Revenue, Rising Operational Costs
            </h2>
            <p className="text-gray-300 mb-4">
              AI isn't just an efficiency tool—it's a profit engine. In 2025:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• Retailers use AI to predict demand and personalize offers</li>
              <li className="text-gray-300">• Financial firms deploy AI for fraud detection and dynamic pricing</li>
              <li className="text-gray-300">• Healthcare providers rely on AI for diagnostics and workflow automation</li>
            </ul>
            <p className="text-gray-300 mb-8">
              Not adopting AI is like trying to win the race with your foot on the brake.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              3. Talent Drain and Culture Decay
            </h2>
            <p className="text-gray-300 mb-8">
              Top talent wants to work at forward-thinking companies. AI-powered workplaces attract the best minds by offering smarter tools, faster workflows, and future-facing missions.
            </p>
            <p className="text-gray-300 mb-8">
              If your business clings to outdated processes, expect higher turnover, difficulty hiring, and disengaged employees.
            </p>
            <p className="text-gray-300 mb-8">
              The smartest people won't stay where the tools—and the vision—feel obsolete.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              4. Falling Short of Customer Expectations
            </h2>
            <p className="text-gray-300 mb-4">
              Customers now expect seamless, AI-driven experiences:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• Personalized recommendations</li>
              <li className="text-gray-300">• Instant, intelligent support</li>
              <li className="text-gray-300">• Predictive, proactive service</li>
            </ul>
            <p className="text-gray-300 mb-8">
              Companies leveraging AI meet people where they are—before they even know what they need. Those who don't? They frustrate, lose trust, and fall behind.
            </p>
            <p className="text-gray-300 mb-8">
              In 2025, customer loyalty is earned through AI-powered precision.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              5. Innovation Paralysis
            </h2>
            <p className="text-gray-300 mb-8">
              AI doesn't just automate—it amplifies innovation. It sifts through complex data, spots patterns, and fuels smarter decisions.
            </p>
            <p className="text-gray-300 mb-8">
              Without AI, organizations are slower to pivot, less informed, and more reactive. While others test ideas in hours, non-adopters are still in committee meetings.
            </p>
            <p className="text-gray-300 mb-8">
              Without AI, your R&D is running on fumes.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              6. Increased Risk and Vulnerability
            </h2>
            <p className="text-gray-300 mb-4">
              AI now plays a key role in:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• Real-time cybersecurity threat detection</li>
              <li className="text-gray-300">• Automated compliance monitoring</li>
              <li className="text-gray-300">• Fraud and anomaly detection</li>
            </ul>
            <p className="text-gray-300 mb-8">
              Without it, businesses are exposed to greater security risks, regulatory fines, and data mishandling.
            </p>
            <p className="text-gray-300 mb-8">
              In today's digital landscape, AI is no longer optional protection—it's essential armor.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              7. Your Brand Reputation at Stake
            </h2>
            <p className="text-gray-300 mb-4">
              Inaction sends a signal: "We're behind the curve." It affects:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• How customers perceive your relevance</li>
              <li className="text-gray-300">• Whether investors see you as future-proof</li>
              <li className="text-gray-300">• How talent assesses your leadership</li>
            </ul>
            <p className="text-gray-300 mb-8">
              Meanwhile, AI adopters are building prestige—and market share—by leading the narrative.
            </p>
            <p className="text-gray-300 mb-8">
              Standing still is a loud statement. And not the one you want to make.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              Conclusion: Inaction is the Costliest Move of All
            </h2>
            <p className="text-gray-300 mb-8">
              The choice not to adopt AI isn't neutral—it's a decision with compounding consequences. It affects your revenue, efficiency, people, customers, and brand.
            </p>
            <p className="text-gray-300 mb-8">
              You don't need to overhaul everything overnight. But you do need to start.
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                What You Can Do Right Now:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Audit your bottlenecks: Where can AI save time or money?</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Educate your leaders: Bring in insights from those leading the change.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Start small: One pilot project can create momentum.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Invest strategically: Custom AI pays dividends that off-the-shelf tools rarely do.</span>
                </li>
              </ul>
            </div>

            <p className="text-xl text-gray-300 mb-8 font-semibold">
              In 2025, the risk isn't AI taking your job. It's you not using AI—and losing your edge.
            </p>
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
              Don't Let Your Business Fall Behind
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how AI can transform your operations and secure your competitive edge.
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