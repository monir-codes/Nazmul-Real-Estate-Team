import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerLinks, setHeaderLinks] = useState([]);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const res = await api.get('/settings/global');
        if (res.data && res.data.headerLinks) {
          setHeaderLinks(res.data.headerLinks);
        }
      } catch (err) {
        console.error("Failed to fetch header links", err);
        // Fallback
        setHeaderLinks([
          { label: 'Home', url: '/' },
          { label: 'Buy', url: '/buy' },
          { label: 'Sell', url: '/sell' },
          { label: 'Listings', url: '/listings' },
          { label: 'Our Team', url: '/team' },
          { label: 'Areas We Serve', url: '/areas' }
        ]);
      }
    };
    fetchGlobalSettings();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'}`}>
      <div className="container-custom mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold text-primary tracking-tight">
          Nazmul <span className="text-accent">Real Estate</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {headerLinks.map((link, idx) => (
            <Link key={idx} to={link.url} className="text-primary hover:text-accent transition-colors font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="text-primary hover:text-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/contact" className="btn-primary">
            Let's Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/20 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 z-50 border-t border-gray-100"
            >
              {headerLinks.map((link, idx) => (
                <Link key={idx} to={link.url} onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center mt-4">Let's Talk</Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
