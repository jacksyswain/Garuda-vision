import { useEffect, useState } from "react";
import Layout from "../app/layout";
import CameraGrid from "../components/camera/CameraGrid";
import { getCameras } from "../services/camera.service";
import { Camera, Activity, Video } from "lucide-react";

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
      <div className="space-y-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Monitor and manage your live camera infrastructure
            </p>
          </div>

          <div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl shadow-lg transition">
              <Camera size={16} />
              Add New Camera
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* Total Cameras */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500 text-sm">
                Total Cameras
              </h2>
              <Camera size={18} className="text-blue-500" />
            </div>
            <p className="text-4xl font-bold mt-4">
              {stats.total}
            </p>
          </div>

          {/* Active Cameras */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500 text-sm">
                Active Cameras
              </h2>
              <Activity size={18} className="text-green-500" />
            </div>
            <p className="text-4xl font-bold mt-4 text-green-400">
              {stats.active}
            </p>
          </div>

          {/* Live Streams */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500 text-sm">
                Live Streams
              </h2>
              <Video size={18} className="text-blue-400" />
            </div>
            <p className="text-4xl font-bold mt-4 text-blue-400">
              {stats.active}
            </p>
          </div>

        </div>

        {/* Cameras Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Your Cameras
          </h2>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <CameraGrid />
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;