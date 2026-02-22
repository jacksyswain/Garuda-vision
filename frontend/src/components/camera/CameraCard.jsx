import { Link } from "react-router-dom";
import { deleteCamera } from "../../services/camera.service";

const CameraCard = ({ camera, refresh }) => {
  const handleDelete = async () => {
    await deleteCamera(camera._id);
    refresh();
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-lg font-bold">{camera.name}</h3>
      <p className="text-sm text-gray-400">
        {camera.rtspUrl}
      </p>

      <div className="flex justify-between mt-4">
        <Link
          to={`/camera/${camera._id}`}
          className="bg-green-600 px-3 py-1 rounded"
        >
          View
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CameraCard;