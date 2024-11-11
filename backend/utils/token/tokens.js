const jwt = require("jsonwebtoken");
const AppError = require("../error/AppError");
const dotenv = require("dotenv");
dotenv.config();

// Function to generate an access token (expires in 1 hour)
async function generateAccessToken(data) {
  if (!data) {
    throw new AppError("Sorry! You must provide data to create a token", 404);
  }

  const accessToken = await jwt.sign(
    { data: data },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 } // 1 hour (in seconds)
  );

  return accessToken;
}

// Function to generate a refresh token (expires in 20 days)
async function generateRefreshToken(data) {
  if (!data) {
    throw new AppError("Sorry! You must provide data to create a token", 404);
  }

  const refreshToken = await jwt.sign(
    { data: data },
    process.env.JWT_SECRET,
    { expiresIn: "20d" } // 20 days
  );

  return refreshToken;
}

module.exports = { generateAccessToken, generateRefreshToken };
 