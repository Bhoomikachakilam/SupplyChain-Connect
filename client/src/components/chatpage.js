import React, {  useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client"; // Corrected import
import Chat from "./chat"; 

const ChatPage = ({userName}) => {

  const { roomId } = useParams();
  const socket = io.connect("https://supplychain-connect.onrender.com"); 
  // const socket = io.connect( "http://localhost:5000"); 

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, [roomId]);

  return (
    <div className="chat-container">
       <Chat socket={socket}  room={roomId} userName={userName} />
    </div>
  );
};

export default ChatPage;
