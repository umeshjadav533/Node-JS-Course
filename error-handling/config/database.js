import mongoose from "mongoose";

// Database connection
const connectDB = () => {
    mongoose.connect(`${process.env.MONGODBURI}/contacts-crud`).then("Database Connected.");
}

export default connectDB;