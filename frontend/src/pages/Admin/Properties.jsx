import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import api from '../../utils/api';
import { uploadToImgBB } from '../../utils/imgbb';
import AdminLoader from '../../components/AdminLoader';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '', address: '', city: '', state: '', zip: '', price: '', 
    beds: '', baths: '', sqft: '', propertyType: 'Single Family', status: 'For Sale', description: '', images: []
  });

  useEffect(() => {
    fetchProperties();
  }, []);

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Property?',
      text: "Are you sure you want to delete this property? This action cannot be undone.",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
      toast.success("Property deleted successfully");
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error("Failed to delete property");
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadingImage(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const imageUrl = await uploadToImgBB(file);
        uploadedUrls.push(imageUrl);
      }
      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.put(`/properties/${editingId}`, formData);
        setProperties(properties.map(p => p._id === editingId ? res.data : p));
        toast.success("Property updated");
      } else {
        const res = await api.post('/properties', formData);
        setProperties([res.data, ...properties]);
        toast.success("Property added");
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Failed to save property", err);
      toast.error("Error saving property");
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', address: '', city: '', state: '', zip: '', price: '', 
      beds: '', baths: '', sqft: '', propertyType: 'Single Family', status: 'For Sale', description: '', images: []
    });
    setEditingId(null);
  };

  const openEditModal = (property) => {
    setFormData(property);
    setEditingId(property._id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Properties</h2>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light flex items-center shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> Add Property
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-accent bg-white"
            />
          </div>
        </div>
        
        {loading ? (
           <div className="p-8 text-center text-gray-500">Loading properties...</div>
        ) : properties.length === 0 ? (
           <div className="p-8 text-center text-gray-500">No properties found. Add one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Property</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-800 line-clamp-1">{p.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{p.address}</div>
                  </td>
                  <td className="p-4 text-gray-600">${p.price?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === 'For Sale' ? 'bg-green-100 text-green-700' : p.status === 'Sold' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEditModal(p)} className="text-gray-400 hover:text-accent mr-3"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(p._id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Property' : 'Add New Property'}</h3>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required name="title" onChange={handleChange} value={formData.title} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input required name="address" onChange={handleChange} value={formData.address} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required name="city" onChange={handleChange} value={formData.city} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input required name="state" onChange={handleChange} value={formData.state} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input required name="zip" onChange={handleChange} value={formData.zip} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input required type="number" name="price" onChange={handleChange} value={formData.price} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
                  <input required type="number" name="beds" onChange={handleChange} value={formData.beds} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
                  <input required type="number" name="baths" onChange={handleChange} value={formData.baths} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sqft</label>
                  <input required type="number" name="sqft" onChange={handleChange} value={formData.sqft} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" onChange={handleChange} value={formData.status} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent bg-white">
                    <option>For Sale</option>
                    <option>Pending</option>
                    <option>Sold</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
                  
                  {formData.images.length > 0 && (
                    <div className="flex flex-wrap gap-4 mb-4">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative w-24 h-24 group rounded-md overflow-hidden border border-gray-200">
                          <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => removeImage(idx)}
                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center border border-gray-300">
                      {uploadingImage ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                      {uploadingImage ? 'Uploading...' : 'Upload Images'}
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                    <span className="text-xs text-gray-400 mt-1 block">Tip: Select multiple files at once!</span>
                    <div className="flex-grow flex space-x-2 ml-4">
                       <input 
                         type="text" 
                         placeholder="Or paste URL and press Add" 
                         id="imageUrlInput"
                         className="flex-grow border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent text-sm" 
                       />
                       <button 
                         type="button"
                         className="bg-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                         onClick={() => {
                           const input = document.getElementById('imageUrlInput');
                           if(input.value) {
                             setFormData(prev => ({...prev, images: [...prev.images, input.value]}));
                             input.value = '';
                           }
                         }}
                       >
                         Add
                       </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea required name="description" onChange={handleChange} value={formData.description} rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent"></textarea>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2">Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Update Property' : 'Save Property'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;
