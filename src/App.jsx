


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";


import Laundary from "./Components/Laundary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Laundary/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




