import mongoose from "mongoose";
import { env } from "../../config/env";

export async function connectDatabase() {
  const url = env.DATABASE_URL;
  if (!url) {
    console.warn("DATABASE_URL not set — skipping database connection.");
    return;
  }

  try {
    await mongoose.connect(url, {
      // options are handled by mongoose defaults in v7
    } as mongoose.ConnectOptions);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

export default connectDatabase;
