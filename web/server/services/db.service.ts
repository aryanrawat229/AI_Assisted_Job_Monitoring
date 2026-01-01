import mongoose from "mongoose";
let connection: mongoose.Connection | null = null;

export async function getDB() {
  if (!connection) {
    await mongoose.connect(process.env.MONGO_URI!);
    connection = mongoose.connection;
    console.log("Connected to DB once.");
  }
  return connection;
}
