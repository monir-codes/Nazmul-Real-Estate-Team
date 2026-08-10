import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
          <Link to="/" className="text-primary hover:text-accent transition-colors font-medium">Home</Link>
          <Link to="/buy" className="text-primary hover:text-accent transition-colors font-medium">Buy</Link>
          <Link to="/sell" className="text-primary hover:text-accent transition-colors font-medium">Sell</Link>
          <Link to="/listings" className="text-primary hover:text-accent transition-colors font-medium">Listings</Link>
          <Link to="/team" className="text-primary hover:text-accent transition-colors font-medium">Our Team</Link>
          <Link to="/areas" className="text-primary hover:text-accent transition-colors font-medium">Areas We Serve</Link>
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
      {isOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 z-50 border-t border-gray-100">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Home</Link>
            <Link to="/buy" onClick={() => setIsOpen(false)} className="text-lg font-medium">Buy</Link>
            <Link to="/sell" onClick={() => setIsOpen(false)} className="text-lg font-medium">Sell</Link>
            <Link to="/listings" onClick={() => setIsOpen(false)} className="text-lg font-medium">Listings</Link>
            <Link to="/team" onClick={() => setIsOpen(false)} className="text-lg font-medium">Our Team</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center mt-4">Let's Talk</Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
