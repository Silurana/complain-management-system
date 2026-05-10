const express = require("express");
const Department = require("../models/Department");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Create department
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, code } = req.body;
    const department = await Department.create({ name, code });
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update department
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, code } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, code },
      { new: true, runValidators: true }
    );
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete department
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
