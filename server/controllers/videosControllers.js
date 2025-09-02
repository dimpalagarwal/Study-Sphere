// server/controllers/videosController.js
import { askGemini } from "../services/geminiService.js";

export const getVideos = async (req, res) => {
  try {
    const { topic } = req.query; // frontend: /api/videos?topic=AI
    const response = await askGemini(`Give me top 5 YouTube video titles about ${topic}`);
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
