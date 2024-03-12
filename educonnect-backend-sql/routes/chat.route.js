const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const connection = mongoose.connect(process.env.dbURL);

const router = express.Router();
const { ChatMessage } = require("../models/chat.schema");

router.get("/messages/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;

  try {
    // Fetch messages from both sender to receiver and receiver to sender
    const senderToReceiver = await ChatMessage.find({ sender, receiver });
    const receiverToSender = await ChatMessage.find({
      sender: receiver,
      receiver: sender,
    });

    // Combine and sort the messages based on the time field in descending order
    const allMessages = [...senderToReceiver, ...receiverToSender].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );

    res.json({ messages: allMessages });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    // Save the message to the database
    const newMessage = new ChatMessage({ sender, receiver, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
