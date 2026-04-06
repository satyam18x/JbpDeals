import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Tag, Share2, Bookmark, BookmarkCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MOCK_OFFERS, MOCK_BUSINESSES } from '../data/mockData';

const OfferDetail = () => {
  const { id } = useParams();
  const { user, savedOffers, toggleSaveOffer, redeemOffer, redeemedCodes } = useAppContext();
  
  const [offer, setOffer] = useState(null);
  const [business, setBusiness] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [redeemedCode, setRedeemedCode] = useState(null);

  useEffect(() => {
    const foundOffer = MOCK_OFFERS.find(o => o.id === id);
    if (foundOffer) {
      setOffer(foundOffer);
      setBusiness(MOCK_BUSINESSES.find(b => b.id === foundOffer.businessId));
      
      // Check if already redeemed
      const existing = redeemedCodes.find(r => r.offerId === foundOffer.id);
      if (existing) setRedeemedCode(existing.code);
    }
  }, [id, redeemedCodes]);

  useEffect(() => {
    if (!offer) return;
    
    const calculateTimeLeft = () => {
      const difference = new Date(offer.expiryDate) - new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        return days > 0 ? `${days} days ${hours} hours left` : `${hours} hours left`;
      }
      return 'Expired';
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
    return () => clearInterval(timer);
  }, [offer]);

  if (!offer || !business) {
    return <div className="p-20 text-center text-text-secondary text-lg">Offer not found...</div>;
  }

  const isSaved = savedOffers.includes(offer.id);

  const handleRedeem = () => {
    const code = redeemOffer(offer.id);
    setRedeemedCode(code);
    setShowModal(true);
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Banner Area */}
      <div className="relative h-[40vh] md:h-[50vh] w-full max-w-7xl mx-auto md:mt-6 md:rounded-[2rem] overflow-hidden shadow-sm">
        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent"></div>
        
        {/* Top Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button className="p-3 bg-card/20 backdrop-blur-md rounded-full text-card hover:bg-card hover:text-primary transition-colors shadow-sm">
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => user ? toggleSaveOffer(offer.id) : alert('Login required')}
            className="p-3 bg-card/20 backdrop-blur-md rounded-full text-card hover:bg-card hover:text-accent transition-colors shadow-sm"
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        {/* Banner Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-card">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-discount text-card px-3 py-1 rounded-md font-bold text-sm">
              {offer.discount}
            </span>
            <span className="flex items-center gap-1 text-sm bg-card/20 backdrop-blur-sm px-3 py-1 rounded-md">
              <Clock className="w-4 h-4" /> {timeLeft}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight drop-shadow-md">
            {offer.title}
          </h1>
          <Link to={`/business/${business.id}`} className="flex items-center gap-2 text-card/90 hover:text-card transition-colors w-fit group">
            <img src={business.logo} alt={business.name} className="w-6 h-6 rounded-full border border-card/50" />
            <span className="font-medium text-lg border-b border-transparent group-hover:border-card">{business.name}</span>
            <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border-color mb-8 relative">
          
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-text-primary">
            <Info className="text-primary w-5 h-5" /> About this Offer
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            {offer.description}
          </p>

          <div className="h-px w-full bg-border-color my-6"></div>

          {user ? (
            // Logged In Content
            <div className="animate-in fade-in duration-500">
              <h3 className="font-bold text-lg mb-4 text-text-primary">How to Use</h3>
              <ul className="space-y-3 mb-8 text-text-secondary">
                <li className="flex gap-3 items-start">
                  <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</span>
                  Click on the "Get Code" button below to generate your unique coupon code.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</span>
                  Visit {business.name} and show the code at the billing counter.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</span>
                  The discount will be applied directly to your final bill.
                </li>
              </ul>

              <div className="p-5 bg-gradient-to-r from-orange-start/10 to-orange-end/10 rounded-2xl border border-orange-start/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-text-primary mb-1">Ready to redeem?</h4>
                  <p className="text-sm text-text-secondary">Make sure you are at the store before generating the code.</p>
                </div>
                <button 
                  onClick={handleRedeem}
                  disabled={timeLeft === 'Expired'}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-lg shadow-md transition-all ${
                    timeLeft === 'Expired' 
                      ? 'bg-border-color text-text-secondary cursor-not-allowed' 
                      : redeemedCode 
                        ? 'bg-success text-card hover:bg-emerald-600'
                        : 'bg-primary text-card hover:bg-accent hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {timeLeft === 'Expired' ? 'Expired' : redeemedCode ? 'View Code' : 'Get Code'}
                </button>
              </div>
            </div>
          ) : (
            // Locked UI
            <div className="relative text-center py-12 px-4 rounded-2xl border-2 border-dashed border-border-color bg-gray-50/50">
              <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] rounded-2xl z-0"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <Tag className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Unlock Full Details</h3>
                <p className="text-text-secondary max-w-md mb-6">
                  Sign in to view the terms, how to use this offer, and generate your exclusive discount code. It's completely free!
                </p>
                <div className="flex gap-4">
                  <Link to="/login" className="px-8 py-3 bg-primary text-card rounded-full font-bold hover:bg-accent transition-colors shadow-md">
                    Login
                  </Link>
                  <Link to="/signup" className="px-8 py-3 border border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-colors">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/60 backdrop-blur-sm transition-opacity">
          <div className="bg-card rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-success text-card p-6 flex flex-col items-center text-center relative">
              <CheckCircle2 className="w-16 h-16 mb-2" />
              <h3 className="text-xl font-bold">Offer Unlocked!</h3>
              <p className="text-success-100/80 text-sm mt-1">Show this code at the billing counter</p>
              
              {/* Receipt edge zig-zag decoration */}
              <div className="absolute -bottom-2 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNSwxMCAxMCwwIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+')] bg-repeat-x z-10"></div>
            </div>
            
            <div className="p-8 pb-10 text-center bg-card">
              <p className="text-text-secondary text-sm font-medium mb-2 uppercase tracking-widest">Your Code</p>
              <div className="border border-dashed border-primary bg-primary/5 py-4 px-6 rounded-xl mb-6">
                <span className="text-4xl font-black tracking-widest text-primary drop-shadow-sm font-mono">
                  {redeemedCode}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-6 max-w-xs mx-auto">
                This code has been saved to your dashboard. Valid for one-time use only.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-background border border-border-color text-text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferDetail;
