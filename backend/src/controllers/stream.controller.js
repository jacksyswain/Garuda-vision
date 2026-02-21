const mediamtxService = require("../services/mediamtx.service");

exports.listStreams = async (req, res) => {
  const streams = await mediamtxService.getPaths();
  res.json(streams);
};