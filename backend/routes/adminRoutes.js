const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Complaint = require("../models/Complaint");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

//? Get Stats (Admin)
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const in_progress = await Complaint.countDocuments({
      status: "In Progress",
    });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const rejected = await Complaint.countDocuments({ status: "Rejected" });

    res.json({ total, pending, in_progress, resolved, rejected });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//? Get All Complaints (Admin)
router.get("/complaints", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    const formatted = complaints.map((c) => ({
      id: c._id,
      title: c.title,
      subject: c.subject,
      description: c.description,
      status: c.status,
      response: c.response,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update Complaint
router.put(
  "/complaints/update",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id, status, response } = req.body;
      const complaint = await Complaint.findById(id);
      if (!complaint) return res.status(404).send("Complaint not found");

      if (status) complaint.status = status;
      if (response !== undefined) complaint.response = response;

      await complaint.save();
      res.send("Complaint updated");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

//? Get All Users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).select("-password");
    const formatted = users.map((u) => ({
      fullName: u.username,
      email: u.email,
      regNo: u.regiNo,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//? Delete User
router.delete(
  "/users/:regNo",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { regNo } = req.params;
      const user = await User.findOneAndDelete({ regiNo: regNo });
      if (!user) return res.status(404).send("User not found");

      await Complaint.deleteMany({ userId: user._id });

      res.send("User deleted");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
