import { useState } from "react";
import Layout from "../app/layout";
import { Camera, Plus, X } from "lucide-react";

const Settings = () => {
  const [cameraName, setCameraName] = useState("");
  const [rtspUrl, setRtspUrl] = useState("");
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState("");

  const handleAddCamera = () => {
    if (!cameraName || !rtspUrl) {
      setError("Please fill all fields");
      return;
    }

    const newCamera = {
      id: Date.now(),
      name: cameraName,
      rtspUrl: rtspUrl,
    };

    setCameras([...cameras, newCamera]);
    setCameraName("");
    setRtspUrl("");
    setError("");
  };

  const handleCancel = () => {
    setCameraName("");
    setRtspUrl("");
    setError("");
  };

  return (
    <Layout>
      <div className="space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-2">
            Configure and manage your camera connections
          </p>
        </div>

        {/* Add Camera Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-xl max-w-2xl">

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Camera size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Add New Camera
              </h2>
              <p className="text-gray-500 text-sm">
                Connect an IP camera via RTSP
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">

            {/* Camera Name */}
            <div>
              <label className="text-sm text-gray-400">
                Camera Name
              </label>
              <input
                type="text"
                placeholder="4th Floor"
                value={cameraName}
                onChange={(e) => setCameraName(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* RTSP URL */}
            <div>
              <label className="text-sm text-gray-400">
                RTSP URL
              </label>
              <input
                type="text"
                placeholder="rtsp://username:password@ip:port/stream"
                value={rtspUrl}
                onChange={(e) => setRtspUrl(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddCamera}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl shadow-lg transition"
              >
                <Plus size={16} />
                Add Camera
              </button>

              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-2.5 rounded-xl transition"
              >
                <X size={16} />
                Cancel
              </button>
            </div>

          </div>
        </div>

        {/* Added Cameras Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Added Cameras
          </h2>

          {cameras.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500">
              No cameras added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cameras.map((cam) => (
                <div
                  key={cam.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="text-lg font-semibold">
                    {cam.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 break-all">
                    {cam.rtspUrl}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
};

export default Settings;