import Footer from "./Components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />  
      <Footer/>
      
     
    </>
  );
}

export default Layout;
