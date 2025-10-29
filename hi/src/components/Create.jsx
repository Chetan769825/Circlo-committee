import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function generateCommitteeID(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export default function CreateCommittee() {
  const [formData, setFormData] = useState({
    committeeName: "",
    chairperson: "",
    members: "",
    purpose: "",
    amount: "",
    startDate: "",
    endDate: "",
    rotation: "fixed",
    privacy: "private",
  });

  const [generatedID, setGeneratedID] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCommitteeID = generateCommitteeID();

    const membersArray = formData.members
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const committeeData = {
      committeeName: formData.committeeName,
      committeeID: newCommitteeID,
      chairperson: formData.chairperson,
      members: membersArray,
      purpose: formData.purpose,
      amount: parseFloat(formData.amount),
      startDate: formData.startDate,
      endDate: formData.endDate,
      rotation: formData.rotation,
      privacy: formData.privacy,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/committees",
        committeeData
      );

      console.log("Committee Created:", response.data);
      setGeneratedID(newCommitteeID);

      navigate("/confirmation", { state: { committeeData: response.data.data } });
    } catch (error) {
      console.error("Error creating committee:", error);
      alert("Failed to create committee. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl p-10 shadow-xl ring-1 ring-blue-300"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Create Committee
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <label className="block">
            <span className="text-blue-700 font-semibold">Committee Name</span>
            <input
              type="text"
              name="committeeName"
              value={formData.committeeName}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter committee name"
              autoComplete="off"
            />
          </label>

          <label className="block">
            <span className="text-blue-700 font-semibold">Chairperson</span>
            <input
              type="text"
              name="chairperson"
              value={formData.chairperson}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Chairperson's name"
              autoComplete="off"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-blue-700 font-semibold">Member Names (comma-separated)</span>
            <input
              type="text"
              name="members"
              value={formData.members}
              onChange={handleChange}
              required
              placeholder="Alice, Bob, Charlie"
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="off"
            />
          </label>

          <label className="block">
            <span className="text-blue-700 font-semibold">Purpose</span>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Purpose of committee (optional)"
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="off"
            />
          </label>

          <label className="block">
            <span className="text-blue-700 font-semibold">Monthly Contribution (₹)</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter amount"
            />
          </label>

          <label className="block">
            <span className="text-blue-700 font-semibold">Start Date</span>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </label>

          <label className="block">
            <span className="text-blue-700 font-semibold">End Date</span>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </label>

          <label className="block">
            <span className="text-blue-700 font-semibold">Rotation Order</span>
            <select
              name="rotation"
              value={formData.rotation}
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="fixed">Fixed</option>
              <option value="random">Random</option>
            </select>
          </label>

          <label className="block">
            <span className="text-blue-700 font-semibold">Privacy</span>
            <select
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </label>
        </div>

        <div className="flex justify-end mt-10 gap-4">
          <RouterLink
            to="/home2"
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            Cancel
          </RouterLink>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition"
          >
            Continue ➝
          </button>
        </div>

        {generatedID && (
          <div className="mt-10 bg-green-600 p-5 rounded-lg text-center font-mono text-white text-xl shadow-lg">
            🎉 Committee Created! Your Committee ID:{" "}
            <span className="font-bold">{generatedID}</span>
            <p className="mt-2 text-sm text-green-200">
              Share this ID with others to let them join your committee.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
