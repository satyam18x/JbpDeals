const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Deal = require('./models/Deal');
const connectDB = require('./config/db');

dotenv.config();

const deals = [
  {
    title: 'Buy 1 Get 1 Free on Whopper',
    description: 'Get a free Whopper with the purchase of any Whopper meal. Valid only for dine-in.',
    price: 450,
    discount: 'BOGO',
    link: 'https://www.burgerking.in/',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60',
    category: 'Food & Dining',
    businessName: 'Burger King - Civil Lines',
    isFeatured: true,
    expiryDate: new Date(Date.now() + 86400000 * 2)
  },
  {
    title: 'Flat 50% Off Annual Membership',
    description: 'Join Gold Gym today and get 50% off on your annual subscription. Includes free dietician consultation.',
    price: 15000,
    discount: '50% OFF',
    link: 'https://www.goldsgym.in/',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=60',
    category: 'Gym & Fitness',
    businessName: 'Gold Gym - Wright Town',
    isFeatured: true,
    expiryDate: new Date(Date.now() + 86400000 * 5)
  },
  {
    title: 'Free Hair Spa with Haircut',
    description: 'Get a complimentary relaxing Hair Spa worth ₹1500 with any premium haircut.',
    price: 800,
    discount: 'FREE SPA',
    link: 'https://www.loreal.com/',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&auto=format&fit=crop&q=60',
    category: 'Salons & Spa',
    businessName: 'Loreal Salon - Sadar',
    isFeatured: false,
    expiryDate: new Date(Date.now() + 86400000 * 1)
  },
  {
    title: '₹500 Off on Bill of ₹2500',
    description: 'Shop for ₹2500 or more and get an instant discount of ₹500 at checkout.',
    price: 2500,
    discount: '₹500 OFF',
    link: 'https://www.westside.com/',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&auto=format&fit=crop&q=60',
    category: 'Shopping',
    businessName: 'Westside - South Avenue Mall',
    isFeatured: true,
    expiryDate: new Date(Date.now() + 86400000 * 10)
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await Deal.deleteMany();
    await Deal.insertMany(deals);

    console.log('✅ Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
