import React from 'react';
import { useNavigate } from 'react-router-dom';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const Home = () => {
  const navigate = useNavigate();

  const goToServices = () => {
    navigate('/services'); 
  };

  return (   
   <section id='home' className=" px-6 flex flex-col justify-center mt-20">


  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 max-w-6xl mx-auto mt-20">
    
    {/* Left Content */}
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        Revitalize Your Clothes with Expert
      </h1>
      <h2 className="text-3xl font-bold text-blue-600">
        Laundry Services!
      </h2>

      <p className="text-gray-600">
        From premium dry cleaning to swift wash and fold, we deliver care and
        convenience. Schedule a pickup and rediscover the freshness of your
        clothes today!
      </p>

      <button
        onClick={goToServices}
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        <img src="./images/bag.png" alt="bag" className="w-5 h-5" />
        <i className="fi fi-rr-shopping-cart"></i>
        Book a service today!
      </button>
    </div>

    {/* Right Image */}
    <div >
      <img
        src="./images/laundry.gif"
        alt="washing machine"
      />
    </div>
      
   
  </div>

  {/* Achievements Section */}
  <div className="mt-16 grid grid-cols-1 sm:grid-cols-4 gap-8 bg-sky-100 p-4  mx-auto ">
    
    <div className="flex items-center justify-center text-xl font-semibold">
      <span className="text-blue-600">Our Achievements</span>
    </div>

    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold">15+</h2>
      <span className="text-gray-500">Laundry Services</span>
    </div>

    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold">240+</h2>
      <span className="text-gray-500">Happy Customers</span>
    </div>

    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold">2+ Yrs</h2>
      <span className="text-gray-500">Experience</span>
    </div>

  </div>
  </section>









  );
};

export default Home;
