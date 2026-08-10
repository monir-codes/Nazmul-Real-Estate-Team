import { useState } from 'react';
import { Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buying',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/leads', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.interest === 'Selling' ? 'Sell' : 
              formData.interest === 'Property Valuation' ? 'Valuation' : 
              formData.interest === 'Buying' ? 'Buy' : 'General',
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit lead', err);
      setError('We couldn\'t send your message right now. Please try again later or contact us directly by phone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <SEO 
        title="Contact Us | Nazmul Real Estate Team"
        description="Get in touch with the Nazmul Real Estate Team today. Whether you're looking to buy, sell, or have questions about the market, we're here to help."
      />
      <div className="container-custom py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Let's Talk About Your Next Move.</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Whether you're looking to buy, sell, or just have questions about the local market, we're here to help.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-accent mr-4" />
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <a href="tel:+1234567890" className="text-gray-500 hover:text-accent">(555) 123-4567</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-accent mr-4" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <a href="mailto:contact@nazmulrealestate.com" className="text-gray-500 hover:text-accent">contact@nazmulrealestate.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-accent mr-4" />
                  <div>
                    <p className="font-medium text-gray-800">Office</p>
                    <p className="text-gray-500">123 Real Estate Blvd<br />Suite 100<br />Los Angeles, CA 90001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. A member of our team will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button>
              </motion.div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-6">Send us a message</h3>

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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input required type="email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none" onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">I'm interested in:</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none" onChange={e => setFormData({...formData, interest: e.target.value})}>
                        <option>Buying</option>
                        <option>Selling</option>
                        <option>Investing</option>
                        <option>Property Valuation</option>
                        <option>General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
