import { FiUser, FiPhone, FiFileText } from "react-icons/fi";

export default function ListItem({ item, index }) {
  return (
    <div className="px-4 py-3 flex items-start space-x-4 hover:bg-gray-50">
      <div className="flex-shrink-0 bg-blue-50 p-2 rounded-full text-blue-600">
        <span className="text-xs font-medium">{index + 1}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{item.firstName}</p>
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
  );
}
