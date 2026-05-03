const dotenv = require("dotenv");
dotenv.config();

const ENV = {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  mongo_uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/complaint_system",
  jwt_secret: process.env.JWT_SECRET || "secret_key",
  jwt_expires_in: "1d",
  cookie_expires_in: 1, // days
  cors_origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
};

module.exports = ENV;
