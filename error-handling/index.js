import express from 'express'
import connectDB from './config/database.js';
import router from './routes/contacts.routes.js';
import dotenv from 'dotenv'

const app = express();
dotenv.config();

connectDB();

// MiddleWares
app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
})