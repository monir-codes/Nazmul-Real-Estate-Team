const express = require('express');
const router = express.Router();
const { getLeads, createLead, updateLeadStatus } = require('../controllers/leadController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(createLead).get(protect, admin, getLeads);
router.route('/:id').put(protect, admin, updateLeadStatus);

module.exports = router;
