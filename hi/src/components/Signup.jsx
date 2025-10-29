import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/register", { name, email, password });
      if (res.data === "Success" || res.data.message === "Success") {
        navigate('/login');
      } else {
        alert(res.data.message || "Registration failed.");
      }
    } catch (err) {
      alert("Error during registration!");
      console.log(err);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center font-sans bg-gray-900 px-4">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/thumbnails/001/401/677/small_2x/abstract-polygonal-shape-black-background-free-vector.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 z-0" />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8 z-10">
        <h2 className="text-4xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border-2 rounded-xl"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-2 rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-2 rounded-xl"
          />
          <button
            type="submit"
            className="w-full bg-black text-xl text-white py-2 font-bold rounded-xl hover:bg-gray-500"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
