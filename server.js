import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Ganti sesuai bot kamu
const BOT_TOKEN = "7749843416:AAFgwcAHfcKelpomFb5ibv9JlNWdZavIf70";
const CHAT_ID = "1122713484";

app.get("/send", async (req, res) => {
  try {
    const msg = req.query.msg || "Pesan kosong dari ESP32";
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Relay server running on port ${PORT}`);
});
