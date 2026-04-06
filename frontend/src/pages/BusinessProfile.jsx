import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Ticket, Clock, CheckCircle2 } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_OFFERS, MOCK_CATEGORIES } from '../data/mockData';
import OfferCard from '../components/OfferCard';

const BusinessProfile = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [businessOffers, setBusinessOffers] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const foundBusiness = MOCK_BUSINESSES.find(b => b.id === id);
    if (foundBusiness) {
      setBusiness(foundBusiness);
      const offers = MOCK_OFFERS.filter(o => o.businessId === id);
      setBusinessOffers(offers);

      // Find category name
      const cat = MOCK_CATEGORIES.find(c => c.name === foundBusiness.category);
      if (cat) setCategoryName(cat.name);
    }
  }, [id]);

  if (!business) {
    return <div className="p-20 text-center text-text-secondary text-lg">Business not found...</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={business.banner} alt={business.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
        
        {/* Business Info Card */}
        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-lg border border-border-color mb-10 flex flex-col md:flex-row gap-8 items-start">
          <img 
            src={business.logo} 
            alt={business.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-md border-4 border-card object-cover bg-primary/5"
          />
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-black text-text-primary mb-2 flex items-center gap-2">
                  {business.name}
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-secondary">
                  <span className="flex items-center gap-1 bg-background px-3 py-1 rounded-full border border-border-color">
                    <MapPin className="w-4 h-4" /> Jabalpur
                  </span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {categoryName || business.category}
                  </span>
                </div>
              </div>
              
              {/* Stats block */}
              <div className="flex gap-6 bg-background p-4 rounded-2xl border border-border-color self-start">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 font-black text-lg text-text-primary">
                    <Star className="w-5 h-5 text-orange-end fill-orange-end" /> {business.stats.rating}
                  </div>
                  <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Rating</span>
                </div>
                <div className="w-px bg-border-color"></div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 font-black text-lg text-text-primary">
                    <Ticket className="w-5 h-5 text-accent" /> {business.stats.totalRedeemed}+
                  </div>
                  <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Redeemed</span>
                </div>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed text-lg max-w-3xl">
              {business.description}
            </p>
          </div>
        </div>

        {/* Offers Section */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-border-color pb-4">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
               Active Offers <span className="text-sm font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">{businessOffers.length}</span>
            </h2>
          </div>

          {businessOffers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {businessOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-3xl border border-border-color">
              <Clock className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No active offers right now</h3>
              <p className="text-text-secondary">Check back later for new deals from {business.name}.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BusinessProfile;
