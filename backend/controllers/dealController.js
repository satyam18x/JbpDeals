const Deal = require('../models/Deal');

// @desc    Fetch all deals
// @route   GET /api/deals
// @access  Public
const getDeals = async (req, res, next) => {
  try {
    const deals = await Deal.find({});
    res.json(deals);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single deal
// @route   GET /api/deals/:id
// @access  Public
const getDealById = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (deal) {
      res.json(deal);
    } else {
      res.status(404);
      throw new Error('Deal not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a deal
// @route   POST /api/deals
// @access  Private/Admin (Currently just Private for simplicity)
const createDeal = async (req, res, next) => {
  const { title, description, price, discount, link, image, category, businessName, expiryDate, isFeatured } = req.body;

  try {
    const deal = new Deal({
      title,
      description,
      price,
      discount,
      link,
      image,
      category,
      businessName,
      expiryDate,
      isFeatured,
    });

    const createdDeal = await deal.save();
    res.status(201).json(createdDeal);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a deal
// @route   DELETE /api/deals/:id
// @access  Private/Admin
const deleteDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (deal) {
      await deal.deleteOne();
      res.json({ message: 'Deal removed' });
    } else {
      res.status(404);
      throw new Error('Deal not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDeals,
  getDealById,
  createDeal,
  deleteDeal,
};
