import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import "../css/chat.css";
function Chat({ socket, userName, room }) {
  const base_Url = "https://supplychain-connect.onrender.com";
//  const base_Url = "http://localhost:5000";
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: userName,
        content: currentMessage,
        timestamp: new Date().toISOString(),
      };
      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    const fetchInitialChats = async () => {
      const response = await axios.get(`${base_Url}/chats/${room}`);
      const initialMessages = response.data[0]?.messages || [];
      setMessageList(initialMessages);
    };
    fetchInitialChats();
  }, [room]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.length > 0 ? (
            messageList.map((messageContent, messageIndex) => (
              <div
                className="message"
                key={messageIndex}
                id={userName === messageContent.sender ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p
                      id="time"
                      className="timestamp"
                      style={{
                        color:
                          userName === messageContent.sender
                            ? "white"
                            : "#272829",
                      }}
                    >
                      {formatDate(messageContent.timestamp)}
                    </p>
                    <p
                      id="author"
                      style={{
                        color:
                          userName === messageContent.sender
                            ? "#272829"
                            : "white",
                      }}
                    >
                      {messageContent.sender}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No messages available.</p>
          )}
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
        <button className="enter-button" onClick={sendMessage}>
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;
