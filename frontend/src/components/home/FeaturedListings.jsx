import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Square } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LISTINGS = [
  {
    id: 1,
    address: '123 Luxury Lane',
    city: 'Beverly Hills',
    state: 'CA',
    price: 3450000,
    beds: 5,
    baths: 6,
    sqft: 4500,
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1613490908578-8fc8d21b339d?w=800&q=80'
  },
  {
    id: 2,
    address: '456 Coastal View',
    city: 'Malibu',
    state: 'CA',
    price: 5200000,
    beds: 4,
    baths: 5,
    sqft: 3800,
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
  },
  {
    id: 3,
    address: '789 Modern Way',
    city: 'Los Angeles',
    state: 'CA',
    price: 2100000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  }
];

const FeaturedListings = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl">Discover our exclusive collection of premium homes currently available on the market.</p>
          </div>
          <Link to="/listings" className="hidden md:inline-flex btn-secondary">View All Listings</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_LISTINGS.map((listing, index) => (
            <motion.div 
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                <div className="text-2xl font-serif font-bold text-primary mb-2">
                  ${listing.price.toLocaleString()}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">{listing.address}</h3>
                <p className="text-gray-500 text-sm mb-4">{listing.city}, {listing.state}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2" />
                    <span>{listing.beds} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-2" />
                    <span>{listing.baths} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2" />
                    <span>{listing.sqft.toLocaleString()} Sq Ft</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <Link to="/listings" className="btn-secondary w-full">View All Listings</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
