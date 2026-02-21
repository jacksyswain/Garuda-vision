const mongoose = require("mongoose");
const { mongoUri } = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;