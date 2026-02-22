import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-800 p-4 flex justify-between">
      <span>Live Camera Dashboard</span>
      <button
        onClick={logout}
        className="bg-red-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;