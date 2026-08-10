const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getProfile, updateProfile, toggleFavorite, seedAdmin, googleAuth } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);
router.post('/favorites', protect, toggleFavorite);
router.post('/seed', seedAdmin);

module.exports = router;
