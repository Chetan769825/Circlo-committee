import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

export default function Animated3DNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "Features", "About", "FAQs"];

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-transparent border-b border-gray-200 shadow-sm backdrop-blur-md">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center"
      >
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 relative">
  {/* Use inline SVG with custom embellishment */}
  <svg viewBox="0 0 64 64" className="w-14 h-14 mr-0">
    <circle cx="32" cy="32" r="28" fill="#2563eb" opacity="0.3"/>
    <circle cx="32" cy="32" r="20" fill="#fff"/>
    <circle cx="32" cy="32" r="15" fill="#2563eb"/>
    <g>
      {/* Decorative or abstract elements */}
      <path d="M40,24 Q48,32 40,40" stroke="#fff902" strokeWidth="2" fill="none"/>
      <path d="M24,30 Q20,32 24,38" stroke="#7dd3fc" strokeWidth="2" fill="none"/>
    </g>
    {/* Optional: add text inside the circle */}
    <text x="32" y="37" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#fff">C</text>
  </svg>
  {/* Brand text blends with logo */}
  <div className="flex flex-col items-start -ml-2">
    <span className="font-extrabold text-xl text-blue-600 tracking-wide" style={{ textShadow: '1px 2px 8px #2563eb22' }}>
      Circlo <span className="ml-1 text-yellow-400 animate-pulse">★</span>
    </span>
    <div className="text-xs text-gray-500 leading-none pl-1">
      Committee Management
    </div>
  </div>
</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-gray-800 font-medium">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <ScrollLink
                to={item}
                smooth={true}
                duration={600}
                spy={true}
                offset={-64}
                className="cursor-pointer px-3 py-2 transition-colors hover:bg-blue-50 hover:text-blue-600 font-semibold capitalize rounded-md"
                activeClass="bg-blue-100 text-blue-700 font-bold shadow-sm"
              >
                {item}
              </ScrollLink>
            </motion.div>
          ))}

          {/* Trust badge */}
          <div className="ml-4 px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-500 flex items-center gap-1">
            <svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="7" stroke="#2563eb" strokeWidth="2"/><path d="M6 8l1.5 1.5L10 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
            Secure
          </div>

          {/* Login & Signup buttons */}
          <div className="ml-2 flex gap-2">
            <RouterLink to="/login">
              <button className="px-4 py-2 font-semibold rounded-md bg-gray-100 text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-200 transition">
                Login
              </button>
            </RouterLink>
            <RouterLink to="/register">
              <button className="px-4 py-2 font-semibold rounded-md text-white bg-blue-600 shadow-sm hover:bg-blue-700 transition">
                Signup
              </button>
            </RouterLink>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white rounded-b-xl border-t border-gray-200 shadow-lg absolute w-full left-0 top-[60px] z-40"
          >
            <div className="flex flex-col px-6 py-5 gap-4 text-gray-800 font-medium">
              {navItems.map((item, index) => (
                <ScrollLink
                  key={index}
                  to={item}
                  smooth={true}
                  duration={600}
                  spy={true}
                  offset={-64}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 capitalize"
                >
                  {item}
                </ScrollLink>
              ))}

              <div className="flex gap-3 mt-4">
                <RouterLink to="/login" className="flex-1">
                  <button
                    className="w-full px-4 py-2 font-semibold rounded-md bg-gray-100 text-gray-700 border border-gray-300 shadow hover:bg-gray-200 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </button>
                </RouterLink>
                <RouterLink to="/register" className="flex-1">
                  <button
                    className="w-full px-4 py-2 font-semibold rounded-md text-white bg-blue-600 shadow hover:bg-blue-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </button>
                </RouterLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
