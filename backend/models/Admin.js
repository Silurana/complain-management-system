const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    regiNo: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin",
    },
    department: {
        type: String,
        default: "All", // 'All' for superadmin
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);