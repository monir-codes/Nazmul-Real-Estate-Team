const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getProfile, toggleFavorite, seedAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.post('/favorites', protect, toggleFavorite);
router.post('/seed', seedAdmin);

module.exports = router;
