const express = require('express');
const router = express.Router();
const { getHeroImages, addHeroImage, deleteHeroImage } = require('../controllers/heroController');
const { protect } = require('../middleware/auth');

router.get('/', getHeroImages);
router.post('/', protect, addHeroImage);
router.delete('/:id', protect, deleteHeroImage);

module.exports = router;
