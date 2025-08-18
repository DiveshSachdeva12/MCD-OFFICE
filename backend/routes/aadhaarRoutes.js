const express = require('express');
const router = express.Router();
const Aadhaar = require('../models/Aadhaar');

// CREATE new Aadhaar record
router.post('/', async (req, res) => {
  try {
    // submittedAt is handled by mongoose default in schema
    const newEntry = new Aadhaar(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Create Aadhaar error:', err);
    res.status(500).json({ message: 'Failed to submit Aadhaar form' });
  }
});

// READ all Aadhaar records
router.get('/', async (req, res) => {
  try {
    const entries = await Aadhaar.find();
    res.status(200).json(entries);
  } catch (err) {
    console.error('Fetch Aadhaar error:', err);
    res.status(500).json({ message: 'Error fetching Aadhaar data' });
  }
});

// DELETE Aadhaar by Mongo ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Aadhaar.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete Aadhaar error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE Aadhaar record by Aadhaar Number
router.put('/byNumber/:aadhaarNumber', async (req, res) => {
  try {
    const updated = await Aadhaar.findOneAndUpdate(
      { aadhaarNumber: req.params.aadhaarNumber },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Aadhaar record not found' });
    res.json(updated);
  } catch (error) {
    console.error('Update Aadhaar error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
