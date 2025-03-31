import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("stream", (data) => {
    console.log("Frame received, broadcasting...");
    io.emit("processedFrame", { type: "image", data: data.frame }); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Keep WebSocket server alive to prevent Render from shutting it down
setInterval(() => {
  io.emit("ping", { message: "keep-alive" });
}, 30000);

server.listen(5000, () => console.log("✅ WebSocket Server running on port 5000"));
