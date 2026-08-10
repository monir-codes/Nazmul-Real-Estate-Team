import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Toaster position="top-center" />
            <App />
          </BrowserRouter>
        </WishlistProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
