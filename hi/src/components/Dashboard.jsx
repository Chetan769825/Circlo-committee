import React, { useMemo, useState, useEffect, useCallback  } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaWhatsapp, FaCopy, FaDownload, FaBell,FaComments, FaGavel } from "react-icons/fa";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import jsPDF from "jspdf";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
);

function formatDate(d) {
  if (!d) return "-";
  const dt = new Date(d);
  return dt.toLocaleDateString();
}

function exportCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? "")}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const committeeData = location.state?.committeeData ?? null;

  const [members, setMembers] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [ctaClicked, setCtaClicked] = useState(false);
  

  // Fetch committee data from backend
  useEffect(() => {
    const fetchCommitteeData = async () => {
      try {
        if (committeeData) {
          setData({
            ...committeeData,
            createdBy: committeeData.chairperson || "N/A"
          });
          
          if (Array.isArray(committeeData.members)) {
            setMembers(
              committeeData.members.map((name, i) => ({
                id: `m${i}`,
                name,
                paid: 0,
                due: committeeData.amount || 0,
                phone: "-",
                status: "Due"
              }))
            );
          }
          setLoading(false);
        } else {
          const committeeID = new URLSearchParams(window.location.search).get('id');
          
          if (committeeID) {
            const response = await axios.get(`http://localhost:3001/api/committees/${committeeID}`);
            const fetchedData = response.data.data;
            
            setData({
              ...fetchedData,
              createdBy: fetchedData.chairperson || "N/A"
            });
            
            if (Array.isArray(fetchedData.members)) {
              setMembers(
                fetchedData.members.map((name, i) => ({
                  id: `m${i}`,
                  name,
                  paid: 0,
                  due: fetchedData.amount || 0,
                  phone: "-",
                  status: "Due"
                }))
              );
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching committee data:", error);
        setLoading(false);
      }
    };

    fetchCommitteeData();
  }, [committeeData]);

const totals = useMemo(() => {
  const totalCollected = members.reduce((s, m) => s + (m.paid || 0), 0);
  const totalDue = members.reduce((s, m) => s + (m.due || 0), 0);
  const totalTarget = (data?.amount || 0) * (data?.members?.length || members.length || 1);
  const progress = totalTarget ? Math.min(100, Math.round((totalCollected / totalTarget) * 100)) : 0;
  return { totalCollected, totalDue, totalTarget, progress };
}, [members, data]);


  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Collection (₹)',
      data: [12000, 19000, 3000, 5000, 2000, 30000],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderRadius: 8
    }]
  };

  const pieData = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: ['#4cafef', '#ffcc00', '#ff4444'],
      borderWidth: 1
    }]
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'New Members',
      data: [5, 8, 6, 10],
      fill: false,
      borderColor: '#4caf50',
      tension: 0.3
    }]
  };

  const copyID = async () => {
    try {
      await navigator.clipboard.writeText(data?.committeeID || "");
      alert("Committee ID copied to clipboard!");
    } catch (err) {
      alert("Copy failed.");
    }
  };
  const [formData, setFormData] = useState({
  endDate: data?.endDate?.slice(0, 10) || "",});

  const shareWhatsApp = () => {
    const inviteLink = `${window.location.origin}/join?committee=${data?.committeeID}`;
    const message = `Join our committee "${data?.committeeName}" (ID: ${data?.committeeID}). Click: ${inviteLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  

  const handleExport = () => {
    const rows = members.map((m) => ({
      id: m.id,
      name: m.name,
      phone: m.phone,
      paid: m.paid,
      due: m.due,
      status: m.status,
    }));
    exportCSV(`${data?.committeeName || "committee"}_members.csv`, rows);
  };

  const sendReminder = (member) => {
    setNotificationMsg(`Reminder sent to ${member.name} (${member.phone})`);
    setTimeout(() => setNotificationMsg(""), 3000);
  };

  const addMockPayment = (memberId) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              paid: (m.paid || 0) + (data?.amount || 0),
              due: Math.max(0, (m.due || data?.amount || 0) - (data?.amount || 0)),
              status: "Paid",
            }
          : m
      )
    );
  };

   const nextMember =
    members.length > 0
      ? members[totals.progress % members.length]?.name ?? "TBD"
      : "TBD";

  const removeMember = (memberId) => {
    if (!window.confirm("Remove this member?")) return;
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const exportPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Committee Dashboard Report", 20, 20);
    pdf.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);
    pdf.save("dashboard-report.pdf");
  };

  function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

  // Razorpay Payment Handler
  const paymentHandler = useCallback(async (e) => {
    e.preventDefault();

    // Load Razorpay script
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Failed to load Razorpay SDK. Check your connection.");
      return;
    }

    // Create order from backend
    const orderResponse = await fetch("http://localhost:3001/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 50000, // 500.00 INR in paise
        currency: "INR",
        receipt: "qwsaq1"
      }),
    });
    const order = await orderResponse.json();

    // Launch Razorpay widget
    const options = {
      key: "rzp_test_RX9UUJ44s4shP7", // Use your Razorpay key here
      amount: order.amount,
      currency: order.currency,
      name: "WEGrow",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, // Actual order id from backend
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
      },
      prefill: {
        name: "Sumeet Raj",
        email: "sumeet@gnail.com",
        contact: "9876543210"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: { color: "#3399cc" }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      alert("Payment Failed");
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  }, [committeeData]);


  const ChartSection = () => (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6 text-center">Charts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-5 rounded-xl shadow-lg hover:scale-105 transition">
          <h4 className="text-lg font-semibold mb-4">Monthly Collection</h4>
          <Bar data={barData} options={{ responsive: true }} />
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl shadow-lg hover:scale-105 transition">
          <h4 className="text-lg font-semibold mb-4">Payment Status</h4>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl shadow-lg hover:scale-105 transition">
          <h4 className="text-lg font-semibold mb-4">Member Growth</h4>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to={"/home2"}
          className="bg-yellow-600 hover:bg-green-600 text-black px-6 py-3 rounded-lg shadow-lg text-xl font-semibold"
        >
          📄 Home
        </Link>
      </div>
    </div>
  );

  const AnimatedCallToAction = () => (
    <>
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>

      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-black to-green-500 animate-gradient-x opacity-90 rounded-xl"></div>
        <div className="relative p-5 text-white flex flex-col items-center gap-3">
          <h2 className="text-xl font-bold tracking-wide drop-shadow-lg text-center">
            Refresh Your Committee Now!
          </h2>
          <p className="text-sm drop-shadow-md text-center">
            Hit Get started to update your committee's progress in real time.
          </p>
          <button
            onClick={() => setCtaClicked(!ctaClicked)}
            className={`mt-2 px-6 py-2 rounded-full font-semibold shadow-lg
              transition-transform duration-300
              ${ctaClicked ? "scale-105 bg-white text-yellow-600" : "bg-black hover:bg-green-700"}`}
          >
            {ctaClicked ? "Let's Go!" : "Get Started"}
          </button>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading committee data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">No committee data found!</p>
          <Link
            to="/create"
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Create Committee
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-6">
      {/* Notification Toast */}
      {notificationMsg && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notificationMsg}
        </div>
      )}

      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {data.committeeName}
          </h1>
          <div className="text-sm text-zinc-400 mt-1">
            ID: <span className="font-mono text-yellow-400">{data.committeeID}</span> • {data.purpose} • {data.privacy}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="text-right">
            <div className="text-xs text-zinc-400">Collected</div>
            <div className="text-lg font-semibold text-yellow-400">₹{totals.totalCollected}</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-400">Due</div>
            <div className="text-lg font-semibold text-red-400">₹{totals.totalDue}</div>
          </div>

          <div className="flex gap-2">
            <button onClick={copyID} className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-700">
              <FaCopy /> Copy ID
            </button>

            <button onClick={shareWhatsApp} className="flex items-center gap-2 bg-emerald-600 px-3 py-2 rounded hover:bg-emerald-500">
              <FaWhatsapp /> Share
            </button>

            <div className="hidden sm:block">
              <button onClick={handleExport} className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-700">
                <FaDownload /> Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main container */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column - Tabs + Members */}
        <section className="lg:col-span-3 bg-zinc-800 p-6 rounded-xl shadow-lg overflow-auto max-h-[85vh]">
          {/* Tabs */}
          <nav className="flex gap-2 mb-6">
            {["overview", "members", "payments", "settings"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-full font-semibold ${
                  activeTab === t
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>
          

          {/* Active Tab */}
          {activeTab === "overview" && (
             <div className="text-white">
      <h3 className="text-2xl font-bold mb-6">Overview</h3>

      {/* Progress Section */}
      <div className="bg-zinc-900 rounded-lg p-5 mb-8 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all">
        <div className="flex justify-between mb-3">
          <p className="text-sm text-zinc-400">Progress</p>
          <p className="text-sm text-zinc-400">{40}%</p>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">
          <div
            className="bg-yellow-400 h-4 rounded-full transition-all"
            style={{ width: `${40}%` }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mt-5 text-center">
          <div>
            <p className="text-xs text-zinc-400">Target</p>
            <p className="font-bold text-white">₹{totals.totalTarget}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">Collected</p>
            <p className="font-bold text-yellow-400">₹{totals.totalCollected}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">Remaining</p>
            <p className="font-bold text-red-400">₹{totals.totalDue}</p>
          </div>
        </div>

        {/* Committee Details */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm text-zinc-300 border-t border-zinc-800 pt-4">
          <div>
            <p className="font-semibold">Total Members</p>
            <p>{data.members?.length ?? "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Chairperson</p>
            <p>{data.chairperson ?? "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Start Date</p>
            <p>{formatDate(data.startDate)}</p>
          </div>
        </div>
      </div>



      {/* Analytical Charts */}
      <div className="mt-8">
        <ChartSection />
      </div>
    </div>
          )}

          {activeTab === "members" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Members</h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-left">
                  <thead>
                    <tr className="text-zinc-400 text-sm">
                      <th className="p-2">Name</th>
                      <th className="p-2">Paid</th>
                      <th className="p-2">Due</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m) => (
                      <tr key={m.id} className="border-t border-zinc-700">
                        <td className="p-2">{m.name}</td>
                        <td className="p-2">₹{m.paid}</td>
                        <td className="p-2">₹{m.due}</td>
                        <td
                          className={`p-2 font-semibold ${
                            m.status === "Paid"
                              ? "text-green-400"
                              : m.status === "Partial"
                              ? "text-yellow-300"
                              : "text-red-400"
                          }`}
                        >
                          {m.status}
                        </td>
                        <td className="p-2 flex gap-2">
                          <button
                            onClick={() => addMockPayment(m.id)}
                            className="px-3 py-1 bg-yellow-400 rounded text-black text-sm"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => sendReminder(m)}
                            className="px-3 py-1 bg-zinc-700 rounded text-sm flex items-center gap-2"
                          >
                            <FaBell /> Remind
                          </button>
                          <button
                            onClick={() => removeMember(m.id)}
                            className="px-3 py-1 bg-red-600 rounded text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Payments</h3>
              <div className="bg-zinc-900 p-4 rounded mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-zinc-400">Total Collected</div>
                    <div className="text-2xl font-bold text-yellow-400">₹{totals.totalCollected}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">Due</div>
                    <div className="text-2xl font-bold text-red-400">₹{totals.totalDue}</div>
                  </div>
                </div>
              </div>

              {/* Recent payments mock list */}
              <div className="space-y-3">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="bg-zinc-900 p-3 rounded flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-sm text-zinc-400">Paid: ₹{m.paid}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-zinc-300">Status: {m.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Settings</h3>

              {/* Refresh Committee */}
              <div className="mb-6">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
                >
                  🔄 Refresh Your Committee Now
                </button>
                <p className="text-sm text-zinc-400 mt-2">
                  Keep your committee data up-to-date with the latest changes.
                </p>
              </div>

              {/* Privacy Settings */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-zinc-300">Privacy</label>
                <select
                  defaultValue={data.privacy}
                  className="w-full bg-zinc-700 text-white p-2 rounded"
                  onChange={(e) => alert(`Privacy changed to: ${e.target.value}`)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="secret">Secret</option>
                </select>
                <p className="text-xs text-zinc-500 mt-1">
                  Choose who can see your committee details.
                </p>
              </div>

              {/* Notification Settings */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    defaultChecked={true}
                    onChange={(e) => alert(`Notifications ${e.target.checked ? 'enabled' : 'disabled'}`)}
                  />
                  <span className="text-zinc-300 font-semibold">Enable Notifications</span>
                </label>
                <p className="text-xs text-zinc-500 mt-1">
                  Receive reminders and updates about your committee activity.
                </p>
              </div>

              {/* Committee End Date */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-zinc-300">Committee End Date</label>
                <input
                   type="date"
                    value={formData.endDate || ""}
                  className="w-full bg-zinc-700 text-white p-2 rounded"
                  onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Set or update the committee's ending date.
                </p>
              </div>

              {/* Delete Committee */}
              <div className="mt-8 border-t border-zinc-700 pt-4">
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this committee? This action cannot be undone.")) {
                      alert("Committee deleted");
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
                >
                  🗑️ Delete Committee
                </button>
                <p className="text-xs text-red-500 mt-1">
                  Permanently delete this committee and all related data.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Right column - Quick actions & animated call-to-action */}
        <aside className="bg-zinc-800 p-6 rounded-xl shadow-lg flex flex-col gap-6">
          <div>
            <div className="text-sm text-zinc-400">Quick Actions</div>
            <div className="mt-3 flex flex-col gap-2">
<Link
  to="/chat"
  state={{ committeeData: data }}
  className="w-full py-2 px-3 bg-yellow-400 rounded flex items-center gap-2 justify-center hover:bg-yellow-500 transition"
>
  <FaComments /> Open Chat
</Link>
              <Link
  to="/rules"
  state={{ committeeData: data }}
  className="w-full py-2 px-3 bg-yellow-400 rounded flex items-center gap-2 justify-center hover:bg-yellow-500 transition"
>
  <FaGavel /> View Rules
</Link>

              <Link
             to= "/confirmation"
               state={{ committeeData: data } }
                className="w-full py-2 px-3 bg-zinc-700 rounded flex items-center gap-2 justify-center"
              >
                Details
              </Link>
            </div>
          </div>

          {/* Animated CTA */}
          <AnimatedCallToAction />

          <div>
            <div className="text-xl text-white ">Activity</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>- {members[0]?.name ?? "User"} paid</li>
              <li>- {members[1]?.name ?? "User"} joined the committee</li>
              <li>- {members[2]?.name ?? "User"} reminder sent</li>
            </ul>
          </div>
          <button
            onClick={paymentHandler}
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Pay
          </button>

        </aside>
      </main>
    </div>
  );
}
