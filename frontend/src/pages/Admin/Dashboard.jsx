import { Home, Users, MessageSquare, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
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
            <p className="text-2xl font-bold text-gray-800">124</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 rounded-full bg-green-50 text-green-600 mr-4">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Listings</p>
            <p className="text-2xl font-bold text-gray-800">18</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 rounded-full bg-purple-50 text-purple-600 mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Clients</p>
            <p className="text-2xl font-bold text-gray-800">32</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 rounded-full bg-accent/10 text-accent mr-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Closed Deals (YTD)</p>
            <p className="text-2xl font-bold text-gray-800">45</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Leads</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-50 rounded-lg bg-gray-50/50">
                <div>
                  <p className="font-medium text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">Interested in Buying</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">New</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4 text-sm">
            <div className="flex space-x-3">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
              <div>
                <p className="text-gray-800">New property listing added: <span className="font-medium">123 Luxury Lane</span></p>
                <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
              <div>
                <p className="text-gray-800">Sarah Smith requested a home valuation.</p>
                <p className="text-gray-500 text-xs mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-accent" />
              <div>
                <p className="text-gray-800">Status changed to Sold for <span className="font-medium">456 Coastal View</span></p>
                <p className="text-gray-500 text-xs mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
