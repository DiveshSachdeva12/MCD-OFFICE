const Complaint = require('../models/complaintModel');

// Create new complaint
exports.createComplaint = async (req, res) => {
  try {
    console.log("Received data:", req.body); // 🔍 Add this
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a complaint
exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Complaint deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a complaint
exports.updateComplaint = async (req, res) => {
  try {
    console.log("Update data:", req.body);
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,  // <-- make sure this includes department
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update failed' });
  }
};
