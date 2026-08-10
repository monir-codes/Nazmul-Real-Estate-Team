import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const SellWithUs = ({ content }) => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-surface hidden lg:block z-0" />
      <div className="container-custom relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="lg:w-1/2"
          >
            <motion.h2 variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="text-4xl font-serif font-bold text-white mb-6">
              {content?.title || 'Sell For Top Dollar'}
            </motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="text-gray-300 mb-8 text-lg leading-relaxed">
              {content?.subtitle || 'A strategic, data-driven approach to maximizing your property value.'}
            </motion.p>
            
            <div className="space-y-4 mb-10">
              {content?.points?.length > 0 ? (
                content.points.map((point, index) => (
                  <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-4 flex-shrink-0" />
                    <span className="text-gray-200">{point}</span>
                  </motion.div>
                ))
              ) : null}
            </div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/valuation" className="btn-primary text-center">Get Your Home Value</Link>
              <Link to="/contact" className="btn-secondary text-center">Talk to Our Team</Link>
            </motion.div>
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
