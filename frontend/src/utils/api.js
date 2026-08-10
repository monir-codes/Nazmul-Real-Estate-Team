import axios from 'axios';

let rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Bulletproof normalization: Ensure URL doesn't have a trailing slash, then ensure it ends with /api
if (rawBaseURL.endsWith('/')) {
  rawBaseURL = rawBaseURL.slice(0, -1);
}
if (!rawBaseURL.endsWith('/api')) {
  rawBaseURL = `${rawBaseURL}/api`;
}

const api = axios.create({
  baseURL: rawBaseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  // Prevent token conflicts: use adminToken for /admin routes, clientToken for others
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const token = localStorage.getItem(isAdminRoute ? 'adminToken' : 'clientToken');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
