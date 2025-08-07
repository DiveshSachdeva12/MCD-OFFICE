const mongoose = require('mongoose');

const KiteModelSchema = new mongoose.Schema({
  aadhaar: {
    type: String,
    required: true,
    unique: true,
    length: 12
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const KiteModel = mongoose.model('KiteDistribution', KiteModelSchema);
module.exports = KiteModel;
