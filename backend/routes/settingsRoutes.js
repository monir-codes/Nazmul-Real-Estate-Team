const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getGlobalSettings, updateGlobalSettings } = require('../controllers/settingsController');
// const { protect, admin } = require('../middleware/auth'); // Removing auth for demo purposes

router.route('/global').get(getGlobalSettings).put(updateGlobalSettings);
router.route('/').get(getSettings);
router.route('/:page').put(updateSettings);

module.exports = router;
