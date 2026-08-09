import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-serif font-bold text-white tracking-tight block mb-6">
              Nazmul <span className="text-accent">Real Estate</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-sm">
              Helping buyers and sellers navigate real estate with confidence, clarity, and a strategy built around their goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Explore</h4>
            <ul className="space-y-4 text-gray-300">
              <li><Link to="/buy" className="hover:text-accent transition-colors">Buy a Home</Link></li>
              <li><Link to="/listings" className="hover:text-accent transition-colors">View Listings</Link></li>
              <li><Link to="/sell" className="hover:text-accent transition-colors">Sell a Home</Link></li>
              <li><Link to="/areas" className="hover:text-accent transition-colors">Areas We Serve</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-gray-300">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-accent transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Resources</h4>
            <ul className="space-y-4 text-gray-300">
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/buyer-guide" className="hover:text-accent transition-colors">Buyer Guide</Link></li>
              <li><Link to="/seller-guide" className="hover:text-accent transition-colors">Seller Guide</Link></li>
              <li><Link to="/calculator" className="hover:text-accent transition-colors">Mortgage Calculator</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Nazmul Real Estate Team. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link to="/fair-housing" className="hover:text-white transition-colors">Fair Housing</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500 flex flex-col items-center justify-center">
          <p className="max-w-3xl">
            Nazmul Real Estate Team is a licensed real estate team. Equal Housing Opportunity.
            Information deemed reliable but not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
