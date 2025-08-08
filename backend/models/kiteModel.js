const mongoose = require('mongoose');

const KiteModelSchema = new mongoose.Schema({
  aadhaar: {
    type: String,
    required: true,
    unique: true,
    minlength: 12,
    maxlength: 12
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const KiteModel = mongoose.model('KiteDistribution', KiteModelSchema);
module.exports = KiteModel;
