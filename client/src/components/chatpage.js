import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client"; // Corrected import
import jwtDecode from "jwt-decode";
import Chat from "./chat"; // Import the Chat component

const ChatPage = () => {
  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const username= decodedToken.userId;
  const { roomId } = useParams();
  const socket = io.connect("http://localhost:5000"); 
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    // Join the room when the component mounts
    socket.emit("join_room", roomId);
  }, [roomId]);

  return (
    <div className="chat-container">
      {showChat && <Chat socket={socket} username={username} room={roomId} />}
    </div>
  );
};

export default ChatPage;
