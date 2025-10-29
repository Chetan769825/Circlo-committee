import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUsers, FaUserTie, FaCopy, FaSignInAlt } from "react-icons/fa";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function CommitteeList() {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightId, setHighlightId] = useState(null);
  const navigate = useNavigate();
  const query = useQuery();

  // Fetch Committees
  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/committees");
        const data = await res.json();
        setCommittees(data.data || []);
      } catch (err) {
        console.error("Error fetching committees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommittees();
  }, []);

  // Handle glow highlight based on query param ?highlight=committeeID
  useEffect(() => {
    const committeeToHighlight = query.get("highlight");
    if (committeeToHighlight) {
      setHighlightId(committeeToHighlight);
      const timer = setTimeout(() => setHighlightId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [query]);

  // Copy committee ID function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Committee ID copied!");
    });
  };

  // Show loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <style>{`
          .loader {
            border-top-color: #f59e0b;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );
  }

  // Show no committees found
  if (!committees.length) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400 bg-gray-900 text-xl font-semibold">
        No committees found.
      </div>
    );
  }

  // Render committee cards
  return (
    <div className="w-full min-h-screen p-8 bg-gray-900 text-gray-100 max-w-8xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 text-center">
        Available Committees
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {committees.map((c) => (
          <div
            key={c._id}
            className={`bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition p-6 flex flex-col justify-between ${
              c.committeeID === highlightId ? "glow" : ""
            }`}
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold mb-2 text-yellow-300">
                {c.committeeName}
              </h2>
              <div className="flex items-center space-x-3 text-sm text-gray-400 font-mono mb-4">
                <span>ID: {c.committeeID}</span>
                <button
                  onClick={() => copyToClipboard(c.committeeID)}
                  className="hover:text-yellow-400 transition focus:outline-none"
                  aria-label="Copy Committee ID"
                  title="Copy Committee ID"
                >
                  <FaCopy />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <FaUserTie className="text-yellow-400" />
                  <span>
                    Chairperson: <strong>{c.chairperson || "N/A"}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-yellow-400" />
                  <span>
                    Members: <strong>{c.members?.length ?? c.members ?? 0}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex justify-between items-center">
              <Link
                to={`/join?committee=${c.committeeID}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-5 rounded-lg shadow-md transition"
                aria-label={`Join committee ${c.committeeName}`}
              >
                <FaSignInAlt className="inline mr-2" />
                Join Committee
              </Link>
              <Link
                to="/confirmation"
                state={{ committeeData: c }}
                className="text-yellow-400 hover:text-yellow-300 underline text-sm"
                aria-label={`View confirmation for ${c.committeeName}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Glow effect */}
      <style>{`
        .glow {
          box-shadow: 0 0 15px 5px gold;
          border-color: gold;
        }
      `}</style>
    </div>
  );
}
