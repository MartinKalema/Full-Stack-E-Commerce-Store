/**
 * Middleware for authentication and authorization.
 * @module authMiddleware
 */

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

/**
 * Middleware to authenticate a user based on JWT token.
 * Verifies the JWT token from the request cookies, decodes it to find the user,
 * and attaches the user object to the request for downstream middleware and routes.
 *
 * @function authenticate
 * @param {Function} asyncHandler - Wraps asynchronous route handlers and passes errors to Express error handling.
 * @returns {Function} Middleware function that takes Express's req, res, and next parameters.
 */

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. No JWT token found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Corrected typo in comment and optimized query
    req.user = await User.findById(decoded.userId).select("-password"); // Exclude the password field from the result of the query.
    next();
  } catch (error) {
    // Unified error handling
    console.error("Authentication token error:", error.message);
    return res
      .status(401)
      .json({ message: "Authentication failed. Token has issues." });
  }
});

/**
 * Middleware to authorize admin access.
 * Checks if the authenticated user has admin privileges before proceeding to the next middleware.
 * If not, it responds with a 403 Forbidden status.
 *
 * @function authorizeAdmin
 * @returns {Function} Middleware function that takes Express's req, res, and next parameters.
 */

const authorizeAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    // Optional chaining for safety. Only access isAdmin if req.user exists.
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Requires administrator privileges." }); // 403 Forbidden for clarity
  }
};

export { authenticate, authorizeAdmin };
