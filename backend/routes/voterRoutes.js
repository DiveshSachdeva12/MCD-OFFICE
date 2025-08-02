// routes/voterRoutes.js
const express = require('express');
const router = express.Router();
const VoterID = require('../models/VoterID');

router.get('/', async (req, res) => {
  try {
    const voters = await VoterID.find();
    res.json(voters);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newVoter = new VoterID(req.body);
    await newVoter.save();
    res.status(201).json(newVoter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedVoter = await VoterID.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVoter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
