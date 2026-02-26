import { Link } from "react-router-dom";
import { deleteCamera } from "../../services/camera.service";
import { Trash2, Play, Settings } from "lucide-react";
import useStreamStatus from "../../hooks/useStreamStatus";

const CameraCard = ({ camera, refresh }) => {
  const isActive = useStreamStatus(camera.path);

  const handleDelete = async () => {
    if (window.confirm("Delete this camera?")) {
      await deleteCamera(camera._id);
      refresh();
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

      {/* Thumbnail Section */}
      <div className="relative h-48 bg-black overflow-hidden">

        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10"></div>

        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
          Camera Preview
        </div>

        {/* LIVE / OFFLINE Badge */}
        <div
          className={`absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
            isActive
              ? "bg-red-600"
              : "bg-gray-700"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isActive ? "bg-white animate-pulse" : "bg-gray-400"
            }`}
          ></span>
          {isActive ? "LIVE" : "OFFLINE"}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20">
          <Link
            to={`/camera/${camera._id}`}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg transition"
          >
            <Play size={16} />
            View Stream
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-3">

        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold truncate">
            {camera.name}
          </h3>

          <span
            className={`text-xs font-medium ${
              isActive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isActive ? "Active" : "Offline"}
          </span>
        </div>

        {/* RTSP */}
        <p className="text-gray-500 text-xs truncate">
          {camera.rtspUrl}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">

          <span className="text-xs text-gray-500">
            Added {new Date(camera.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-3">

            <Link
              to={`/camera/${camera._id}`}
              className="text-blue-500 hover:text-blue-400 transition"
            >
              <Settings size={18} />
            </Link>

            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-400 transition"
            >
              <Trash2 size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;