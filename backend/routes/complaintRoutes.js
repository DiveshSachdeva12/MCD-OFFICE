const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  deleteComplaint,
  updateComplaint
} = require('../controllers/complaintController');

// Create a new complaint
router.post('/', createComplaint);

// Get all complaints
router.get('/', getAllComplaints);

// Delete a complaint by ID
router.delete('/:id', deleteComplaint);

// Update a complaint by ID
router.put('/:id', updateComplaint);

module.exports = router;
