const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        savedDeals: user.savedDeals || [],
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        savedDeals: user.savedDeals || [],
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res, next) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // 1. Check if user already exists by googleId
    let user = await User.findOne({ googleId: sub });

    // 2. If not found by googleId, check if user exists by email (link accounts)
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        // Link googleId to existing email account
        user.googleId = sub;
        if (!user.picture) user.picture = picture;
        await user.save();
      }
    }

    // 3. If still not found, create a new user
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        picture,
        // Password and phone can be null/undefined for OAuth users
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      savedDeals: user.savedDeals || [],
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ success: false, message: 'Google authentication failed' });
  }
};

const testGoogleLogin = async (req, res) => {
  const sub = "test-sub-123";
  const email = "test@example.com";
  const name = "Test User";
  const picture = "http://test.com/pic.jpg";

  try {
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        user.googleId = sub;
        if (!user.picture) user.picture = picture;
        await user.save();
      }
    }
    if (!user) {
      user = await User.create({ name, email, googleId: sub, picture });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Mock Auth Error:', error);
    res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  testGoogleLogin,
};
