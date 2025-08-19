// routes/pensions.js
const express = require("express");
const router = express.Router();
const Pension = require("../models/Pension");

// ➕ Create new pension entry
router.post("/", async (req, res) => {
  try {
    const newEntry = new Pension(req.body);
    await newEntry.save();
    res.status(201).json({
      success: true,
      message: "Pension form submitted successfully",
      data: newEntry,
    });
  } catch (err) {
    console.error("Error creating pension entry:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit Pension form",
      error: err.message,
    });
  }
});

// 📥 Get all pension entries
router.get("/", async (req, res) => {
  try {
    const entries = await Pension.find();
    res.status(200).json({ success: true, data: entries });
  } catch (err) {
    console.error("Error fetching pension data:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching Pension data",
      error: err.message,
    });
  }
});

// ✏️ Update pension entry by id
router.put("/:id", async (req, res) => {
  try {
    const updatedPension = await Pension.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPension) {
      return res
        .status(404)
        .json({ success: false, message: "Pension record not found" });
    }

    res.json({
      success: true,
      message: "Pension record updated successfully",
      data: updatedPension,
    });
  } catch (err) {
    console.error("Error updating pension:", err);
    res.status(400).json({
      success: false,
      message: "Error updating pension record",
      error: err.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pension = await Pension.findByIdAndDelete(req.params.id);
    if (!pension) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
