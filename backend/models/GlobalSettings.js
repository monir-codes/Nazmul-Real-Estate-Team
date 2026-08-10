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
  },
  stats: [{
    value: { type: String, required: true },
    label: { type: String, required: true }
  }],
  homeHero: {
    title: { type: String, default: 'Your Next Move Starts Here.' },
    subtitle: { type: String, default: 'Helping buyers and sellers navigate real estate with confidence, clarity, and a strategy built around their goals.' }
  },
  buySection: {
    title: { type: String, default: 'Buy With Confidence' },
    subtitle: { type: String, default: 'Our proven framework for finding and securing your dream home.' },
    steps: [{
      title: String,
      desc: String
    }]
  },
  sellSection: {
    title: { type: String, default: 'Sell For Top Dollar' },
    subtitle: { type: String, default: 'A strategic, data-driven approach to maximizing your property value.' },
    points: [String]
  },
  whyUsSection: {
    title: { type: String, default: 'Why Choose Nazmul Team?' },
    subtitle: { type: String, default: 'Experience the difference of working with true local experts.' },
    reasons: [{
      title: String,
      desc: String
    }]
  },
  aboutUsContent: { type: String, default: 'Dedicated to excellence, integrity, and achieving exceptional results for our clients.' }
}, { timestamps: true });

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);
