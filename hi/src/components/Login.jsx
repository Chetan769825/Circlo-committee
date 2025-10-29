import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("rememberedEmail")) {
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', { email, password });
      if (res.data === "Success" || res.data.message === "Success") {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        navigate('/home2');
      } else {
        alert(res.data.message || res.data);
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.log(err);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center font-sans bg-gray-900">
      <div className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url(https://static.vecteezy.com/system/resources/thumbnails/001/401/677/small_2x/abstract-polygonal-shape-black-background-free-vector.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 z-0" />
      <div className="relative border border-gray-300 rounded-2xl bg-white shadow-md p-10 sm:w-96 z-10">
        <h1 className="text-4xl font-semibold text-black mb-3 text-center">Login</h1>
        <p className="text-center text-gray-700 mb-6">Welcome! Please enter your details.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <div className="flex justify-between items-center text-sm text-gray-700">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox rounded text-black"
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="hover:underline ">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 text-center block"
          >
            Sign In
          </button>
        </form>
        <button
          className="mt-6 w-full border border-gray-400 py-2 rounded-lg flex justify-center items-center gap-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <img src="google.svg" width="20" alt="Google" />
          Sign in with Google
        </button>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
