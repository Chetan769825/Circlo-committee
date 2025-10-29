import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const faqData = [
  {
    question: "What is Circlo?",
    answer:
      "Circlo is a digital platform to create and manage your own finance committees online with trust and transparency.",
  },
  {
    question: "Is Circlo safe to use?",
    answer:
      "Yes. All your data is encrypted and stored securely. We ensure your privacy and committee transparency.",
  },
  {
    question: "Can I invite friends to join my committee?",
    answer:
      "Absolutely! You can invite friends via email or unique invite links to join your committee.",
  },
  {
    question: "How are payments tracked?",
    answer:
      "Payments are automatically tracked in real-time. You can view individual member statuses, due dates, and reminders.",
  },
  {
    question: "Can I create multiple committees?",
    answer:
      "Yes, you can create and manage as many committees as you want from your dashboard.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="FAQs" className="min-h-screen bg-gradient-to-tr from-gray-50 via-teal-100 to-gray-200 text-gray-900">
      {/* FAQ Section */}
      <div className="py-16 px-6 sm:px-10 md:px-20">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
                onClick={() => toggleIndex(index)}
              >
                <span>{faq.question}</span>
                <span className="text-blue-600 font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Form */}
      <div className="flex items-center justify-center px-6 py-16 bg-gradient-to-tr from-gray-50 via-teal-100 to-gray-200 bg-white">
        <form
          action="https://formspree.io/f/mjkoaeaz"
          method="POST"
          className="w-full max-w-xl bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Send Us Feedback
          </h2>

          <label className="block mb-4">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Message</span>
            <textarea
              name="message"
              rows="5"
              required
              className="mt-1 w-full p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* CTA Section */}
      <div className="w-full flex flex-col items-center py-16 bg-blue-100">
        <h1 className="text-4xl md:text-5xl text-center font-bold text-gray-900 mb-2">
          Let's Start Saving
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Secure your finances together — create or join a savings committee in seconds.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <RouterLink to="/login">
            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition">
              Login
            </button>
          </RouterLink>

          <RouterLink to="/register">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
              Signup
            </button>
          </RouterLink>
        </div>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-lg text-center mt-10 border-t border-gray-200 py-6 bg-white">
        &copy; {new Date().getFullYear()} Circlo. All rights reserved.
      </div>
    </div>
  );
}
