import React, { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const [committees, setCommittees] = useState([]);

useEffect(() => {
  axios.get("http://localhost:3001/committees")
    .then(res => setCommittees(res.data))
    .catch(err => console.error(err));
}, []);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Committees</h1>
      {committees.length === 0 ? (
        <p>No committees found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {committees.map((committee, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg border">
              <h2 className="text-xl font-semibold">{committee.name}</h2>
              <p>{committee.description}</p>
              <p className="text-gray-500">{committee.members} members</p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Join Committee
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
