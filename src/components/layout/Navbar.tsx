import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 top-6">
      <nav className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 border-2 border-primary-light/20 backdrop-blur-lg ${
        scrolled ? 'bg-primary/30' : 'bg-transparent'
      }`}>
        <div className="px-6 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/images/logo.png" 
                alt="OAISIS Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="ml-2 text-2xl font-bold text-white tracking-wide">OAISIS</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              {[
                { label: 'About', id: 'about' },
                { label: 'Solutions', id: 'services' },
                { label: 'Process', id: 'method' },
                { label: 'Success Stories', id: 'case-studies' },
                { label: 'Resources', id: 'insights' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm tracking-wider font-semibold text-white hover:text-primary-light transition-colors relative group ${
                    isHomePage ? 'cursor-pointer' : ''
                  }`}
                >
                  {!isHomePage && (
                    <Link to={`/#${item.id}`} className="block">
                      {item.label}
                    </Link>
                  )}
                  {isHomePage && item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}