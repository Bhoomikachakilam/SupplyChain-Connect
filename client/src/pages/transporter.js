import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/orderList.css";

const OrderList = () => {
  const navigate = useNavigate();
  // const base_url = "http://localhost:5000";
  const base_url = "https://supplychain-connect.onrender.com";
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredOrders(orders);
      return;
    }

    const searchResults = orders.filter((order) => {
      return (
        order.orderId.toLowerCase().includes(searchInput.toLowerCase()) ||
        order.manufacturer.toLowerCase().includes(searchInput.toLowerCase()) ||
        order.from.toLowerCase().includes(searchInput.toLowerCase()) ||
        order.to.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredOrders(searchResults);
  }, [searchInput, orders]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${base_url}/transporterorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChatButtonClick = (orderId) => {
    navigate(`/chats/${orderId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
  };

  return (
    <div>
      <nav className="NavBar">
        <h3 className="empHeading" onClick={() => navigate("/")}>
          SupplyChain-Connect
        </h3>
        <div className="login-button">
          <Link to={"/"} onClick={handleLogout} className="nav-link">
            Logout
          </Link>
        </div>
      </nav>

      <h2 style={{ textAlign: "center" }}>My Orders</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Order ID, Manufacturer, From, or To..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>

      <div className="order-list">
        {filteredOrders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order.orderId}</h3>
            <h4>Manufacturer: {order.manufacturer}</h4>
            <p>From: {order.from}</p>
            <p>To: {order.to}</p>
            <button
              className="chat-button"
              onClick={() => handleChatButtonClick(order.orderId)}
            >
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
