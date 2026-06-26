import React from "react";
import { useState } from "react";

import axios from "axios";

const Register = () => {
  const [registerdata, setregisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setregisterData({
      ...registerdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(registerdata.password)) {
      alert(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        registerdata,
      );
      console.log(response.data);
      alert("Registration Successful");

      setregisterData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex item-center justify-center bg-gray-300">
      <form
        onSubmit={handleRegister}
        className="bg-gray-100
       p-8 rounded-xl shadow-lg ,w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <input
          type="text"
          name="name"
          placeholder="username"
          value={registerdata.name}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerdata.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerdata.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <p className="text-sm text-gray-500 mt-2 font-medium">
          Password must contain:
        </p>

        <ul className="text-sm text-gray-500 list-disc ml-5 font-medium">
          <li>At least 8 characters</li>
          <li>One uppercase letter (A-Z)</li>
          <li>One lowercase letter (a-z)</li>
          <li>One number (0-9)</li>
          <li>One special character (@$!%*?&)</li>
        </ul>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 cursor-pointer mt-5 "
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
