import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/orderList.css";

const OrderList = () => {
  const navigate = useNavigate();
  const base_url = "https://supplychain-connect.onrender.com";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${base_url}/manufacturerorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChatButtonClick = (orderId) => {
    navigate(`/chats/${orderId}`);
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>My Orders</h2>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order.orderId}</h3>
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
