import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLinkById } from "../service/API_Service";
import React from "react";

export default function ViewLink() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);

  useEffect(() => {
    getLinkById(code).then((res) => {
      setLink(res.data.data);
    });
  }, [code]);

  if (!link)
    return (
      <p className="text-center mt-10 text-gray-500">Loading...</p>
    );

  return (
    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full shadow"
        >
          ✕
        </button>

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Link Details
          </h1>

          <span className="px-4 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 font-medium">
            ID: {link.id}
          </span>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Short Code</p>
            <p className="text-lg font-medium text-gray-800">{link.code}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Original URL</p>
            <p className="text-lg font-medium text-blue-600 break-all">
              {link.original_url}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Total Clicks</p>
            <p className="text-2xl font-bold text-indigo-600">
              {link.clicks}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Last clicked</p>
            <p className="text-sm font-bold text-indigo-600">
            <i>  {link.last_clicked}</i>
            </p>
          </div>


        </div>

       {/* Open Short Link Button */}
<div className="mt-8 flex justify-center">
  <button
    onClick={() => {
      try {
        const shortUrl = `http://localhost:8080/api/${link.code}`;
        window.open(shortUrl, "_blank");
      } catch (error) {
        console.error("Redirect failed:", error);
        alert("Failed to open link");
      }
    }}
    className="px-6 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all duration-200"
  >
    Open Short Link
  </button>
</div>


        {/* Back Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
}
