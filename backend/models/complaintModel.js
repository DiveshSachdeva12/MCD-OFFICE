// models/complaintModel.js
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  department: { type: String, required: true },
  details: { type: String, required: true },
  photos: [{ type: String }],   // ✅ multiple photos
  status: { type: String, default: "pending" },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", complaintSchema);
