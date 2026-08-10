const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Toggle Ban status for a user
// @route   PUT /api/users/:id/ban
// @access  Private/Admin
const toggleBanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't allow banning another admin
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot ban an admin user' });
    }

    user.isBanned = !user.isBanned;
    await user.save();
    
    res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully`, isBanned: user.isBanned });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete an admin user' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getUsers, toggleBanUser, deleteUser };
