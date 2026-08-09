import { useState, useEffect } from 'react';
import { Search, MapPin, Home, DollarSign, Key, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import api from '../utils/api';

const Buy = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setPageData(res.data.buy);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) return <Loader />;
  if (!pageData) return <div className="pt-32 text-center text-red-500">Error loading page content.</div>;

  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title={`${pageData.title} | Nazmul Real Estate Team`}
        description={pageData.subtitle}
      />
      {/* Cinematic Hero */}
      <div className="bg-primary text-white h-[60vh] relative overflow-hidden flex flex-col justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 transform scale-105"
          style={{ backgroundImage: `url(${pageData.backgroundImage})`, backgroundAttachment: 'fixed' }}
        />
        {/* Sleek Left-to-Right Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
        
        <div className="container-custom relative z-20 pt-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-accent mb-6"
            />
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-2xl leading-tight"
            >
              {pageData.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md font-light leading-relaxed max-w-2xl"
            >
              {pageData.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <Link to="/listings" className="btn-accent text-lg px-8 py-4 shadow-xl hover:shadow-accent/20 transition-all hover:-translate-y-1 inline-block">
                Start Your Search
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">The Buying Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We've streamlined the journey to homeownership.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { icon: Search, title: "Consultation", desc: "We align with your vision, budget, and desired lifestyle." },
              { icon: MapPin, title: "Property Tours", desc: "Exclusive access to off-market and premium listings." },
              { icon: DollarSign, title: "Negotiation", desc: "Expert strategy to secure the best possible terms." },
              { icon: Key, title: "Closing", desc: "Seamless coordination through escrow to handing you the keys." }
            ].map((step, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-accent shadow-lg">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
