import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleQuickLinkClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-primary-light/20 text-white py-12 bg-gradient-to-br from-primary via-secondary to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold">Optimized AI Systems Integrated Solutions</span>
            </div>
            <p className="text-gray-400">Building the bridge that leads businesses into the Age of Intelligence</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  to="/#about" 
                  onClick={() => handleQuickLinkClick('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/#services" 
                  onClick={() => handleQuickLinkClick('services')}
                  className="hover:text-white transition-colors"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link 
                  to="/#method" 
                  onClick={() => handleQuickLinkClick('method')}
                  className="hover:text-white transition-colors"
                >
                  Process
                </Link>
              </li>
              <li>
                <Link 
                  to="/#case-studies" 
                  onClick={() => handleQuickLinkClick('case-studies')}
                  className="hover:text-white transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/#insights" 
                  onClick={() => handleQuickLinkClick('insights')}
                  className="hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/#contact" 
                  onClick={() => handleQuickLinkClick('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="text-gray-400 mb-8">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                mail@openoaisis.com
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with AI trends</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-secondary border border-primary-light/20 text-white placeholder-gray-400"
                />
                <button className="bg-accent px-4 py-2 rounded-r-lg hover:bg-accent-hover transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-light/20 text-center text-gray-400">
          <p>&copy; 2025 OAISIS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}