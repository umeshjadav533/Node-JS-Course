import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(`${process.env.MONGODBURI}/students-crud`)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log(err))
}

export default connectDB;