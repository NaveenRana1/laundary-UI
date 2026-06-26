


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";



import Laundary from "./Components/Laundary";
import  {ForgotPassword,ResetPassword}  from "./Components/ForgotPassword";


function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/dashboard"       element={<Laundary />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password"  element={<ResetPassword />} />
        <Route path="/login"           element={<Login/>}/>
      </Routes>
    </BrowserRouter>


   
  );
}

export default App;




