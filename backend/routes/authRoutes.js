const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin, testGoogleLogin } = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

module.exports = router;
