const express = require('express');
const router = express.Router();
const Pension = require('../models/Pension');

router.post('/', async (req, res) => {
  try {
    const newEntry = new Pension(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Pension form submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit Pension form' });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await Pension.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Pension data' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedPension = await Pension.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPension);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
