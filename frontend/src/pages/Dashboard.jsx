import {
  FiUsers,
  FiUploadCloud,
  FiFileText,
  FiUserPlus,
  FiFile,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({ agents: 0, lists: 0, items: 0 });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const [statsRes, activitiesRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.REACT_APP_API_URL}/api/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStats(statsRes.data);
      setActivities(activitiesRes.data || []); // Ensure activities is always an array
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Refresh data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FiUsers className="text-blue-500" size={24} />}
          title="Total Agents"
          value={stats.agents}
          color="bg-blue-50"
        />
        <StatCard
          icon={<FiUploadCloud className="text-green-500" size={24} />}
          title="Lists Uploaded"
          value={stats.lists}
          color="bg-green-50"
        />
        <StatCard
          icon={<FiFileText className="text-purple-500" size={24} />}
          title="Total Items"
          value={stats.items}
          color="bg-purple-50"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        {Array.isArray(activities) && activities.length > 0 ? (
          <ul className="space-y-3">
            {activities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No recent activities</div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className={`${color} rounded-lg p-6 flex items-center`}>
      <div className="mr-4 p-3 bg-white rounded-full shadow-sm">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({ activity }) {
  if (!activity) return null;

  const getDetails = () => {
    switch (activity.type) {
      case "AGENT_ADDED":
        return `${activity.data?.name || "New agent"} added`;
      case "LIST_UPLOADED":
        return `File uploaded with ${activity.data?.items || "some"} items`;
      default:
        return activity.message || "Activity occurred";
    }
  };

  return (
    <li className="flex items-start py-2">
      <div className="flex-shrink-0 mt-1">
        {activity.type === "AGENT_ADDED" ? (
          <FiUserPlus className="text-blue-500 mr-2" />
        ) : (
          <FiFile className="text-green-500 mr-2" />
        )}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{getDetails()}</p>
        <p className="text-xs text-gray-500">
          {activity.createdAt
            ? new Date(activity.createdAt).toLocaleString()
            : "Recently"}
        </p>
      </div>
    </li>
  );
}
