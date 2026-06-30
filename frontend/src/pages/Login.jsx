import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHospital, FaUserMd } from "react-icons/fa";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login",
        formData
      );

      const { token, user } = response.data;

      // Save authentication data
      localStorage.setItem("token", token);

      // Save complete user object
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Save individual values for easy access
      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("first_name", user.first_name);
      localStorage.setItem("last_name", user.last_name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      localStorage.setItem("role_id", user.role_id);

      alert(
        `Welcome ${user.first_name} (${user.role})`
      );

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF7F4] to-[#F0F9FF] flex items-center justify-center px-6">

      <div className="grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl max-w-6xl w-full">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-green-500 to-emerald-600 text-white p-16 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-4">
              <FaHospital className="text-5xl" />
              <h1 className="text-4xl font-bold">
                OHMS
              </h1>
            </div>

            <h2 className="mt-10 text-5xl font-bold leading-tight">
              Welcome Back
            </h2>

            <p className="mt-6 text-green-100 text-lg">
              Access your hospital dashboard,
              manage patients, appointments,
              doctors and medical records.
            </p>

            <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-3xl p-6">

              <div className="flex items-center gap-4">
                <FaUserMd className="text-3xl" />

                <div>
                  <h3 className="font-semibold">
                    Trusted Healthcare Platform
                  </h3>

                  <p className="text-green-100 text-sm">
                    Secure, fast and reliable.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-10 md:p-16">

          <div className="lg:hidden flex items-center gap-3 mb-10">

            <FaHospital className="text-green-500 text-3xl" />

            <h2 className="text-3xl font-bold">
              OHMS
            </h2>

          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            Login
          </h2>

          <p className="mt-3 text-slate-500">
            Enter your credentials to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

            </div>

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2">

                <input type="checkbox" />

                Remember Me

              </label>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-500">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-green-600 font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;