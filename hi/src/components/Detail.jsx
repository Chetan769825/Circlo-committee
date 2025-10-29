import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CommitteeDetails() {
  const location = useLocation();
  const { committeeID: urlCommitteeID } = useParams();

  const { committeeData: stateCommitteeData, committeeID: stateCommitteeID } = location.state || {};
  const committeeID =
    stateCommitteeID ||
    urlCommitteeID ||
    localStorage.getItem("lastCreatedCommitteeID");

  const [committeeData, setCommitteeData] = useState(stateCommitteeData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!committeeData && committeeID) {
      setLoading(true);
      setError("");
      axios
        .get(`http://localhost:3001/api/committees/${committeeID}`)
        .then((res) => {
          const data = res.data.data || res.data || null;
          if (data) {
            setCommitteeData(data);
          } else {
            setError("Committee data not found.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching committee:", err);
          setError("Failed to load committee data.");
          setLoading(false);
        });
    } else if (!committeeID) {
      setError("No committee ID specified.");
    }
  }, [committeeData, committeeID]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
        Loading committee data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-white p-6">
        <p className="mb-4 text-red-500 font-semibold text-center">{error}</p>
        <Link
          to="/committees"
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          Back to Committees
        </Link>
      </div>
    );
  }

  if (!committeeData) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white p-6">
        <p className="text-center text-lg">No committee data found.</p>
        <Link to="/committees">
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold">
            Back to Committees
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Committee Details</h1>
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md space-y-4">
        <p>
          <strong>Committee Name:</strong> {committeeData.committeeName}
        </p>
        <p>
          <strong>Committee ID:</strong>{" "}
          <span className="font-mono">{committeeData.committeeID}</span>
        </p>
        <p>
          <strong>Chairperson:</strong> {committeeData.chairperson ?? "N/A"}
        </p>
        <p>
          <strong>Members:</strong>{" "}
          {Array.isArray(committeeData.members)
            ? committeeData.members.join(", ")
            : typeof committeeData.members === "string"
            ? committeeData.members
            : "No members listed"}
        </p>
        <p>
          <strong>Created On:</strong>{" "}
          {committeeData.createdAt
            ? new Date(committeeData.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
      </div>
      <div className="mt-6">
        <Link
          to="/committees"
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          &larr; Back to Committees
        </Link>
      </div>
    </div>
  );
}
