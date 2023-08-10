import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/registration.css";
import Navbar from "./Navbar";
const RegistrationForm = () => {
  const navigate = useNavigate();
  const base_url = "https://supplychain-connect.onrender.com";
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registrationData = {
      name,
      email,
      password,
      address,
      phoneNumber,
      role,
    };
    try {
      const response = await axios.post(
        `${base_url}/register`,
        registrationData
      );

      if (response.status === 201) {
        console.log("Registration successful");
        setName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        setRole("");
        setPassword("");
        navigate("/")
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      <Navbar link={ "/"} name={"Login"} />
    <div className="registration-form">
      <div className="input-form">
        <h2 style={{ textAlign: "center" }}>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group input-icons">
          
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              required
              className="styled-input"
            />
          </div>
          <div className="input-group input-icons">
            <i className="fas fa-envelope icon"></i>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              className="styled-input"
            />
          </div>
          <div className="input-group input-icons">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="styled-input"
            />
          </div>
          <div className="input-group input-icons">
          
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={handleAddressChange}
              required
              className="styled-input"
            />
          </div>
          <div className="input-group input-icons">
          
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
              className="styled-input"
            />
          </div>
          <div className="input-group input-icons">
      
            <select
              value={role}
              onChange={handleRoleChange}
              required
              className="styled-select"
            >
              <option value="">Select Role</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Transporter">Transporter</option>
            </select>
          </div>
           <div className="styled-button" style={{ textAlign: "center" }}>
            <button className="button-group"type="submit">Register</button>
          </div>
        </form>
      </div>
      </div>
      </>
  );
};


export default RegistrationForm;
