import { TrendingUp, DollarSign, Camera, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Sell = () => {
  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title="Sell Your Home | Maximize Value | Nazmul Real Estate"
        description="Sell your home for top dollar with data-driven pricing, premium presentation, and aggressive marketing."
      />
      {/* Hero */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80')] bg-cover bg-center opacity-40" />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80 z-10" />
        
        <div className="container-custom relative z-20 flex justify-center max-w-5xl mx-auto pt-10">
          <div className="bg-black/40 backdrop-blur-md p-10 md:p-16 rounded-2xl border border-white/10 shadow-2xl text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-accent drop-shadow-2xl">Maximize Your Home's Value</h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md font-medium">We use data-driven pricing, premium presentation, and aggressive marketing to sell your home for top dollar.</p>
            <Link to="/valuation" className="btn-accent text-lg">Get A Home Valuation</Link>
          </div>
        </div>
      </div>

      {/* Selling Strategy */}
      <div className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Selling Strategy</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Selling a home requires more than just putting a sign in the yard. It requires a tailored strategy designed to capture attention and create competitive bidding.
              </p>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="mr-4 mt-1 bg-surface-dark p-2 rounded text-primary"><Target className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Targeted Audience</h4>
                    <p className="text-gray-500 text-sm">We identify who the most likely buyer is for your home and target our marketing directly to them.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 mt-1 bg-surface-dark p-2 rounded text-primary"><Camera className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">High-End Presentation</h4>
                    <p className="text-gray-500 text-sm">Professional photography, 3D tours, and staging advice ensure your home looks its absolute best.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 mt-1 bg-surface-dark p-2 rounded text-primary"><Users className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Massive Exposure</h4>
                    <p className="text-gray-500 text-sm">Your listing is syndicated globally and pushed via targeted social media campaigns.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 mt-1 bg-surface-dark p-2 rounded text-primary"><TrendingUp className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fierce Negotiation</h4>
                    <p className="text-gray-500 text-sm">We negotiate aggressively to protect your equity and secure favorable terms.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1560518883-b4190ce4e1aa?w=800&q=80" alt="Real Estate Marketing" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
