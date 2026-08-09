import { Link } from 'react-router-dom';
import { Award, Target, Users, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title="About Our Team | Nazmul Real Estate Team"
        description="Learn more about our award-winning real estate team, our values, and our commitment to helping you achieve your real estate goals."
      />
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80')] bg-cover bg-center opacity-30" />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80 z-10" />
        
        <div className="container-custom relative z-20 flex justify-center max-w-4xl mx-auto pt-10">
          <div className="bg-black/40 backdrop-blur-md p-10 md:p-16 rounded-2xl border border-white/10 shadow-2xl text-center w-full">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-accent drop-shadow-2xl">Our Story</h1>
            <p className="text-xl text-white drop-shadow-md font-medium">Dedicated to excellence, integrity, and achieving exceptional results for our clients.</p>
          </div>
        </div>
      </div>

      <div className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-2xl text-primary font-serif mb-8 leading-relaxed">
              At Nazmul Real Estate Team, we believe that buying or selling a home should be an exciting, empowering experience, not a stressful one.
            </p>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Approach</h3>
            <p className="mb-6">
              We have built our reputation on a foundation of unyielding integrity, deep market knowledge, and a commitment to personalized service. Every client is unique, and every transaction requires a bespoke strategy.
            </p>
            <p className="mb-10">
              Unlike generic brokerages, we operate as a tight-knit boutique team. When you hire us, you get the collective expertise of dedicated specialists working in harmony to secure the best possible outcome for you.
            </p>

            <h3 className="text-2xl font-bold text-primary mb-4">Why Clients Choose Us</h3>
            <ul className="list-disc pl-6 mb-10 space-y-2">
              <li><strong>Market Mastery:</strong> We analyze data daily to stay ahead of local trends.</li>
              <li><strong>Fierce Negotiation:</strong> We protect your equity and secure favorable terms.</li>
              <li><strong>Premium Marketing:</strong> Our listings stand out through high-end presentation.</li>
              <li><strong>Clear Communication:</strong> You will never be left wondering what happens next.</li>
            </ul>

            <div className="bg-surface p-8 rounded-xl text-center mt-12">
              <h4 className="text-xl font-bold text-primary mb-4">Ready to make a move?</h4>
              <div className="flex justify-center space-x-4">
                <Link to="/contact" className="btn-primary">Contact Us</Link>
                <Link to="/team" className="btn-secondary">Meet The Team</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
