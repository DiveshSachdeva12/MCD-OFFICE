// routes/voterRoutes.js
const express = require('express');
const router = express.Router();
const VoterID = require('../models/VoterID');

// Get all voters
router.get('/', async (req, res) => {
  try {
    const voters = await VoterID.find();
    res.json(voters);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Add new voter
router.post('/', async (req, res) => {
  try {
    const newVoter = new VoterID(req.body);
    await newVoter.save();
    res.status(201).json(newVoter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update voter by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedVoter = await VoterID.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVoter) {
      return res.status(404).json({ error: 'Voter not found' });
    }
    res.json(updatedVoter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete voter by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVoter = await VoterID.findByIdAndDelete(req.params.id);
    if (!deletedVoter) {
      return res.status(404).json({ error: 'Voter not found' });
    }
    res.json({ message: 'Voter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while deleting voter' });
  }
});

module.exports = router;
