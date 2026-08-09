import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/areas" element={<AreasWeServe />} />
        </Route>

        {/* Admin Login (No Sidebar) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="hero" element={<HeroSettings />} />
          <Route path="team" element={<div>Manage Team</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
