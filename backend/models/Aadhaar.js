const mongoose = require('mongoose');

const AadhaarSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },         // ✔ Name is required
    aadhaarNumber: { type: String, required: true, unique: true }, // ✔ Aadhaar must be unique & required
    dob: { type: String, required: true },              // ✔ Required DOB
    mobile: { type: String, required: true },           // ✔ Required Mobile
    address: { type: String, required: true },          // ✔ Required Old Address
    addressChange: { type: String },                    // ✔ Optional New Address
  },
  { timestamps: true } // ✔ Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model('Aadhaar', AadhaarSchema);
