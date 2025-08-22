const mongoose = require('mongoose');

const AadhaarSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  aadhaarNumber: { type: String, required: true, unique: true },
  dob: { type: String },
  mobile: { type: String },
  oldAddress: { type: String },   // 🏠 Old Address
  newAddress: { type: String },   // 🏠 New Address
}, { timestamps: true }); // <-- This auto adds createdAt & updatedAt

module.exports = mongoose.model('Aadhaar', AadhaarSchema);
