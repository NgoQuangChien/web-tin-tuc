const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news')


dotenv.config();
const app = express(); // Tạo ứng dụng Express

// Kết nối tới MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};


app.use(cors({
  origin: "http://localhost:5173", // Chỉ định nguồn được phép truy cập
  credentials: true, // Cho phép gửi cookie từ frontend
}));
app.use(cookieParser()); // Để phân tích cookie từ yêu cầu
app.use(express.json()); // Để phân tích cú pháp JSON trong body của yêu cầu

// ROUTES
// v1 là phiên bản API hiện tại tránh xung đột trong tương lai
app.use("/v1/auth", authRoutes); // Đường dẫn cho các route xác thực

app.use("/v1/news", newsRoutes); // Đường dẫn cho các route tin tức



// Kết nối DB
connectDB();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});