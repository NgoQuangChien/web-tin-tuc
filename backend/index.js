const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

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
  origin: "http://localhost:5173",
  credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/v1/auth", authRoutes);


// Kết nối DB
connectDB();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});