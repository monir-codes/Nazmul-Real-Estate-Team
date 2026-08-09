import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const AREAS = [
  { name: 'Beverly Hills', zip: '90210', description: 'Iconic luxury estates, world-class dining, and exclusive shopping on Rodeo Drive.' },
  { name: 'Malibu', zip: '90265', description: 'Stunning beachfront properties and private cliffside retreats with panoramic ocean views.' },
  { name: 'Santa Monica', zip: '90401', description: 'Vibrant coastal living featuring the famous pier and walkable luxury communities.' },
  { name: 'West Hollywood', zip: '90069', description: 'Trendy, energetic neighborhoods known for nightlife, design districts, and modern condos.' },
  { name: 'Bel Air', zip: '90077', description: 'Ultra-private, gated enclaves set among rolling hills and lush, expansive landscapes.' },
  { name: 'Brentwood', zip: '90049', description: 'Sophisticated yet relaxed, offering upscale boutiques and beautiful tree-lined streets.' }
];

const AreasWeServe = () => {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580659328221-a53ec8651817?w=1600&q=80')] bg-cover bg-center opacity-20" />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80 z-10" />
        
        <div className="container-custom relative z-20 text-center max-w-4xl mx-auto pt-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-accent drop-shadow-2xl">Areas We Serve</h1>
            <p className="text-xl text-white drop-shadow-md font-medium max-w-3xl mx-auto">
              Deep local expertise across the most sought-after neighborhoods. We know the streets, the schools, and the hidden opportunities.
            </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom">
          {/* Interactive Map Placeholder */}
          <div className="w-full h-96 bg-gray-200 rounded-2xl mb-16 relative overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')] bg-cover bg-center opacity-50" />
            <div className="absolute inset-0 bg-primary/10" />
            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center max-w-md shadow-lg border border-white">
              <Navigation className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Interactive Market Map</h3>
              <p className="text-gray-600">Select an area to view active listings, recent sales, and market trends.</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary">Featured Neighborhoods</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AREAS.map((area, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-premium transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-surface-dark rounded-full text-primary mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{area.name}</h3>
                    <p className="text-sm font-medium text-gray-500">ZIP: {area.zip}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
                <button className="mt-6 text-accent font-medium text-sm flex items-center hover:text-primary transition-colors">
                  View Listings & Market Data <span className="ml-2">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreasWeServe;
