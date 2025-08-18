// routes/pensions.js
const express = require('express');
const router = express.Router();
const Pension = require('../models/Pension');

// Create new pension entry
router.post('/', async (req, res) => {
  try {
    const newEntry = new Pension(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Pension form submitted successfully', data: newEntry });
  } catch (err) {
    console.error('Error creating pension entry:', err);
    res.status(500).json({ message: 'Failed to submit Pension form' });
  }
});

// Get all pension entries
router.get('/', async (req, res) => {
  try {
    const entries = await Pension.find();
    res.status(200).json(entries);
  } catch (err) {
    console.error('Error fetching pension data:', err);
    res.status(500).json({ message: 'Error fetching Pension data' });
  }
});

// Update pension entry by id
router.put('/:id', async (req, res) => {
  try {
    const updatedPension = await Pension.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPension) {
      return res.status(404).json({ message: 'Pension record not found' });
    }
    res.json(updatedPension);
  } catch (err) {
    console.error('Error updating pension:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete pension entry by id
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting pension record with id:', req.params.id);
    const deleted = await Pension.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Pension record not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Failed to delete pension record:', err);
    res.status(500).json({ message: 'Failed to delete pension record' });
  }
});

module.exports = router;
