const mongoose = require('mongoose');

const AadhaarSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: String,
  aadhaarNumber: { type: String, required: true },
  mobile: String,
  dob: String,
  addressChange: String,

  visitedAt: {
    type: Date,
    default: Date.now  // ✅ this ensures date is auto-filled
  }
});

module.exports = mongoose.model('Aadhaar', AadhaarSchema);
