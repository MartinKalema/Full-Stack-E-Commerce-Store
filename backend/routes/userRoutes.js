import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

/**
 * Router instance for user-related routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route serving user creation and listing all users.
 * POST: Creates a new user.
 * GET: Retrieves all users, requires authentication and admin authorization.
 */
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

/**
 * Route serving user authentication.
 * POST: Authenticates a user and returns a token.
 */
router.post("/auth", loginUser);

/**
 * Route for logging out the current user.
 * POST: Ends the user's session or invalidates their token.
 */
router.post("/logout", logoutCurrentUser);

/**
 * Routes serving user profile operations.
 * GET: Retrieves the current user's profile, requires authentication.
 * PUT: Updates the current user's profile, requires authentication.
 */
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

export default router;
