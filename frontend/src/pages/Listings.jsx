import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Bed, Bath, Square, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_LISTINGS = [
  {
    id: 1, address: '123 Luxury Lane', city: 'Beverly Hills', state: 'CA', price: 3450000, beds: 5, baths: 6, sqft: 4500, status: 'For Sale', type: 'Single Family', image: 'https://images.unsplash.com/photo-1613490908578-8fc8d21b339d?w=800&q=80'
  },
  {
    id: 2, address: '456 Coastal View', city: 'Malibu', state: 'CA', price: 5200000, beds: 4, baths: 5, sqft: 3800, status: 'Pending', type: 'Villa', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
  },
  {
    id: 3, address: '789 Modern Way', city: 'Los Angeles', state: 'CA', price: 2100000, beds: 3, baths: 3, sqft: 2200, status: 'For Sale', type: 'Condo', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  },
  {
    id: 4, address: '101 Horizon Heights', city: 'Santa Monica', state: 'CA', price: 1850000, beds: 3, baths: 2, sqft: 1900, status: 'For Sale', type: 'Townhouse', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80'
  }
];

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-serif font-bold text-primary mb-6">Explore Properties</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <MapPin className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="City, Neighborhood, or ZIP..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 border border-gray-300 rounded-md flex items-center hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 mr-2" /> Filters
              </button>
              <button className="btn-primary flex items-center">
                <Search className="w-5 h-5 mr-2" /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600 font-medium">Showing {MOCK_LISTINGS.length} properties</p>
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_LISTINGS.map((listing, index) => (
            <motion.div 
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-premium transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.address} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-sm font-medium rounded text-primary">
                  {listing.status}
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/50 backdrop-blur text-primary hover:bg-white hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl font-serif font-bold text-primary">
                    ${listing.price.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {listing.type}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">{listing.address}</h3>
                <p className="text-gray-500 text-sm mb-4">{listing.city}, {listing.state}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2" />
                    <span>{listing.beds}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-2" />
                    <span>{listing.baths}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2" />
                    <span>{listing.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;
