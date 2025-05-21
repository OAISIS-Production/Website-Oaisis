import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Brain, Users, Target, Search, Zap, MessageSquare, LineChart, BookOpen, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function IntelligenceCultureArticle() {
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
                Leadership
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                10 min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How to Create a Culture of Intelligence
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed">
                Unlocking the Collective Brilliance of Your Organization
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
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600"
                alt="Building Intelligence Culture"
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
              In today's fast-moving, information-rich, and disruption-heavy world, intelligence isn't just an individual trait—it's an organizational imperative.
            </p>
            <p className="text-gray-300 mb-8">
              Businesses that thrive in 2025 and beyond will not simply be the fastest or most efficient. They'll be the most intelligent—able to sense, adapt, learn, and evolve continuously through the collective brainpower of their people, systems, and technologies.
            </p>
            <p className="text-gray-300 mb-8">
              But intelligence doesn't just happen. It's cultivated. It's woven into the culture.
            </p>
            <p className="text-gray-300 mb-8">
              Creating a culture of intelligence means embedding curiosity, data-driven thinking, and adaptive learning into the DNA of your organization. It's about more than hiring smart people—it's about creating the conditions where smart thinking thrives at every level.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">
              1. Redefine Intelligence: From Individual Genius to Collective Learning
            </h2>
            <p className="text-gray-300 mb-8">
              The first step is to shift your definition of intelligence. In most organizations, intelligence is still viewed as a function of individual capability—credentials, titles, experience, raw IQ.
            </p>
            <p className="text-gray-300 mb-4">
              But in high-performing cultures, intelligence is collective. It shows up in:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• How fast teams learn and apply new knowledge</li>
              <li className="text-gray-300">• How decisions are made (and improved over time)</li>
              <li className="text-gray-300">• How well insights are shared across departments</li>
              <li className="text-gray-300">• How open people are to challenge, feedback, and change</li>
            </ul>
            <p className="text-gray-300 mb-8">
              True intelligence isn't just what you know—it's how effectively your organization thinks together.
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Reward team-based innovation, not just individual performance.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Recognize people who elevate others' thinking, not just those who make the most noise.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              2. Make Curiosity a Core Competency
            </h2>
            <p className="text-gray-300 mb-8">
              Curiosity is the engine of intelligence. It fuels exploration, discovery, and problem-solving. Yet in many organizations, it's inadvertently suppressed—by rigid processes, fear of failure, or a culture that values execution over exploration.
            </p>
            <p className="text-gray-300 mb-8">
              To create a culture of intelligence, curiosity must be safe, celebrated, and systematized.
            </p>
            <p className="text-gray-300 mb-4">
              Encourage questions like:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• "What are we missing?"</li>
              <li className="text-gray-300">• "Why has it always been done this way?"</li>
              <li className="text-gray-300">• "What does the data actually say?"</li>
              <li className="text-gray-300">• "Is there a smarter, simpler way?"</li>
            </ul>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Make space in meetings for inquiry, not just updates.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Celebrate intelligent questions—even when they don't lead to immediate answers.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Provide time and budget for exploratory thinking, cross-training, or idea labs.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              3. Data-Literacy for All, Not Just Analysts
            </h2>
            <p className="text-gray-300 mb-8">
              In a culture of intelligence, everyone—not just the data team—knows how to ask good questions of data, interpret results, and make informed decisions.
            </p>
            <p className="text-gray-300 mb-8">
              This doesn't mean everyone needs to learn Python or SQL. It means making data approachable, relevant, and embedded into everyday workflows.
            </p>
            <p className="text-gray-300 mb-8">
              Smart organizations treat data not as a tool, but as a language.
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Offer data-literacy training across departments.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Ensure dashboards and reports are user-friendly and contextualized.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Encourage teams to bring data to support proposals, not just opinions.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              4. Flatten the Decision-Making Hierarchy
            </h2>
            <p className="text-gray-300 mb-8">
              If intelligence gets bottlenecked at the top, your organization is operating at a fraction of its potential.
            </p>
            <p className="text-gray-300 mb-8">
              A true culture of intelligence distributes decision-making power. It empowers frontline employees to act on what they know. It builds trust in local insight and encourages proactive problem-solving.
            </p>
            <p className="text-gray-300 mb-8">
              The goal is not just to make better decisions—it's to make them faster, closer to the ground, and with greater accountability.
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Push authority downward with clear boundaries and smart guardrails.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Encourage teams to experiment, test, and iterate—without needing endless approvals.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Treat "mistakes made in learning" differently than negligence.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              5. Turn Feedback Into a Cultural Superpower
            </h2>
            <p className="text-gray-300 mb-8">
              Feedback is the nervous system of a culture of intelligence. It's how teams grow sharper, decisions improve, and blind spots are revealed.
            </p>
            <p className="text-gray-300 mb-8">
              But most organizations treat feedback as a once-a-year HR function, not a daily tool for growth.
            </p>
            <p className="text-gray-300 mb-8">
              Intelligent cultures normalize feedback in all directions—up, down, and sideways. They value it as an act of care, not criticism.
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Train teams in giving and receiving feedback constructively.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Build feedback into meetings, retrospectives, and 1-on-1s.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Recognize and reward people who model feedback humility and responsiveness.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              6. Embed Learning into the Rhythm of Work
            </h2>
            <p className="text-gray-300 mb-8">
              A learning organization doesn't just send employees to occasional training—it embeds learning into the heartbeat of the business.
            </p>
            <p className="text-gray-300 mb-4">
              This means:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-300">• Capturing lessons from every project</li>
              <li className="text-gray-300">• Running debriefs not just on failures, but successes</li>
              <li className="text-gray-300">• Encouraging peer-to-peer learning</li>
              <li className="text-gray-300">• Giving space for reflection, not just production</li>
            </ul>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Implement "learning loops" after key initiatives.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Create internal knowledge-sharing sessions (lightning talks, lunch & learns, etc.).</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Curate ongoing learning paths tailored to individual growth and business goals.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              7. Use Technology to Augment Human Thinking, Not Replace It
            </h2>
            <p className="text-gray-300 mb-8">
              Smart tools don't make a culture intelligent—how they're used does.
            </p>
            <p className="text-gray-300 mb-8">
              AI, automation, and analytics can supercharge human potential—but only if paired with thoughtful leadership and ethical frameworks.
            </p>
            <p className="text-gray-300 mb-8">
              A culture of intelligence embraces technology as a thinking partner, not a threat or a crutch.
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Introduce AI tools as collaborators—supporting creativity, insight, and decision-making.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Help teams learn how to think with AI, not just use it.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Establish ethical guardrails for data and machine-assisted decisions.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              8. Hire (and Promote) for Learning Agility
            </h2>
            <p className="text-gray-300 mb-8">
              Resumes and experience still matter—but in a fast-changing world, the ability to learn, adapt, and evolve matters more.
            </p>
            <p className="text-gray-300 mb-8">
              Organizations that cultivate intelligence prioritize learning agility over static expertise. They seek people who can unlearn, reframe, and grow with new challenges.
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Action:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Revise job descriptions to emphasize curiosity, learning speed, and collaboration.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>During interviews, ask how candidates have adapted to change, explored new ideas, or challenged assumptions.</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <span className="text-accent mt-1">◆</span>
                  <span>Promote those who create smarter environments—not just personal wins.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              Conclusion: Intelligence Is Your Competitive Advantage
            </h2>
            <p className="text-gray-300 mb-8">
              In a world of rapid change and complexity, your smartest investment isn't in just tools, systems, or strategies—it's in the intelligence of your culture.
            </p>
            <p className="text-gray-300 mb-8">
              A culture of intelligence is self-correcting, opportunity-seeking, and resilient. It adapts faster, learns deeper, and builds stronger connections between people, purpose, and possibility.
            </p>
            <p className="text-gray-300 mb-8">
              And most importantly—it scales. Because when everyone is empowered to think, question, learn, and contribute—you unlock the full brilliance of your organization.
            </p>
            <p className="text-xl text-gray-300 mb-8 font-semibold">
              The future belongs to intelligent cultures. Will yours be one of them?
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
              Ready to Transform Your Organization's Culture?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you build a culture of intelligence that drives innovation and growth.
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