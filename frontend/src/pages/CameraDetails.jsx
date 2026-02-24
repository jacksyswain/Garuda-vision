import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../app/layout";
import WebRTCPlayer from "../components/stream/WebRTCPlayer";
import { getCameras } from "../services/camera.service";

const CameraDetails = () => {
  const { id } = useParams();
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamera = async () => {
      try {
        const { data } = await getCameras();
        const found = data.find((cam) => cam._id === id);
        setCamera(found);
      } catch (err) {
        console.error("Camera fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCamera();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-gray-400">Loading camera...</div>
      </Layout>
    );
  }

  if (!camera) {
    return (
      <Layout>
        <div className="text-red-500">Camera not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header Section */}
        <div className="flex items-center justify-between bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div>
            <h1 className="text-2xl font-bold">{camera.name}</h1>
            <p className="text-gray-400 text-sm mt-1">
              RTSP: {camera.rtspUrl}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-sm font-medium">
              Live
            </span>
          </div>
        </div>

        {/* Stream Section */}
        <div className="bg-black rounded-xl overflow-hidden border border-gray-800 shadow-xl">
          <WebRTCPlayer path={camera.path} />
        </div>

        {/* Info & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Camera Info Card */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">
              Camera Information
            </h2>

            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>ID:</strong> {camera._id}</p>
              <p><strong>Status:</strong> Active</p>
              <p><strong>Created:</strong> {new Date(camera.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Controls Card */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">
              Stream Controls
            </h2>

            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                Refresh
              </button>

              <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg">
                Snapshot
              </button>

              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
                Stop
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CameraDetails;