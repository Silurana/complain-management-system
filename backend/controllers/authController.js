const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env");

// Signup (Public - always student)
const signup = async (req, res) => {
  try {
    const { username, email, password, regiNo } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { regiNo }] });
    const existingAdmin = await Admin.findOne({ email });

    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: "User already exists with this email or registration number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      regiNo,
      role: "student", // Force student role
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Login
const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    let user = await User.findOne({ email: mail });
    if (!user) {
      user = await Admin.findOne({ email: mail });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role, department: user.department }, ENV.jwt_secret, {
      expiresIn: ENV.jwt_expires_in,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.node_env === "production", // Set to true if using HTTPS in production
      sameSite: ENV.node_env === "production" ? "none" : "lax",
      expires: new Date(Date.now() + ENV.cookie_expires_in * 24 * 60 * 60 * 1000),
    });

    res.cookie("role", user.role, {
      httpOnly: false,
      secure: ENV.node_env === "production",
      sameSite: ENV.node_env === "production" ? "none" : "lax",
    });
    
    if (user.department) {
      res.cookie("department", user.department, {
        httpOnly: false,
        secure: ENV.node_env === "production",
        sameSite: ENV.node_env === "production" ? "none" : "lax",
      });
    }

    res.json({ message: "Login successful", role: user.role, department: user.department });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("role");
  res.json({ message: "Logged out" });
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const Model = (req.user.role === "admin" || req.user.role === "superadmin") ? Admin : User;
    const user = await Model.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      fullName: user.username,
      email: user.email,
      regNo: user.regiNo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, regNo } = req.body;
    const Model = (req.user.role === "admin" || req.user.role === "superadmin") ? Admin : User;
    const user = await Model.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.username = fullName;
    if (email) user.email = email;
    if (regNo) user.regiNo = regNo;

    await user.save();
    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const Model = (req.user.role === "admin" || req.user.role === "superadmin") ? Admin : User;
    const user = await Model.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    signup,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword,
};
