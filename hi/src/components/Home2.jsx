import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

function Home2() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const submenuTimeout = useRef(null);

  const openSubmenu = () => {
    clearTimeout(submenuTimeout.current);
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    submenuTimeout.current = setTimeout(() => {
      setIsSubmenuOpen(false);
    }, 200); // Delay prevents flicker when moving to submenu
  };
  
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
            <circle
              cx="22"
              cy="20"
              r="10"
              stroke="#2563eb" // Blue accent
              strokeWidth="3"
              fill="none"
            />
            <text
              x="42"
              y="27"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="28"
              fontWeight="bold"
              fill="#111827" // Gray-900
            >
              Circlo
            </text>
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
{/* Steps Section */}
      <div className="relative flex flex-col items-center mt-10 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600 text-center">
        Create and join Committee
        </h2>

        <div className="flex flex-col items-center justify-center px-4">
          {/* Start Node */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 border-4 border-blue-500 text-blue-600 text-lg font-bold shadow-md mb-2">
              Start
            </div>
            <div className="w-1 h-10 bg-blue-400 rounded-sm"></div>
          </div>

          {/* Options */}
          <div className="flex flex-row items-center mt-2 gap-20 relative">
            {/* Left Arrow */}
            <div className="absolute left-1/4 -top-8 flex flex-col items-center">
              <div className="w-1 h-8 bg-blue-400 rounded"></div>
              <FaArrowRight className="text-blue-500 text-2xl rotate-90" />
            </div>

            {/* Right Arrow */}
            <div className="absolute right-1/4 -top-8 flex flex-col items-center">
              <div className="w-1 h-8 bg-blue-400 rounded"></div>
              <FaArrowRight className="text-blue-500 text-2xl rotate-90" />
            </div>

            {/* Create Committee */}
            <div className="flex flex-col items-center">
              <RouterLink to="/create" className="flex-1">
                <div className="w-56 py-6 px-6 rounded-2xl bg-white border-2 border-blue-500 text-blue-600 text-xl font-semibold flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white transition cursor-pointer">
                  Create Committee
                </div>
              </RouterLink>
            </div>

            {/* Join Committee with Submenu */}
            <div
              className="flex flex-col items-center relative"
              onMouseEnter={openSubmenu}
              onMouseLeave={closeSubmenu}
            >
              <div className="w-56 py-6 px-6 rounded-2xl bg-white border-2 border-blue-500 text-blue-600 text-xl font-semibold flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white transition cursor-pointer">
                Join Committee
              </div>

              {isSubmenuOpen && (
                <div
                  className="absolute left-full top-0 ml-4 flex flex-col gap-3"
                  onMouseEnter={openSubmenu}
                  onMouseLeave={closeSubmenu}
                >
                  <RouterLink to="/join">
                    <div className="w-56 py-3 px-5 rounded-xl bg-blue-50 border border-blue-400 text-blue-600 text-lg font-medium hover:bg-blue-500 hover:text-white transition cursor-pointer">
                      Join Through ID
                    </div>
                  </RouterLink>
                  <RouterLink to="/collect">
                    <div className="w-56 py-3 px-5 rounded-xl bg-blue-50 border border-blue-400 text-blue-600 text-lg font-medium hover:bg-blue-500 hover:text-white transition cursor-pointer">
                      Join Existing Committee
                    </div>
                  </RouterLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
export default Home2;