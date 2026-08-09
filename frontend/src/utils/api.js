import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://nazmul-real-estate-team-3fly.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default api;
