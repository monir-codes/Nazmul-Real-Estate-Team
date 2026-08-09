import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary mock login since backend DB isn't connected
    if (email === 'admin@nazmulrealestate.com' && password === 'password123') {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-premium border border-gray-100">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary">Admin Portal</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your website</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              required 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full btn-primary">
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>For demo purposes use: admin@nazmulrealestate.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
