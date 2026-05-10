import { SERVICES } from "../Pages";

export default function Servicessection({ scrollTo }) {
  return (
    <section id="services" className="py-24 bg-blue-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            From everyday laundry to special care garments — we handle it all with expertise and love.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sky-600 font-bold text-lg">{s.price}</span>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-xs font-semibold text-sky-500 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}