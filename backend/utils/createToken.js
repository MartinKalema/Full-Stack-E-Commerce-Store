import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Generates a JWT token and sets it as an HTTP-only cookie.
 *
 * @param {Object} res - The response object from Express.js.
 * @param {string} userId - The user ID to include in the JWT payload.
 * @returns {string} The generated JWT token.
 */
const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Consider making this configurable based on environment
    });

    // Securely configure the cookie based on the environment
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
      httpOnly: true, // Protect against XSS attacks
      secure: isProduction, // Send only over HTTPS in production
      sameSite: "strict", // CSRF protection and cross-site request behavior
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration to match token
    });

    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate authentication token.");
  }
};

export default generateToken;
