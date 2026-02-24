const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const streamController = require("../controllers/stream.controller");

router.get(
  "/status/:path",
  protect,
  streamController.getStreamStatus
);

module.exports = router;