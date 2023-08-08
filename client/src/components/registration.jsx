import React, { useState } from "react";
import "../css/registration.css";
import axios from "axios";
const RegistrationForm = () => {
  const base_url = "http://localhost:5000";
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
      console.log("Response data:", response.data);

      if (response.status === 201) {
        console.log("Registration successful");
        setName("");
        setAddress("");
        setPhoneNumber("");
        setRole("");
        setPassword("");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="registration-form">
      <div className="input-form">
        <h2 style={{ textAlign: "center" }}>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Role:</label>
            <select value={role} onChange={handleRoleChange} required>
              <option value="">Select Role</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Transporter">Transporter</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
