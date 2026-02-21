const Camera = require("../models/Camera");

exports.createCamera = async (data) => {
  return await Camera.create(data);
};

exports.getUserCameras = async (userId) => {
  return await Camera.find({ owner: userId });
};

exports.deleteCamera = async (cameraId, userId) => {
  const camera = await Camera.findById(cameraId);

  if (!camera || camera.owner.toString() !== userId) {
    throw new Error("Camera not found");
  }

  await camera.deleteOne();
};