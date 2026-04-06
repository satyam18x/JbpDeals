const express = require('express');
const router = express.Router();
const { getDeals, getDealById, createDeal, deleteDeal } = require('../controllers/dealController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getDeals);
router.get('/:id', getDealById);
router.post('/', protect, createDeal); // Protected for now, can be restricted to Admin
router.delete('/:id', protect, deleteDeal);

module.exports = router;
