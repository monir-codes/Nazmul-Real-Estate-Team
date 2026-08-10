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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const FeaturedListings = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-between items-end mb-12"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl">Discover our exclusive collection of premium homes currently available on the market.</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/listings" className="hidden md:inline-flex btn-secondary">View All Listings</Link>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {MOCK_LISTINGS.map((listing, index) => (
            <motion.div 
              key={listing.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 flex flex-col"
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
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-2xl font-serif font-bold text-primary mb-2">
                  ${listing.price.toLocaleString()}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">{listing.address}</h3>
                <p className="text-gray-500 text-sm mb-4">{listing.city}, {listing.state}</p>
                
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
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
        </motion.div>
        <div className="mt-10 text-center md:hidden">
          <Link to="/listings" className="btn-secondary w-full">View All Listings</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
