import { useState, useEffect } from 'react';
import { Mail, Trash2 } from 'lucide-react';
import api from '../../utils/api';
import AdminLoader from '../../components/AdminLoader';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

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
    if (!window.confirm("Delete this lead?")) return;
    try {
      await api.delete(`/leads/${id}`);
      setLeads(leads.filter(l => l._id !== id));
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
                    <td className="p-4 text-gray-600 font-medium">{lead.type}</td>
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
                      <button onClick={() => handleDelete(lead._id)} className="text-gray-400 hover:text-red-500">
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
    </div>
  );
};

export default AdminLeads;
