const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// GET all schedules
router.get('/', scheduleController.getSchedules);

// POST a new schedule
router.post('/', scheduleController.createSchedule);

// PUT (update) a schedule by ID
router.put('/:id', scheduleController.updateSchedule);

// DELETE a schedule by ID
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
