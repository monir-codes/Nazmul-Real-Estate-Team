import { Search, Compass, ShieldCheck, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Buy = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Expert Guidance For Buyers</h1>
          <p className="text-xl text-gray-300 mb-8">From finding the perfect neighborhood to negotiating the best terms, we are with you every step of the way.</p>
          <Link to="/listings" className="btn-accent text-lg">Start Your Search</Link>
        </div>
      </div>

      {/* Process */}
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-center text-primary mb-16">The Buying Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative border border-gray-100">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-gray-50">1</div>
              <Compass className="w-10 h-10 text-accent mx-auto mb-4 mt-4" />
              <h3 className="font-bold text-primary mb-2">Consultation</h3>
              <p className="text-gray-500 text-sm">We sit down to understand your goals, timeline, and exact property requirements.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative border border-gray-100">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-gray-50">2</div>
              <Search className="w-10 h-10 text-accent mx-auto mb-4 mt-4" />
              <h3 className="font-bold text-primary mb-2">Curated Search</h3>
              <p className="text-gray-500 text-sm">We provide access to off-market properties and targeted MLS listings matching your criteria.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative border border-gray-100">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-gray-50">3</div>
              <Map className="w-10 h-10 text-accent mx-auto mb-4 mt-4" />
              <h3 className="font-bold text-primary mb-2">Private Tours</h3>
              <p className="text-gray-500 text-sm">Schedule private showings where our experts point out property potential and hidden issues.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative border border-gray-100">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-gray-50">4</div>
              <ShieldCheck className="w-10 h-10 text-accent mx-auto mb-4 mt-4" />
              <h3 className="font-bold text-primary mb-2">Negotiation & Closing</h3>
              <p className="text-gray-500 text-sm">We strategically negotiate offers and guide you through inspections, appraisal, and closing.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="py-20 bg-primary text-center">
        <h2 className="text-3xl font-serif text-white mb-6">Ready to find your dream home?</h2>
        <Link to="/contact" className="btn-accent">Schedule a Buyer Consultation</Link>
      </div>
    </div>
  );
};

export default Buy;
