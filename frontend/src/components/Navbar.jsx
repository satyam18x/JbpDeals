import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, User, Menu, Bell, LogOut, ChevronDown, X, Home, Bookmark, Ticket, Settings, Briefcase } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_CATEGORIES } from '../data/mockData';

const Navbar = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync search input with URL when it changes (for back/forward navigation)
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    setIsDrawerOpen(false);
    setIsSearchOpen(false);
    setIsDropdownOpen(false);
  }, [navigate]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/offers?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/offers');
    }
    setIsSearchOpen(false);
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border-color shadow-sm w-full">
      {/* Layer 1: Top Strip */}
      <div className="bg-primary text-card text-xs py-1.5 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> Jabalpur, MP
            </span>
            <span className="text-gray-300">|</span>
            <span>Download App</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/business/join" className="hover:text-orange-start transition-colors">Sell on JBP Deals</Link>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 cursor-pointer">
              Support <ChevronDown size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* Layer 2: Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-start to-orange-end rounded-xl hidden sm:flex items-center justify-center text-card font-bold text-xl shadow-lg transform group-hover:scale-105 transition-transform">
              JD
            </div>
            <span className="font-bold text-lg sm:text-2xl tracking-tight text-primary">
              JBP <span className="text-orange-end">Deals</span>
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-32 py-3 border border-border-color rounded-full leading-5 bg-background placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm"
              placeholder="Search for restaurants, spas, gyms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute inset-y-1 right-1 px-6 bg-primary hover:bg-accent text-card text-sm font-medium rounded-full transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            {/* Mobile Search Icon */}
            <button 
              onClick={toggleSearch}
              className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
            >
              {isSearchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
            </button>
            
            <button className="p-2 text-text-secondary hover:text-primary transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-discount rounded-full border-2 border-card"></span>
            </button>

            {user ? (
              <div className="relative cursor-pointer hidden sm:block" ref={dropdownRef}>
                <div 
                  className={`flex items-center gap-2 p-1 border rounded-full hover:shadow-md transition-all ${isDropdownOpen ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border-color'}`}
                  onClick={toggleDropdown}
                >
                  <img src={user.avatar} alt="User avatar" className="w-8 h-8 rounded-full border border-border-color" />
                  <span className="text-sm font-medium text-text-primary px-1 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-text-secondary mr-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-xl border border-border-color py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-4 py-2 border-b border-border-color mb-1">
                      <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Account</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-background hover:text-primary transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} /> Dashboard
                    </Link>
                    <Link 
                      to="/dashboard?tab=saved" 
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-background hover:text-primary transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Bookmark size={16} /> Saved Offers
                    </Link>
                    <Link 
                      to="/dashboard?tab=redeemed" 
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-background hover:text-primary transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Ticket size={16} /> My Rewards
                    </Link>
                    <hr className="my-1 border-border-color" />
                    <button 
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-discount hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-primary px-3 py-2 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="text-sm font-medium bg-primary text-card px-5 py-2 rounded-full hover:bg-accent hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleDrawer}
              className="p-2 md:hidden text-text-secondary hover:text-primary transition-colors"
            >
              {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchOpen && (
          <div className="md:hidden pt-2 pb-4 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                type="text"
                autoFocus
                className="block w-full pl-10 pr-4 py-3 border border-border-color rounded-2xl leading-5 bg-background placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                placeholder="Search for offers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>

      {/* Layer 3: Category Strip (Desktop) */}
      <div className="border-t border-border-color bg-card relative shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto hide-scrollbar py-3 gap-6">
            <Link to="/offers" className="flex items-center gap-2 text-text-secondary hover:text-primary font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0">
              <Menu size={16} /> All Categories
            </Link>
            <div className="h-4 w-px bg-border-color flex-shrink-0"></div>
            {MOCK_CATEGORIES.map(category => (
              <Link 
                key={category.id} 
                to={`/offers?category=${category.id}`}
                className="text-text-secondary hover:text-accent font-medium text-sm whitespace-nowrap transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Mobile Drawer Content */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-card z-[70] md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border-color flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-start to-orange-end rounded-lg flex items-center justify-center text-card font-bold text-lg shadow-md">JD</div>
            <span className="font-bold text-xl text-primary">JBP <span className="text-orange-end">Deals</span></span>
          </Link>
          <button onClick={toggleDrawer} className="p-2 text-text-secondary hover:text-discount transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info in Drawer */}
        {user ? (
          <div className="p-6 bg-background/50 border-b border-border-color">
            <div className="flex items-center gap-3 mb-4">
              <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-primary/20 shadow-sm" alt={user.name} />
              <div>
                <p className="font-bold text-text-primary leading-tight">{user.name}</p>
                <p className="text-xs text-text-secondary">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard" className="flex flex-col items-center justify-center p-2 bg-card rounded-xl border border-border-color hover:border-primary transition-colors gap-1">
                <Bookmark size={18} className="text-primary" />
                <span className="text-[10px] font-bold uppercase text-text-secondary">Saved</span>
              </Link>
              <Link to="/dashboard?tab=redeemed" className="flex flex-col items-center justify-center p-2 bg-card rounded-xl border border-border-color hover:border-primary transition-colors gap-1">
                <Ticket size={18} className="text-orange-start" />
                <span className="text-[10px] font-bold uppercase text-text-secondary">Codes</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-border-color flex flex-col gap-3">
            <Link to="/login" className="w-full text-center py-3 border border-border-color rounded-xl font-bold text-text-primary hover:bg-background transition-colors">Login</Link>
            <Link to="/signup" className="w-full text-center py-3 bg-primary text-card rounded-xl font-bold hover:shadow-lg transition-all">Join Now</Link>
          </div>
        )}

        {/* Drawer Links */}
        <div className="flex-grow py-4 overflow-y-auto">
          <div className="px-6 mb-2">
            <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[2px]">Quick Menu</h3>
          </div>
          <nav className="space-y-1">
            <Link to="/" className="flex items-center gap-4 px-6 py-3 text-text-primary hover:bg-background transition-colors font-medium">
              <Home size={20} className="text-primary" /> Home
            </Link>
            <Link to="/offers" className="flex items-center gap-4 px-6 py-3 text-text-primary hover:bg-background transition-colors font-medium">
              <Search size={20} className="text-primary" /> Explore Offers
            </Link>
            <Link to="/offers" className="flex items-center gap-4 px-6 py-3 text-text-primary hover:bg-background transition-colors font-medium">
              <Briefcase size={20} className="text-primary" /> Categories
            </Link>
          </nav>

          <div className="mt-6 px-6 mb-2">
            <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[2px]">Popular Categories</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 px-6">
            {MOCK_CATEGORIES.slice(0, 6).map(category => (
              <Link 
                key={category.id} 
                to={`/offers?category=${category.id}`}
                className="p-2 text-xs font-semibold text-text-secondary bg-background rounded-lg hover:text-primary hover:bg-primary/5 transition-all text-center border border-border-color/50"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-border-color bg-gray-50/50">
          <Link to="/business/join" className="flex items-center gap-3 p-3 bg-card border border-border-color rounded-xl mb-4 hover:shadow-sm transition-shadow">
            <div className="p-2 bg-orange-start/10 rounded-lg"><Briefcase size={18} className="text-orange-start" /></div>
            <div>
              <p className="text-xs font-bold text-text-primary">Sell on JBP Deals</p>
              <p className="text-[10px] text-text-secondary">Onboard your business</p>
            </div>
          </Link>
          
          {user && (
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 p-3 text-discount font-bold border border-discount/20 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

