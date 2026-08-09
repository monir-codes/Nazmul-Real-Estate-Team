import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Compass, ShieldCheck } from 'lucide-react';

const BuyWithUs = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
                alt="Happy family buying home" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-lg shadow-premium hidden md:block max-w-xs">
                <div className="text-4xl font-serif text-accent mb-2">"</div>
                <p className="text-gray-600 text-sm italic mb-4">The team made buying our first home an incredibly smooth and stress-free experience.</p>
                <div className="font-medium text-primary text-sm">- Sarah & James</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">Find the Right Home. Make the Right Move.</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We understand that buying a home is a monumental decision. Our buyer specialists are dedicated to guiding you through every step with absolute clarity and strategic advice.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full shadow-sm text-accent mr-4 flex-shrink-0">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Targeted Property Search</h4>
                  <p className="text-gray-500 text-sm">We don't just send MLS links. We curate properties that precisely match your lifestyle and financial goals.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full shadow-sm text-accent mr-4 flex-shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Private Tours & Insights</h4>
                  <p className="text-gray-500 text-sm">Tour homes with an expert who points out both the hidden potential and the red flags.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full shadow-sm text-accent mr-4 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Strategic Negotiation</h4>
                  <p className="text-gray-500 text-sm">We structure offers to win in competitive markets while protecting your best interests.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/buy" className="btn-primary text-center">Start Your Home Search</Link>
              <Link to="/contact" className="btn-secondary text-center">Talk to a Specialist</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuyWithUs;
