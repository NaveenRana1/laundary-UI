import { NAV_LINKS } from "../Pages";
import { logout } from "../Pages/Helpers";

export default function Navbar({ activeNav, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">F</div>
          <span className="font-display font-bold text-xl text-gray-900">Fresh<span className="text-sky-500">Fold</span></span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-sm font-medium capitalize transition-colors cursor-pointer ${activeNav === id ? "text-sky-600" : "text-gray-500 hover:text-gray-900"}`}
            >
              {id.replace(/-/g, " ")}
            </button>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+917876193566" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">
            📞 +91 78761 93566
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-sky-200 cursor-pointer"
          >
            Book Pickup
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 hover:bg-red-50 px-4 py-2 rounded-full transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-700"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-sky-50 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(id => (
            <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium capitalize text-gray-700">
              {id.replace(/-/g, " ")}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="bg-sky-500 text-white text-sm font-semibold px-5 py-2 rounded-full w-full"
          >
            Book Pickup
          </button>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-red-500 border border-red-200 bg-red-50 px-5 py-2 rounded-full w-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}