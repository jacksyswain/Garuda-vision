import { useState, useContext } from "react";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await loginUser(form);
    login(data);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded w-96"
      >
        <h2 className="text-xl mb-4">Login</h2>
        <input
          className="w-full mb-3 p-2 bg-gray-700"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="password"
          className="w-full mb-3 p-2 bg-gray-700"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button className="w-full bg-blue-600 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;