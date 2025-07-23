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

// Get single schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get schedule', error });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSchedule)
      return res.status(404).json({ message: 'Schedule not found' });
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update schedule', error });
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
