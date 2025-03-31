import express from "express";
import multer from "multer";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increase limit for image data

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to receive uploaded videos
app.post("/upload", upload.single("video"), (req, res) => {
  console.log("Video received:", req.file.originalname);
  res.json({ message: "Video uploaded!" });
});

// New endpoint to receive frames from the frontend
app.post("/stream", (req, res) => {
  const { frame } = req.body;
  console.log("Frame received:", frame.substring(0, 50)); // Log part of frame data for verification
  res.json({ message: "Frame received successfully" });
});

server.listen(5000, () => console.log("✅ Server running on port 5000"));
