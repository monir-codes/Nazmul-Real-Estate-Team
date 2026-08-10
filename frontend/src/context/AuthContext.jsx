import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('clientToken');
      if (token) {
        try {
          // Set token in headers for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await api.get('/auth/profile');
          setUser(res.data);
        } catch (error) {
          console.error("Token expired or invalid", error);
          localStorage.removeItem('clientToken');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem('clientToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem('clientToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('clientToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const refreshProfile = async () => {
    const res = await api.get('/auth/profile');
    setUser(res.data);
  };

import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user: firebaseUser } = result;
      
      // Send Firebase user details to our backend to get JWT token
      const res = await api.post('/auth/google', {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        uid: firebaseUser.uid
      });
      
      const { token, ...userData } = res.data;
      localStorage.setItem('clientToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Google Login Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
