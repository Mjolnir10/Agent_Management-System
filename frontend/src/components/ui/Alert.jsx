export default function Alert({ type = "info", message, className = "" }) {
  const typeClasses = {
    info: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    warning: "bg-yellow-50 text-yellow-600",
    error: "bg-red-50 text-red-600",
  };

  return (
    <div className={`${typeClasses[type]} p-3 rounded-lg ${className}`}>
      {message}
    </div>
  );
}
