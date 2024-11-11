// src/services/user/services/user.service.js
const AppError = require("../../../utils/error/AppError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../utils/token/tokens");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const UserService = {
  async createUser(userData) {
    if (!userData.email) {
      throw new AppError("Sorry ! Please use all fields to create an account");
    }
    const isUser = await User.findOne({ email: userData.email });
    if (isUser) {
      throw new AppError("Sorry ! You have already account please login", 409);
    }
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const user = new User(userData);
    await user.save();
    return user;
  },

  async loginUser(userData) {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      throw new AppError("Sorry you are not registerd user", 401);
    }
    const isConfirmUser = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!isConfirmUser) {
      throw new AppError("Sorry ! Your email or password is incorrect", 409);
    }
    user.password = undefined;
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { user, accessToken, refreshToken };
  },
  async getUserById(userId) {
    return User.findById(userId).select("-password");
  },

  async updateUser(userId, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return User.findByIdAndUpdate(userId, updateData, { new: true }).select(
      "-password"
    );
  },

  async deleteUser(userId) {
    return User.findByIdAndDelete(userId);
  },

  // OAuth for facebook google and apple
  async handleOAuth(oauthUser) {
    let user = await User.findOne({ email: oauthUser.email });
    if (!user) {
      user = new User({
        name: oauthUser.name,
        email: oauthUser.email,
        role: "subscriber",
      });
      await user.save();
    }
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { user, accessToken, refreshToken };
  },
};

module.exports = UserService;
