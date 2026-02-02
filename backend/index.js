import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";


dotenv.config();


cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);


const absolutePath = path.resolve(); 

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(process.cwd(), "frontend", "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    console.log("Step 1: Attempting to connect to MongoDB...");
    await connectDb(); 
    console.log("Step 2: Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Step 3: Server is sprinting on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to start server!");
    console.error("Error Message:", error.message);
    process.exit(1);
  }
};

startServer();