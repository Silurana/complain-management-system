const Complaint = require("../models/Complaint");
const { sendEmail } = require("../utils/notification");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : "";

    const newComplaint = new Complaint({
      title,
      subject,
      description,
      userId: req.user.id,
      imageUrl,
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Student Complaints
const getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    const formatted = complaints.map((c) => ({
      id: c._id,
      title: c.title,
      subject: c.subject,
      description: c.description,
      status: c.status,
      response: c.response,
      imageUrl: c.imageUrl ? `${req.protocol}://${req.get("host")}/${c.imageUrl}` : null,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Student Stats
const getStudentStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const total = await Complaint.countDocuments({ userId });
    const pending = await Complaint.countDocuments({ userId, status: "Pending" });
    const in_progress = await Complaint.countDocuments({ userId, status: "In Progress" });
    const resolved = await Complaint.countDocuments({ userId, status: "Resolved" });
    const rejected = await Complaint.countDocuments({ userId, status: "Rejected" });

    res.json({ total, pending, in_progress, resolved, rejected });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ _id: req.params.id, userId: req.user.id });
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Admin Controllers ---

// Get All Complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("userId").sort({ createdAt: -1 });
    const formatted = complaints.map((c) => ({
      id: c._id,
      title: c.title,
      subject: c.subject,
      description: c.description,
      status: c.status,
      response: c.response,
      imageUrl: c.imageUrl ? `${req.protocol}://${req.get("host")}/${c.imageUrl}` : null,
      user: c.userId ? { fullName: c.userId.username, email: c.userId.email } : null,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Admin Stats
const getAdminStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const in_progress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const rejected = await Complaint.countDocuments({ status: "Rejected" });

    // Aggregation for Category Distribution (Subject-wise)
    const categoryStats = await Complaint.aggregate([
      { $group: { _id: "$subject", value: { $sum: 1 } } },
      { $project: { name: "$_id", value: 1, _id: 0 } },
      { $sort: { value: -1 } }
    ]);

    // Aggregation for Time Series (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const timeSeriesStats = await Complaint.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%b %d", date: "$createdAt" } },
          complaints: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } },
      { $project: { date: "$_id", complaints: 1, _id: 0 } }
    ]);

    // Aggregation for Weekly Distribution (Radar Chart)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const weeklyStatsRaw = await Complaint.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          value: { $sum: 1 }
        }
      },
      { $project: { dayNum: "$_id", value: 1, _id: 0 } }
    ]);

    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyStats = dayMap.map((day, index) => {
      const found = weeklyStatsRaw.find(s => s.dayNum === (index + 1));
      return { day, value: found ? found.value : 0 };
    });

    res.json({ 
      total, 
      pending, 
      in_progress, 
      resolved, 
      rejected,
      categoryStats: categoryStats.length > 0 ? categoryStats : [{ name: "General", value: 0 }],
      timeSeriesStats: timeSeriesStats.length > 0 ? timeSeriesStats : [{ date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), complaints: 0 }],
      weeklyStats
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Complaint Status
const updateComplaint = async (req, res) => {
  try {
    const { status, response } = req.body;
    const complaint = await Complaint.findById(req.params.id).populate("userId");
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    const oldStatus = complaint.status;
    if (status) complaint.status = status;
    if (response !== undefined) complaint.response = response;

    await complaint.save();

    // Send email notification if status changed
    if (status && status !== oldStatus && complaint.userId) {
      const userEmail = complaint.userId.email;
      const subject = `Complaint Status Updated: ${complaint.title}`;
      const text = `Hello ${complaint.userId.username},\n\nYour complaint "${complaint.title}" status has been updated to "${status}".\n\nAdmin Response: ${response || "No response provided yet."}\n\nRegards,\nComplaint Management Team`;
      await sendEmail(userEmail, subject, text);
    }

    res.json({ message: "Complaint updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Delete Complaint
const adminDeleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    createComplaint,
    getStudentComplaints,
    getStudentStats,
    deleteComplaint,
    getAllComplaints,
    getAdminStats,
    updateComplaint,
    adminDeleteComplaint
};