import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

/**
 * Router instance for user-related routes.
 * @type {express.Router}
 */
const router = express.Router();

// Route serving user creation and listing all users.
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

//  Route serving user authentication.
router.route("/auth").post(loginUser);

// Route for logging out the current user.
router.route("/logout").post(logoutCurrentUser);

// Routes serving user profile operations.
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
