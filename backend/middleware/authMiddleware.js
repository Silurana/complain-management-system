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
  console.log("Admin Access Attempt - User Role:", req.user?.role);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    console.warn("Access Denied: User is not an admin");
    res.status(403).json({ message: "Forbidden: Admins only" });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};
