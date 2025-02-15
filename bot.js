const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// 🔥 Thay TOKEN bot của mày vào đây
const TOKEN = "7578384719:AAE7BWfKE5BQzQ1ExjFyHJ1zqespNccn-Jc";

// Tạo bot với webhook để chạy trên Koyeb
const bot = new TelegramBot(TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

// Xử lý dữ liệu từ Telegram
app.use(express.json());
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Đặt webhook để bot nhận tin nhắn
bot.setWebHook(`https://passing-shantee-phancongtri-7ef1cd3b.koyeb.app/bot${TOKEN}`);

app.listen(PORT, () => {
    console.log(`Bot đang chạy trên port ${PORT}`);
});

// 📌 Xử lý lệnh /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Chào! Tôi là bot nhắc nhở. Hãy dùng /add để thêm nhắc nhở!");
});

// 📌 Xử lý lệnh /add [nội dung] [HH:MM] [ngày]
bot.onText(/\/add (.+) (\d{2}:\d{2})? (\d{1,2})?/, (msg, match) => {
    const chatId = msg.chat.id;
    const content = match[1];
    const time = match[2] || "08:00"; // Mặc định 08:00 nếu không nhập giờ
    const day = match[3] ? parseInt(match[3]) : new Date().getDate(); // Mặc định là hôm nay

    bot.sendMessage(chatId, `✅ Đã đặt nhắc nhở: *${content}* vào lúc *${time}* ngày *${day}*`, { parse_mode: "Markdown" });
});
