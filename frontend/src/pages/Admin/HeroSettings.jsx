import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import api from '../../utils/api';
import { uploadToImgBB } from '../../utils/imgbb';
import AdminLoader from '../../components/AdminLoader';

const HeroSettings = () => {
  const [images, setImages] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get('/hero');
      setImages(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch hero images', error);
      setLoading(false);
    }
  };

  if (loading) return <AdminLoader message="Loading hero images..." />;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newUrl) return;
    
    try {
      const res = await api.post('/hero', { url: newUrl, title: newTitle });
      setImages([res.data, ...images]);
      setNewUrl('');
      setNewTitle('');
      toast.success('Image added successfully');
    } catch (error) {
      console.error('Failed to add image', error);
      toast.error('Failed to add image. Ensure URL is valid.');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Image?',
      text: "Are you sure you want to delete this image?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/hero/${id}`);
      setImages(images.filter(img => img._id !== id));
    } catch (error) {
      console.error('Failed to delete image', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      const res = await api.post('/hero', { url: imageUrl, title: file.name });
      setImages([res.data, ...images]);
      toast.success('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload image. Check VITE_IMGBB_API_KEY.');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Hero Slider</h1>
          <p className="text-gray-500">Manage the animated background images on the home page.</p>
        </div>
        <label className="btn-accent flex items-center cursor-pointer">
          {uploadingImage ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ImageIcon className="w-5 h-5 mr-2" />}
          {uploadingImage ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
        </label>
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
