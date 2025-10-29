import React from "react";

export default function About() {/*cd hi ,, npm run dev -> frontend
                                 cd server  ,,  npx nodemon index.js -> backend */
  return (
    <div
      id="About"
      className="min-h-screen py-16 px-6 bg-gradient-to-br from-teal-100 via-white to-gray-100 text-gray-900 relative overflow-hidden"
    >
      {/* Decorative angled background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-tr-[80%] opacity-30 -z-10 transform rotate-12 translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500 rounded-bl-[70%] opacity-25 -z-10 transform -rotate-6 -translate-x-24 translate-y-24"></div>

      <div className="max-w-6xl mx-auto space-y-24">
        {/* Journey Section */}
        <section className="bg-gradient-to-r from-teal-50 via-white to-amber-50 rounded-3xl shadow-2xl p-12 ">
          <h2 className="text-5xl font-extrabold mb-10 text-teal-700 uppercase tracking-wide drop-shadow-md">
            Journey of Circlo
          </h2>
          <div className="space-y-12 border-l-8 border-amber-400 pl-8 pr-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute w-6 h-6 bg-amber-400 rounded-full -left-10 top-3 shadow-lg animate-pulse"></div>
              <h3 className="text-2xl font-bold text-amber-600 tracking-wide mb-2">
                🔍 Identified the Problem
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-xl">
                I observed people around me struggling to manage informal financial committees — there was no central platform for transparency, reminders, or payment tracking.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute w-6 h-6 bg-teal-500 rounded-full -left-10 top-3 shadow-lg animate-bounce"></div>
              <h3 className="text-2xl font-bold text-teal-600 tracking-wide mb-2">
                💡 Got the Idea
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-xl">
                I envisioned a digital solution where anyone could create and manage committees online — securely and easily. I sketched the idea and listed core features.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute w-6 h-6 bg-amber-400 rounded-full -left-10 top-3 shadow-lg animate-pulse"></div>
              <h3 className="text-2xl font-bold text-amber-600 tracking-wide mb-2">
                🛠️ Built the Platform
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-xl">
                Using React, Tailwind, Express & MongoDB, I designed the system architecture, built user flows, implemented secure login, and added financial tracking logic.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute w-6 h-6 bg-teal-500 rounded-full -left-10 top-3 shadow-lg animate-bounce"></div>
              <h3 className="text-2xl font-bold text-teal-600 tracking-wide mb-2">
                🚀 Launched Circlo
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-xl">
                After testing and feedback from users, I deployed the app and made it available for the public. The goal: help communities build trust in their finances.
              </p>
            </div>
          </div>
        </section>

        {/* Site Section */}
        <section className="bg-white rounded-3xl shadow-2xl p-12 ">
          <h2 className="text-4xl font-extrabold mb-8 text-amber-600 uppercase tracking-widest">
            About the Site
          </h2>
          <p className="text-lg leading-relaxed mb-10 max-w-3xl tracking-wide">
            <strong className="text-teal-700">Circlo</strong> is a modern web platform designed to help users manage their financial committees with transparency and trust. You can create, manage, and track committee payments seamlessly with friends or strangers. Whether you're managing a chit fund or informal saving circle, Circlo ensures everything stays organized, clear, and secure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-tr from-amber-100 via-white to-amber-50 p-8 rounded-xl border border-amber-400 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-amber-500 tracking-wide uppercase">
                Core Features
              </h3>
              <ul className="list-disc list-inside text-amber-700 space-y-2 font-semibold leading-relaxed">
                <li>Create committees easily</li>
                <li>Add and invite members</li>
                <li>Track payments and due dates</li>
                <li>Secure and transparent process</li>
              </ul>
            </div>
            <div className="bg-gradient-to-tr from-teal-100 via-white to-teal-50 p-8 rounded-xl border border-teal-400 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-teal-600 tracking-wide uppercase">
                🌍 Our Vision
              </h3>
              <p className="text-teal-700 font-semibold leading-relaxed max-w-xl">
                Circlo aims to become the go-to platform for all informal finance communities — from friends pooling monthly savings to local business committees. We want to bring financial transparency to everyone.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
