import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, TrendingUp, Home, ArrowRight, Building, Trees, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import PageError from '../components/PageError';
import api from '../utils/api';

const defaultData = {
  title: 'Areas We Serve',
  subtitle: 'Deep local expertise across the most sought-after neighborhoods. We know the streets, the schools, and the hidden opportunities.',
  backgroundImage: 'https://images.unsplash.com/photo-1580659328221-a53ec8651817?w=1600&q=80'
};

const AreasWeServe = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data && res.data.areas) {
          setPageData(res.data.areas);
        } else {
          setPageData(defaultData);
        }
        setLoading(false);
      } catch (err) {
        console.error("API failed, using local fallback", err);
        setPageData(defaultData);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) return <Loader />;
  if (!pageData || hasError) return <PageError message="Unable to load the Areas We Serve page." />;

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <SEO 
        title={`${pageData.title} | Nazmul Real Estate Team`}
        description={pageData.subtitle}
      />
      
      {/* Cinematic Hero */}
      <div className="bg-primary text-white min-h-[65vh] relative overflow-hidden flex flex-col justify-center">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${pageData.backgroundImage})`, y, scale: 1.15 }}
        />
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
              className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 text-white drop-shadow-2xl leading-tight"
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
            {[
              "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80",
              "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
              "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
              "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80",
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
              "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80"
            ].map((imgUrl, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={imgUrl} 
                  alt={`Neighborhood ${i + 1}`} 
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
