import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinCommittee() {
  const [committeeID, setCommitteeID] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    setError("");

    if (!committeeID.trim()) {
      setError("Please enter a Committee ID.");
      return;
    }

    // Redirect to Collect page with query param
    navigate(`/collect?highlight=${encodeURIComponent(committeeID.trim())}`);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleJoin}
        className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Join Committee</h2>

        <label className="block mb-4">
          <span>Committee ID</span>
          <input
            type="text"
            value={committeeID}
            onChange={(e) => setCommitteeID(e.target.value)}
            placeholder="Enter committee ID"
            className="mt-1 w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </label>

        <label className="block mb-6">
          <span>Your Name (optional)</span>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1 w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded transition"
        >
          Find Committee
        </button>
      </form>
    </div>
  );
}
