import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Bed, Bath, Square, Heart, Map as MapIcon, List as ListIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SEO from '../components/SEO';
import api from '../utils/api';
import { useWishlist } from '../context/WishlistContext';

// Fix leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Removed default properties to enforce fully dynamic data fetching as requested.

// Helper component to recenter map when properties change
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'wishlist'
  const [mobileView, setMobileView] = useState('map'); // 'map' or 'list' for mobile toggle
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/properties');
        if (res.data && res.data.length > 0) {
          setProperties(res.data);
        } else {
          setProperties([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch properties", err);
        setProperties([]);
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

  // Calculate map center based on filtered properties
  const mapCenter = filteredProperties.length > 0 && filteredProperties[0].coordinates 
    ? [filteredProperties[0].coordinates.lat, filteredProperties[0].coordinates.lng] 
    : [34.0522, -118.2437]; // Default to LA

  return (
    <div className="pt-20 h-screen flex flex-col bg-gray-50 overflow-hidden">
      <SEO 
        title="Interactive Map Search | Nazmul Real Estate Team"
        description="Search luxury homes and premium real estate listings on our interactive map."
      />
      
      {/* Top Search Bar & Filters */}
      <div className="bg-white border-b border-gray-200 py-4 z-20 shadow-sm flex-shrink-0">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96 flex-shrink-0">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by city, neighborhood, or address..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <div className="flex bg-gray-100 p-1 rounded-lg flex-shrink-0">
                {['All', 'For Sale', 'Pending', 'Sold'].map(filter => (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${activeFilter === filter ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              
              <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

              {/* View Mode */}
              <div className="flex bg-gray-100 p-1 rounded-lg flex-shrink-0">
                <button 
                  onClick={() => setViewMode('all')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'all' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setViewMode('wishlist')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center ${viewMode === 'wishlist' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <Heart className={`w-4 h-4 mr-1 ${viewMode === 'wishlist' ? 'fill-red-500 text-red-500' : ''}`} /> Saved
                </button>
              </div>

              {/* Mobile View Toggle */}
              <div className="flex md:hidden bg-gray-100 p-1 rounded-lg flex-shrink-0 ml-auto">
                <button 
                  onClick={() => setMobileView('map')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center ${mobileView === 'map' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <MapIcon className="w-4 h-4 mr-1" /> Map
                </button>
                <button 
                  onClick={() => setMobileView('list')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center ${mobileView === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <ListIcon className="w-4 h-4 mr-1" /> List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Split Screen */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Map Section (Left side on desktop, toggled on mobile) */}
        <div className={`w-full md:w-1/2 h-full absolute md:relative z-0 transition-opacity duration-300 ${mobileView === 'map' ? 'opacity-100' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto'}`}>
          <MapContainer center={mapCenter} zoom={11} className="w-full h-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView center={mapCenter} zoom={11} />
            
            {filteredProperties.map(property => property.coordinates && (
              <Marker key={property._id} position={[property.coordinates.lat, property.coordinates.lng]}>
                <Popup className="custom-popup">
                  <div className="w-48">
                    <img src={property.images[0]} alt={property.title} className="w-full h-32 object-cover rounded-t-md mb-2" />
                    <h4 className="font-bold text-gray-900 text-sm truncate">{property.address}</h4>
                    <p className="text-accent font-bold">${property.price.toLocaleString()}</p>
                    <div className="flex text-xs text-gray-500 gap-2 mt-1">
                      <span>{property.beds} bds</span>
                      <span>{property.baths} ba</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                    <Link to={`/properties/${property._id}`} className="block text-center bg-primary text-white text-xs py-1.5 mt-2 rounded">
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Listings Section (Right side on desktop, toggled on mobile) */}
        <div className={`w-full md:w-1/2 h-full absolute md:relative bg-gray-50 z-10 transition-transform duration-300 transform md:translate-y-0 overflow-y-auto ${mobileView === 'list' ? 'translate-y-0' : 'translate-y-full md:translate-x-0'}`}>
          <div className="p-4 md:p-6 pb-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{filteredProperties.length} Homes Found</h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProperties.map(property => (
                  <motion.div 
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-premium transition-shadow group relative"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={property.images[0]} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        {property.status}
                      </div>
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(property._id); }}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(property._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>
                    </div>
                    <Link to={`/properties/${property._id}`} className="block p-5">
                      <div className="text-2xl font-bold text-primary mb-2">${property.price.toLocaleString()}</div>
                      <div className="flex items-center text-gray-600 mb-3 text-sm">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{property.address}, {property.city}, {property.state}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-500 text-sm border-t border-gray-100 pt-3">
                        <div className="flex items-center"><Bed className="w-4 h-4 mr-1 text-accent" /> {property.beds} Beds</div>
                        <div className="flex items-center"><Bath className="w-4 h-4 mr-1 text-accent" /> {property.baths} Baths</div>
                        <div className="flex items-center"><Square className="w-4 h-4 mr-1 text-accent" /> {property.sqft} sqft</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <h3 className="text-2xl font-serif text-gray-400 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                  className="btn-secondary mt-6"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Listings;
