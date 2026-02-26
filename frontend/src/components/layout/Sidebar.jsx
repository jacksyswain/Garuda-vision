import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import {
  LayoutDashboard,
  Video,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Cameras", icon: Video, path: "/" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={`relative h-screen bg-gray-950 border-r border-gray-800 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Stream<span className="text-blue-500">Vault</span>
            </h1>
            <p className="text-xs text-gray-500">
              Surveillance Platform
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-3 mt-6 overflow-y-auto">

        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`
            }
          >
            {/* Active Left Indicator */}
            <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-blue-500 opacity-0 group-[.active]:opacity-100"></span>

            <item.icon size={20} />

            {!collapsed && <span>{item.name}</span>}

            {/* Tooltip when collapsed */}
            {collapsed && (
              <span className="absolute left-16 bg-gray-900 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}

      </nav>

      {/* Bottom User Section */}
      <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">

        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <p className="text-sm font-semibold">
                {user?.user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.user?.role || "Member"}
              </p>
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