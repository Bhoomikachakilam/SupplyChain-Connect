import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios"

function Chat({ socket, username, room }) {
  const base_Url="http://localhost:5000"
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
console.log(room)
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
        content: currentMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {

    const fetchInitialChats = async () => {

    const response = await axios.get(`${base_Url}/chats/${room}`);
    setMessageList(response.data[0].messages);
      
    };

    fetchInitialChats(); 

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket, room]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      <ScrollToBottom className="message-container">
  {messageList.map((messageContent, messageIndex) => (
    <div
      className="message"
      key={messageIndex}
      id={username === messageContent.author ? "you" : "other"}
    >
      <div>
        <div className="message-content">
          <p>{messageContent.content}</p>
        </div>
        <div className="message-meta">
          <p id="time">{messageContent.timestamp}</p>
          <p id="author">{messageContent.sender}</p>
        </div>
      </div>
    </div>
  ))}
</ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
