const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Seed initial admin user for development
const seedAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({ email: 'admin@nazmulrealestate.com' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@nazmulrealestate.com',
      password: 'password123',
      role: 'admin'
    });
    res.status(201).json({ message: 'Admin seeded', email: admin.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role: 'client' });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedProperties');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      savedProperties: user.savedProperties
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  const { propertyId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const index = user.savedProperties.indexOf(propertyId);
    if (index === -1) {
      user.savedProperties.push(propertyId);
    } else {
      user.savedProperties.splice(index, 1);
    }
    
    await user.save();
    res.json(user.savedProperties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const googleAuth = async (req, res) => {
  const { name, email, uid } = req.body;
  try {
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create user using a random secure password since they use Google to login
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      user = await User.create({ name, email, password: randomPassword, role: 'client' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { loginUser, registerUser, getProfile, toggleFavorite, seedAdmin, googleAuth };
