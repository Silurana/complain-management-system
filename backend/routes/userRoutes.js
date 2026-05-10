const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword,
} = require("../controllers/authController");
const {
    getStudentStats,
    getStudentComplaints,
    createComplaint,
} = require("../controllers/complaintController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { validate, signupSchema, loginSchema, createComplaintSchema } = require("../middleware/validate");

// Auth Routes
router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/logout", logout);

// Profile Routes (Protected)
router.use(authMiddleware);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/changePassword", changePassword);

// Complaint Routes (Protected)
router.get("/stats", getStudentStats);
router.get("/complaints", getStudentComplaints);
router.post("/complaints", upload.single("image"), validate(createComplaintSchema), createComplaint);

module.exports = router;
