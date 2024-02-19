import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

/**
 * Methods for handling user registration, login, and profile management.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

// User registration
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the input fields.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const saltValue = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, saltValue);

  const newUser = new User({ username, email, password: encryptedPassword });
  await newUser.save();
  generateToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

// Handle User Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password." });
  }

  generateToken(res, existingUser._id);
  res.status(200).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
});

// Logout the current user by clearing the JWT cookie.
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged Out Successfully." });
});

// Fetch all users. Requires admin privileges.
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get current user's profile data.
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ _id: user._id, username: user.username, email: user.email });
});

// Update current user's profile data.
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// Delete a user by id.
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Admins cannot be fetched using this endpoint.");
    }
    await User.deleteOne({ _id: user.id });
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get user by Id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user by id. Requires admin privileges.
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
