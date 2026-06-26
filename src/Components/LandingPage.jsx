import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#030712]/80 backdrop-blur">
        {/* Left: logo */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#2563eb] flex items-center justify-center font-semibold">
            L
          </div>
          <span className="text-sm font-semibold tracking-tight">
            LaundryEase
          </span>
        </div>

        {/* Right: actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg border border-gray-600 text-sm font-medium hover:bg-white/5 transition cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-lg border border-gray-500 bg-white/5 text-sm font-medium hover:bg-white/10 transition cursor-pointer"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Laundry made simple,
            <br />
            delivered to your door
          </h1>

          <p className="text-gray-300 text-base md:text-lg mb-8">
            Schedule pickups, track your order in real time,
            <br />
            and get fresh clothes back in 24 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold shadow hover:bg-gray-100 transition flex items-center gap-2 cursor-pointer"
            >
              Get started — it’s free
              <span className="text-lg">↗</span>
            </button>
            <button
              onClick={() => navigate("/how-it-works")}
              className="px-6 py-3 rounded-xl border border-gray-500 text-sm font-semibold text-white hover:bg-white/5 transition cursor-pointer"
            >
              See how it works
            </button>
          </div>
        </div>
      </main>

      {/* Stats strip (optional, like bottom row in your image) */}
      <section className="w-full bg-[#030712] border-t border-gray-800 px-8 py-4 flex flex-wrap justify-center gap-6 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-blue-400">👥</span>
          <span>50,000+ happy customers</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">⭐</span>
          <span>4.9 average rating</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-300">⏱️</span>
          <span>24‑hour turnaround</span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;