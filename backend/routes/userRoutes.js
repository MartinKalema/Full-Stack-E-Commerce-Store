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

// instance of express.Router()
const router = express.Router();

// USER ROUTES
router
  .route("/")
  .post(createUser) // When a POST request is sent to the root URL '/', it triggers the createUser function.
  .get(authenticate, authorizeAdmin, getAllUsers); // When a GET request is sent to the root URL '/', it triggers the middleware functions sequentially. getAllUsers only executes if the user is successfully authenticated and authorized as an admin.
router.post("/auth", loginUser); // We don't need middleware to run the loginUser function.
router.post("/logout", logoutCurrentUser); // We don't need middleware to run the logoutCurrentUser function.
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile); // authenticate the user before getting the user profile.

// ADMINISTRATOR ROUTES

export default router;
