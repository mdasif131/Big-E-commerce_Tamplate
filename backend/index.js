// packages import
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";


// Utils import
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();
const port = process.env.PORT || 5000; 

connectDB(); 
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/uploads', uploadRoutes);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));


app.get('/',(req, res) => {
  res.send("API is running...");
});


app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});