import { FaUsers, FaMoneyCheckAlt, FaBell, FaChartBar, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa'
import { Link as RouterLink } from "react-router-dom";

const features = [
  {
    icon: <FaUsers className="text-teal-500 text-4xl" />,
    name: 'Create Committees Easily',
    desc: 'Set up your trusted group with flexible member limits and custom rules in just a few clicks.',
  },
  {
    icon: <FaMoneyCheckAlt className="text-green-600 text-4xl" />,
    name: 'Multiple Payment Options',
    desc: 'Support Paytm, Google Pay, PhonePe and more for smooth, hassle-free payments.',
  },
  {
    icon: <FaBell className="text-blue-600 text-4xl animate-shake" style={{ animation: 'bellshake 1.5s infinite' }}/>,
    name: 'Automatic Payment Reminders',
    desc: 'Never miss a payment—members get timely reminders through email.',
  },
  {
    icon: <FaChartBar className="text-indigo-500 text-4xl" />,
    name: 'Personalized Member Dashboard',
    desc: 'Each member can track their due amounts, payment history, and committee status in real-time.',
  },
  {
    icon: <FaShieldAlt className="text-gray-600 text-4xl" />,
    name: 'Secure & Verified',
    desc: 'Safe transactions and member verification to build trust within your committees.',
  },
  {
    icon: <FaExclamationTriangle className="text-red-500 text-4xl" />,
    name: 'Fraud Detection & Alerts',
    desc: 'AI-powered alerts to detect potential payment defaults and suspicious activities.',
  },
]

export default function CircloFeaturesPage() {
  return (
    <div
      id='Features'
      className="
        min-h-screen
        py-16
        px-4
        flex flex-col
        bg-gradient-to-tr from-teal-50 via-white to-slate-100
      "
    >
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-900">
        Features That Empower Your Committees
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Everything you need for seamless group savings and management, powered by smooth, smart, and secure technology.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full mb-12">
        {features.map((f, i) => (
          <div
            key={i}
            className="
              bg-white border border-slate-200 rounded-xl p-7 shadow-lg flex flex-col items-center text-center group transition-transform duration-300 ease-in-out
              hover:shadow-xl hover:scale-105
            "
          >
            <div>{f.icon}</div>
            <h3 className="text-lg text-gray-900 font-semibold mt-3 mb-1 group-hover:text-teal-600 transition">
              {f.name}
            </h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <section className="mx-auto max-w-2xl text-center mb-12">
        <blockquote className="italic text-gray-700 border-l-4 border-teal-500 pl-6 mb-4">
          "Circlo made committee management easy. Automated reminders and secure payment options mean no more chasing after payments!"
        </blockquote>
      </section>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3">
        <RouterLink to="/login" className="flex-1">
          <button className="px-8 py-3 rounded-xl font-semibold shadow-md bg-teal-600 text-white text-lg hover:bg-teal-700 transition-all">
            Get Started for Free
          </button>
        </RouterLink>
        <span className="text-gray-500 text-sm">100% free • No credit card needed</span>
      </div>

      {/* Animation for bell shake */}
      <style>
        {`
          @keyframes bellshake {
            0% { transform: rotate(0); }
            15% { transform: rotate(-12deg); }
            30% { transform: rotate(12deg); }
            45% { transform: rotate(-6deg); }
            60% { transform: rotate(6deg); }
            75% { transform: rotate(-3deg); }
            100% { transform: rotate(0); }
          }
          .animate-shake {
            animation: bellshake 1.5s infinite;
          }
        `}
      </style>
    </div>
  )
}
