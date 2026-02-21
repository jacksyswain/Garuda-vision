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

exports.deleteCamera = async (req, res) => {
  await cameraService.deleteCamera(req.params.id, req.user.id);
  res.json({ message: "Camera deleted" });
};