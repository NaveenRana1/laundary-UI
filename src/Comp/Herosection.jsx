export default function Herosection({ scrollTo }) {
  return (
    <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-blue-200/30 rounded-full blur-3xl"></div>

      {/* Floating bubbles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: `${30 + i * 15}px`,
            height: `${30 + i * 15}px`,
            top: `${15 + i * 12}%`,
            left: `${5 + i * 15}%`,
            background: `rgba(56,189,248,${0.06 + i * 0.02})`,
            animation: `float ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-semibold px-4 py-2 rounded-full mb-6 fade-up">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
            Available Today · Same Day Delivery
          </div>
          <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight text-gray-900 fade-up delay-1">
            Laundry,<br />
            <span className="text-sky-500">Done Right.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md fade-up delay-2">
            Professional wash, dry, fold, and delivery — right from your doorstep. Trusted by 10,000+ happy customers across the city.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 fade-up delay-3">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Schedule Free Pickup →
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="border-2 border-gray-200 hover:border-sky-300 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all hover:bg-sky-50 cursor-pointer"
            >
              View Services
            </button>
          </div>
          <div className="mt-12 flex gap-8 fade-up delay-4">
            {[["10K+", "Happy Customers"], ["24hr", "Turnaround"], ["4.9★", "Rating"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl font-bold text-gray-900">{val}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center lg:justify-end fade-up delay-2">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] float shadow-2xl shadow-sky-300/50 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-2">🧺</div>
                <div className="font-display text-xl font-semibold">Fresh & Clean</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 float" style={{ animationDelay: "1s" }}>
              <div className="text-2xl">✨</div>
              <div className="text-xs font-semibold text-gray-700 mt-1">Eco Detergent</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 float" style={{ animationDelay: "2s" }}>
              <div className="text-2xl">🚀</div>
              <div className="text-xs font-semibold text-gray-700 mt-1">Express 6hr</div>
            </div>
            <div className="absolute -inset-6 border-2 border-dashed border-sky-200 rounded-full spin-slow opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}