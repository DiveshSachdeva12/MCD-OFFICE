const express = require('express');
const router = express.Router();
const Pension = require('../models/Pension');

// Create new pension entry
router.post('/', async (req, res) => {
  try {
    const newEntry = new Pension(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Pension form submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit Pension form' });
  }
});

// Get all pension entries
router.get('/', async (req, res) => {
  try {
    const entries = await Pension.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Pension data' });
  }
});

// Update pension entry by id
router.put('/:id', async (req, res) => {
  try {
    const updatedPension = await Pension.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPension);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// **Delete pension entry by id**
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pension.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Pension record not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete pension record' });
  }
});

module.exports = router;
