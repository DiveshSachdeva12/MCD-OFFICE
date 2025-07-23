const Schedule = require('../models/scheduleModel');

// Create schedule
exports.createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add schedule', error });
  }
};

// Get all schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: 1 });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get schedules', error });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete schedule', error });
  }
};
