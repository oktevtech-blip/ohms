import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHospital } from "react-icons/fa";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          role_id: 1,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF7F4] to-[#F0F9FF] flex items-center justify-center px-6 py-10">

      <div className="grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl max-w-6xl w-full">

        {/* LEFT */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-green-500 to-emerald-600 text-white p-16">

          <div className="flex items-center gap-4">
            <FaHospital className="text-5xl" />

            <h1 className="text-4xl font-bold">
              OHMS
            </h1>
          </div>

          <h2 className="mt-10 text-5xl font-bold">
            Create Account
          </h2>

          <p className="mt-6 text-green-100 text-lg">
            Join the next generation healthcare
            management platform.
          </p>

        </div>

        {/* RIGHT */}

        <div className="p-10 md:p-16">

          <h2 className="text-4xl font-bold text-slate-900">
            Register
          </h2>

          <p className="mt-3 text-slate-500">
            Create your OHMS account
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5"
          >

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-500">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-green-600 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;