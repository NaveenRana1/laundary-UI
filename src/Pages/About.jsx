import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const goToServices = () => {
    navigate("/services");
  };

  return (
    <section
      id="about"
      className="bg-sky-400 py-20 px-6 mt-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Effortless Washing. Exceptional Care.
          </h2>

          <p className="text-amber-100 mb-5 leading-relaxed">
            Say goodbye to laundry stress! Our professional washing machine
            services deliver spotless results, fabric protection, and unmatched
            convenience — all at your doorstep.
          </p>

          <ul className="space-y-3 text-amber-100 mb-6">
            <li>✔ Advanced washing technology for deep cleaning</li>
            <li>✔ Gentle care for every fabric type</li>
            <li>✔ Eco-friendly detergents & water-efficient machines</li>
            <li>✔ Fast pickup, wash & delivery</li>
          </ul>

          <button
            onClick={goToServices}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition cursor-pointer"
          >
            Book Your Wash Today
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/images/washing-machine.png"
            alt="Professional Washing Machine Service"
            className="w-72 h-72 object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
