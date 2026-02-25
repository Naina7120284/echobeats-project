import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow local and any vercel domain
    if (!origin || origin.includes("localhost") || origin.endsWith(".onrender.com")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(async (req, res, next) => {
  await connectDb(); 
  next();
});
app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);
app.get("/", (req, res) => {
  res.send("Server is sprinting and ready to serve music!");
});


const connectAndLog = async () => {
  try {
    console.log("Step 1: Attempting to connect to MongoDB...");
    await connectDb();
    console.log("Step 2: Database connected successfully.");
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to connect to DB!", error.message);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

app.listen(PORT, () => {
  console.log(`Step 3: Server is sprinting on port ${PORT}`);
  connectAndLog(); // Call your connection logger here
});

export default app;