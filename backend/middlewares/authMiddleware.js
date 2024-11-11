const jwt = require("jsonwebtoken");
const User = require("../services/auth/models/user.model");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

const authGuard = (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({ message: "You don't have a JWT" });
    }
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.data;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Your token is expired . please login again " });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

const restrict = (roles) => async (req, res, next) => {
  try {
    const token = req.header("authorization")?.split(" ")[1];
    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({ message: "You don't have a JWT" });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.data;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (roles.includes(user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "You don't have permission" });
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Please login again" });
    }
    return res
      .status(500)
      .json({ message: "Please check your permission or login again" });
  }
};

module.exports = { authGuard, restrict };
