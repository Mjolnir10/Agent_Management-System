import { useState } from "react";
import { FiUploadCloud, FiCheck, FiX } from "react-icons/fi";
import Alert from "../ui/Alert";

export default function UploadList({ onUpload }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["csv", "xlsx", "xls"];
    const fileExt = selectedFile.name.split(".").pop().toLowerCase();

    if (!validTypes.includes(fileExt)) {
      setMessage({
        type: "error",
        text: "Only CSV, XLSX, and XLS files are allowed",
      });
      return;
    }

    setFile(selectedFile);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "Please select a file" });
      return;
    }

    setIsLoading(true);
    try {
      await onUpload(file);
      setMessage({ type: "success", text: "File uploaded successfully!" });
      setFile(null);
      e.target.reset();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Upload List</h2>

      {message && <Alert type={message.type} message={message.text} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            {file ? (
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FiCheck size={24} />
              </div>
            ) : (
              <FiUploadCloud className="text-gray-400" size={24} />
            )}
          </div>

          <p className="text-gray-600 mb-2">
            {file ? file.name : "Drag and drop your file here or"}
          </p>

          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block transition-colors">
            <span>{file ? "Change File" : "Select File"}</span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls"
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
            !file || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Uploading..." : "Upload List"}
        </button>
      </form>
    </div>
  );
}
