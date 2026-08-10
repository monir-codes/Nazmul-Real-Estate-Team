import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Image as ImageIcon, Loader2, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { uploadToImgBB } from '../../utils/imgbb';
import AdminLoader from '../../components/AdminLoader';

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '', role: '', bio: '', email: '', phone: '', image: ''
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await api.get('/team');
      setTeam(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await api.delete(`/team/${id}`);
      setTeam(team.filter(m => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      setFormData({ ...formData, image: imageUrl });
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image. Ensure VITE_IMGBB_API_KEY is set.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.put(`/team/${editingId}`, formData);
        setTeam(team.map(m => m._id === editingId ? res.data : m));
        toast.success("Team member updated");
      } else {
        const res = await api.post('/team', formData);
        setTeam([res.data, ...team]);
        toast.success("Team member added");
      }
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(editingId ? "Failed to update team member" : "Failed to create team member");
    }
  };

  if (loading) return <AdminLoader message="Loading team..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <img 
              src={member.image || 'https://via.placeholder.com/150'} 
              alt={member.name} 
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary/10"
            />
            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-accent font-medium text-sm mb-3">{member.role}</p>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">{member.bio}</p>
            <button 
              onClick={() => handleDelete(member._id)}
              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors mt-auto"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {team.length === 0 && <div className="col-span-full text-center p-8 text-gray-500 bg-white rounded-lg border border-dashed">No team members found. Click Add Member.</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add Team Member</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
                  <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headshot Image</label>
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center border border-gray-300">
                      {uploadingImage ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                    <input 
                      type="text" 
                      placeholder="Or paste image URL" 
                      value={formData.image} 
                      onChange={e => setFormData({...formData, image: e.target.value})} 
                      className="flex-grow border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent text-sm" 
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                  <textarea required rows="4" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent"></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
                <button type="submit" disabled={uploadingImage} className="btn-primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
