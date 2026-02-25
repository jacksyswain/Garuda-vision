const cameraService = require("../services/camera.service");

exports.addCamera = async (req, res) => {
  const { name, rtspUrl } = req.body;

  const camera = await cameraService.createCamera({
    name,
    rtspUrl,
    owner: req.user.id,
    path: `user-${req.user.id}-${Date.now()}`
  });

  res.status(201).json(camera);
};

exports.getCameras = async (req, res) => {
  const cameras = await cameraService.getUserCameras(req.user.id);
  res.json(cameras);
};
exports.createCamera = async (req, res) => {
  try {
    const { name, rtspUrl } = req.body;

    const path = name
      .toLowerCase()
      .replace(/\s+/g, "-") + "-" + Date.now();

    // 1️⃣ Create path in MediaMTX dynamically
    await mediamtxService.createPath(path, rtspUrl);

    // 2️⃣ Save in DB
    const camera = await Camera.create({
      name,
      rtspUrl,
      path,
      user: req.user.id
    });

    res.status(201).json(camera);

  } catch (err) {
    console.error("Create camera error:", err);
    res.status(500).json({ message: "Failed to create camera" });
  }
};
exports.deleteCamera = async (req, res) => {
  await cameraService.deleteCamera(req.params.id, req.user.id);
  res.json({ message: "Camera deleted" });
};