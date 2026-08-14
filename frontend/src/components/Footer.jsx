import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const Footer = () => {
const defaultSettings = {
    headerLinks: [
      { label: 'Home', url: '/' },
      { label: 'Buy', url: '/buy' },
      { label: 'Sell', url: '/sell' },
      { label: 'Listings', url: '/listings' },
      { label: 'Our Team', url: '/team' },
      { label: 'Areas We Serve', url: '/areas' }
    ],
    footerLinks: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Contact', url: '/contact' }
    ],
    socialLinks: [],
    contactInfo: { phone: '(555) 123-4567', email: 'contact@nazmulrealestate.com', address: '123 Real Estate Blvd, Suite 100' }
  };

  const [globalSettings, setGlobalSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const res = await api.get('/settings/global');
        if (res.data) {
          setGlobalSettings({
            ...defaultSettings,
            ...res.data,
            contactInfo: { ...defaultSettings.contactInfo, ...(res.data.contactInfo || {}) }
          });
        }
      } catch (err) {
        console.error("Failed to fetch global settings for footer, using fallback", err);
      }
    };
    fetchGlobalSettings();
  }, []);

  const getIconForPlatform = (platform) => {
    const plat = platform.toLowerCase();
    if (plat.includes('facebook')) return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
    if (plat.includes('youtube')) return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.082 0 12 0 12s0 3.918.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.918 24 12 24 12s0-3.918-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
    if (plat.includes('linkedin')) return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
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
