import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message)
        process.exit(1);
    });
};
