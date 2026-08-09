import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Home, Settings, LogOut, MessageSquare } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout placeholder
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-xl font-serif font-bold tracking-tight">
            Nazmul <span className="text-accent">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-md transition-colors">
            <LayoutDashboard className="w-5 h-5 text-accent" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/properties" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-md transition-colors">
            <Home className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Properties</span>
          </Link>
          <Link to="/admin/leads" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-md transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Leads & Contacts</span>
          </Link>
          <Link to="/admin/team" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-md transition-colors">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Team</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full hover:bg-white/5 rounded-md transition-colors text-left">
            <LogOut className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
