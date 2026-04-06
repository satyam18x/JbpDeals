import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Scissors, Dumbbell, Utensils, ShoppingBag } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import OfferCard from '../components/OfferCard';
import { MOCK_OFFERS, MOCK_CATEGORIES, MOCK_BUSINESSES } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const ICONS = {
  Utensils: <Utensils size={28} className="text-orange-end" />,
  Scissors: <Scissors size={28} className="text-primary" />,
  Dumbbell: <Dumbbell size={28} className="text-success" />,
  ShoppingBag: <ShoppingBag size={28} className="text-accent" />,
  // fallback icon
  default: <Sparkles size={28} className="text-text-secondary" />
};

const SectionHeader = ({ title, link, linkText = "View more" }) => (
  <div className="flex justify-between items-end mb-8 border-b border-border-color pb-4">
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary flex items-center gap-2 font-heading">
      <TrendingUp className="text-orange-end" /> {title}
    </h2>
    <Link to={link || "/offers"} className="text-accent hover:text-primary font-semibold text-sm flex items-center gap-1 group transition-colors">
      {linkText} <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const Home = () => {
  const { user } = useAppContext();
  // Get featured offers
  const featuredOffers = MOCK_OFFERS.filter(offer => offer.isFeatured).slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="w-full">
        <HeroSlider />
      </section>

      {/* Category Icons Strip */}
      <section className="bg-card py-2 md:py-3 shadow-sm border-y border-border-color overflow-hidden w-full">
          {/* Desktop/Tablet Strip (Centered & Scrollable) */}
          <div className="hidden sm:flex items-center overflow-x-auto hide-scrollbar pb-1 w-full">
            <div className="flex items-center gap-4 mx-auto px-10 min-w-max">
            {MOCK_CATEGORIES.map(category => (
              <Link
                key={category.id}
                to={`/offers?category=${category.id}`}
                className="flex items-center gap-2.5 px-5 py-2 bg-background border border-border-color rounded-full hover:border-accent hover:shadow-md hover:bg-accent/5 transition-all group shrink-0"
              >
                <div className="w-7 h-7 rounded-full bg-card border border-border-color flex items-center justify-center group-hover:border-accent/40 shadow-sm transition-all overflow-hidden p-0.5">
                  {/* Scaled icons for better fit */}
                  {React.cloneElement(ICONS[category.icon] || ICONS.default, { size: 16 })}
                </div>
                <span className="text-sm font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors whitespace-nowrap font-ui">
                  {category.name}
                </span>
              </Link>
            ))}
            </div>
          </div>

          {/* Mobile Grid (Non-scrollable) */}
          <div className="sm:hidden grid grid-cols-4 gap-y-4 gap-x-1">
            {MOCK_CATEGORIES.map(category => (
              <Link
                key={category.id}
                to={`/offers?category=${category.id}`}
                className="flex flex-col items-center gap-1.5 transition-all active:scale-95"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border-color flex items-center justify-center shadow-sm hover:border-accent transition-all">
                  {/* Smaller icons for mobile grid */}
                  {React.cloneElement(ICONS[category.icon] || ICONS.default, { size: 20 })}
                </div>
                <span className="text-[10px] font-bold tracking-tight text-text-primary text-center leading-tight font-ui">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
      </section>

      {/* Featured Offers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <SectionHeader 
          title="Trending Deals" 
          link={user ? "/offers" : "/login"} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {featuredOffers.map(offer => {
            const business = MOCK_BUSINESSES.find(b => b.id === offer.businessId);
            return (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                business={business} 
              />
            );
          })}
        </div>
      </section>

      {/* Promotional Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-16 relative overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e40af] to-orange-end opacity-90"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-14">
          <div className="text-card md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tighter drop-shadow-md font-heading">
              Unlock Exclusive VIP Privileges
            </h2>
            <p className="text-lg text-card/90 font-medium max-w-xl">
              Join thousands of members enjoying the best deals in Jabalpur. Sign up to unlock extra 10% off on your first redemption.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-end">
            <Link 
              to={user ? "/offers" : "/signup"} 
              className="px-8 py-4 bg-card text-primary font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out"
            >
              {user ? "Explore Deals" : "Unlock All Offers"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
