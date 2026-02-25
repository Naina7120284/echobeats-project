import mongoose from "mongoose";

let isConnected = false; // Track connection state globally

const connectDb = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MONGODB ERROR:", error.message);
    // Don't exit process in serverless; let the next request try again
  }
};

export default connectDb;