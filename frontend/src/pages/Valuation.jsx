import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, Calculator, MapPin } from 'lucide-react';

const Valuation = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    name: '',
    email: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally we'd send to backend here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-24 min-h-[80vh] flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-xl shadow-premium text-center max-w-md w-full mx-4"
        >
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Request Received!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name || 'there'}. Our experts are analyzing the data for your property at {formData.address}. We will send your comprehensive home valuation report shortly.
          </p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="btn-primary w-full"
          >
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">What's Your Home Worth?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get a professional, data-driven estimate of your home's current market value.</p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Form */}
          <div className="md:w-2/3 bg-white p-8 rounded-xl shadow-premium">
            <h3 className="text-2xl font-bold text-primary mb-6">Property Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input 
                    required
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none transition-shadow"
                    placeholder="123 Main St"
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input 
                    required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    onChange={e => setFormData({...formData, zip: e.target.value})}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-primary pt-6 mb-2 border-t border-gray-100">Contact Info</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    required type="email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    required type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="btn-accent w-full text-lg mt-4">
                Get My Home Value
              </button>
            </form>
          </div>

          {/* Side Info */}
          <div className="md:w-1/3 space-y-8">
            <div className="bg-primary text-white p-6 rounded-xl">
              <DollarSign className="w-10 h-10 text-accent mb-4" />
              <h4 className="text-xl font-bold mb-2">Accurate Pricing</h4>
              <p className="text-gray-300 text-sm">We combine local market data with expert analysis, not just an automated algorithm.</p>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-gray-200">
              <Calculator className="w-10 h-10 text-primary mb-4" />
              <h4 className="text-xl font-bold text-primary mb-2">Strategic ROI</h4>
              <p className="text-gray-600 text-sm">Discover which minor improvements could yield the highest return before you list.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valuation;
