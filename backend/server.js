import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug check for Gemini API key
console.log(
  "Gemini API Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

// Routes
app.use("/api/resume", resumeRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Backend Running");
});

// Start server
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});