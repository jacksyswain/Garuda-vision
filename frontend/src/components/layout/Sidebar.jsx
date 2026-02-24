import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Video,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div
      className={`h-screen bg-gray-950 border-r border-gray-800 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <h1 className="text-xl font-bold">
            Stream<span className="text-blue-500">Vault</span>
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-3 mt-4">
        <NavLink to="/" className={navItemClass}>
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/" className={navItemClass}>
          <Video size={20} />
          {!collapsed && <span>Cameras</span>}
        </NavLink>

        <NavLink to="/settings" className={navItemClass}>
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* Bottom User Section */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              J
            </div>
            <div>
              <p className="text-sm font-semibold">Jacksy</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        ) : (
          <div className="h-10 w-10 bg-blue-600 rounded-full mx-auto"></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;