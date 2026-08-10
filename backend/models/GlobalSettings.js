const mongoose = require('mongoose');

const globalSettingsSchema = new mongoose.Schema({
  headerLinks: [{
    label: { type: String, required: true },
    url: { type: String, required: true }
  }],
  footerLinks: [{
    label: { type: String, required: true },
    url: { type: String, required: true }
  }],
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true }
  }],
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    address: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);
