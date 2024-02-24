import express from "express";
import { Server } from "socket.io";

const router = express.Router();

// Create a new instance of Socket.io
const io = new Server();

// Route for handling chat messages
router.post("/chat", (req, res) => {
  // Get the message from the request body
  const message = req.body.message;

  // Emit the message to all connected clients
  io.emit("chatMessage", message);

  // Send a response
  res.status(200).json({ success: true, message: "Message sent" });
});

// Route for handling socket.io connection
router.get("/socket.io", (req, res) => {
  // Handle socket.io connection
  io.on("connection", (socket) => {
    // Handle incoming chat messages
    socket.on("chatMessage", (message) => {
      // Broadcast the message to all connected clients except the sender
      socket.broadcast.emit("chatMessage", message);
    });
  });

  res
    .status(200)
    .json({ success: true, message: "Socket.io connection established" });
});

export default router;
