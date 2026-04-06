const express = require('express');
const router = express.Router();
const { getUserProfile, saveDeal, getSavedDeals } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.post('/save-deal/:id', protect, saveDeal);
router.get('/saved-deals', protect, getSavedDeals);

module.exports = router;
