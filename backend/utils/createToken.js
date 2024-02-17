import jwt from "jsonwebtoken";

// generate a token which represents the User's authentication status.
//  For each request to the server, the client includes the cookie in the request headers. This allows the server to identify the user and their authentication status.
// userId is a custom claim.
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // make the token an HTTP_ONLY cookie.
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
