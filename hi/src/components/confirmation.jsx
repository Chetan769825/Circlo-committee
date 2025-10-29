import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Utility to dynamically load Razorpay script
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

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const committeeData = location.state?.committeeData;

  if (!committeeData) {
    return (
     <div className="relative min-h-screen flex items-center justify-center">
  {/* Background image layer */}
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{
      backgroundImage: "url('/media/img.png')",
      opacity: 0.25,
    }}
  />
  {/* Content layer */}
  <div className="relative z-10 bg-blue-800 rounded-3xl p-8 shadow-xl max-w-md mx-auto">
    <p className="text-xl font-semibold mb-6">
      No committee data found!
    </p>
    <button
      className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
      onClick={() => navigate("/create")}
    >
      Create Committee
    </button>
  </div>
</div>
    )};

  // Clipboard Copy
  const copyToClipboard = () => {
    navigator.clipboard.writeText(committeeData.committeeID);
    alert("Committee ID copied to clipboard!");
  };

  // WhatsApp Share
  const shareOnWhatsApp = () => {
    const inviteLink = `${window.location.origin}/join?committee=${committeeData.committeeID}`;
    const message = `Join my committee "${committeeData.committeeName}".\nCommittee ID: ${committeeData.committeeID}\nChairperson: ${committeeData.chairperson}\nClick here: ${inviteLink}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-tr bg-white flex items-center justify-center p-6">
      <div className="bg-zinc-300 bg-opacity-90 p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-blue-900">
        <h2 className="text-3xl font-extrabold mb-8 text-center drop-shadow-md">
          🎉 Committee Created Successfully!
        </h2>
        <div className="space-y-4 text-lg">
          <p>
            <strong className="font-semibold">Committee Name:</strong> {committeeData.committeeName}
          </p>
          <p>
            <strong className="font-semibold">Committee ID:</strong> {committeeData.committeeID}
          </p>
          <p>
            <strong className="font-semibold">Chairperson:</strong> {committeeData.chairperson}
          </p>
          <p>
            <strong className="font-semibold">Members:</strong> {committeeData.members?.length || 0}
          </p>
          <p>
            <strong className="font-semibold">Created At:</strong> {new Date(committeeData.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-8 bg-green-600 p-5 rounded-xl text-center font-mono text-xl text-white font-semibold shadow-lg flex flex-col md:flex-row items-center justify-center gap-4">
          <span>
            Committee ID: <strong>{committeeData.committeeID}</strong>
          </span>
          <button
            onClick={copyToClipboard}
            className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Copy ID
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center mt-10 gap-6">
          <button
            onClick={paymentHandler}
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Pay
          </button>
          <button
            onClick={() => navigate("/dashboard", { state: { committeeData } })}
            className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-xl font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
