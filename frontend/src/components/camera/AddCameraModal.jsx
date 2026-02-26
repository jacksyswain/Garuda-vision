import { useState } from "react";
import { addCamera } from "../../services/camera.service";
import { X, Camera } from "lucide-react";

const AddCameraModal = ({ onClose, refresh }) => {
  const [form, setForm] = useState({ name: "", rtspUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.rtspUrl) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await addCamera(form);

      refresh();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add camera");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">

      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl relative p-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-3 rounded-xl">
            <Camera size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Add New Camera</h2>
            <p className="text-gray-400 text-sm">
              Connect an IP camera via RTSP
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Camera Name */}
          <div>
            <label className="text-sm text-gray-400">
              Camera Name
            </label>
            <input
              type="text"
              placeholder="Office Entrance"
              className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* RTSP URL */}
          <div>
            <label className="text-sm text-gray-400">
              RTSP URL
            </label>
            <input
              type="text"
              placeholder="rtsp://user:pass@192.168.1.10:554/stream"
              className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.rtspUrl}
              onChange={(e) =>
                setForm({ ...form, rtspUrl: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: rtsp://username:password@ip:port/stream
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Connecting..." : "Add Camera"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCameraModal;