import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

const AdminLeads = () => {
  const [leads] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Buy', status: 'New', date: '2023-10-25' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', type: 'Valuation', status: 'Contacted', date: '2023-10-24' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', type: 'Sell', status: 'Qualified', date: '2023-10-23' }
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lead Management (CRM)</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Contact</th>
              <th className="p-4 font-medium">Interest</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-800">{lead.name}</td>
                <td className="p-4 text-gray-500">
                  <div className="flex items-center text-sm mb-1"><Mail className="w-3 h-3 mr-2" /> {lead.email}</div>
                </td>
                <td className="p-4 text-gray-600 font-medium">{lead.type}</td>
                <td className="p-4 text-gray-500 text-sm">{lead.date}</td>
                <td className="p-4 text-right">
                  <select 
                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-accent bg-white"
                    defaultValue={lead.status}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeads;
