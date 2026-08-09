import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Camera, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import api from '../utils/api';

const Sell = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setPageData(res.data.sell);
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
    <div className="pt-24 min-h-screen bg-gray-50">
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
              <Link to="/valuation" className="btn-accent text-lg px-8 py-4 shadow-xl hover:shadow-accent/20 transition-all hover:-translate-y-1 inline-block">
                Get A Home Valuation
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marketing Strategy */}
      <div className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">Our Marketing Strategy</h2>
              <p className="text-lg text-gray-600 mb-8">
                We don't just list homes; we launch them. Our comprehensive marketing strategy ensures your property gets maximum exposure to the right buyers.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Camera, title: "Professional Media", desc: "High-end photography, cinematic video tours, and drone footage." },
                  { icon: Target, title: "Targeted Advertising", desc: "Strategic digital campaigns reaching qualified buyers globally." },
                  { icon: Users, title: "Exclusive Network", desc: "Direct access to our private network of high-net-worth individuals." },
                  { icon: TrendingUp, title: "Data-Driven Pricing", desc: "Advanced analytics to position your home perfectly in the market." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-accent">
                        <item.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556156653-e5a7c69cc263?w=1200&q=80" 
                alt="Marketing Strategy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
