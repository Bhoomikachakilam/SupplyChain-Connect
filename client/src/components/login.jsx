import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"
const Loginform = () => {
  const navigate=useNavigate()
  const base_url = "https://supplychain-connect.onrender.com";
  // const base_url = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${base_url}/login`, loginData);

      if (response.status === 200) {
        localStorage.setItem("Token", response.data.accessToken);
        setEmail("");
        setPassword("");
        const token=localStorage.getItem("Token")
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        navigate(`/${userRole}orders`); 
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="registration-form">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-icons">

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              className="styled-input"
            />
          </div>
          <div className="input-icons">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="styled-input"
            />
        </div>
          <div className="styled-button" style={{ textAlign: "center" }}>
            <button type="submit" id="button-group">Login</button>
          </div>
        </form>
      </div>
   
  );
};

export default Loginform;
