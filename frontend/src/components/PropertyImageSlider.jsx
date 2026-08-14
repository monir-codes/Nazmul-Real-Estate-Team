import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyImageSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return (
      <img 
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" 
        alt={title || 'Property'} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
    );
  }

  return (
    <div className="relative w-full h-full group/slider overflow-hidden bg-gray-100">
      <img 
        src={images[currentIndex]} 
        alt={title || 'Property'} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity z-20 text-gray-800 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 pr-0.5" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity z-20 text-gray-800 shadow-sm"
          >
            <ChevronRight className="w-5 h-5 pl-0.5" />
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyImageSlider;
