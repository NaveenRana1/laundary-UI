import React, { useState } from "react";

const Services = () => {
  const [cart, setCart] = useState([]);

  // Services data with prices
  const services = [
    { id: 1, name: "Dry Cleaning", price: 200, img: "/images/laundry.png" },
    { id: 2, name: "Ironing", price: 30, img: "/images/iron.png" },
    { id: 3, name: "Stain Removal", price: 100, img: "/images/stain-remover.png" },
    { id: 4, name: "Leather & Suede Cleaning", price: 500, img: "/images/leather.png" },
    { id: 5, name: "Wedding Dress Cleaning", price: 1000, img: "/images/wedding-dress.png" },
    { id: 6, name: "Wash & Fold", price: 100, img: "/images/wash.png" },
  ];

  const addToCart = (service) => {
    const existing = cart.find(item => item.id === service.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <section className="container mt-20 px-4 py-10 bg-amber-600">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE – SERVICES */}
        <div className="bg-white p-6 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold mb-2">Our Services</h1>
          <p className="text-gray-600 mb-4">
            Click on the Add To Cart button to add the services to your cart
          </p>
          <hr className="mb-6" />

          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <img src={service.img} className="w-8 h-8" alt={service.name} />
                  <span>{service.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>₹{service.price}</span>
                  <button
                    onClick={() => addToCart(service)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 text-sm cursor-pointer"
                  >
                    Add
                  </button>
                
                </div>
              </div>
            ))}
            <hr className="m-3"/>
            <div>
              <h3 className="text-sky-400 flex justify-center mt-10">Add the items according to your need </h3>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Added Items Table */}
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold mb-4">Added Items</h1>
            <hr className="mb-4" />
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">No items added</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Service</th>
                      <th className="p-3 text-right">Qty</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-right">Total</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 text-right">{item.quantity}</td>
                        <td className="p-3 text-right">₹{item.price}</td>
                        <td className="p-3 text-right font-bold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Book Now</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border rounded px-3 py-2" />
              <input type="email" placeholder="Email ID" className="w-full border rounded px-3 py-2" />
              <input type="tel" placeholder="Phone Number" className="w-full border rounded px-3 py-2" />
            </form>
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Book Now (₹{totalAmount.toLocaleString()})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
