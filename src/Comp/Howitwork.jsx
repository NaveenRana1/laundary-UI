import { STEPS } from "../Pages";

export default function Howitwork() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">How It Works</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r"></div>
          {STEPS.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-200 group-hover:from-sky-400 group-hover:to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                <span className="font-display text-2xl font-bold text-sky-600 group-hover:text-white transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}