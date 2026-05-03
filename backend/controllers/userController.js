const User = require("../models/User");
const Admin = require("../models/Admin");
const Complaint = require("../models/Complaint");
const bcrypt = require("bcryptjs");

const getAllStudents = async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).select("-password");
    const formatted = users.map((u) => ({
      id: u._id,
      fullName: u.username,
      email: u.email,
      regNo: u.regiNo,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email: email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all complaints by this user
    await Complaint.deleteMany({ userId: user._id });

    res.json({ message: "User and their complaints deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const createAdmin = async (req, res) => {
    try {
      const { email, password, regiNo } = req.body;
      const username = req.body.username || req.body.name;
  
      const existingUser = await User.findOne({ email });
      const existingAdmin = await Admin.findOne({ $or: [{ email }, { regiNo }] });
      
      if (existingUser || existingAdmin) {
        return res.status(400).json({ message: "Admin/User already exists with this email or registration number" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        username,
        email,
        password: hashedPassword,
        regiNo,
        role: "admin",
      });
  
      await newAdmin.save();
      res.status(201).json({ message: "New admin created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };


module.exports = {
    getAllStudents,
    deleteUserByEmail,
    createAdmin,
};
