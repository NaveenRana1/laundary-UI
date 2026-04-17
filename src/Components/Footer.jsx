import React from 'react'

const Footer = () => {
  return (
 <>
  {/* Newsletter Section */}
  <section className="bg-blue-500 p-10 mt-20 max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      <h2 className="font-bold text-2xl text-white text-center md:text-left">
        Subscribe to our newsletter
      </h2>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <input
            type="text"
            placeholder="Full name"
            className="bg-white rounded-2xl p-3 w-full sm:w-40 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-white rounded-2xl p-3 w-full sm:w-40 outline-none"
          />
        </div>

        <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-2xl font-semibold transition cursor-pointer" >
          Subscribe
        </button>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-100 max-w-6xl mx-auto">
    <div className="max-w-6xl mx-auto p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
      
      {/* Logo & About */}
      <div>
        <h1 className="font-bold text-lg">Logo</h1>
        <h4 className="font-semibold mt-3">About us</h4>
        <p className="text-gray-600 text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      {/* Important Links */}
      <div>
        <h3 className="font-semibold mb-3">Important Links</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li className="hover:text-blue-500 cursor-pointer">About us</li>
          <li className="hover:text-blue-500 cursor-pointer">Contact us</li>
          <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-blue-500 cursor-pointer">Terms of use</li>
          <li className="hover:text-blue-500 cursor-pointer">Refund policy</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-semibold mb-3">Contact</h3>
        <p className="text-sm text-gray-600">mail@site.com</p>
        <p className="text-sm text-gray-600 mt-1">+91 7897423190</p>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="font-semibold mb-3">Follow us</h3>
        <div className="flex gap-3">
          <img src="/images/social-media.png" alt="Twitter" className="w-6 h-6 cursor-pointer" />
          <img src="/images/instagram.png" alt="Instagram" className="w-6 h-6 cursor-pointer" />
          <img src="/images/facebook-logo.png" alt="Facebook" className="w-6 h-6 cursor-pointer" />
          <img src="/images/play.png" alt="YouTube" className="w-7 h-7 cursor-pointer" />
        </div>
      </div>

    </div>
  </footer>
</>

  )
}
export default Footer
