import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1] || "dashboard";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-semibold capitalize">{pathname}</h2>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
