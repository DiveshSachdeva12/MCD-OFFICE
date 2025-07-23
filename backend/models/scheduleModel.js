const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  programName: String,
  date: String,
  time: String,
  venue: String,
  contactPerson: String,
  contactNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit number!`
    },
    required: true
  },
  description: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);
