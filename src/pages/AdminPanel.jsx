import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, ShoppingBag, Store, TrendingUp, Users, Trash2, Edit } from 'lucide-react';
import { MOCK_OFFERS, MOCK_BUSINESSES, MOCK_CATEGORIES } from '../data/mockData';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [offers, setOffers] = useState(MOCK_OFFERS);
  const [newOffer, setNewOffer] = useState({
    title: '',
    discount: '',
    businessId: 'b1',
    categoryId: 'c1',
    description: '',
    expiryDate: '',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'
  });

  const handleAddOffer = (e) => {
    e.preventDefault();
    const id = `o${offers.length + 1}`;
    setOffers([...offers, { ...newOffer, id, isFeatured: false }]);
    setActiveTab('manage');
    setNewOffer({
      title: '',
      discount: '',
      businessId: 'b1',
      categoryId: 'c1',
      description: '',
      expiryDate: '',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'
    });
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 w-full min-h-[80vh]">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Admin Sidebar / Mobile Nav */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-card rounded-2xl border border-border-color shadow-sm p-2 lg:p-4 lg:sticky lg:top-24">
            <h2 className="hidden lg:block text-sm font-bold text-text-secondary uppercase tracking-wider mb-6 px-4 pt-2">Merchant Console</h2>
            
            <nav className="flex flex-row lg:flex-col overflow-x-auto hide-scrollbar gap-1 lg:space-y-1">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap min-w-fit ${activeTab === 'dashboard' ? 'bg-primary text-card shadow-md scale-105 lg:scale-100' : 'text-text-secondary hover:bg-background'}`}
              >
                <LayoutDashboard size={20} /> <span className="text-sm lg:text-base">Dashboard</span>
              </button>
              <button 
                onClick={() => setActiveTab('add')}
                className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap min-w-fit ${activeTab === 'add' ? 'bg-primary text-card shadow-md scale-105 lg:scale-100' : 'text-text-secondary hover:bg-background'}`}
              >
                <PlusCircle size={20} /> <span className="text-sm lg:text-base">Add Offer</span>
              </button>
              <button 
                onClick={() => setActiveTab('manage')}
                className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap min-w-fit ${activeTab === 'manage' ? 'bg-primary text-card shadow-md scale-105 lg:scale-100' : 'text-text-secondary hover:bg-background'}`}
              >
                <ShoppingBag size={20} /> <span className="text-sm lg:text-base">Manage</span>
              </button>
              <button 
                onClick={() => setActiveTab('businesses')}
                className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap min-w-fit ${activeTab === 'businesses' ? 'bg-primary text-card shadow-md scale-105 lg:scale-100' : 'text-text-secondary hover:bg-background'}`}
              >
                <Store size={20} /> <span className="text-sm lg:text-base">Businesses</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Admin Area */}
        <div className="flex-grow">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-card p-4 md:p-6 rounded-2xl border border-border-color shadow-sm">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg"><ShoppingBag size={20} /></div>
                    <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">+12%</span>
                  </div>
                  <h3 className="text-text-secondary text-xs font-medium uppercase tracking-wider">Total Offers</h3>
                  <p className="text-xl md:text-2xl font-bold text-text-primary mt-1">{offers.length}</p>
                </div>

                <div className="bg-card p-4 md:p-6 rounded-2xl border border-border-color shadow-sm">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-2 bg-orange-start/10 text-orange-start rounded-lg"><TrendingUp size={20} /></div>
                    <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">+5.2%</span>
                  </div>
                  <h3 className="text-text-secondary text-xs font-medium uppercase tracking-wider">Redemptions</h3>
                  <p className="text-xl md:text-2xl font-bold text-text-primary mt-1">4,281</p>
                </div>

                <div className="bg-card p-4 md:p-6 rounded-2xl border border-border-color shadow-sm">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-2 bg-accent/10 text-accent rounded-lg"><Users size={20} /></div>
                    <span className="text-[10px] font-bold text-discount bg-discount/10 px-2 py-0.5 rounded-full">-2%</span>
                  </div>
                  <h3 className="text-text-secondary text-xs font-medium uppercase tracking-wider">Active Users</h3>
                  <p className="text-xl md:text-2xl font-bold text-text-primary mt-1">12,402</p>
                </div>

                <div className="bg-card p-4 md:p-6 rounded-2xl border border-border-color shadow-sm">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-2 bg-success/10 text-success rounded-lg"><Store size={20} /></div>
                    <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">+3</span>
                  </div>
                  <h3 className="text-text-secondary text-xs font-medium uppercase tracking-wider">Partners</h3>
                  <p className="text-xl md:text-2xl font-bold text-text-primary mt-1">{MOCK_BUSINESSES.length}</p>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border-color shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border-color">
                  <h3 className="font-bold text-text-primary">Recent Performance</h3>
                </div>
                <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-full h-32 md:h-40 flex items-end gap-1 md:gap-2 mb-4">
                    {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 40].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t-sm md:rounded-t-md hover:bg-primary transition-colors" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <p className="text-text-secondary text-xs md:text-sm">Monthly redemption trends (Simulated Data)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <div className="bg-card rounded-2xl border border-border-color shadow-sm max-w-2xl animate-in slide-in-from-bottom-4 duration-500">
              <div className="px-6 py-4 border-b border-border-color">
                <h3 className="font-bold text-text-primary">Create New Offer</h3>
              </div>
              <form onSubmit={handleAddOffer} className="p-4 md:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Offer Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 50% Off on Pizzas"
                      className="w-full px-4 py-2 text-sm rounded-lg border border-border-color focus:ring-2 focus:ring-primary/20 outline-none"
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Discount Text</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 50% OFF"
                      className="w-full px-4 py-2 text-sm rounded-lg border border-border-color focus:ring-2 focus:ring-primary/20 outline-none"
                      value={newOffer.discount}
                      onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Business</label>
                    <select 
                      className="w-full px-4 py-2 text-sm rounded-lg border border-border-color outline-none"
                      value={newOffer.businessId}
                      onChange={(e) => setNewOffer({...newOffer, businessId: e.target.value})}
                    >
                      {MOCK_BUSINESSES.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Category</label>
                    <select 
                      className="w-full px-4 py-2 text-sm rounded-lg border border-border-color outline-none"
                      value={newOffer.categoryId}
                      onChange={(e) => setNewOffer({...newOffer, categoryId: e.target.value})}
                    >
                      {MOCK_CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-secondary uppercase">Expiry Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg border border-border-color outline-none"
                    value={newOffer.expiryDate}
                    onChange={(e) => setNewOffer({...newOffer, expiryDate: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-secondary uppercase">Description</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell customers about the deal details, terms and conditions..."
                    className="w-full px-4 py-2 text-sm rounded-lg border border-border-color outline-none resize-none"
                    value={newOffer.description}
                    onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-3 bg-primary text-card font-bold rounded-xl hover:bg-accent transition-all shadow-md">
                    Publish Offer
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="bg-card rounded-2xl border border-border-color shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="px-6 py-4 border-b border-border-color flex justify-between items-center">
                <h3 className="font-bold text-text-primary">Manage Offers</h3>
                <span className="text-[10px] font-bold text-text-secondary uppercase">{offers.length} active</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase">Offer</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase">Business</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase">Status</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-color">
                    {offers.map(offer => {
                      const business = MOCK_BUSINESSES.find(b => b.id === offer.businessId);
                      return (
                        <tr key={offer.id} className="hover:bg-background/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={offer.image} className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="font-bold text-text-primary text-sm line-clamp-1">{offer.title}</p>
                                <p className="text-[10px] text-text-secondary">{offer.discount}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-text-secondary">
                            {business?.name}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 bg-success/10 text-success text-[8px] font-bold rounded-full uppercase">Live</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-1.5 text-text-secondary hover:text-primary transition-colors"><Edit size={16} /></button>
                              <button 
                                onClick={() => deleteOffer(offer.id)}
                                className="p-1.5 text-text-secondary hover:text-discount transition-colors"
                              ><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'businesses' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-500">
              {MOCK_BUSINESSES.map(business => (
                <div key={business.id} className="bg-card p-4 md:p-6 rounded-2xl border border-border-color shadow-sm flex items-center gap-4">
                  <img src={business.logo} className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm md:text-base text-text-primary">{business.name}</h4>
                    <p className="text-[10px] md:text-sm text-text-secondary line-clamp-1">{business.description}</p>
                    <div className="flex items-center gap-2 mt-1 md:mt-2">
                      <span className="text-[8px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">{business.category}</span>
                    </div>
                  </div>
                  <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                    <Edit size={18} />
                  </button>
                </div>
              ))}
              
              <button className="bg-background border-2 border-dashed border-border-color rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-card hover:border-primary/50 transition-all group">
                <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <PlusCircle size={20} className="text-primary" />
                </div>
                <span className="font-bold text-text-secondary text-[10px] uppercase tracking-wider">Onboard New</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
