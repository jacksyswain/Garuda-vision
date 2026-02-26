import { useEffect, useState } from "react";
import { getCameras } from "../../services/camera.service";
import CameraCard from "./CameraCard";
import AddCameraModal from "./AddCameraModal";
import { Plus, Search } from "lucide-react";

const CameraGrid = () => {
  const [cameras, setCameras] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCameras = async () => {
    try {
      setLoading(true);
      const { data } = await getCameras();
      setCameras(data);
      setFiltered(data);
    } catch (err) {
      console.error("Camera fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  useEffect(() => {
    const filteredList = cameras.filter((cam) =>
      cam.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  }, [search, cameras]);

  return (
    <div className="space-y-6">

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search cameras..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl shadow-lg transition"
        >
          <Plus size={16} />
          Add Camera
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <AddCameraModal
          onClose={() => setShowModal(false)}
          refresh={fetchCameras}
        />
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-400 py-10">
          Loading cameras...
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
          <p className="text-gray-400 text-sm">
            No cameras found.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Add Your First Camera
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cam) => (
            <CameraCard
              key={cam._id}
              camera={cam}
              refresh={fetchCameras}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CameraGrid;