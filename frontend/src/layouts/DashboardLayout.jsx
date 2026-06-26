import {
  FaHospital,
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaFileMedical,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaBell,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role = user.role || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
      roles: [
        "Admin",
        "Doctor",
        "Receptionist",
        "Accountant",
      ],
    },
    {
      text: "Patients",
      icon: <FaUserInjured />,
      path: "/patients",
      roles: [
        "Admin",
        "Doctor",
        "Receptionist",
      ],
    },
    {
      text: "Doctors",
      icon: <FaUserMd />,
      path: "/doctors",
      roles: ["Admin"],
    },
    {
      text: "Employees",
      icon: <FaUsers />,
      path: "/employees",
      roles: ["Admin"],
    },
    {
      text: "Appointments",
      icon: <FaCalendarCheck />,
      path: "/appointments",
      roles: [
        "Admin",
        "Doctor",
        "Receptionist",
      ],
    },
    {
      text: "Medical Records",
      icon: <FaFileMedical />,
      path: "/records",
      roles: [
        "Admin",
        "Doctor",
      ],
    },
    {
      text: "Billing",
      icon: <FaMoneyBillWave />,
      path: "/billing",
      roles: [
        "Admin",
        "Accountant",
      ],
    },
    {
      text: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
      roles: [
        "Admin",
        "Accountant",
      ],
    },
    {
      text: "Settings",
      icon: <FaCog />,
      path: "/settings",
      roles: ["Admin","Doctor","Receptionist","Accountant",],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}

      <aside className="w-72 bg-white shadow-lg flex flex-col">

        {/* Logo */}

        <div className="p-8 border-b">

          <div className="flex items-center gap-3">

            <FaHospital className="text-green-500 text-3xl" />

            <h2 className="text-2xl font-bold text-slate-800">
              OHMS
            </h2>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex-1 p-6">

          <ul className="space-y-2">

            {menuItems
              .filter((item) =>
                item.roles.includes(role)
              )
              .map((item) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  text={item.text}
                  path={item.path}
                />
              ))}

          </ul>

        </nav>

        {/* Logout */}

        <div className="p-6 border-t">

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl w-full transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}

      <main className="flex-1">

        {/* Topbar */}

        <header className="bg-white h-20 shadow-sm px-8 flex items-center justify-between">

          {/* Search */}

          <div className="flex items-center gap-4 bg-slate-100 px-4 py-3 rounded-xl w-96">

            <FaSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full"
            />

          </div>

          {/* Right Section */}

          <div className="flex items-center gap-6">

            {/* Notifications */}

            <button className="relative">

              <FaBell className="text-2xl text-slate-600" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>

            </button>

            {/* User */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">

                {user.first_name
                  ? user.first_name.charAt(0).toUpperCase()
                  : "U"}

              </div>

              <div>

                <h4 className="font-semibold">
                  {user.first_name} {user.last_name}
                </h4>

                <p className="text-sm text-slate-500">
                  {role}
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* Page Content */}

        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}

function SidebarItem({
  icon,
  text,
  path,
}) {
  const location = useLocation();

  const active =
    location.pathname === path;

  return (
    <li>

      <Link
        to={path}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
          active
            ? "bg-green-500 text-white shadow-md"
            : "text-slate-700 hover:bg-green-50 hover:text-green-600"
        }`}
      >
        {icon}
        {text}
      </Link>

    </li>
  );
}

export default DashboardLayout;