const mongoose = require("mongoose");
const ENV = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
