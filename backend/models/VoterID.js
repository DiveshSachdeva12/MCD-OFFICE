const mongoose = require('mongoose');

const VoterIDSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  applicationNo: { type: String, required: true },
  voterCardNo: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('VoterID', VoterIDSchema);
