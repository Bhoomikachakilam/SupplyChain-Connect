
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";
import Navbar from "./Navbar";
import "../css/orderForm.css";

const ManufacturerOrderForm = ({userName}) => {
  const navigate = useNavigate();
// const base_url = "https://supplychain-connect.onrender.com";
  const base_url = "http://localhost:5000";
  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const pickupAddress = decodedToken.address;

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedTransporterId, setSelectedTransporterId] = useState("");
  const [transporters, setTransporters] = useState([]);

  useEffect(() => {
    fetchTransporters();
  }, []);

  const fetchTransporters = async () => {
    try {
      const response = await axios.get(`${base_url}/transporter`);
      setTransporters(response.data);
    } catch (error) {
      console.error("Error fetching transporters:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedTransporter = transporters.find(
      (t) => t.name === selectedTransporterId
    );

    const orderData = {
      orderId: nanoid(),
      from,
      to,
      quantity,
      pickupAddress,
      transporterId: selectedTransporter._id,
      transporter: selectedTransporter.name,
      manufacturer:userName
    };

    try {
      const response = await axios.post(
        `${base_url}/createorder`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order Submitted:", response.data);
      setFrom("");
      setTo("");
      setQuantity("");
      setSelectedTransporterId("");
      navigate("/Manufacturerorders");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <>
    <Navbar link={"/Manufacturerorders"} name={"orders"} />
    <div className="registration-form">
      <div className="input-form" >
        <h2 style={{textAlign:"center"}}>Place an Order</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="from" className="form-label">
            From:
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="form-input"
            required
          />

          <label htmlFor="to" className="form-label">
            To:
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className="form-input"
            required
          />

          <label htmlFor="quantity" className="form-label">
            Quantity:
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="form-input"
            required
          />

          <label htmlFor="selectedTransporter" className="form-label">
            Transporter:
          </label>
          <select
            id="selectedTransporter"
            name="selectedTransporter"
            value={selectedTransporterId}
            onChange={(event) => setSelectedTransporterId(event.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Transporter</option>
            {transporters.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>

          <div className="form-button-container">
            <button type="submit" className="form-button">
              Submit Request
            </button>
          </div>
        </form>
      </div>
      </div>
      </>
  );
};

export default ManufacturerOrderForm;
