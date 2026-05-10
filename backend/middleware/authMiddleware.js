const jwt = require("jsonwebtoken");
const ENV = require("../config/env");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, ENV.jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "superadmin")) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Admins only" });
  }
};

const superAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Super Admins only" });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  superAdminMiddleware,
};
