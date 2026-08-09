import { useState, useEffect } from 'react';
import { Home, Users, MessageSquare, TrendingUp } from 'lucide-react';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeListings: 0,
    activeClients: 0,
    closedDeals: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [leadsRes, propertiesRes] = await Promise.all([
          api.get('/leads'),
          api.get('/properties')
        ]);
        
        const leads = leadsRes.data;
        const properties = propertiesRes.data;

        setStats({
          totalLeads: leads.length,
          activeListings: properties.filter(p => p.status === 'For Sale').length,
          activeClients: leads.filter(l => l.status === 'Contacted' || l.status === 'Qualified').length,
          closedDeals: properties.filter(p => p.status === 'Sold').length
        });

        // Get 3 most recent leads
        setRecentLeads(leads.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 rounded-full bg-blue-50 text-blue-600 mr-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Leads</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalLeads}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 rounded-full bg-green-50 text-green-600 mr-4">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Listings</p>
            <p className="text-2xl font-bold text-gray-800">{stats.activeListings}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 rounded-full bg-purple-50 text-purple-600 mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Clients</p>
            <p className="text-2xl font-bold text-gray-800">{stats.activeClients}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 rounded-full bg-accent/10 text-accent mr-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Closed Deals (YTD)</p>
            <p className="text-2xl font-bold text-gray-800">{stats.closedDeals}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Leads</h3>
          <div className="space-y-4">
            {recentLeads.length > 0 ? recentLeads.map((lead) => (
              <div key={lead._id} className="flex items-center justify-between p-4 border border-gray-50 rounded-lg bg-gray-50/50">
                <div>
                  <p className="font-medium text-gray-800">{lead.name}</p>
                  <p className="text-sm text-gray-500">Interested in {lead.type}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{lead.status}</span>
              </div>
            )) : <p className="text-gray-500 text-sm">No recent leads.</p>}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4 text-sm">
            {recentLeads.length > 0 ? recentLeads.map((lead, i) => (
               <div key={i} className="flex space-x-3">
                 <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                 <div>
                   <p className="text-gray-800">{lead.name} submitted a form.</p>
                   <p className="text-gray-500 text-xs mt-1">{new Date(lead.createdAt).toLocaleDateString()}</p>
                 </div>
               </div>
            )) : <p className="text-gray-500 text-sm">No recent activity.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
