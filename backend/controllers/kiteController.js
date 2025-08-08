const KiteModel = require('../models/kiteModel');

const registerKite = async (req, res) => {
  const { aadhaar, name } = req.body; // phone removed

  try {
    // Check if this Aadhaar already received kites
    const existing = await KiteModel.findOne({ aadhaar });
    if (existing) {
      return res.status(400).json({ message: 'This Aadhaar has already received kites.' });
    }

    // Always set quantity to 12
    const quantity = 12;

    const newKite = new KiteModel({ aadhaar, name, quantity });
    await newKite.save();

    res.status(200).json({ message: 'Kites distributed successfully!' });
  } catch (error) {
    console.error('Error in registerKite:', error);
    res.status(500).json({ message: 'Server error while distributing kites.' });
  }
};

const getAllKites = async (req, res) => {
  try {
    const allKites = await KiteModel.find();
    res.status(200).json(allKites);
  } catch (error) {
    console.error('Error fetching kites:', error);
    res.status(500).json({ message: 'Failed to fetch kite data.' });
  }
};

const deleteKite = async (req, res) => {
  try {
    const { id } = req.params;
    await KiteModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Kite record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting kite:', error);
    res.status(500).json({ message: 'Failed to delete kite record.' });
  }
};

module.exports = {
  registerKite,
  getAllKites,
  deleteKite,
};
