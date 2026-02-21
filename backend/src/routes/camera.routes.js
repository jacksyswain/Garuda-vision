const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const cameraController = require("../controllers/camera.controller");

router.post("/", protect, cameraController.addCamera);
router.get("/", protect, cameraController.getCameras);
router.delete("/:id", protect, cameraController.deleteCamera);

module.exports = router;