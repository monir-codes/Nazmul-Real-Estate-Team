import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const Footer = () => {
  const [globalSettings, setGlobalSettings] = useState({
    headerLinks: [],
    footerLinks: [],
    socialLinks: [],
    contactInfo: { phone: '', email: '', address: '' }
  });

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const res = await api.get('/settings/global');
        if (res.data) setGlobalSettings(res.data);
      } catch (err) {
        console.error("Failed to fetch global settings for footer", err);
      }
    };
    fetchGlobalSettings();
  }, []);

  const getIconForPlatform = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('facebook')) return <Facebook className="w-5 h-5" />;
    if (p.includes('instagram')) return <Instagram className="w-5 h-5" />;
    if (p.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
    if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-serif font-bold text-white tracking-tight block mb-6">
              Nazmul <span className="text-accent">Real Estate</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-sm">
              Helping buyers and sellers navigate real estate with confidence, clarity, and a strategy built around their goals.
            </p>
            
            {/* Dynamic Contact Info */}
            <div className="space-y-2 mb-6 text-gray-300 text-sm">
              {globalSettings.contactInfo?.phone && (
                <div className="flex items-center"><Phone className="w-4 h-4 mr-3 text-accent" /> {globalSettings.contactInfo.phone}</div>
              )}
              {globalSettings.contactInfo?.email && (
                <div className="flex items-center"><Mail className="w-4 h-4 mr-3 text-accent" /> {globalSettings.contactInfo.email}</div>
              )}
              {globalSettings.contactInfo?.address && (
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-accent" /> {globalSettings.contactInfo.address}</div>
              )}
            </div>

            {/* Dynamic Social Links */}
            <div className="flex space-x-4">
              {globalSettings.socialLinks && globalSettings.socialLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                  {getIconForPlatform(link.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Mapped from headerLinks to avoid redundancy) */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-gray-300">
              {globalSettings.headerLinks && globalSettings.headerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className="hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources / Legal (Mapped from footerLinks) */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Legal & Resources</h4>
            <ul className="space-y-4 text-gray-300">
              {globalSettings.footerLinks && globalSettings.footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className="hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Nazmul Real Estate Team. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {globalSettings.footerLinks && globalSettings.footerLinks.slice(0, 4).map((link, idx) => (
              <Link key={idx} to={link.url} className="hover:text-white transition-colors">{link.label}</Link>
            ))}
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
