import express from "express";
import cors from "cors";
import { summarizeText } from "./gemini.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/summarize", async (req, res) => {
  const summary = await summarizeText(req.body.text);
  res.json({ summary });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
