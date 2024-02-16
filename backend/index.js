import path from "path";
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.listen(port, () => console.log(`Server running on port: ${port}`));