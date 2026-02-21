const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rtspUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    path: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Camera", cameraSchema);