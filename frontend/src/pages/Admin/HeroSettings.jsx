import { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';

const HeroSettings = () => {
  const [images, setImages] = useState([
    { _id: '1', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80', title: 'Modern Villa' },
    { _id: '2', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80', title: 'Luxury Estate' },
    { _id: '3', url: 'https://images.unsplash.com/photo-1613490908679-fd36113c2300?w=1600&q=80', title: 'Contemporary Design' }
  ]);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // In a real app, you would fetch these from /api/hero

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUrl) return;
    
    const newImage = {
      _id: Date.now().toString(),
      url: newUrl,
      title: newTitle || 'Untitled Image'
    };
    
    setImages([newImage, ...images]);
    setNewUrl('');
    setNewTitle('');
  };

  const handleDelete = (id) => {
    setImages(images.filter(img => img._id !== id));
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Hero Slider</h1>
          <p className="text-gray-500">Manage the animated background images on the home page.</p>
        </div>
      </div>

      {/* Add New Image Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-accent" /> Add New Image
        </h3>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4">
          <input
            type="url"
            placeholder="Image URL (e.g., https://unsplash.com/...)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-3 focus:ring-accent focus:border-accent"
            required
          />
          <input
            type="text"
            placeholder="Title (optional)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-3 focus:ring-accent focus:border-accent"
          />
          <button type="submit" className="btn-accent whitespace-nowrap">
            Add Image
          </button>
        </form>
      </div>

      {/* Existing Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="h-48 relative overflow-hidden bg-gray-100">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-primary">{img.title}</h4>
                <p className="text-xs text-gray-400 truncate max-w-[200px]">{img.url}</p>
              </div>
              <button 
                onClick={() => handleDelete(img._id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Delete Image"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-100">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>No images found. Add one above to display on the hero slider.</p>
        </div>
      )}
    </div>
  );
};

export default HeroSettings;
