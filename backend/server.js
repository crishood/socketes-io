const express = require("express");
const SocketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new connection");

  socket.emit("welcome", { message: "hola mundo" });

  socket.on("message", (data) => {
    const supradata = [data];
    io.emit("broadcast", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

server.listen(8000, () => console.log("Server running"));
