const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  price: { type: Number, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  lotSize: { type: String },
  yearBuilt: { type: Number },
  propertyType: { type: String, required: true },
  status: { type: String, enum: ['For Sale', 'Pending', 'Sold'], default: 'For Sale' },
  description: { type: String, required: true },
  features: [{ type: String }],
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
