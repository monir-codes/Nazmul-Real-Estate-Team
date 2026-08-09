const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  page: { 
    type: String, 
    required: true, 
    unique: true, 
    enum: ['buy', 'sell', 'about', 'areas']
  },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  backgroundImage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
