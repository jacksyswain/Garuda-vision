import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../app/layout";
import WebRTCPlayer from "../components/stream/WebRTCPlayer";
import { getCameras } from "../services/camera.service";
import { ArrowLeft, RefreshCw, Camera, Square } from "lucide-react";

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
        <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
          Loading camera...
        </div>
      </Layout>
    );
  }

  if (!camera) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center text-red-500">
          Camera not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">

        {/* Top Navigation */}
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {camera.name}
            </h1>

            <p className="text-gray-500 text-sm mt-2 break-all">
              {camera.rtspUrl}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-xl border border-gray-800">
            <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-sm font-medium">
              Live Stream Active
            </span>
          </div>
        </div>

        {/* Stream Section */}
        <div className="bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl aspect-video">
          <WebRTCPlayer path={camera.path} />
        </div>

        {/* Info & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Camera Information */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-6">
              Camera Information
            </h2>

            <div className="space-y-4 text-sm text-gray-300">

              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Camera ID</span>
                <span className="font-mono text-xs">
                  {camera._id}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Status</span>
                <span className="text-green-400 font-medium">
                  Active
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Created At</span>
                <span>
                  {new Date(camera.createdAt).toLocaleString()}
                </span>
              </div>

            </div>
          </div>

          {/* Stream Controls */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-6">
              Stream Controls
            </h2>

            <div className="flex flex-wrap gap-4">

              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-lg transition">
                <RefreshCw size={16} />
                Refresh
              </button>

              <button className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-5 py-2.5 rounded-xl shadow-lg transition">
                <Camera size={16} />
                Snapshot
              </button>

              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl shadow-lg transition">
                <Square size={16} />
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