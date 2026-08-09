import { motion } from 'framer-motion';

import FeaturedListings from '../components/home/FeaturedListings';
import BuyWithUs from '../components/home/BuyWithUs';
import SellWithUs from '../components/home/SellWithUs';
import WhyUs from '../components/home/WhyUs';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
        <div className="absolute inset-0 bg-[url('/hero_home.png')] bg-cover bg-center" />
        
        <div className="container-custom relative z-20 text-center flex flex-col items-center justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 backdrop-blur-md p-10 md:p-16 rounded-2xl border border-white/10 shadow-2xl max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-accent drop-shadow-xl leading-tight">
              Your Next Move <br />Starts Here.
            </h1>
            <p className="text-lg md:text-2xl mb-10 text-white drop-shadow-lg max-w-3xl mx-auto font-medium">
              Helping buyers and sellers navigate real estate with confidence, clarity, and a strategy built around their goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="btn-accent px-8 py-4 text-lg">Explore Properties</button>
              <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-md font-medium transition-colors hover:bg-white/30 text-lg">Sell Your Home</button>
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
