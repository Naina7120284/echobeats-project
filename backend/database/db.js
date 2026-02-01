import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("Connecting to Mongo with URI:", process.env.MONGO_URI); // Debug line
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5001, // Timeout after 5 seconds instead of waiting forever
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DETAILED MONGODB ERROR:", error.message);
    process.exit(1);
  }
};

export default connectDb;
