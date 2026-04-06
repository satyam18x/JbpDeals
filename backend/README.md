# JBP Deals - Backend API

This is the production-ready backend for the JBP Deals/Coupon web app, built with Node.js, Express, and MongoDB.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT (JSON Web Tokens) & Bcryptjs
- **Environment**: Dotenv

## Project Structure
```text
backend/
├── config/             # Configuration files (DB connection)
├── controllers/        # Request handlers (Business logic)
├── middleware/         # Custom middleware (Auth, Error handling)
├── models/             # Mongoose schemas
├── routes/             # API entry points
├── utils/              # Utility functions (Token generation)
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── server.js           # App entry point
```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### User (Protected)
- `GET /api/user/profile` - Get current user profile
- `POST /api/user/save-deal/:id` - Save a deal to user's list
- `GET /api/user/saved-deals` - Get all saved deals for current user

### Deals
- `GET /api/deals` - Get all deals (Public)
- `GET /api/deals/:id` - Get single deal details (Public)
- `POST /api/deals` - Create a new deal (Protected)
- `DELETE /api/deals/:id` - Remove a deal (Protected)

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**:
   Update the `.env` file with your MongoDB connection string and a secure JWT secret:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

3. **Run the Server**:
   - For development (auto-reload): `npm run dev`
   - For production: `npm start`

## Integration with Frontend
The backend is configured with **CORS** enabled, so your frontend can communicate with it from different origins.
By default, the server runs on `http://localhost:5000`.
Use the `Authorization: Bearer <token>` header for protected routes.
