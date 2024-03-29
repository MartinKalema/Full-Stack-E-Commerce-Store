import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// Connect to the database.
connectDB();

const app = express();

// Middleware to parse JSON bodies.
app.use(express.json());

// Middleware to parse URL-encoded bodies.
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from the HTTP Request.
app.use(cookieParser());

// Routes for user-related operations.
app.use("/api/users", userRoutes);

// Starts the server on the specified port.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
