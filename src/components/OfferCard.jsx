import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const OfferCard = ({ offer, business }) => {
  const { savedOffers, toggleSaveOffer, user } = useAppContext();
  const [timeLeft, setTimeLeft] = useState('');
  
  const isSaved = savedOffers.includes(offer.id);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(offer.expiryDate) - new Date();
      let timeLeftText = '';

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);

        if (days > 0) {
          timeLeftText = `${days}d ${hours}h`;
        } else {
          timeLeftText = `${hours}h ${minutes}m`;
        }
      } else {
        timeLeftText = 'Expired';
      }
      return timeLeftText;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, [offer.expiryDate]);

  const handleSave = (e) => {
    e.preventDefault(); // Prevent navigating to offer detail when clicking save
    if (user) {
      toggleSaveOffer(offer.id);
    } else {
      alert("Please login to save offers."); // Minimal interaction handling
    }
  };

  return (
    <Link 
      to={`/offer/${offer.id}`}
      className="group bg-card rounded-2xl overflow-hidden border border-border-color shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container with Zoom effect */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-discount text-card px-3 py-1 rounded-full font-bold text-sm shadow-md">
          {offer.discount}
        </div>

        {/* Save/Bookmark Button */}
        <button 
          onClick={handleSave}
          className="absolute top-3 right-3 p-2 bg-card/80 backdrop-blur-sm rounded-full text-text-secondary hover:text-accent shadow-sm transition-colors z-10"
        >
          {isSaved ? (
             <BookmarkCheck className="w-5 h-5 text-accent fill-accent/20" />
          ) : (
             <Bookmark className="w-5 h-5" />
          )}
        </button>

        {/* Countdown Timer - Segmented Style */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/20 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-orange-end animate-pulse" />
          <span className="text-xs font-semibold text-text-primary tracking-wide">
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-text-primary text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {offer.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3 mt-auto">
          {business?.logo ? (
            <img src={business.logo} alt={business.name} className="w-6 h-6 rounded-full border border-border-color" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-primary" />
            </div>
          )}
          <span className="text-sm font-medium text-text-secondary truncate">
            {business?.name || 'Local Business'}
          </span>
        </div>

        <div className="border-t border-border-color/60 pt-3 mt-2 flex justify-between items-center">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
            Limited Time
          </span>
          <button className="text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 px-4 py-1.5 rounded-lg transition-colors group-hover:bg-primary group-hover:text-card">
            View Deal
          </button>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
