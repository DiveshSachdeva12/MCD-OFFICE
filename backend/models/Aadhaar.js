const mongoose = require('mongoose');

const AadhaarSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true }, // Name from form
    aadhaarNumber: { type: String, required: true, unique: true }, // Aadhaar No.
    dob: { type: String, required: true }, // Date of Birth
    mobile: { type: String, required: true }, // Mobile Number
    address: { type: String, required: true }, // Old Address
    addressChange: { type: String }, // New Address (if requested)
  },
  { timestamps: true } // Auto adds createdAt & updatedAt
);

module.exports = mongoose.model('Aadhaar', AadhaarSchema);
