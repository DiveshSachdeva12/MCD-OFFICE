const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  details: { type: String, required: true },
  department: { type: String },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now }, // ✅ complaint raised datetime
});

module.exports = mongoose.model('Complaint', complaintSchema);
