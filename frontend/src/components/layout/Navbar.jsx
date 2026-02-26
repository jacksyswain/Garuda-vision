import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Bell, Search, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-gray-950/70 backdrop-blur-lg border-b border-gray-800 px-6 py-4 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-6">

        <h1 className="text-lg font-semibold tracking-wide">
          Live Monitoring
        </h1>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Notification Icon */}
        <button className="relative text-gray-400 hover:text-white transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-gray-900 px-3 py-2 rounded-xl border border-gray-800 hover:border-gray-700 transition"
          >
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="hidden md:block text-sm">
              {user?.user?.name || "User"}
            </span>
            <ChevronDown size={16} />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden">
              <button
                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-800 transition"
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-800 transition"
              >
                Settings
              </button>
              <div className="border-t border-gray-800"></div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;