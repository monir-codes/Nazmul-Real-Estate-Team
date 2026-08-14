const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(helmet());
app.use('/api/', limiter);

const allowedOrigins = [
  'http://localhost:5173',
  'https://nazmul-real-estate.vercel.app',
  'https://nazmul-real-estate-team-3fly.vercel.app'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy violation'), false);
  },
  credentials: true
}));
app.use(express.json());

const propertyRoutes = require('../routes/propertyRoutes');
const leadRoutes = require('../routes/leadRoutes');
const authRoutes = require('../routes/authRoutes');
const heroRoutes = require('../routes/heroRoutes');
const settingsRoutes = require('../routes/settingsRoutes');
const teamRoutes = require('../routes/teamRoutes');
const userRoutes = require('../routes/userRoutes');
const connectDB = require('../config/db');

// Connect to DB on each request (Serverless friendly)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection failed:", err);
    return res.status(500).json({ error: 'Database connection failed' });
  }
});

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/posts', require('../routes/postRoutes'));
app.use('/api/users', userRoutes);

// Only listen locally, Vercel will use the exported app
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
