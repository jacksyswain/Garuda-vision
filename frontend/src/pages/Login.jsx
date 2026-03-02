import { useState, useContext } from "react";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await loginUser(form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-gray-900 to-black">

      {/* Left Branding Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-16">
        <div className="text-white space-y-6 max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Stream<span className="text-white/80">Vault</span>
          </h1>
          <p className="text-lg text-white/80">
            Enterprise-grade live camera monitoring platform.
            Secure. Scalable. Real-time.
          </p>
          <div className="space-y-2 text-white/70 text-sm">
            <p>✔ Real-time WebRTC streaming</p>
            <p>✔ Secure RTSP ingestion</p>
            <p>✔ Cloud-ready architecture</p>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex flex-1 items-center justify-center p-8">

        <div className="bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md p-10 border border-gray-800">

          {/* Logo */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to your dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">
                Email Address
              </label>
              <div className="relative mt-2">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">
                Password
              </label>
              <div className="relative mt-2">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition shadow-lg ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">
              OR
            </span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-400 font-medium transition"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;