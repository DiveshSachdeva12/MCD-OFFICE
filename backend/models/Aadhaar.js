const mongoose = require('mongoose');

const AadhaarSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  aadhaarNumber: { type: String, required: true, unique: true },
  dob: { type: String },
  mobile: { type: String },
  address: { type: String },
  addressChange: { type: String },
}, { timestamps: true }); // <-- This auto adds createdAt & updatedAt with time

module.exports = mongoose.model('Aadhaar', AadhaarSchema);
