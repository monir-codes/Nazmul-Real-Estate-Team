import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import AdminDashboard from './pages/Admin/Dashboard';

import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Listings from './pages/Listings';
import Valuation from './pages/Valuation';
import Contact from './pages/Contact';
import About from './pages/About';
import Team from './pages/Team';
import AreasWeServe from './pages/AreasWeServe';

import AdminLogin from './pages/Admin/Login';
import AdminProperties from './pages/Admin/Properties';
import AdminLeads from './pages/Admin/Leads';
import HeroSettings from './pages/Admin/HeroSettings';
import AdminSettings from './pages/Admin/Settings';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/buy" element={<PageTransition><Buy /></PageTransition>} />
          <Route path="/sell" element={<PageTransition><Sell /></PageTransition>} />
          <Route path="/listings" element={<PageTransition><Listings /></PageTransition>} />
          <Route path="/valuation" element={<PageTransition><Valuation /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
          <Route path="/areas" element={<PageTransition><AreasWeServe /></PageTransition>} />
        </Route>

        {/* Admin Login (No Sidebar) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="hero" element={<HeroSettings />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="team" element={<div>Manage Team</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
