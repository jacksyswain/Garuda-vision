import { Link } from "react-router-dom";
import { deleteCamera } from "../../services/camera.service";
import { Trash2, Play } from "lucide-react";
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
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

      {/* Thumbnail Section */}
      <div className="relative h-44 bg-black overflow-hidden">

        {/* Placeholder Thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          Live Preview
        </div>

        {/* Live Badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${isActive
              ? "bg-red-600"
              : "bg-gray-600"
            }`}
        >
          {isActive ? "LIVE" : "OFFLINE"}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Link
            to={`/camera/${camera._id}`}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
          >
            <Play size={16} />
            View Stream
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-2">

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold truncate">
            {camera.name}
          </h3>

          {/* Status Dot */}
          <span
            className={`h-3 w-3 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
          ></span>
        </div>

        <p className="text-gray-400 text-xs truncate">
          {camera.rtspUrl}
        </p>

        <div className="flex justify-between items-center pt-3">
          <span className="text-xs text-gray-500">
            Created {new Date(camera.createdAt).toLocaleDateString()}
          </span>

          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-400 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;