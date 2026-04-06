const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('jbpDeals_user'));
  const headers = {
    'Content-Type': 'application/json',
  };
  if (user && user.token) {
    headers['Authorization'] = `Bearer ${user.token}`;
  }
  return headers;
};

export const api = {
  // Auth
  signup: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  googleLogin: async (credential) => {
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
    return res.json();
  },

  // Deals
  getDeals: async () => {
    const res = await fetch(`${API_BASE_URL}/deals`);
    return res.json();
  },

  getDealById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/deals/${id}`);
    return res.json();
  },

  // User
  getProfile: async () => {
    const res = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  saveDeal: async (dealId) => {
    const res = await fetch(`${API_BASE_URL}/user/save-deal/${dealId}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  getSavedDeals: async () => {
    const res = await fetch(`${API_BASE_URL}/user/saved-deals`, {
      headers: getHeaders(),
    });
    return res.json();
  },
};
