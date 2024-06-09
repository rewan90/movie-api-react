import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(userData,logOut) {
  return (
    <nav className="p-2 d-flex justify-content-between flex-md-row flex-column">
      <div className="left-navbar d-flex align-items-center flex-md-row flex-column">
        <h1 className="m-0 pe-3">
          <Link className="navbar-brand" to="/">LOGO</Link>
        </h1>
        {userData ?<ul className="list-unstyled d-flex m-0 align-items-center">
          <li className="px-2"> <Link to="/" >Home</Link> </li>
          <li className="px-2"> <Link to="about" >About</Link> </li>
          <li className="px-2"> <Link to="movies" >Movies</Link> </li>
          <li className="px-2"> <Link to="tv">Tv</Link> </li>
          <li className="px-2"> <Link to="people" >People</Link> </li>

        </ul>:''}
      </div>

      <div className="right-navbar d-flex align-items-center flex-md-row flex-column">
    <div className="social-media">
        <li className='fab mx-1 fa-facebook'></li>
        <li className='fab mx-1 fa-twitter'></li>
        <li className='fab mx-1 fa-instagram'></li>
        <li className='fab mx-1 fa-youtube'></li>

    </div>
        <ul className="list-unstyled d-flex m-0 align-items-center flex-md-row flex-column">
       
        {userData? <>

          <li className="px-2"> <Link to="Profile" >Profile</Link> </li>
          <li className="px-2" onClick={logOut}> <span className="btn btn-danger">Logout</span></li>
        </>: <> 
        <li className="px-2"> <Link to="login" >Login</Link> </li>
        <li className="px-2"> <Link to="register" >Register</Link> </li>
          </>
              }
        </ul>
      </div>
    </nav>
  );
}
