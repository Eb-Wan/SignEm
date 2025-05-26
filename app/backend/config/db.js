import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = () => mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to DB"))
.catch(error => {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
});