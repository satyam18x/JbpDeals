import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import OfferCard from '../components/OfferCard';
import { MOCK_OFFERS, MOCK_BUSINESSES, MOCK_CATEGORIES } from '../data/mockData';

const OffersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [filteredOffers, setFilteredOffers] = useState(MOCK_OFFERS);

  // Sync state with URL parameters (for back/forward navigation and Navbar search)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'all';
    setSearchQuery(q);
    setActiveCategory(category);
  }, [searchParams]);

  // Apply filters whenever local state changes
  useEffect(() => {
    let result = MOCK_OFFERS;

    if (activeCategory !== 'all') {
      result = result.filter(offer => offer.categoryId === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(offer => {
        const businessInfo = MOCK_BUSINESSES.find(b => b.id === offer.businessId);
        const matchTitle = offer.title.toLowerCase().includes(lowerQuery);
        const matchBusiness = businessInfo ? businessInfo.name.toLowerCase().includes(lowerQuery) : false;
        return matchTitle || matchBusiness;
      });
    }

    setFilteredOffers(result);
  }, [searchQuery, activeCategory]);

  const updateFilters = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === '' || newParams[key] === 'all') {
        params.delete(key);
      } else {
        params.set(key, newParams[key]);
      }
    });
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header and Search/Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary mb-2 tracking-tight">
            Explore Offers
          </h1>
          <p className="text-text-secondary text-sm font-medium">
            Showing {filteredOffers.length} exclusive deals for you
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          {/* Category Dropdown/Filter */}
          <div className="relative group min-w-[200px]">
            <select 
              className="appearance-none w-full bg-card border border-border-color text-text-primary py-2.5 pl-10 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer text-sm font-black tracking-wide"
              value={activeCategory}
              onChange={(e) => updateFilters({ category: e.target.value })}
            >
              <option value="all">All Categories</option>
              {MOCK_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      {filteredOffers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredOffers.map(offer => {
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
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-border-color border-dashed">
          <div className="bg-primary/5 p-4 rounded-full mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">No Offers Found</h3>
          <p className="text-text-secondary text-sm max-w-sm text-center">
            We couldn't find any deals matching your search "{searchQuery}". Try a different term or category.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-6 px-6 py-2 bg-primary text-card rounded-full font-medium hover:bg-accent transition-colors shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default OffersList;
