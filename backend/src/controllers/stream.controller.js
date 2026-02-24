const mediamtxService = require("../services/mediamtx.service");

exports.getStreamStatus = async (req, res) => {
  try {
    const { path } = req.params;

    const streams = await mediamtxService.getPaths();

    const active = streams.items?.some(
      (stream) => stream.name === path
    );

    res.json({ active: !!active });

  } catch (err) {
    console.error("Stream status error:", err);
    res.status(500).json({ active: false });
  }
};