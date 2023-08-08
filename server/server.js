import express from "express"
import dotenv from "dotenv"
import authrouter from "./routes/routes.js"
import mongoose from "mongoose";
import cors from "cors"
const app = express()
dotenv.config();
const MONGO=process.env.MONGO_URI
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(authrouter)
app.listen(port, () => {
    console.log(`server started at ${port}`)
    mongoose
        .connect(MONGO)
        .then(() => {
            console.log("connected to db");
        })
        .catch((err) => {
            console.log(`here is the error: ${err}`);
        });
    
})