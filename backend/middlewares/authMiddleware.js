import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //read the JWT from the Cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); // exclude the ppassword field from the result of the query.
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Authentication Failed. Token has issues");
    }
  } else {
    res.status(401);
    throw new Error("Authentication Failed. No JWt token found.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("You do not have administrator priviledges.");
  }
};

export { authenticate, authorizeAdmin };
