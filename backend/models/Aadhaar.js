// models/Aadhaar.js
const mongoose = require('mongoose');

const AadhaarSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: String,
  aadhaarNumber: { type: String, required: true },
  mobile: String,
  dob: String,
  addressChange: String
}, {
  timestamps: true // ✅ Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Aadhaar', AadhaarSchema);
