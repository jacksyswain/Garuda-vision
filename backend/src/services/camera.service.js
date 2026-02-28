const Camera = require("../models/Camera");

exports.getUserCameras = async (userId) => {
  return await Camera.find({ user: userId }).sort({ createdAt: -1 });
};

exports.createCamera = async (data) => {
  return await Camera.create(data);
};

exports.deleteCamera = async (cameraId, userId) => {
  return await Camera.findOneAndDelete({
    _id: cameraId,
    user: userId,
  });
};