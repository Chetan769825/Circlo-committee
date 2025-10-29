import React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <div id="Home" className="min-h-screen pt-16 pb-10 bg-gradient-to-tr from-gray-50 via-teal-100 to-gray-200 relative">
      {/* Semi-blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/back.png')",
          filter: "blur(8px) brightness(0.95)",
          opacity: 0.59
        }}
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Logo + Trust */}
        <div className="flex flex-col items-center mb-8">
<div className="flex items-center">
          <svg
            width="160"
            height="40"
            viewBox="0 0 160 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >

          </svg>
        </div>          <span className="text-gray-700 font-semibold tracking-wide text-lg">CommitteePro</span>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-xs text-gray-600">Verified by Trusted Fintech</span>
            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#348143" strokeWidth="2"/><path d="M7 10l2 2 4-4" stroke="#348143" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        
        {/* Hero */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-4 py-8 gap-10">
          {/* Hero Image */}
<motion.img
  className="w-64 md:w-80 lg:w-[380px] h-auto rounded-3xl shadow-xl object-cover"
  src="/media/img.png"
  alt="Committee illustration"
  loading="lazy"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05, rotate: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
/>   

          {/* Welcome */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
              Create & Manage Your Committee, <span className="text-teal-500">Online</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 mb-3">
              Transparent. Secure. Hassle-Free.
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              100% Trust &amp; Clarity—track payments, members, and rules easily.
            </p>
            {/* Ratings */}
            <div className="flex items-center gap-1 mt-3">
              <span className="text-yellow-500 font-bold">★ ★ ★ ★ ★</span>
              <span className="text-gray-500 text-sm">(4.9/5 from 2,143 reviews)</span>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="max-w-3xl mx-auto mt-10 mb-4 px-4">
          <h2 className="text-2xl md:text-4xl font-semibold text-teal-600 text-center mb-8">
            How It Works: 6 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Step Cards */}
            <div className="flex flex-col gap-6">
              {["Signup / Login", "Create Committee", "Add Members"].map((step, idx) => (
                <div
                  key={step}
                  className="bg-white shadow-md px-6 py-5 rounded-lg border-l-4 border-teal-400 flex flex-col"
                >
                  <div className="font-bold text-lg text-gray-800 mb-1">Step {idx+1}</div>
                  <div className="text-gray-600">{step}</div>
                </div>
              ))}
            </div>
            {/* Right Step Cards */}
            <div className="flex flex-col gap-6">
              {[
                "Define Payment Rules",
                "Share &amp; Invite Members",
                "Start Committee & Track Payments"
              ].map((step, idx) => (
                <div
                  key={step}
                  className="bg-white shadow-md px-6 py-5 rounded-lg border-l-4 border-teal-400 flex flex-col"
                >
                  <div className="font-bold text-lg text-gray-800 mb-1">Step {idx+4}</div>
                  <div className="text-gray-600">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
