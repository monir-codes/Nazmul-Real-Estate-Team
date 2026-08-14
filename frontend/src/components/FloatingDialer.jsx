import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import api from '../utils/api';

const FloatingDialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings/global');
        if (res.data?.contactInfo?.phone) {
          setPhoneNumber(res.data.contactInfo.phone);
        }
      } catch (err) {
        console.error("Failed to fetch phone number for dialer", err);
      }
    };
    fetchSettings();
  }, []);

  if (!phoneNumber) return null;

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      aria-label="Call Us"
    >
      <Phone className="w-6 h-6 animate-pulse" />
      <span className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Call Us Now
      </span>
      {/* Ripple effect rings */}
      <span className="absolute -inset-2 rounded-full border border-green-500 opacity-50 animate-ping"></span>
    </a>
  );
};

export default FloatingDialer;
