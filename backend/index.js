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

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);


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
connectAndLog();

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(process.cwd(), "frontend", "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Step 3: Server is sprinting on http://localhost:${PORT}`);
  });
}

export default app;