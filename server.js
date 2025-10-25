const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Allow all origins for dev
});

// Serve a test endpoint
app.get("/", (req, res) => res.send("Socket.io Chat Server Running"));

// Listen for socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for chat messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Broadcast to all clients
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => console.log(🚀 Socket.io server running on port ${PORT}));
