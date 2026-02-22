import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Stream Platform</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/settings" className="hover:text-blue-400">Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;