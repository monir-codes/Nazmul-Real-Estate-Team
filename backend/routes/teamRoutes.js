const express = require('express');
const router = express.Router();
const { getTeamMembers, createTeamMember, deleteTeamMember } = require('../controllers/teamController');

router.route('/')
  .get(getTeamMembers)
  .post(createTeamMember);

router.route('/:id')
  .delete(deleteTeamMember);

module.exports = router;
