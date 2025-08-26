import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN || "7749843416:AAFgwcAHfcKelpomFb5ibv9JlNWdZavIf70";
const CHAT_ID = process.env.CHAT_ID || "1122713484";

app.get("/", (req, res) => {
  res.send("✅ Server aktif");
});

app.get("/send", async (req, res) => {
  try {
    const msg = req.query.msg || "⚠️ Bahaya terdeteksi!";
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.ok) return res.status(400).json({ success: false, error: data });

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server jalan di port ${PORT}`));
