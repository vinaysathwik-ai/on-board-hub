import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/agent", async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;

    // Sanitize history to ensure strict User -> Model -> User order
    // Gemini requires the first message to be User, and roles to swap.
    const sanitizedHistory = [];
    let lastRole = null;

    for (const msg of history) {
      const role = msg.role === 'assistant' ? 'model' : 'user';

      if (!msg.content || typeof msg.content !== 'string') continue; // Skip empty/invalid

      if (role === lastRole) {
        // Merge with previous message if same role
        sanitizedHistory[sanitizedHistory.length - 1].parts[0].text += "\n" + msg.content;
      } else {
        sanitizedHistory.push({
          role: role,
          parts: [{ text: msg.content }]
        });
        lastRole = role;
      }
    }

    // Ensure the history doesn't start with 'model' (Gemini requires starting with 'user')
    // If it does, we can either drop it or pre-pend a dummy user message.
    // Dropping is safer for context.
    if (sanitizedHistory.length > 0 && sanitizedHistory[0].role === 'model') {
      sanitizedHistory.shift();
    }

    const model = genAI.getGenerativeModel({
      model: process.env.MODEL_NAME || "gemini-1.5-flash",
    });

    const chat = model.startChat({
      history: sanitizedHistory,
    });

    const result = await chat.sendMessageStream(prompt);

    // Set headers for SSE-like streaming (though we'll just stream text chunks)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }

    res.end();
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ reply: `AI Error: ${err.message || "Unknown error"}` });
  }
});

app.listen(5000, () => {
  console.log("✅ AI backend running on http://localhost:5000");
});
