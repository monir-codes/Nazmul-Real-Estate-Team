const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching team members' });
  }
};

// @desc    Add a team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = async (req, res) => {
  try {
    const newMember = await TeamMember.create(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: 'Server error creating team member' });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    
    await member.deleteOne();
    res.json({ message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting team member' });
  }
};
