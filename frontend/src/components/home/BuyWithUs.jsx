import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Compass, ShieldCheck } from 'lucide-react';

const BuyWithUs = ({ content }) => {
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="lg:w-1/2"
          >
            <motion.h2 variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="text-4xl font-serif font-bold text-primary mb-6">
              {content?.title || 'Buy With Confidence'}
            </motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="text-gray-600 mb-8 text-lg leading-relaxed">
              {content?.subtitle || 'Our proven framework for finding and securing your dream home.'}
            </motion.p>
            
            <div className="space-y-6 mb-10">
              {content?.steps?.length > 0 ? (
                content.steps.map((step, idx) => (
                  <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm text-accent mr-4 flex-shrink-0">
                      {idx === 0 ? <Search className="w-6 h-6" /> : idx === 1 ? <Compass className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">{step.title}</h4>
                      <p className="text-gray-500 text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))
              ) : null}
            </div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/buy" className="btn-primary text-center">Start Your Home Search</Link>
              <Link to="/contact" className="btn-secondary text-center">Talk to a Specialist</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuyWithUs;
