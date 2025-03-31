import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Handle base64 images

app.post("/receive-frame", (req, res) => {
  const { frame, location } = req.body;
  console.log("Frame received from:", location);
  res.json({ message: "Frame received successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Online Server running on port ${PORT}`));
