const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/complaint_system",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/user", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("Complaint Management System API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
