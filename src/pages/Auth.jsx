import React from 'react'
import {useState,useEffect} from "react";
import axios from "axios";

const Auth = () => {
    const[user,setUser]=useState(null);

    useEffect(()=>{

        getprofile();

    },[]);



    const getprofile= async ()=>{
        const token=localStorage.getItem("token")

    };

    try(
        const response=await axios.get(
            "http://localhost:8000/login"
        )
    )
  return (
    <div>
      
    </div>
  )
}

export default Auth
