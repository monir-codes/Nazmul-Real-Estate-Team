const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  coverImage: { type: String },
  author: { type: String, default: 'Nazmul Real Estate' },
  category: { type: String, default: 'Market Insights' },
  published: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
