const mongoose = require('mongoose');

const heroImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.models.HeroImage || mongoose.model('HeroImage', heroImageSchema);
