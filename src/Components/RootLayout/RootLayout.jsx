import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function RootLayout({userData,setuserData}) {
function logOut(){
  localStorage.removeItem('userToken');
  setuserData(null);
  Navigate('/login');
}


  return (
    <>
      <Navbar logOut={logOut} userData={userData} />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
