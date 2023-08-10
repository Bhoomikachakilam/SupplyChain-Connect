import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client"; // Corrected import
import jwtDecode from "jwt-decode";
import Chat from "./chat"; 

const ChatPage = ({userName}) => {
  const token = localStorage.getItem("Token");
  const { roomId } = useParams();
  const socket = io.connect("http://localhost:5000"); 
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, [roomId]);

  return (
    <div className="chat-container">
      {showChat && <Chat socket={socket}  room={roomId} userName={userName} />}
    </div>
  );
};

export default ChatPage;
