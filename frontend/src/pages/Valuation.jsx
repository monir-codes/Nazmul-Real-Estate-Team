import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, Calculator, MapPin, AlertCircle, User, Mail, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import api from '../utils/api';

const Valuation = () => {
  const formRef = useRef();
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    let dbSuccess = false;
    try {
      // 1. Save lead to DB via backend API
      await api.post('/leads', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: 'Valuation',
        propertyAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        message: `Requested a Home Valuation for: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`
      });
      dbSuccess = true;
    } catch (dbErr) {
      console.warn('DB save failed (will still try email):', dbErr);
    }

    try {
      // 2. Send email notification via EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        message: `Home Valuation Request for: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        to_name: 'Nazmul Real Estate Team'
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_placeholder'
      );
      setSubmitted(true);
    } catch (emailErr) {
      console.error('EmailJS failed:', emailErr);
      if (dbSuccess) {
        setSubmitted(true);
      } else {
        setError('We couldn\'t process your request right now. Please try again later or contact us directly.');
      }
    } finally {
      setSubmitting(false);
    }
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
      <SEO 
        title="Free Home Valuation | Nazmul Real Estate Team"
        description="Find out exactly what your home is worth with our professional, data-driven real estate valuation services."
      />
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">What's Your Home Worth?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get a professional, data-driven estimate of your home's current market value.</p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Form */}
          <div className="md:w-2/3 bg-white p-8 rounded-xl shadow-premium">
            <h3 className="text-2xl font-bold text-primary mb-6">Property Details</h3>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input 
                    required
                    type="text" 
                    name="property_address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none transition-shadow"
                    placeholder="123 Main St"
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    required type="text" name="city" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    required type="text" name="state" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    onChange={e => setFormData({...formData, state: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input 
                    required type="text" name="zip" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    onChange={e => setFormData({...formData, zip: e.target.value})}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-primary pt-6 mb-2 border-t border-gray-100">Contact Info</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input 
                    required type="text" name="name" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                    placeholder="Your full name"
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input 
                      required type="email" name="email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                      placeholder="you@example.com"
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input 
                      required type="tel" name="phone" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
                      placeholder="(555) 000-0000"
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-accent w-full text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Get My Home Value'
                )}
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
