import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

// Handle User Registration.
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // ensure all fields are filled.
  if (!username || !email || !password) {
    throw new Error("Please fill all the input fields.");
  }

  // if user exists, reject.
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
  }

  // password encryption
  const saltValue = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, saltValue);

  // create user
  const newUser = new User({ username, email, password: encryptedPassword });
  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong.");
  }
});

// Handling logins.
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  generateToken(res, existingUser._id);
  res.status(201).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });

  return;
});

// Logout the current user.
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully." });
});

export { createUser, loginUser, logoutCurrentUser };
