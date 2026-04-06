import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedOffers, setSavedOffers] = useState([]);
  const [redeemedCodes, setRedeemedCodes] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('jbpDeals_user');
    const storedRedeemed = localStorage.getItem('jbpDeals_redeemedCodes');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.savedDeals) {
        setSavedOffers(parsedUser.savedDeals.map(id => String(id)));
      }
    }
    if (storedRedeemed) setRedeemedCodes(JSON.parse(storedRedeemed));
  }, []);

  // Sync user and their saved offers from backend if logged in
  useEffect(() => {
    if (user && user.token) {
      const fetchUserData = async () => {
        try {
          const profile = await api.getProfile();
          if (profile && profile.savedDeals) {
            setSavedOffers(profile.savedDeals.map(id => String(id)));
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      };
      fetchUserData();
    }
  }, [user?.token]);

  // Save to local storage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('jbpDeals_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jbpDeals_user');
      localStorage.removeItem('jbpDeals_savedOffers');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('jbpDeals_redeemedCodes', JSON.stringify(redeemedCodes));
  }, [redeemedCodes]);

  const login = async (email, password) => {
    try {
      const data = await api.login({ email, password });
      if (data.token) {
        setUser(data);
        if (data.savedDeals) setSavedOffers(data.savedDeals.map(id => String(id)));
        return { success: true };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again later.' };
    }
  };

  const signup = async (userData) => {
    try {
      const data = await api.signup(userData);
      if (data.token) {
        setUser(data);
        if (data.savedDeals) setSavedOffers(data.savedDeals.map(id => String(id)));
        return { success: true };
      }
      return { success: false, message: data.message || 'Signup failed' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error. Please try again later.' };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const data = await api.googleLogin(credential);
      if (data.token) {
        setUser(data);
        if (data.savedDeals) setSavedOffers(data.savedDeals.map(id => String(id)));
        return { success: true };
      }
      return { success: false, message: data.message || 'Google Login failed' };
    } catch (error) {
      console.error('Google Login error:', error);
      return { success: false, message: 'Network error. Please try again later.' };
    }
  };

  const logout = () => {
    setUser(null);
    setSavedOffers([]);
  };

  const toggleSaveOffer = async (offerId) => {
    if (!user) return { success: false, message: 'Please login to save deals' };

    try {
      console.log('--- Bookmark Toggle Diagnostic ---');
      console.log('Offer ID to save:', offerId);
      const data = await api.saveDeal(offerId);
      console.log('Server response:', data);

      if (data.savedDeals) {
        setSavedOffers(data.savedDeals.map(id => String(id)));
        // Update user in local storage too
        setUser(prev => ({ ...prev, savedDeals: data.savedDeals }));
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Unknown server error' };
    } catch (error) {
      console.error('Bookmark system error:', error);
      return { success: false, message: 'Network or system error' };
    }
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
      user, login, signup, googleLogin, logout,
      savedOffers, toggleSaveOffer,
      redeemedCodes, redeemOffer
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
