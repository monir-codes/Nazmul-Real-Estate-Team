import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import PropertyImageSlider from '../PropertyImageSlider';

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
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/properties');
        if (res.data && res.data.length > 0) {
          // Take top 3 for featured section
          setFeatured(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch featured properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : featured.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featured.map((listing) => (
              <motion.div 
                key={listing._id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden z-10">
                  <PropertyImageSlider images={listing.images} title={listing.address} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-sm font-medium rounded text-primary shadow-sm">
                    {listing.status}
                  </div>
                </div>
                <Link to={`/properties/${listing._id}`} className="p-6 flex-1 flex flex-col hover:bg-gray-50 transition-colors">
                  <div className="text-2xl font-serif font-bold text-primary mb-2">
                    ${listing.price.toLocaleString()}
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">{listing.address}</h3>
                  <p className="text-gray-500 text-sm mb-4">{listing.city}, {listing.state}</p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-2 text-accent" />
                      <span>{listing.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-2 text-accent" />
                      <span>{listing.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-2 text-accent" />
                      <span>{listing.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
           <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
             <h3 className="text-2xl font-serif text-gray-400 mb-2">No Featured Properties</h3>
             <p className="text-gray-500">Check back later for exclusive listings.</p>
           </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link to="/listings" className="btn-secondary w-full py-4">View All Listings</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
