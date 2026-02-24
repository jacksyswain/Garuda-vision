import { useEffect, useState } from "react";
import Layout from "../app/layout";
import CameraGrid from "../components/camera/CameraGrid";
import { getCameras } from "../services/camera.service";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getCameras();
        setStats({
          total: data.length,
          active: data.filter((cam) => cam.isActive).length,
        });
      } catch (err) {
        console.error("Stats error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor and manage your live camera streams
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow-lg">
              + Add New Camera
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-gray-400 text-sm">Total Cameras</h2>
            <p className="text-3xl font-bold mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-gray-400 text-sm">Active Cameras</h2>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {stats.active}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-gray-400 text-sm">Live Streams</h2>
            <p className="text-3xl font-bold mt-2 text-blue-400">
              {stats.active}
            </p>
          </div>

        </div>

        {/* Camera Grid Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Cameras
          </h2>
          <CameraGrid />
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;