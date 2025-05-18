import { Link, useLocation } from "react-router-dom";
import { FiLogOut, FiUsers, FiUpload, FiHome } from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome size={20} /> },
    { path: "/agents", label: "Agents", icon: <FiUsers size={20} /> },
    { path: "/upload", label: "Upload", icon: <FiUpload size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Agent Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              location.pathname === link.path
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 w-full"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
