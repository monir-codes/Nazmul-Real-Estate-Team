import { useEffect } from 'react';
import { Outlet, Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Home, Settings, LogOut, MessageSquare, Image as ImageIcon, Building2, UserPlus, FileText } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Properties', path: '/admin/properties', icon: Building2 },
    { name: 'Leads & Messages', path: '/admin/leads', icon: MessageSquare },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Team Members', path: '/admin/team', icon: UserPlus },
    { name: 'Blog Manager', path: '/admin/blog', icon: FileText },
    { name: 'Page Builder', path: '/admin/settings', icon: Settings },
  ];

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
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-300'
                }`
              }
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-accent' : 'text-gray-400'}`} />
              <span>{item.name}</span>
            </NavLink>
          ))}
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
