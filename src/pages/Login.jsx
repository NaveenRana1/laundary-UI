import React from 'react'
import {useState} from "react";
import axios from "react";
const login = () => {

    const[logindata,setLoginData]=useState({
        email:"",
        password:"",

    });

    const handleChange=(e)=>{
        setLoginData({
            ...logindata,[e.target.name]:e.target.value,

        });
    };

const handleLogin=async (e)=>{
    e.preventDefault();


    try{
        const response= await axios.post(
               "http://localhost:8000/login",
        logindata

        );
        localStorage.setItem(
            "token", response.data.token        );

        alert("login Successful");

    }
    catch(error){
        alert("invalid credential")
        
    }


};

  return (
    <div>
       <form
        onSubmit={handleLogin}
        className="border p-6 rounded flex flex-col gap-4 w-80"
      >
        <h2 className="text-2xl font-bold">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default login
