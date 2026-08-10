import { Award, Target, MessageSquare, Handshake, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const REASONS = [
  {
    icon: <Target className="w-8 h-8 text-accent" />,
    title: 'Local Expertise',
    description: 'Deep, nuanced understanding of the local market trends, neighborhoods, and hidden opportunities.'
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-accent" />,
    title: 'Strategic Guidance',
    description: 'Clear, objective advice throughout every step of the transaction, ensuring you make informed decisions.'
  },
  {
    icon: <Handshake className="w-8 h-8 text-accent" />,
    title: 'Strong Negotiation',
    description: 'Fierce advocacy and professional representation to secure the best terms from offer to closing.'
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-accent" />,
    title: 'Modern Marketing',
    description: 'High-quality digital presentation and targeted marketing that reaches the right audience.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const WhyUs = () => {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-custom">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-serif font-bold mb-4">Why Choose Nazmul Real Estate</motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
            We don't just facilitate transactions; we build relationships and deliver results through a commitment to excellence and integrity.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 p-8 rounded-lg hover:bg-white/10 transition-colors shadow-lg hover:shadow-2xl"
            >
              <div className="mb-6">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{reason.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
