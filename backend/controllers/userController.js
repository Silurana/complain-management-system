const User = require("../models/User");
const Admin = require("../models/Admin");
const Complaint = require("../models/Complaint");
const bcrypt = require("bcryptjs");

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    const admins = await Admin.find({}).select("-password");
    
    const formattedStudents = students.map((u) => ({
      id: u._id,
      fullName: u.username,
      email: u.email,
      regNo: u.regiNo,
      role: "student"
    }));

    const formattedAdmins = admins.map((a) => ({
      id: a._id,
      fullName: a.username,
      email: a.email,
      regNo: a.regiNo,
      role: a.role || "admin",
      department: a.department || "All"
    }));

    res.json([...formattedStudents, ...formattedAdmins]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    let user = await User.findOne({ email: email });
    let isStudent = true;
    
    if (!user) {
      user = await Admin.findOne({ email: email });
      isStudent = false;
    }

    if (!user) {
      return res.status(404).json({ message: "User or Admin not found" });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(403).json({ message: "You cannot delete your own account." });
    }

    if (isStudent) {
      await User.findOneAndDelete({ email: email });
    } else {
      await Admin.findOneAndDelete({ email: email });
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
      const { email, password, regiNo, department } = req.body;
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
        role: (!department || department === "All") ? "superadmin" : "admin",
        department: department || "All",
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
