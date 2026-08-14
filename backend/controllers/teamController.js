const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: -1 });
    return res.json(team);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching team members' });
  }
};

// @desc    Add a team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = async (req, res) => {
  try {
    const newMember = await TeamMember.create(req.body);
    return res.status(201).json(newMember);
  } catch (error) {
    return res.status(500).json({ error: 'Server error creating team member' });
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
    return res.json({ message: 'Team member removed' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error deleting team member' });
  }
// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private/Admin
exports.updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ error: 'Not found' });
    
    return res.json(member);
  } catch (error) {
    return res.status(500).json({ error: 'Server error updating team member' });
  }
};
