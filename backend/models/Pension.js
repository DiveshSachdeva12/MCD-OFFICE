const mongoose = require('mongoose');

const PensionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNo: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, match: /^\d{10}$/ },
  applicationNo: { type: String, required: true }
}, { timestamps: true });  // createdAt & updatedAt automatically added

module.exports = mongoose.model('Pension', PensionSchema);
