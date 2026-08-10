import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Image as ImageIcon, Loader2, X, Search, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { uploadToImgBB } from '../../utils/imgbb';
import AdminLoader from '../../components/AdminLoader';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    coverImage: '',
    excerpt: '',
    category: 'Market Update',
    author: 'Nazmul',
    status: 'published'
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      setFormData({ ...formData, coverImage: imageUrl });
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image. Ensure VITE_IMGBB_API_KEY is set.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.put(`/posts/${editingId}`, formData);
        setPosts(posts.map(p => p._id === editingId ? res.data : p));
        toast.success("Blog post updated successfully");
      } else {
        const res = await api.post('/posts', formData);
        setPosts([res.data, ...posts]);
        toast.success("Blog post created successfully");
      }
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(editingId ? "Failed to update post" : "Failed to create post");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
      toast.success("Post deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  const resetForm = () => {
    setFormData({ title: '', slug: '', content: '', coverImage: '', excerpt: '', category: 'Market Update', author: 'Nazmul', status: 'published' });
    setEditingId(null);
  };

  const openEditModal = (post) => {
    setFormData(post);
    setEditingId(post._id);
    setIsModalOpen(true);
  };

  if (loading) return <AdminLoader />;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Blog Manager</h2>
          <p className="text-gray-500">Create and manage your market insights and articles.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Write New Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
              <th className="p-4 font-medium">Post Title</th>
              <th className="p-4 font-medium hidden md:table-cell">Category</th>
              <th className="p-4 font-medium hidden sm:table-cell">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map(post => (
              <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                      <div className="text-xs text-gray-500">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{post.category}</span>
                </td>
                <td className="p-4 hidden sm:table-cell text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {post.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => openEditModal(post)} className="p-2 text-gray-400 hover:text-primary bg-white rounded-md border border-gray-200 hover:border-primary transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-md border border-gray-200 hover:border-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No blog posts found. Click "Write New Post" to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Post' : 'Write New Post'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                    <input type="text" required value={formData.title} onChange={handleTitleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                    <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt (Optional)</label>
                    <textarea rows="3" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative h-48 flex items-center justify-center overflow-hidden">
                      {formData.coverImage ? (
                        <>
                          <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover absolute inset-0" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <label className="cursor-pointer bg-white px-4 py-2 rounded-md font-medium text-sm text-gray-700 shadow-sm">
                              Change Image
                              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                            </label>
                          </div>
                        </>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center">
                          {uploadingImage ? <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" /> : <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />}
                          <span className="text-sm font-medium text-gray-600">{uploadingImage ? 'Uploading...' : 'Upload Cover Image'}</span>
                          <span className="text-xs text-gray-400 mt-1">Recommended: 1600x900px</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Content (Just write normally! Press Enter for paragraphs)</label>
                <textarea 
                  required 
                  rows="15" 
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})} 
                  placeholder="Write your blog post content here. No HTML required! Just type normally and it will automatically look professional on the live site..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none whitespace-pre-wrap leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="btn-primary px-8">
                  {editingId ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
