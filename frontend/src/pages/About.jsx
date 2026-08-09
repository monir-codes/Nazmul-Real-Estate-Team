import { useState, useEffect } from 'react';
import { Award, Target, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import api from '../utils/api';

const About = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setPageData(res.data.about);
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

      {/* Content */}
      <div className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-lg transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
                alt="Our Team" 
                className="relative rounded-lg shadow-xl w-full h-[600px] object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">Redefining Real Estate Excellence</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over a decade of experience in the luxury real estate market, our team has built a reputation for uncompromising integrity, unparalleled market knowledge, and an unrelenting commitment to our clients.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that buying or selling a home is more than just a transaction—it's a life-changing experience. That's why we take a highly personalized approach, tailoring our strategies to meet your unique needs and goals.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">$500M+</div>
                  <div className="text-gray-600 font-medium">Sales Volume</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">15+</div>
                  <div className="text-gray-600 font-medium">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
