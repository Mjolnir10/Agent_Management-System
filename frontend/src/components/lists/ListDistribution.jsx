import { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiPhone, FiFileText } from "react-icons/fi";

export default function ListDistribution() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/lists`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLists(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch lists");
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Distributed Lists</h2>

      {lists.length === 0 ? (
        <div className="bg-gray-50 text-gray-500 p-4 rounded-lg">
          No lists have been distributed yet
        </div>
      ) : (
        lists.map((list) => (
          <div
            key={list._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium">
                Agent: <span className="text-blue-600">{list.agent.name}</span>{" "}
                ({list.agent.email})
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              {list.items.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-3 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 bg-blue-50 p-2 rounded-full text-blue-600">
                    <FiUser size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.firstName}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <span className="flex items-center">
                        <FiPhone className="mr-1" size={14} />
                        {item.phone}
                      </span>
                      {item.notes && (
                        <span className="flex items-center">
                          <FiFileText className="mr-1" size={14} />
                          {item.notes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
