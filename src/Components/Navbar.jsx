import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-300 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        
        {/* Logo */}
        <div className="w-10 h-10 flex items-center">
          <img
            src="./images/washing-machine.png"
            alt="logo"
            
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-5 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* User */}
        <div className="bg-sky-500 text-white p-4 rounded-lg cursor-pointer font-medium hidden sm:block">
          Username
        </div>

      </div>
    </header>
  );
};

export default Navbar;
