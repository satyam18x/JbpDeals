import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { User, Settings, Bookmark, Ticket, LogOut, ChevronRight, Edit3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_OFFERS, MOCK_BUSINESSES } from '../data/mockData';
import OfferCard from '../components/OfferCard';

const Dashboard = () => {
  const { user, logout, savedOffers, redeemedCodes } = useAppContext();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' or 'redeemed'

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Get full offer objects for saved items
  const savedOfferItems = savedOffers
    .map(id => MOCK_OFFERS.find(o => o.id === id))
    .filter(Boolean);

  // Get full offer objects for redeemed items
  const redeemedOfferItems = redeemedCodes
    .map(item => {
      const offer = MOCK_OFFERS.find(o => o.id === item.offerId);
      return offer ? { ...offer, code: item.code, redeemedAt: item.date } : null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.redeemedAt) - new Date(a.redeemedAt));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 w-full min-h-[80vh]">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Sidebar / Mobile Nav */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-card rounded-3xl p-2 md:p-6 border border-border-color shadow-sm md:sticky md:top-24">
            {/* Desktop Profile Info */}
            <div className="hidden md:flex flex-col items-center text-center pb-6 border-b border-border-color relative">
              <button className="absolute top-0 right-0 p-2 text-text-secondary hover:text-primary bg-background rounded-full transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-background shadow-md mb-4" />
              <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
              <p className="text-sm text-text-secondary mb-2">{user.email}</p>
              <div className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                VIP Member
              </div>
            </div>

            {/* Navigation - Vertical on Desktop, Horizontal on Mobile */}
            <div className="flex flex-row md:flex-col overflow-x-auto hide-scrollbar md:py-4 gap-2">
              <button 
                onClick={() => setActiveTab('saved')}
                className={`flex-1 md:w-full flex items-center justify-center md:justify-between p-3 rounded-xl transition-all whitespace-nowrap min-w-fit ${activeTab === 'saved' ? 'bg-primary text-card font-semibold shadow-md md:shadow-sm scale-[1.02] md:scale-100' : 'text-text-secondary hover:bg-background'}`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <Bookmark className="w-5 h-5" /> <span className="text-sm md:text-base">Saved</span>
                </div>
                <span className={`hidden md:inline text-xs px-2 py-0.5 rounded-full ${activeTab === 'saved' ? 'bg-card/20' : 'bg-background'}`}>
                  {savedOffers.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveTab('redeemed')}
                className={`flex-1 md:w-full flex items-center justify-center md:justify-between p-3 rounded-xl transition-all whitespace-nowrap min-w-fit ${activeTab === 'redeemed' ? 'bg-primary text-card font-semibold shadow-md md:shadow-sm scale-[1.02] md:scale-100' : 'text-text-secondary hover:bg-background'}`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <Ticket className="w-5 h-5" /> <span className="text-sm md:text-base">Codes</span>
                </div>
                <span className={`hidden md:inline text-xs px-2 py-0.5 rounded-full ${activeTab === 'redeemed' ? 'bg-card/20' : 'bg-background'}`}>
                  {redeemedCodes.length}
                </span>
              </button>

              <button className="flex-1 md:w-full flex items-center justify-center md:justify-start gap-2 md:gap-3 p-3 rounded-xl text-text-secondary hover:bg-background transition-colors whitespace-nowrap min-w-fit">
                <Settings className="w-5 h-5" /> <span className="text-sm md:text-base">Settings</span>
              </button>

              {/* Sign Out only in desktop sidebar list */}
              <button 
                onClick={logout}
                className="hidden md:flex w-full items-center justify-center gap-2 p-3 mt-4 text-discount font-medium hover:bg-red-50 rounded-xl transition-colors border-t border-border-color pt-6"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          <div className="border-b border-border-color pb-4 mb-6 md:mb-8 flex justify-between items-end">
            <h1 className="text-xl md:text-3xl font-black text-text-primary tracking-tight">
              {activeTab === 'saved' ? 'Saved Collections' : 'My Coupon Codes'}
            </h1>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full md:hidden">
              {activeTab === 'saved' ? savedOffers.length : redeemedCodes.length} Items
            </span>
          </div>

          {activeTab === 'saved' && (
            <div>
              {savedOfferItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedOfferItems.map(offer => {
                    const business = MOCK_BUSINESSES.find(b => b.id === offer.businessId);
                    return <OfferCard key={offer.id} offer={offer} business={business} />;
                  })}
                </div>
              ) : (
                <div className="bg-card border border-border-color border-dashed rounded-3xl p-12 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6">
                    <Bookmark className="w-10 h-10 text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">No saved offers yet</h3>
                  <p className="text-text-secondary mb-8 max-w-sm">
                    Browse the platform and save deals you like to access them quickly later.
                  </p>
                  <Link to="/offers" className="px-8 py-3 bg-primary text-card font-bold rounded-full hover:bg-accent transition-colors shadow-sm">
                    Explore Offers
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'redeemed' && (
            <div>
              {redeemedOfferItems.length > 0 ? (
                <div className="space-y-4">
                  {redeemedOfferItems.map((offer, idx) => {
                    const business = MOCK_BUSINESSES.find(b => b.id === offer.businessId);
                    return (
                      <div key={idx} className="bg-card border border-border-color rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                        <img src={offer.image} alt={offer.title} className="w-full sm:w-32 h-32 sm:h-24 object-cover rounded-xl" />
                        
                        <div className="flex-grow text-center sm:text-left">
                          <h3 className="font-bold text-lg text-text-primary mb-1">{offer.title}</h3>
                          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-text-secondary mb-3">
                            <img src={business?.logo} className="w-5 h-5 rounded-full" />
                            {business?.name}
                          </div>
                          <span className="text-xs bg-background px-3 py-1 rounded-full text-text-secondary border border-border-color">
                            Got on: {new Date(offer.redeemedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="w-full sm:w-auto p-4 border border-dashed border-primary bg-primary/5 rounded-xl text-center">
                          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Code</p>
                          <span className="text-2xl font-black font-mono text-primary tracking-widest">{offer.code}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-card border border-border-color border-dashed rounded-3xl p-12 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6">
                    <Ticket className="w-10 h-10 text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">No active codes</h3>
                  <p className="text-text-secondary mb-8 max-w-sm">
                    You haven't generated any discount codes yet. Find a deal and hit "Redeem".
                  </p>
                  <Link to="/offers" className="px-8 py-3 bg-primary text-card font-bold rounded-full hover:bg-accent transition-colors shadow-sm">
                    Find Deals
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
