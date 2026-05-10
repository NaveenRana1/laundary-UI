import { PLANS } from "../Pages";

export default function Pricingsection({ scrollTo }) {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-sky-500 to-blue-700 text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sky-200 font-semibold text-sm uppercase tracking-widest mb-3">Transparent Pricing</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold">Simple, Fair Prices</h2>
          <p className="mt-4 text-sky-100 max-w-xl mx-auto">No hidden charges. What you see is what you pay.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PLANS.map((p, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 border transition-all hover:-translate-y-1 ${
                p.highlight
                  ? "bg-white text-gray-900 shadow-2xl border-white scale-105"
                  : "bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20"
              }`}
            >
              {p.highlight && (
                <div className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <div className={`font-display text-lg font-bold mb-2 ${p.highlight ? "text-gray-900" : "text-white"}`}>
                {p.plan}
              </div>
              <div className={`font-display text-4xl font-bold mb-1 ${p.highlight ? "text-sky-600" : "text-white"}`}>
                {p.price}
              </div>
              <div className={`text-xs mb-4 ${p.highlight ? "text-gray-400" : "text-sky-200"}`}>per order</div>
              <p className={`text-sm leading-relaxed mb-6 ${p.highlight ? "text-gray-600" : "text-sky-100"}`}>
                {p.desc}
              </p>
              <button
                onClick={() => scrollTo("contact")}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  p.highlight
                    ? "bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-200"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}