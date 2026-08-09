const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  specialty: { type: String },
  bio: { type: String, required: true },
  image: { type: String },
  email: { type: String },
  phone: { type: String },
  languages: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
