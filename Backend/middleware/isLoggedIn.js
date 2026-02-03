const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to check if the user is logged in
// It expects the JWT in an HttpOnly cookie named "token"
module.exports = async function isLoggedIn(req, res, next) {
  try {
    // `cookie-parser` in app.js makes `req.cookies` available
    const token = req.cookies && req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Login required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find the user and exclude the password field
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(500).json({ message: "Authentication failed" });
  }
};