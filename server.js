import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Ambil dari environment variable (lebih aman)
const BOT_TOKEN = process.env.BOT_TOKEN || "ISI_TOKEN_KAMU";
const CHAT_ID = process.env.CHAT_ID || "ISI_CHAT_ID_KAMU";

app.use(express.json());

// Endpoint root (cek server jalan)
app.get("/", (req, res) => {
  res.send("✅ Server Relay Telegram aktif");
});

// Endpoint GET untuk kirim pesan
app.get("/send", async (req, res) => {
  try {
    const msg = req.query.msg || "Pesan kosong dari ESP32";
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.ok) {
      return res.status(400).json({ success: false, error: data });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error("❌ Error kirim ke Telegram:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Relay server running on port ${PORT}`);
});
