import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, AlertCircle, User, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import api from '../utils/api';

const Contact = () => {
  const formRef = useRef();
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
      // 1. Save lead to DB via backend API
      await api.post('/leads', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.interest === 'Selling' ? 'Sell' : 
              formData.interest === 'Property Valuation' ? 'Valuation' : 
              formData.interest === 'Buying' ? 'Buy' : 'General',
        message: formData.message
      });
    } catch (dbErr) {
      console.warn('DB save failed (will still try email):', dbErr);
    }

    try {
      // 2. Send email notification via EmailJS
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_placeholder'
      );
      setSubmitted(true);
    } catch (emailErr) {
      console.error('EmailJS failed:', emailErr);
      // If DB succeeded but email failed, still show success
      // If both failed, show error
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
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">Phone</p>
                    <a href="tel:+1234567890" className="text-gray-500 hover:text-accent transition-colors">(555) 123-4567</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">Email</p>
                    <a href="mailto:contact@nazmulrealestate.com" className="text-gray-500 hover:text-accent transition-colors">contact@nazmulrealestate.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="ml-4">
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
                <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', interest: 'Buying', message: '' }); }} className="btn-secondary">Send Another Message</button>
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

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                        <input 
                          required 
                          type="text" 
                          name="from_name"
                          value={formData.name}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none transition-shadow" 
                          placeholder="Your full name"
                          onChange={e => setFormData({...formData, name: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                        <input 
                          required 
                          type="email" 
                          name="from_email"
                          value={formData.email}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none transition-shadow" 
                          placeholder="you@example.com"
                          onChange={e => setFormData({...formData, email: e.target.value})} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                        <input 
                          type="tel" 
                          name="from_phone"
                          value={formData.phone}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none transition-shadow" 
                          placeholder="(555) 000-0000"
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">I'm interested in:</label>
                      <select 
                        name="interest"
                        value={formData.interest}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none bg-white" 
                        onChange={e => setFormData({...formData, interest: e.target.value})}
                      >
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
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                      <textarea 
                        required 
                        rows="4" 
                        name="message"
                        value={formData.message}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none transition-shadow" 
                        placeholder="Tell us about your needs..."
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                  </div>

                  {/* Hidden field for EmailJS template */}
                  <input type="hidden" name="to_name" value="Nazmul Real Estate Team" />

                  <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
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
