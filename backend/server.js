const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ENV = require("./config/env");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");

const app = express();

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: false })); // Set security HTTP headers, allow cross-origin images
app.use(mongoSanitize()); // Prevent NoSQL Injection
app.use(compression()); // Compress responses

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});
app.use("/user", limiter);
app.use("/admin", limiter);

// Logging
if (ENV.node_env === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Standard Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" })); // Limit body size to prevent DOS
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Database Connection
mongoose
  .connect(ENV.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);


const { errorHandler, notFound } = require("./middleware/errorMiddleware");

app.get("/", (req, res) => {
  res.send("Complaint Management System API is running");
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = ENV.port || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
