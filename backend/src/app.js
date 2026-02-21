const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const cameraRoutes = require("./routes/camera.routes");
const streamRoutes = require("./routes/stream.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cameras", cameraRoutes);
app.use("/api/streams", streamRoutes);

app.use(errorHandler);

module.exports = app;