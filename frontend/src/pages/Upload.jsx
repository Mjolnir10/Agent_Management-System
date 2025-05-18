import { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["csv", "xlsx", "xls"];
    const fileExt = selectedFile.name.split(".").pop().toLowerCase();

    if (!validTypes.includes(fileExt)) {
      setMessage({
        text: "Please upload a CSV, XLSX, or XLS file",
        type: "error",
      });
      return;
    }

    setFile(selectedFile);
    setMessage({ text: "", type: "" });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ text: "Please select a file", type: "error" });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/lists/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage({
        text: "File uploaded and distributed successfully!",
        type: "success",
      });
      setFile(null);
      e.target.reset();
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Upload failed",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload and Distribute List</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <FiUploadCloud className="text-gray-400" size={40} />
            </div>
            <p className="text-gray-600 mb-2">
              Drag and drop your file here or
            </p>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block transition-colors">
              <span>Select File</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv,.xlsx,.xls"
                className="hidden"
              />
            </label>
            {file && (
              <p className="mt-4 text-sm text-gray-600">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!file || isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              !file || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Processing..." : "Upload & Distribute"}
          </button>
        </form>

        {message.text && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.type === "error"
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
