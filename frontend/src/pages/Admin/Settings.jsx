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

  const [globalSettings, setGlobalSettings] = useState({
    headerLinks: [],
    footerLinks: [],
    socialLinks: [],
    contactInfo: { phone: '', email: '', address: '' }
  });

  const fetchSettings = async () => {
    try {
      const [res, globalRes] = await Promise.all([
        api.get('/settings'),
        api.get('/settings/global')
      ]);
      setSettings(res.data);
      setGlobalSettings(globalRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch settings", err);
      setLoading(false);
    }
  };

  const handleGlobalTextChange = (e) => {
    setGlobalSettings({
      ...globalSettings,
      contactInfo: {
        ...globalSettings.contactInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleLinkChange = (type, index, field, value) => {
    const updatedLinks = [...globalSettings[type]];
    updatedLinks[index][field] = value;
    setGlobalSettings({ ...globalSettings, [type]: updatedLinks });
  };

  const addLink = (type) => {
    const newLink = type === 'socialLinks' 
      ? { platform: 'New Platform', url: '#' }
      : { label: 'New Link', url: '#' };
    setGlobalSettings({
      ...globalSettings,
      [type]: [...globalSettings[type], newLink]
    });
  };

  const removeLink = (type, index) => {
    const updatedLinks = [...globalSettings[type]];
    updatedLinks.splice(index, 1);
    setGlobalSettings({ ...globalSettings, [type]: updatedLinks });
  };

  const handleGlobalSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await api.put(`/settings/global`, globalSettings);
      setMessage('Global settings saved successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to save global settings.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSave = async () => {
    if (activeTab === 'global') return handleGlobalSave();
    
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Page Builder & Settings</h2>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 max-w-fit flex-wrap">
        {['buy', 'sell', 'about', 'areas', 'global'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'areas' ? 'Areas We Serve' : tab === 'global' ? 'Global Navigation' : `${tab} Page`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          {activeTab === 'global' ? (
            <div className="space-y-10">
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" name="phone" value={globalSettings.contactInfo?.phone || ''} onChange={handleGlobalTextChange} className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={globalSettings.contactInfo?.email || ''} onChange={handleGlobalTextChange} className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" name="address" value={globalSettings.contactInfo?.address || ''} onChange={handleGlobalTextChange} className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                  </div>
                </div>
              </div>

              {/* Header Links */}
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-xl font-bold text-gray-800">Header Links</h3>
                  <button onClick={() => addLink('headerLinks')} className="text-accent hover:text-accent-hover text-sm font-medium">+ Add Link</button>
                </div>
                <div className="space-y-3">
                  {globalSettings.headerLinks.map((link, idx) => (
                    <div key={idx} className="flex space-x-4 items-center">
                      <input type="text" value={link.label} onChange={(e) => handleLinkChange('headerLinks', idx, 'label', e.target.value)} placeholder="Label" className="w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                      <input type="text" value={link.url} onChange={(e) => handleLinkChange('headerLinks', idx, 'url', e.target.value)} placeholder="URL" className="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                      <button onClick={() => removeLink('headerLinks', idx)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-xl font-bold text-gray-800">Footer Links</h3>
                  <button onClick={() => addLink('footerLinks')} className="text-accent hover:text-accent-hover text-sm font-medium">+ Add Link</button>
                </div>
                <div className="space-y-3">
                  {globalSettings.footerLinks.map((link, idx) => (
                    <div key={idx} className="flex space-x-4 items-center">
                      <input type="text" value={link.label} onChange={(e) => handleLinkChange('footerLinks', idx, 'label', e.target.value)} placeholder="Label" className="w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                      <input type="text" value={link.url} onChange={(e) => handleLinkChange('footerLinks', idx, 'url', e.target.value)} placeholder="URL" className="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                      <button onClick={() => removeLink('footerLinks', idx)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-xl font-bold text-gray-800">Social Links</h3>
                  <button onClick={() => addLink('socialLinks')} className="text-accent hover:text-accent-hover text-sm font-medium">+ Add Link</button>
                </div>
                <div className="space-y-3">
                  {globalSettings.socialLinks.map((link, idx) => (
                    <div key={idx} className="flex space-x-4 items-center">
                      <input type="text" value={link.platform} onChange={(e) => handleLinkChange('socialLinks', idx, 'platform', e.target.value)} placeholder="Platform" className="w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                      <input type="text" value={link.url} onChange={(e) => handleLinkChange('socialLinks', idx, 'url', e.target.value)} placeholder="URL" className="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-accent" />
                      <button onClick={() => removeLink('socialLinks', idx)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ))}
                </div>
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
                Save Global Navigation & Settings
              </button>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Editor */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={settings[activeTab]?.title || ''} 
                  onChange={handleTextChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-accent text-lg font-serif"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Subtitle / Description</label>
                <textarea 
                  name="subtitle"
                  value={settings[activeTab]?.subtitle || ''}
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
                  value={settings[activeTab]?.backgroundImage || ''}
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
                  style={{ backgroundImage: `url(${settings[activeTab]?.backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center">
                  <h1 className="text-3xl font-serif font-bold text-accent mb-3 drop-shadow-lg max-w-sm">
                    {settings[activeTab]?.title || 'Title goes here'}
                  </h1>
                  <p className="text-sm text-white drop-shadow-md font-medium max-w-sm line-clamp-3">
                    {settings[activeTab]?.subtitle || 'Subtitle goes here'}
                  </p>
                </div>
              </div>
            </div>

          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
