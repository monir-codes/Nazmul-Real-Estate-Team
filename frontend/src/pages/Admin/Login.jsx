import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECURITY_PASSPHRASE } from '../../config/security';

const AdminLogin = () => {
  const [passphrase, setPassphrase] = useState('');
  const [status, setStatus] = useState('idle'); // idle, checking, granted, denied
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passphrase) return;

    setStatus('checking');

    // Simulate a complex security check delay
    setTimeout(() => {
      // Check against the imported passphrase
      if (passphrase.trim().toLowerCase() === SECURITY_PASSPHRASE.toLowerCase()) {
        setStatus('granted');
        // Set a mock token
        localStorage.setItem('adminToken', 'security_chamber_cleared');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        setStatus('denied');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f16] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Background cinematic effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-[#111827]/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-gray-800 relative overflow-hidden">
          
          {/* Top scanning line effect */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] opacity-30 z-0"
          />

          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center relative z-10"
              >
                <div className="mx-auto w-16 h-16 bg-gray-900 border border-gray-700 text-cyan-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Fingerprint className="w-8 h-8" />
                </div>
                <h2 className="text-3xl tracking-widest font-bold text-white mb-2 uppercase">Security Chamber</h2>
                <p className="text-cyan-500/80 mb-8 text-sm uppercase tracking-widest">Awaiting Identification</p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest text-left">Who is here?</label>
                    <input 
                      required 
                      type="password" 
                      className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none text-white text-center tracking-widest transition-all"
                      placeholder="Enter passphrase"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                  >
                    Authenticate
                  </button>
                </form>
              </motion.div>
            )}

            {status === 'checking' && (
              <motion.div 
                key="checking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 relative z-10 flex flex-col items-center"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-gray-700 border-t-cyan-500 rounded-full mb-6"
                />
                <h2 className="text-xl font-bold text-white tracking-widest uppercase animate-pulse">Verifying Identity...</h2>
              </motion.div>
            )}

            {status === 'granted' && (
              <motion.div 
                key="granted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 relative z-10"
              >
                <div className="mx-auto w-20 h-20 bg-green-500/20 border border-green-500 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <Lock className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-green-400 tracking-widest uppercase mb-2">Access Granted</h2>
                <p className="text-gray-400 text-sm">Welcome back, Commander.</p>
              </motion.div>
            )}

            {status === 'denied' && (
              <motion.div 
                key="denied"
                initial={{ x: -10 }}
                animate={{ x: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="text-center py-12 relative z-10"
              >
                <div className="mx-auto w-20 h-20 bg-red-500/20 border border-red-500 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-red-500 tracking-widest uppercase mb-2">Access Denied</h2>
                <p className="text-gray-400 text-sm">Intruder alert logged.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
