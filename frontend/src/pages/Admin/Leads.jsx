import { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, MapPin, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../utils/api';
import AdminLoader from '../../components/AdminLoader';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      setLeads(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch leads", err);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/leads/${id}`, { status: newStatus });
      setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Lead?',
      text: "Are you sure you want to delete this lead?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/leads/${id}`);
      setLeads(leads.filter(l => l._id !== id));
      if (selectedLead && selectedLead._id === id) setSelectedLead(null);
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lead Management (CRM)</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <AdminLoader message="Loading leads..." />
        ) : leads.length === 0 ? (
           <div className="p-8 text-center text-gray-500">No leads found yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Interest</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Status</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-800">{lead.name}</td>
                    <td className="p-4 text-gray-500">
                      <div className="flex items-center text-sm mb-1"><Mail className="w-3 h-3 mr-2" /> {lead.email}</div>
                      <div className="text-xs">{lead.phone}</div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">
                      {lead.type}
                      {lead.propertyId && <div className="text-xs text-accent mt-1">Has Property Data</div>}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <select 
                        className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-accent bg-white"
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelectedLead(lead)} className="text-gray-400 hover:text-primary mr-3" title="View Details">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(lead._id)} className="text-gray-400 hover:text-red-500" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Professional Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Client Info Section */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Client Profile</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedLead.name}</p>
                  <p className="text-gray-600">{selectedLead.email}</p>
                  <p className="text-gray-600">{selectedLead.phone || 'No phone provided'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Inquiry Info</h4>
                  <p className="text-gray-800"><span className="font-medium text-gray-500 mr-2">Type:</span> {selectedLead.type}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-500 mr-2">Status:</span> {selectedLead.status}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-500 mr-2">Date:</span> {new Date(selectedLead.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedLead.message && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Message / Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-line">
                    {selectedLead.message}
                  </div>
                </div>
              )}

              {/* Property Details Section */}
              {(selectedLead.propertyId || selectedLead.propertyAddress) && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Property Interest</h4>
                  
                  {selectedLead.propertyId ? (
                    <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col sm:flex-row bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 relative">
                        <img 
                          src={selectedLead.propertyId.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'} 
                          alt={selectedLead.propertyId.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded font-medium shadow-sm">
                          ${selectedLead.propertyId.price?.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div>
                          <h5 className="font-bold text-lg text-gray-900 mb-1">{selectedLead.propertyId.title}</h5>
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <MapPin className="w-4 h-4 mr-1 text-accent" />
                            {selectedLead.propertyId.address}, {selectedLead.propertyId.city}
                          </div>
                          <div className="flex space-x-4 text-sm text-gray-600 mb-4">
                            <span><strong className="text-gray-900">{selectedLead.propertyId.beds}</strong> Beds</span>
                            <span><strong className="text-gray-900">{selectedLead.propertyId.baths}</strong> Baths</span>
                            <span><strong className="text-gray-900">{selectedLead.propertyId.sqft?.toLocaleString()}</strong> Sqft</span>
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Link 
                            to={`/properties/${selectedLead.propertyId._id}`} 
                            target="_blank"
                            className="text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                          >
                            View Live Property <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-800">{selectedLead.propertyAddress}</p>
                        <p className="text-sm text-gray-500 mt-1">Property data is no longer linked (it may have been deleted or added manually).</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end sticky bottom-0 z-10">
              <a 
                href={`mailto:${selectedLead.email}`}
                className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
