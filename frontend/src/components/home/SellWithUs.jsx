import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Camera, Users } from 'lucide-react';

const SellWithUs = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-surface hidden lg:block z-0" />
      <div className="container-custom relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">Thinking About Selling?</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We maximize your property's value through strategic positioning, high-end presentation, and targeted marketing that reaches the right buyers.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-surface-dark p-3 rounded-full shadow-sm text-primary mr-4 flex-shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Strategic Pricing</h4>
                  <p className="text-gray-500 text-sm">Data-driven valuation to position your home competitively while maximizing your return on investment.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-surface-dark p-3 rounded-full shadow-sm text-primary mr-4 flex-shrink-0">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Premium Presentation</h4>
                  <p className="text-gray-500 text-sm">Professional photography, staging consultations, and immersive virtual tours that make your listing stand out.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-surface-dark p-3 rounded-full shadow-sm text-primary mr-4 flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Maximum Exposure</h4>
                  <p className="text-gray-500 text-sm">Targeted digital marketing campaigns, exclusive broker networks, and syndication across top real estate platforms.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/valuation" className="btn-primary text-center">Get Your Home Value</Link>
              <Link to="/contact" className="btn-secondary text-center">Talk to Our Team</Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" 
                alt="Beautiful home interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="font-serif text-2xl mb-2 text-accent">Sold over asking price</div>
                <p className="text-sm text-gray-200">Our targeted marketing approach resulted in multiple offers within the first weekend on the market.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SellWithUs;
