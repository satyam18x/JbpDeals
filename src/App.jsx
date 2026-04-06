import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OffersList from './pages/OffersList';
import OfferDetail from './pages/OfferDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BusinessProfile from './pages/BusinessProfile';
import AdminPanel from './pages/AdminPanel';
import ScrollToTop from './components/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-card border-t border-border-color mt-auto pt-10 pb-6 text-text-secondary text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">JBP <span className="text-orange-end">Deals</span></h3>
            <p>Your one-stop destination for the best local deals and discounts in Jabalpur.</p>
          </div>
          <div>
            <h4 className="font-bold text-text-primary mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/offers">All Offers</Link></li>
              <li><Link to="/offers?category=food">Food & Dining</Link></li>
              <li><Link to="/offers?category=gym">Gyms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-primary mb-4">For Businesses</h4>
            <ul className="space-y-2">
              <li><Link to="/business/join">Join as Partner</Link></li>
              <li><Link to="/admin">Merchant Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t border-border-color pt-6 max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} LocalOffers Jabalpur. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};



function App() {
  console.log("LocalOffers App: Rendering...");
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="offers" element={<OffersList />} />
            <Route path="offer/:id" element={<OfferDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="business/:id" element={<BusinessProfile />} />
            <Route path="admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
