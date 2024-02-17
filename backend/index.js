import path from "path";
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js"; 

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', router);

app.listen(port, () => console.log(`Server running on port: ${port}`));