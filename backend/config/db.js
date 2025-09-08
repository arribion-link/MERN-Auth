import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    process.exit(1);
}

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully...")
    } catch (error) {
        console.error("Error connecting app to database...", error);
    }
}

export default connectDB