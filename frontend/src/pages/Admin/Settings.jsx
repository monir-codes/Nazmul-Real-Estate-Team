import { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import api from '../../utils/api';
import { uploadToImgBB } from '../../utils/imgbb';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    buy: { title: '', subtitle: '', backgroundImage: '' },
    sell: { title: '', subtitle: '', backgroundImage: '' },
    about: { title: '', subtitle: '', backgroundImage: '' },
    areas: { title: '', subtitle: '', backgroundImage: '' }
  });
  
  const [activeTab, setActiveTab] = useState('buy');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      setSettings(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch settings", err);
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    setSettings({
      ...settings,
      [activeTab]: {
        ...settings[activeTab],
        [e.target.name]: e.target.value
      }
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage('');

    try {
      const imageUrl = await uploadToImgBB(file);
      setSettings({
        ...settings,
        [activeTab]: {
          ...settings[activeTab],
          backgroundImage: imageUrl
        }
      });
      setMessage("Image uploaded successfully! Don't forget to save changes.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload image. Did you add VITE_IMGBB_API_KEY?");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await api.put(`/settings/${activeTab}`, settings[activeTab]);
      setMessage('Page settings saved successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading page settings...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Page Builder (CMS)</h2>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 max-w-fit">
        {['buy', 'sell', 'about', 'areas'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'areas' ? 'Areas We Serve' : tab} Page
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Editor */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={settings[activeTab].title} 
                  onChange={handleTextChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-accent text-lg font-serif"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Subtitle / Description</label>
                <textarea 
                  name="subtitle"
                  value={settings[activeTab].subtitle}
                  onChange={handleTextChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-accent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cinematic Background Image</label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center border border-gray-300">
                    {uploadingImage ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                    {uploadingImage ? 'Uploading...' : 'Upload Image (ImgBB)'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                  <span className="text-xs text-gray-400">or paste URL below</span>
                </div>
                <input 
                  type="text" 
                  name="backgroundImage"
                  value={settings[activeTab].backgroundImage}
                  onChange={handleTextChange}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-accent mt-3 text-sm"
                />
              </div>

              {message && (
                <div className={`p-3 rounded-md text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}

              <button 
                onClick={handleSave}
                disabled={saving}
                className="btn-primary w-full flex items-center justify-center py-3"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                Save Changes to {activeTab === 'areas' ? 'Areas' : activeTab} Page
              </button>
            </div>

            {/* Live Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Live Preview (Desktop)</label>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${settings[activeTab].backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center">
                  <h1 className="text-3xl font-serif font-bold text-accent mb-3 drop-shadow-lg max-w-sm">
                    {settings[activeTab].title || 'Title goes here'}
                  </h1>
                  <p className="text-sm text-white drop-shadow-md font-medium max-w-sm line-clamp-3">
                    {settings[activeTab].subtitle || 'Subtitle goes here'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
