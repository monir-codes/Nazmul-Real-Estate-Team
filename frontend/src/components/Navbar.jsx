import { Link, NavLink } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerLinks, setHeaderLinks] = useState([]);
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
            <NavLink 
              key={idx} 
              to={link.url} 
              className={({ isActive }) => 
                `transition-colors font-medium relative py-2 ${isActive ? 'text-accent' : 'text-primary hover:text-accent'}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-6 relative">
          <Link to="/contact" className="btn-primary">
            Let's Talk
          </Link>

          {/* User Portal */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 text-primary hover:text-accent transition-colors focus:outline-none"
              >
                <UserCircle className="w-6 h-6" />
                <span className="font-medium text-sm hidden xl:inline-block">{user.name.split(' ')[0]}</span>
              </button>
              
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-premium border border-gray-100 py-2 z-50"
                  >
                    <Link to="/listings" onClick={() => setShowProfileMenu(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors">
                      My Saved Homes
                    </Link>
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin/dashboard" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-accent transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <UserCircle className="w-4 h-4 mr-2" /> Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-accent transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <UserCircle className="w-4 h-4 mr-2" /> My Profile
                    </Link>
                    <button 
                      onClick={() => { logout(); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="flex items-center text-primary hover:text-accent transition-colors font-medium">
              <UserCircle className="w-5 h-5 mr-1.5" /> Sign In
            </Link>
          )}
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
                <NavLink 
                  key={idx} 
                  to={link.url} 
                  onClick={() => setIsOpen(false)} 
                  className={({ isActive }) => `text-lg font-medium ${isActive ? 'text-accent' : 'text-primary'}`}
                >
                  {link.label}
                </NavLink>
              ))}
              
              <div className="h-px bg-gray-100 w-full my-2"></div>
              
              {user ? (
                <>
                  <Link to="/listings" onClick={() => setIsOpen(false)} className="text-lg font-medium text-primary flex items-center">
                    <UserCircle className="w-5 h-5 mr-2" /> My Saved Homes
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-lg font-medium text-red-600 text-left flex items-center">
                    <LogOut className="w-5 h-5 mr-2" /> Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-primary flex items-center">
                  <UserCircle className="w-5 h-5 mr-2" /> Sign In / Register
                </Link>
              )}

              <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center mt-4">Let's Talk</Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
