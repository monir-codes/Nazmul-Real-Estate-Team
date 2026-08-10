import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Bed, Bath, Square, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import api from '../utils/api';
import { useWishlist } from '../context/WishlistContext';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'wishlist'
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/properties');
        setProperties(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch properties", err);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.address?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || p.status === activeFilter;
    const matchesViewMode = viewMode === 'all' || wishlist.includes(p._id);
    return matchesSearch && matchesFilter && matchesViewMode;
  });

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-20">
      <SEO 
        title="Luxury Homes for Sale | Nazmul Real Estate Team"
        description="Browse our exclusive collection of luxury homes and premium real estate listings in the most sought-after neighborhoods."
      />
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif font-bold text-primary">Explore Properties</h1>
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'all' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                All Listings
              </button>
              <button 
                onClick={() => setViewMode('wishlist')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${viewMode === 'wishlist' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${viewMode === 'wishlist' ? 'fill-red-500 text-red-500' : ''}`} /> My Wishlist
              </button>
            </div>
          </div>
          
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
              <select 
                className="px-6 py-3 border border-gray-300 rounded-md flex items-center bg-white"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="For Sale">For Sale</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
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
          <p className="text-gray-600 font-medium">Showing {filteredProperties.length} {viewMode === 'wishlist' ? 'saved properties' : 'properties'}</p>
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-500">
              {viewMode === 'wishlist' 
                ? "You haven't saved any properties to your wishlist yet." 
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((listing, index) => (
              <motion.div 
                key={listing._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-premium transition-all duration-300 border border-gray-100 relative"
              >
                <Link to={`/property/${listing._id}`} className="block h-64 overflow-hidden relative">
                  <img 
                    src={listing.images && listing.images.length > 0 ? listing.images[0] : 'https://images.unsplash.com/photo-1613490908578-8fc8d21b339d?w=800&q=80'} 
                    alt={listing.address} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-sm font-medium rounded text-primary shadow-sm">
                    {listing.status}
                  </div>
                </Link>

                {/* Wishlist Button - Placed outside the Link so clicking it doesn't navigate */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(listing._id);
                  }}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/70 backdrop-blur shadow-sm hover:bg-white transition-colors z-10"
                >
                  <Heart className={`w-5 h-5 transition-colors ${isInWishlist(listing._id) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
                </button>

                <Link to={`/property/${listing._id}`} className="block p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-2xl font-serif font-bold text-primary">
                      ${listing.price?.toLocaleString()}
                    </div>
                    <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {listing.propertyType}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1 group-hover:text-accent transition-colors">{listing.address}</h3>
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
                      <span>{listing.sqft?.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
