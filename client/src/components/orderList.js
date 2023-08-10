import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/orderList.css"
const OrderList = () => {
  const base_url = "http://localhost:5000";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${base_url}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <h2>My Orders</h2>
      <div className="order-list">
        {orders.map((order) => (
          <Link key={order._id} to={`/chats/${order.orderId}`}>
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order.orderId}</h3>
            <p>From: {order.from}</p>
            <p>To: {order.to}</p>
            </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
