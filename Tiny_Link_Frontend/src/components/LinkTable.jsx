import { deleteLink } from "../service/API_Service";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import React from "react";

export default function LinkTable({ links = [], refresh, onAddClick }) {
  const handleDelete = async (code) => {
    try {
      await deleteLink(code);
      toast.success("Link deleted successfully!");
      refresh();
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete link!");
    }
  };

  const copyLink = (code) => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short link copied!");
  };

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">All Links</h2>

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-all"
        >
          <span className="text-lg">➕</span> Add New Link
        </button>
      </div>

      {/* No Data */}
      {links.length === 0 ? (
        <div className="text-gray-500 mt-4 text-center py-6 bg-white rounded-xl shadow">
          No links found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">URL</th>
                <th className="p-3 text-center">Clicks</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {links.map((link) => (
                <tr
                  key={link.code}
                  className="hover:bg-gray-50 transition-all"
                >
                  {/* Code */}
                  <td className="p-3 font-medium text-indigo-600">
                    <Link
                      to={`/code/${link.code}`}
                      className="hover:underline"
                    >
                      {link.code}
                    </Link>
                  </td>

                  {/* URL */}
                  <td className="p-3 max-w-md truncate text-gray-700">
                    <span title={link.original_url}>{link.original_url}</span>
                  </td>

                  {/* Clicks */}
                  <td className="p-3 text-center text-gray-800 font-semibold">
                    {link.clicks}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center space-x-2">

                    {/* Copy Button */}
                    <button
                      onClick={() => copyLink(link.code)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg shadow transition"
                    >
                      Copy
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(link.code)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow transition"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
