const FOOTER_COLUMNS = [
  { title: "Services", links: ["Wash & Fold", "Dry Cleaning", "Ironing", "Shoe Cleaning"] },
  { title: "Company",  links: ["About Us", "How It Works", "Pricing", "Blog"] },
  { title: "Contact",  links: ["+91 78761 93566", "hello@freshfold.in", "Mon-Sun: 7AM–10PM", "Track Your Order"] },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold">F</div>
              <span className="font-display text-white font-bold text-lg">FreshFold</span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional laundry & dry cleaning service. Fresh, fast, and delivered to your door.
            </p>
          </div>

          {/* Columns */}
          {FOOTER_COLUMNS.map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l} className="text-sm hover:text-sky-400 cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2025 FreshFold. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => (
              <span key={l} className="text-xs hover:text-sky-400 cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}