// LinkList.jsx
import React, { useEffect, useState } from "react";
import { getLinks,deleteLink } from "../service/API_Service";
import { useNavigate } from "react-router-dom";
import LinkForm from "../components/LinkForm";  // ⬅ Make sure this path is correct
import toast from "react-hot-toast";
export default function LinkList() {
  const [links, setLinks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [showForm, setShowForm] = useState(false); // ⬅ for popup form
  const navigate = useNavigate();

  const fetchLinks = async () => {
    try {
      const res = await getLinks({ page, limit });

      setLinks(res.data?.data || []);
      setTotalPages(res.data?.pagination?.totalPages || 1);
    } catch (err) {
      console.log("Error fetching links:", err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [page, limit]);

  const copyLink = (code) => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

const handleDelete = async (code) => {
  toast(
    (t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-gray-800">Delete this link?</p>

        <div className="flex gap-3 justify-end">
          {/* Cancel */}
          <button
            onClick={() => toast.dismiss(t.code)}
            className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>

          {/* Confirm Delete */}
          <button
            onClick={async () => {
              toast.dismiss(t.code);
              try {
                await deleteLink(code);
                toast.success("Link deleted successfully!");
                fetchLinks();
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete link");
              }
            }}
            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
      position: "top-center",
    }
  );
};


  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all"
        >
          + Add New Link
        </button>
      </div>

      {/* SHOW POPUP FORM */}
      {showForm && (
        <LinkForm
          refresh={fetchLinks}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* TABLE */}
      <div className="overflow-x-auto bg-white p-5 rounded-2xl shadow-xl">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <th className="p-3 text-left">Sr No</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">URL</th>
              <th className="p-3 text-center">Clicks</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link, index) => (
              <tr
                key={link.code}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium text-indigo-600">
                  {(page - 1) * limit + (index + 1)}
                </td>

                <td className="p-3 text-indigo-600 font-semibold">
                  {link.code}
                </td>

                <td className="p-3 truncate max-w-sm text-gray-800">
                  {link.original_url}
                </td>

                <td className="p-3 text-center font-semibold text-gray-700">
                  {link.clicks}
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => copyLink(link.code)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => handleDelete(link.code)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => navigate(`view/${link.code}`)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {links.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No records found.
                </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-5">

        {/* ITEMS PER PAGE */}
        <div className="flex items-center gap-3">
          <label className="font-medium text-gray-700 text-lg">
            Items per page:
          </label>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* PREVIOUS – PAGE – NEXT */}
        <div className="flex justify-center items-center gap-4">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg shadow transition-all ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            ⟵ Previous
          </button>

          <span className="text-lg font-semibold text-gray-800 px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg shadow transition-all ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next ⟶
          </button>
        </div>

      </div>
    </div>
  );
}
