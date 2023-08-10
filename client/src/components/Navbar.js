import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../css/homepage.css";

function Navbar({ link, name }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate('/');
  };

  return (
    <nav className='NavBar'>
      <h3 className="empHeading" onClick={() => navigate('/')}>SupplyChain-Connect</h3>
      <div className='login-button'>
        {token ? (
          <>
            <Link to={`${link}`} className="nav-link">{name}</Link>
            <Link to={"/"} onClick={handleLogout} className="nav-link">Logout</Link>
          </>
        ) : (
          <>
            <Link to={`${link}`} className="nav-link">{name}</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
