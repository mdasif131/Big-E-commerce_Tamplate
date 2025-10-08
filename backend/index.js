// packages import
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; 
import cookieParser from "cookie-parser";


// Utils import
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000; 

connectDB(); 
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});