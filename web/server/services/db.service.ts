import mongoose from "mongoose";

let isConnected = false;

export async function getDB() {
  if (isConnected) return mongoose.connection;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}
