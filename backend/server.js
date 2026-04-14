const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyDqPMxidwaV_y76rHNxXcVjLrE8wOjahyU";

app.post("/chat", async (req, res) => {
    const input = req.body.message;

    console.log("User:", input);

    // ⚡ fast replies
    if (input.toLowerCase().includes("hi")) {
        return res.json({ reply: "Hello 👋 I am AVA!" });
    }

    try {
    const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [{ text: input }]
      }
    ]
  }
);

        let reply =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            reply = "AI thinking 🤔 try again";
        }

        res.json({ reply });

    } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);

        res.json({
            reply: "⚠️ AI error. Try again later 😢"
        });
    }
});

app.listen(5000, () => {
    console.log("✅ Server running at http://localhost:5000");
});