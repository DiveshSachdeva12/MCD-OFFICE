// backend/routes/kiteRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerKite,
  getAllKites,
  deleteKite,
} = require('../controllers/kiteController');

router.post('/', registerKite);
router.get('/', getAllKites);
router.delete('/:id', deleteKite); // Make sure this line exists

module.exports = router;
