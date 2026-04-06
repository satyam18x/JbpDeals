// Mock data for the Local Offers Platform

export const MOCK_CATEGORIES = [
  { id: 'c1', name: 'Food & Dining', icon: 'Utensils' },
  { id: 'c2', name: 'Salons & Spa', icon: 'Scissors' },
  { id: 'c3', name: 'Gym & Fitness', icon: 'Dumbbell' },
  { id: 'c4', name: 'Shopping', icon: 'ShoppingBag' },
  { id: 'c5', name: 'Health', icon: 'HeartPulse' },
  { id: 'c6', name: 'Entertainment', icon: 'Ticket' },
  { id: 'c7', name: 'Automotive', icon: 'Car' },
  { id: 'c8', name: 'Services', icon: 'Wrench' },
];

export const MOCK_BUSINESSES = [
  {
    id: 'b1',
    name: 'Burger King - Civil Lines',
    description: 'Fresh and delicious burgers, fries, and shakes in the heart of Jabalpur.',
    banner: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=60',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BK&backgroundColor=1E3A8A',
    stats: { totalRedeemed: 1240, rating: 4.5 },
    category: 'Food & Dining'
  },
  {
    id: 'b2',
    name: 'Gold Gym - Wright Town',
    description: 'Premium fitness center with state-of-the-art equipment and professional trainers.',
    banner: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GG&backgroundColor=1E3A8A',
    stats: { totalRedeemed: 340, rating: 4.8 },
    category: 'Gym & Fitness'
  },
  {
    id: 'b3',
    name: 'Loreal Salon - Sadar',
    description: 'Luxury hair and beauty treatments by certified professionals.',
    banner: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=LS&backgroundColor=1E3A8A',
    stats: { totalRedeemed: 890, rating: 4.6 },
    category: 'Salons & Spa'
  },
  {
    id: 'b4',
    name: 'Westside - South Avenue Mall',
    description: 'Trendy clothing, footwear, and accessories for the whole family.',
    banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=60',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=WS&backgroundColor=1E3A8A',
    stats: { totalRedeemed: 2100, rating: 4.3 },
    category: 'Shopping'
  }
];

export const MOCK_OFFERS = [
  {
    id: 'o1',
    businessId: 'b1',
    title: 'Buy 1 Get 1 Free on Whopper',
    discount: 'BOGO',
    description: 'Get a free Whopper with the purchase of any Whopper meal. Valid only for dine-in.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60',
    categoryId: 'c1',
    expiryDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    isFeatured: true,
  },
  {
    id: 'o2',
    businessId: 'b2',
    title: 'Flat 50% Off Annual Membership',
    discount: '50% OFF',
    description: 'Join Gold Gym today and get 50% off on your annual subscription. Includes free dietician consultation.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=60',
    categoryId: 'c3',
    expiryDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    isFeatured: true,
  },
  {
    id: 'o3',
    businessId: 'b3',
    title: 'Free Hair Spa with Haircut',
    discount: 'FREE SPA',
    description: 'Get a complimentary relaxing Hair Spa worth ₹1500 with any premium haircut.',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&auto=format&fit=crop&q=60',
    categoryId: 'c2',
    expiryDate: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
    isFeatured: false,
  },
  {
    id: 'o4',
    businessId: 'b4',
    title: '₹500 Off on Bill of ₹2500',
    discount: '₹500 OFF',
    description: 'Shop for ₹2500 or more and get an instant discount of ₹500 at checkout.',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&auto=format&fit=crop&q=60',
    categoryId: 'c4',
    expiryDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
    isFeatured: true,
  },
  {
    id: 'o5',
    businessId: 'b1',
    title: '20% Off on Family Meals',
    discount: '20% OFF',
    description: 'Enjoy a delicious meal with your family and get a flat 20% discount on orders above ₹800.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=60',
    categoryId: 'c1',
    expiryDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    isFeatured: false,
  }
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 9876543210',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
};
