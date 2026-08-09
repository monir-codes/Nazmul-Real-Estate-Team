import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import FeaturedListings from '../components/home/FeaturedListings';
import BuyWithUs from '../components/home/BuyWithUs';
import SellWithUs from '../components/home/SellWithUs';
import WhyUs from '../components/home/WhyUs';

const DEFAULT_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  'https://images.unsplash.com/photo-1613490908679-fd36113c2300?w=1600&q=80'
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState(DEFAULT_HERO_IMAGES);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Slider */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImages[currentImageIndex]}')` }}
          />
        </AnimatePresence>

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80 z-10" />
        
        <div className="container-custom relative z-20 text-center flex flex-col items-center justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-accent drop-shadow-2xl leading-tight">
              Your Next Move <br />Starts Here.
            </h1>
            <p className="text-lg md:text-2xl mb-10 text-white drop-shadow-xl max-w-3xl mx-auto font-medium">
              Helping buyers and sellers navigate real estate with confidence, clarity, and a strategy built around their goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/listings" className="btn-accent px-8 py-4 text-lg">Explore Properties</Link>
              <Link to="/sell" className="bg-white/10 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-md font-medium transition-colors hover:bg-white/30 text-lg">Sell Your Home</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-surface py-12 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600 font-medium">Homes Sold</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-primary mb-2">12</div>
              <div className="text-gray-600 font-medium">Local Markets</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-primary mb-2">99%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedListings />
      <BuyWithUs />
      <SellWithUs />
      <WhyUs />
    </div>
  );
};

export default Home;
