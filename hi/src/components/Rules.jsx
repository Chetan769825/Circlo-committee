import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaGavel,
  FaHandshake,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUsers,
  FaShieldAlt,
  FaBan,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaLock,
  FaSync,
  FaClock,
  FaUserTimes,
  FaCoins,
  FaFileContract,
} from "react-icons/fa";

export default function CommitteeRules() {
  const location = useLocation();
  const navigate = useNavigate();
  const committeeData = location.state?.committeeData;

  const [selectedRule, setSelectedRule] = useState(null);
  const [showAllRules, setShowAllRules] = useState(false);

  // Rules data
  const rules = [
    {
      id: 1,
      title: "Payment Rules",
      icon: FaMoneyBillWave,
      color: "from-green-500 to-emerald-600",
      description: "Guidelines for monthly contributions and payments",
      details: [
        "Monthly contribution: ₹" + (committeeData?.amount || "2000"),
        "Payment deadline: 5th of every month",
        "Late payment penalty: 5% of contribution amount",
        "Payment methods: UPI, Bank Transfer, Cash",
        "Advance payments are allowed and encouraged",
        "Refunds available only in first month with valid reason",
      ],
      dos: [
        "Pay on or before the deadline",
        "Keep payment receipts",
        "Inform chairperson if facing payment issues",
        "Use official payment channels only",
      ],
      donts: [
        "Don't delay payments without notice",
        "Don't make partial payments without approval",
        "Don't share payment details with non-members",
      ],
    },
    {
      id: 2,
      title: "Membership Rules",
      icon: FaUsers,
      color: "from-blue-500 to-cyan-600",
      description: "Member responsibilities and conduct guidelines",
      details: [
        "Total members: " + (committeeData?.members?.length || "8"),
        "Minimum attendance: 80% for meetings",
        "Active participation in committee decisions required",
        "Respect all members and maintain decorum",
        "Confidentiality of member information is mandatory",
        "New members require unanimous approval",
      ],
      dos: [
        "Attend all scheduled meetings",
        "Vote on important decisions",
        "Support fellow members",
        "Maintain professional behavior",
      ],
      donts: [
        "Don't share committee details outside",
        "Don't miss meetings without prior notice",
        "Don't engage in conflicts with members",
      ],
    },
    {
      id: 3,
      title: "Rotation & Turn Rules",
      icon: FaSync,
      color: "from-purple-500 to-pink-600",
      description: "How the payout rotation works",
      details: [
        "Rotation type: " + (committeeData?.rotation || "Fixed"),
        "Turn order decided at committee formation",
        "Each member gets their turn once per cycle",
        "Turn cannot be transferred or sold",
        "Payout amount: Total monthly collection",
        "Payout date: 7th of every month",
      ],
      dos: [
        "Accept your assigned turn",
        "Collect payout within 3 days",
        "Sign acknowledgment receipt",
        "Continue contributing after receiving payout",
      ],
      donts: [
        "Don't skip your turn",
        "Don't demand turn change",
        "Don't misuse payout funds",
      ],
    },
    {
      id: 4,
      title: "Meeting Rules",
      icon: FaCalendarAlt,
      color: "from-orange-500 to-red-600",
      description: "Committee meeting protocols",
      details: [
        "Monthly meetings on 1st Sunday",
        "Meeting duration: 1-2 hours maximum",
        "Quorum: Minimum 75% members present",
        "Agenda shared 3 days in advance",
        "Minutes recorded and shared within 24 hours",
        "Emergency meetings can be called with 24hr notice",
      ],
      dos: [
        "Arrive on time for meetings",
        "Prepare questions in advance",
        "Participate in discussions",
        "Follow meeting agenda",
      ],
      donts: [
        "Don't interrupt others while speaking",
        "Don't bring non-members without permission",
        "Don't deviate from agenda",
      ],
    },
    {
      id: 5,
      title: "Termination & Exit",
      icon: FaUserTimes,
      color: "from-red-500 to-rose-600",
      description: "Rules for leaving or being removed from committee",
      details: [
        "Exit notice period: 30 days minimum",
        "Exit allowed only after completing your turn",
        "Refund calculation: Paid amount minus processing fee (10%)",
        "Termination for non-payment after 2 consecutive defaults",
        "Misconduct can lead to immediate termination",
        "Final settlement within 15 days of exit",
      ],
      dos: [
        "Submit written exit notice",
        "Clear all pending dues",
        "Handover documents and receipts",
        "Exit gracefully maintaining relationships",
      ],
      donts: [
        "Don't exit without notice",
        "Don't leave with pending payments",
        "Don't demand full refund if exiting early",
      ],
    },
    {
      id: 6,
      title: "Communication Rules",
      icon: FaHandshake,
      color: "from-teal-500 to-green-600",
      description: "How members should communicate",
      details: [
        "Official communication through committee chat only",
        "Emergency contact: Chairperson's number",
        "Response time: Within 24 hours for queries",
        "Respectful language mandatory",
        "No spam or promotional content",
        "Conflicts resolved through dialogue",
      ],
      dos: [
        "Use respectful language",
        "Keep communications transparent",
        "Respond to important messages promptly",
        "Raise concerns constructively",
      ],
      donts: [
        "Don't use abusive language",
        "Don't spam the group",
        "Don't create sub-groups for gossip",
      ],
    },
    {
      id: 7,
      title: "Privacy & Security",
      icon: FaLock,
      color: "from-indigo-500 to-purple-600",
      description: "Data protection and confidentiality",
      details: [
        "Committee privacy: " + (committeeData?.privacy || "Private"),
        "Member data protected under privacy policy",
        "Financial information kept confidential",
        "Committee ID and passwords not to be shared",
        "Personal information sharing requires consent",
        "Data breach reported immediately",
      ],
      dos: [
        "Keep login credentials secure",
        "Report suspicious activity",
        "Respect others' privacy",
        "Use secure payment methods",
      ],
      donts: [
        "Don't share committee ID publicly",
        "Don't screenshot private conversations",
        "Don't discuss member finances outside",
      ],
    },
    {
      id: 8,
      title: "Dispute Resolution",
      icon: FaGavel,
      color: "from-yellow-500 to-orange-600",
      description: "How conflicts are resolved",
      details: [
        "Primary resolution: Discussion among members",
        "Chairperson acts as mediator",
        "Voting used for major disputes (simple majority)",
        "External arbitration if internal resolution fails",
        "Legal action only as last resort",
        "Resolution timeline: Maximum 15 days",
      ],
      dos: [
        "Raise disputes formally",
        "Participate in resolution process",
        "Accept majority decisions",
        "Maintain decorum during disputes",
      ],
      donts: [
        "Don't escalate minor issues",
        "Don't involve outsiders prematurely",
        "Don't refuse to participate in resolution",
      ],
    },
    {
      id: 9,
      title: "Penalties & Consequences",
      icon: FaBan,
      color: "from-red-600 to-pink-700",
      description: "Penalties for rule violations",
      details: [
        "Late payment penalty: 5% per month",
        "Meeting absence: ₹100 fine per absence",
        "Default on payment: Suspension after 2 months",
        "Misconduct: Warning → Suspension → Termination",
        "Breach of confidentiality: Immediate termination",
        "Penalty appeals reviewed by all members",
      ],
      dos: [
        "Accept penalties gracefully",
        "Learn from mistakes",
        "Appeal if genuinely unfair",
        "Pay penalties promptly",
      ],
      donts: [
        "Don't repeat violations",
        "Don't challenge fair penalties",
        "Don't avoid penalty payments",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 15,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  if (!committeeData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">No committee data found!</p>
          <button
            onClick={() => navigate("/create")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Create Committee
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 bg-zinc-900/50 backdrop-blur-lg border-b border-zinc-700 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/dashboard", { state: { committeeData } })}
              className="hover:bg-zinc-800 p-3 rounded-full transition"
            >
              <FaArrowLeft size={20} />
            </motion.button>

            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-white to-yellow-500 bg-clip-text text-transparent">
                Committee Rules & Guidelines
              </h1>
              <p className="text-zinc-400 mt-1">{committeeData.committeeName}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllRules(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-yellow-500/50 transition"
          >
            📜 View All Rules
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-purple-500/30"
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="text-5xl"
            >
              ⚖️
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to the Rules Page!</h2>
              <p className="text-zinc-300 leading-relaxed">
                These rules are designed to ensure smooth operation, transparency, and trust among all committee members.
                Please read and follow them carefully. Click on any rule card below to see detailed information.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rules Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rules.map((rule, index) => {
            const IconComponent = rule.icon;
            return (
              <motion.div
                key={rule.id}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => setSelectedRule(rule)}
                className="cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${rule.color} p-1 rounded-2xl`}>
                  <div className="bg-zinc-900 rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/10 p-4 rounded-xl"
                      >
                        <IconComponent size={30} className="text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{rule.title}</h3>
                        <p className="text-sm text-zinc-400">Rule #{rule.id}</p>
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {rule.description}
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="mt-4 text-yellow-400 text-sm font-semibold flex items-center gap-2"
                    >
                      Click to view details →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          <div className="bg-zinc-800/50 backdrop-blur-lg rounded-xl p-4 border border-zinc-700">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-2xl font-bold text-yellow-400">{rules.length}</div>
            <div className="text-sm text-zinc-400">Total Rules</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-lg rounded-xl p-4 border border-zinc-700">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-blue-400">{committeeData.members?.length || 0}</div>
            <div className="text-sm text-zinc-400">Members</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-lg rounded-xl p-4 border border-zinc-700">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-green-400">₹{committeeData.amount || 0}</div>
            <div className="text-sm text-zinc-400">Monthly Amount</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-lg rounded-xl p-4 border border-zinc-700">
            <div className="text-3xl mb-2">🔄</div>
            <div className="text-2xl font-bold text-purple-400">{committeeData.rotation || "Fixed"}</div>
            <div className="text-sm text-zinc-400">Rotation Type</div>
          </div>
        </motion.div>
      </main>

      {/* Individual Rule Modal */}
      <AnimatePresence>
        {selectedRule && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedRule(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700 shadow-2xl"
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedRule.color} p-6 rounded-t-3xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="bg-white/20 p-4 rounded-xl backdrop-blur-lg"
                    >
                      <selectedRule.icon size={40} className="text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-extrabold text-white">{selectedRule.title}</h2>
                      <p className="text-white/80 mt-1">{selectedRule.description}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedRule(null)}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-lg"
                  >
                    <FaTimes size={24} className="text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Details Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaFileContract className="text-yellow-400" />
                    Rule Details
                  </h3>
                  <div className="space-y-2">
                    {selectedRule.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-start gap-3 bg-zinc-800 p-4 rounded-xl"
                      >
                        <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-zinc-300">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Dos Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    DO's
                  </h3>
                  <div className="space-y-2">
                    {selectedRule.dos.map((item, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-start gap-3 bg-green-900/20 border border-green-500/30 p-4 rounded-xl"
                      >
                        <span className="text-green-400 text-xl">✓</span>
                        <span className="text-zinc-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Don'ts Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaBan className="text-red-400" />
                    DON'Ts
                  </h3>
                  <div className="space-y-2">
                    {selectedRule.donts.map((item, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-start gap-3 bg-red-900/20 border border-red-500/30 p-4 rounded-xl"
                      >
                        <span className="text-red-400 text-xl">✗</span>
                        <span className="text-zinc-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Warning Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-yellow-400 text-2xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-yellow-400 mb-2">Important Notice</h4>
                      <p className="text-zinc-300 text-sm">
                        Violation of these rules may result in penalties or termination from the committee.
                        Please ensure you understand and agree to follow all guidelines.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Rules Modal */}
      <AnimatePresence>
        {showAllRules && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowAllRules(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700 shadow-2xl"
            >
              {/* All Rules Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 rounded-t-3xl sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white">Complete Rule Book</h2>
                    <p className="text-white/80 mt-1">All {rules.length} rules at a glance</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAllRules(false)}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-lg"
                  >
                    <FaTimes size={24} className="text-white" />
                  </motion.button>
                </div>
              </div>

              {/* All Rules Content */}
              <div className="p-6 space-y-6">
                {rules.map((rule, index) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-gradient-to-r ${rule.color} p-1 rounded-2xl`}
                  >
                    <div className="bg-zinc-900 rounded-2xl p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-white/10 p-4 rounded-xl">
                          <rule.icon size={30} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">{rule.title}</h3>
                          <p className="text-zinc-400">{rule.description}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setShowAllRules(false);
                            setSelectedRule(rule);
                          }}
                          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-sm"
                        >
                          View Details
                        </motion.button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Quick Summary */}
                        <div className="bg-zinc-800 rounded-xl p-4">
                          <h4 className="font-bold mb-2 text-sm text-zinc-400">Key Points</h4>
                          <ul className="space-y-1 text-sm">
                            {rule.details.slice(0, 3).map((detail, i) => (
                              <li key={i} className="text-zinc-300 flex items-start gap-2">
                                <span className="text-yellow-400 mt-1">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                            <div className="font-bold text-sm text-green-400 mb-1">Do's: {rule.dos.length}</div>
                          </div>
                          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                            <div className="font-bold text-sm text-red-400 mb-1">Don'ts: {rule.donts.length}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-zinc-800 p-6 rounded-b-3xl border-t border-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaShieldAlt className="text-green-400 text-2xl" />
                    <div>
                      <div className="font-bold">Committee: {committeeData.committeeName}</div>
                      <div className="text-sm text-zinc-400">All rules are binding for all members</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAllRules(false)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold"
                  >
                    I Understand
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
