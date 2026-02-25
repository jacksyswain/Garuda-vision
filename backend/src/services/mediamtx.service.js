const axios = require("axios");

const API_BASE = "http://localhost:9997";

exports.createPath = async (pathName, rtspUrl) => {
  try {
    await axios.post(`${API_BASE}/v3/config/set`, {
      paths: {
        [pathName]: {
          source: rtspUrl,
          sourceOnDemand: true
        }
      }
    });

    console.log("Path created in MediaMTX:", pathName);

  } catch (err) {
    console.error("MediaMTX path creation error:", err.message);
    throw err;
  }
};

exports.getPaths = async () => {
  const res = await axios.get(`${API_BASE}/v3/paths/list`);
  return res.data;
};