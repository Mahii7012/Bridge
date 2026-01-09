import {
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { speakText } from "../hooks/useTextToSpeech";
import { startListening } from "../hooks/useSpeechToText";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  // Use environment variable for the backend URL, defaulting to localhost for development
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


  const summarize = async () => {
    const res = await fetch(`${API_URL}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h3">Bridge</Typography>
      <Typography variant="h6" gutterBottom>
        Inclusive learning powered by AI
      </Typography>

      <Paper sx={{ p: 3, mt: 4 }}>
        <textarea
          rows="6"
          style={{ width: "100%", fontSize: "16px", padding: "12px" }}
          placeholder="Paste learning content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => speakText(text)}>
            🔊 Read Aloud
          </Button>
          <Button variant="outlined" onClick={() => startListening(setText)}>
            🎙 Speech → Text
          </Button>
          <Button variant="contained" color="success" onClick={summarize}>
            🧠 Summarize
          </Button>
        </Stack>
      </Paper>

      {summary && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6">AI Summary</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {summary}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
