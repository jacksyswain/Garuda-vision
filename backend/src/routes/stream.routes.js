const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const streamController = require("../controllers/stream.controller");

router.get("/", protect, streamController.listStreams);

module.exports = router;