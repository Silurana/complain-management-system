const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Complaint = require("../models/Complaint");
const { authMiddleware } = require("../middleware/authMiddleware");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, regiNo, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { regiNo }] });
    if (existingUser) {
      return res
        .status(400)
        .send("User already exists with this email or registration number");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      regiNo,
      role: role || "student",
    });

    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body; 

    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });

    res.cookie("role", user.role, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    res.send("Login successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("role");
  res.send("Logged out");
});

// Get Stats (Student)
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const total = await Complaint.countDocuments({ userId });
    const pending = await Complaint.countDocuments({
      userId,
      status: "Pending",
    });
    const in_progress = await Complaint.countDocuments({
      userId,
      status: "In Progress",
    });
    const resolved = await Complaint.countDocuments({
      userId,
      status: "Resolved",
    });
    const rejected = await Complaint.countDocuments({
      userId,
      status: "Rejected",
    });

    res.json({ total, pending, in_progress, resolved, rejected });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get Complaints (Student)
router.get("/complaints", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

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

// Create Complaint
router.post("/complaints", authMiddleware, async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    const newComplaint = new Complaint({
      title,
      subject,
      description,
      userId: req.user.id,
    });
    await newComplaint.save();
    res.status(201).send("Complaint created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json({
      fullName: user.username,
      email: user.email,
      regNo: user.regiNo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update Profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { fullName, email, regNo } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    if (fullName) user.username = fullName;
    if (email) user.email = email;
    if (regNo) user.regiNo = regNo;

    await user.save();
    res.send("Profile updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Change Password
router.put("/changePassword", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).send("Incorrect current password");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.send("Password updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
