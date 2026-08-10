import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowLeft, Calendar, Send, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';
import Loader from '../components/Loader';
import SEO from '../components/SEO';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // Booking form state
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('submitting');
    try {
      await api.post('/leads', {
        ...formData,
        type: 'Tour',
        propertyAddress: property.address
      });
      setBookingStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setBookingStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setBookingStatus('error');
      setTimeout(() => setBookingStatus('idle'), 3000);
    }
  };

  if (loading) return <Loader />;

  if (!property) return (
    <div className="pt-32 min-h-screen text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
      <Link to="/listings" className="text-primary hover:underline">Return to Listings</Link>
    </div>
  );

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'];

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-20">
      <SEO 
        title={`${property.title} | Nazmul Real Estate`} 
        description={property.description}
      />
      
      <div className="container-custom">
        <Link to="/listings" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to properties
        </Link>

        {/* Main Gallery */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="relative h-[50vh] md:h-[60vh] rounded-xl overflow-hidden mb-2 group">
            <img 
              src={images[activeImage]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg">
              ${property.price?.toLocaleString()}
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              {property.status}
            </div>
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{property.title}</h1>
              <div className="flex items-center text-gray-500 mb-6">
                <MapPin className="w-5 h-5 mr-2 text-accent" />
                <span className="text-lg">{property.address}, {property.city}, {property.state} {property.zip}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 mb-6">
                <div className="flex items-center text-gray-700">
                  <Bed className="w-6 h-6 mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-bold">{property.beds}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center text-gray-700">
                  <Bath className="w-6 h-6 mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-bold">{property.baths}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center text-gray-700">
                  <Square className="w-6 h-6 mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Square Feet</p>
                    <p className="font-bold">{property.sqft?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center text-gray-700">
                  <div className="w-6 h-6 mr-3 text-primary flex items-center justify-center font-serif font-bold italic">T</div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-bold">{property.propertyType}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">About this property</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 sticky top-28">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Schedule a Tour</h3>
              </div>
              
              <p className="text-gray-500 text-sm mb-6">Interested in this property? Fill out the form below and our agents will contact you to arrange a viewing.</p>

              {bookingStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <h4 className="font-bold text-lg mb-1">Request Sent!</h4>
                  <p className="text-sm">We will contact you shortly to confirm your tour time.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      required type="text" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      required type="email" 
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      required type="tel" 
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date/Time (Optional)</label>
                    <textarea 
                      rows="3"
                      value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="e.g. This Saturday morning"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                    ></textarea>
                  </div>
                  
                  {bookingStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center">Failed to send request. Please try again.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={bookingStatus === 'submitting'}
                    className="w-full btn-primary flex items-center justify-center py-4"
                  >
                    {bookingStatus === 'submitting' ? (
                      'Sending Request...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" /> Request Tour
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
