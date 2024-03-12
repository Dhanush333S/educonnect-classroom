import React, { useState, useEffect } from "react";
import Message from "./Message";
import { IoSend } from "react-icons/io5";
import axios from "axios";

function ChatHelper({ sender, receiver, receiverName }) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/chat/messages/${sender}/${receiver}`
        );
        console.log(sender,receiver)
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error.response?.data?.message || error.message);
      }
    };

    fetchMessages();
  }, [sender, receiver]);

  const handleMessageSend = async () => {
    if (messageInput.trim() === "") {
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/chat/messages`, {
        sender,
        receiver,
        message: messageInput,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/chat/messages/${sender}/${receiver}`
      );
      setMessages(response.data.messages);
      setMessageInput("");
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{receiverName}</h1>
        <h2>{receiver}</h2>
      </div>

      <div className="chatBoxTop">
        {messages.map((msg) => (
          <Message
            key={msg._id}
            time={msg.time}
            mine={msg.sender === sender.toString()}
            message={msg.message}
          />
        ))}
      </div>

      <div className="chat-input-container">
        <input
          className="chat-input"
          placeholder="Write your text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></input>
        <button className="chat-button" onClick={handleMessageSend}>
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default ChatHelper;
