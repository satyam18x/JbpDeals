const User = require('../models/User');
const Deal = require('../models/Deal');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        savedDeals: user.savedDeals,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Save a deal
// @route   POST /api/user/save-deal/:id
// @access  Private
const mongoose = require('mongoose');

const saveDeal = async (req, res) => {
  try {
    const userId = req.user._id;
    const dealId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(dealId)) {
      return res.status(400).json({ success: false, message: 'Invalid deal ID format' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify deal existence
    const dealExists = await Deal.exists({ _id: dealId });
    if (!dealExists) {
      return res.status(404).json({ success: false, message: 'Deal not found in database' });
    }

    // Toggle logic: If exists, remove. If not, add.
    const isSaved = user.savedDeals.some(id => id.toString() === dealId);
    
    let updatedUser;
    if (isSaved) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedDeals: dealId } },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedDeals: dealId } },
        { new: true }
      );
    }

    const savedDealsStrings = updatedUser.savedDeals.map(id => id.toString());

    res.status(200).json({ 
      success: true, 
      message: isSaved ? 'Deal removed' : 'Deal saved', 
      savedDeals: savedDealsStrings
    });
  } catch (error) {
    console.error('Save Deal Error:', error);
    res.status(500).json({ success: false, message: 'Server error during save operation' });
  }
};

// @desc    Get saved deals
// @route   GET /api/user/saved-deals
// @access  Private
const getSavedDeals = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('savedDeals');

    if (user) {
      res.json(user.savedDeals);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  saveDeal,
  getSavedDeals,
};
