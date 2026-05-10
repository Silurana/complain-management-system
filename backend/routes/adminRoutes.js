const express = require("express");
const router = express.Router();
const {
    getAdminStats,
    getAllComplaints,
    updateComplaint,
    adminDeleteComplaint,
} = require("../controllers/complaintController");
const {
    getAllStudents,
    deleteUserByEmail,
    createAdmin,
} = require("../controllers/userController");
const {
    getProfile,
    updateProfile,
    changePassword,
} = require("../controllers/authController");
const { authMiddleware, adminMiddleware, superAdminMiddleware } = require("../middleware/authMiddleware");
const { validate, updateComplaintSchema, createAdminSchema } = require("../middleware/validate");

// Apply admin protection to all routes
router.use(authMiddleware, adminMiddleware);

// Complaint Management
router.get("/stats", getAdminStats);
router.get("/complaints", getAllComplaints);
router.put("/complaints/:id", validate(updateComplaintSchema), updateComplaint);
router.delete("/complaints/:id", adminDeleteComplaint);

// User Management
router.get("/users", getAllStudents);
router.delete("/users/:email", superAdminMiddleware, deleteUserByEmail);
router.post("/create-admin", superAdminMiddleware, validate(createAdminSchema), createAdmin);

// Admin Profile & Settings
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/changePassword", changePassword);

module.exports = router;

