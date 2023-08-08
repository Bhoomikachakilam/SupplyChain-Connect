import React, { useState } from "react";
import axios from "axios"; // Import the axios library

const Loginform = () => {
  const base_url = "http://localhost:5000"; // Replace with your backend URL
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
        console.log("Login successful");
        setEmail("")
        setPassword("")
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="registration-form">
      <div className="input-form">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="button-group">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
