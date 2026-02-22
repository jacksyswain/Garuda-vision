import { useEffect, useState } from "react";
import { getCameras } from "../../services/camera.service";
import CameraCard from "./CameraCard";
import AddCameraModal from "./AddCameraModal";

const CameraGrid = () => {
  const [cameras, setCameras] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCameras = async () => {
    const { data } = await getCameras();
    setCameras(data);
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        Add Camera
      </button>

      {showModal && (
        <AddCameraModal
          onClose={() => setShowModal(false)}
          refresh={fetchCameras}
        />
      )}

      <div className="grid grid-cols-3 gap-4">
        {cameras.map((cam) => (
          <CameraCard
            key={cam._id}
            camera={cam}
            refresh={fetchCameras}
          />
        ))}
      </div>
    </div>
  );
};

export default CameraGrid;