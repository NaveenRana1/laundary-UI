import React from 'react';

const Contact = () => {
  return (
    <section className="mt-20 px-4 py-20" style={{backgroundImage:"url('/images/bg.jpeg')"}}   >

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 px-7 py-10 m-10 bg-white rounded-xl shadow-xl">
        
        <div className="p-5 text-center">
          <img
            src="/images/washing-machine (1).png"
            alt="Premium laundry service"
            className="w-16 mx-auto mb-3"
          />
          <h1 className="text-lg font-bold text-black">Premium Services</h1>
          <p className="mt-2 text-gray-500">
            Elevate your wardrobe with meticulous dry cleaning that keeps garments fresh and flawless.
          </p>
        </div>

        <div className="p-5 text-center">
          <img
            src="/images/customer-service.png"
            alt="Customer support"
            className="w-16 mx-auto mb-3"
          />
          <h1 className="text-lg font-bold text-black">Quick Support</h1>
          <p className="mt-2 text-gray-500">
            Prompt assistance and reliable solutions for a smooth, worry-free experience.
          </p>
        </div>

        <div className="p-5 text-center">
          <img
            src="/images/fast-delivery.png"
            alt="Fast delivery"
            className="w-16 mx-auto mb-3"
          />
          <h1 className="text-lg font-bold text-black">Hassle-Free Delivery</h1>
          <p className="mt-2 text-gray-500">
            Convenient pickup and delivery tailored to your schedule.
          </p>
        </div>

        <div className="p-5 text-center">
          <img
            src="/images/saving-money.png"
            alt="Affordable pricing"
            className="w-16 mx-auto mb-3"
          />
          <h1 className="text-lg font-bold text-black">Affordable Prices</h1>
          <p className="mt-2 text-gray-500">
            Experience exceptional care without breaking the bank.
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-around gap-10 bg-white shadow-xl p-12 rounded-xl max-w-6xl mx-auto">

        <div className="max-w-2xl text-center mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Complete Laundry & Dry Cleaning Solutions
          </h2>
          <p className="mt-5 text-gray-600 leading-relaxed">
            From daily washing to premium dry cleaning, we treat your clothes with expert care using
            modern equipment and eco-friendly detergents.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg ">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-6">
            Why Customers Trust Us
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li>✔ Professional garment care</li>
            <li>✔ Transparent pricing</li>
            <li>✔ Eco-friendly detergents</li>
            <li>✔ On-time pickup & delivery</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center bg-white shadow-xl p-12 rounded-xl max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Ready to Experience Hassle-Free Laundry?
        </h2>
        <p className="mt-4 text-gray-500">
          Schedule your pickup today and let us handle the rest.
        </p>

        <button className="mt-6 px-8 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition cursor-pointer">
          Book a Pickup
        </button>
      </div>

    </section>
  );
};

export default Contact;
