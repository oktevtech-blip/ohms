import { Link } from "react-router-dom";
import { FaHospital } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
            <FaHospital className="text-green-600 text-xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              OHMS
            </h1>
            <p className="text-xs text-slate-500">
              Hospital Management
            </p>
          </div>
        </div>

        {/* Navigation Links */}

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium shadow-lg shadow-green-100 transition-all duration-300"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;