import { useState, useEffect } from 'react';
import { MapPin, Building, GraduationCap, Coffee, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import api from '../utils/api';

const AreasWeServe = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setPageData(res.data.areas);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading || !pageData) return <Loader />;

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <SEO 
        title={`${pageData.title} | Top Real Estate Agent in Your City`}
        description={pageData.subtitle}
      />
      
      {/* Cinematic Hero */}
      <div className="bg-primary text-white h-[50vh] relative overflow-hidden flex flex-col justify-center">
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
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="container-custom">
          {/* Areas Grid - Placeholder for real data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${1580659328221 + i}-a53ec8651817?w=800&q=80`} 
                  alt="Neighborhood" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">Neighborhood {i}</h3>
                  <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Discover luxury homes, top-rated schools, and vibrant community life.
                  </p>
                  
                  <div className="flex items-center text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    Explore Area <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreasWeServe;
