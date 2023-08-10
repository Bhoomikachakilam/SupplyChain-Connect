import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "../css/orderList.css";

const OrderList = () => {
  const navigate = useNavigate();
  const base_url = "http://localhost:5000";
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${base_url}/transporterorders`, {
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
  const handleLogout = () => {
    localStorage.removeItem("Token");
    // navigate('/');
  };

  return (
    <div>
      <nav className='NavBar'>
      <h3 className="empHeading" onClick={() => navigate('/')}>SupplyChain-Connect</h3>
      <div className='login-button'>
      <Link to={"/"} onClick={handleLogout} className="nav-link">Logout</Link>
      </div>
    </nav>
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
