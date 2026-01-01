import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME || process.env.Cloud_Name,
  api_key: process.env.CLOUD_API || process.env.Cloud_Api,
  api_secret: process.env.CLOUD_SECRET || process.env.Cloud_Secret,
});

const app = express();

// using middlewaresAA
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

//importing routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

//using routes
app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
