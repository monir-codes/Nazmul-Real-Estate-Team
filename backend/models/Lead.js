const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  type: { type: String, enum: ['Buy', 'Sell', 'Tour', 'Valuation', 'General'], required: true },
  propertyAddress: { type: String },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New' },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
