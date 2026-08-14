const express = require('express');
const router = express.Router();
const { getTeamMembers, createTeamMember, deleteTeamMember, updateTeamMember } = require('../controllers/teamController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getTeamMembers)
  .post(createTeamMember);

router.route('/:id')
  .delete(protect, deleteTeamMember)
  .put(protect, updateTeamMember);

module.exports = router;
