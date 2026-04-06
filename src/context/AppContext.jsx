import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedOffers, setSavedOffers] = useState([]);
  const [redeemedCodes, setRedeemedCodes] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('jbpDeals_user');
    const storedSaved = localStorage.getItem('jbpDeals_savedOffers');
    const storedRedeemed = localStorage.getItem('jbpDeals_redeemedCodes');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedSaved) setSavedOffers(JSON.parse(storedSaved));
    if (storedRedeemed) setRedeemedCodes(JSON.parse(storedRedeemed));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('jbpDeals_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jbpDeals_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('jbpDeals_savedOffers', JSON.stringify(savedOffers));
  }, [savedOffers]);

  useEffect(() => {
    localStorage.setItem('jbpDeals_redeemedCodes', JSON.stringify(redeemedCodes));
  }, [redeemedCodes]);

  const login = (email) => {
    // Simulate login
    setUser({ ...MOCK_USER, email: email || MOCK_USER.email });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSaveOffer = (offerId) => {
    setSavedOffers(prev => 
      prev.includes(offerId) 
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  const redeemOffer = (offerId) => {
    if (!redeemedCodes.find(item => item.offerId === offerId)) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      setRedeemedCodes(prev => [...prev, { offerId, code, date: new Date().toISOString() }]);
      return code;
    }
    return redeemedCodes.find(item => item.offerId === offerId).code;
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      savedOffers, toggleSaveOffer,
      redeemedCodes, redeemOffer
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
