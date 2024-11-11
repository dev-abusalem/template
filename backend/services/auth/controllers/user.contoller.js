const jsonwebtoken = require("jsonwebtoken");
const { generateAccessToken } = require("../../../utils/token/tokens");
const UserService = require("../services/user.service");
const dotenv = require("dotenv");
// const DashboardService = require("../services/dashboard.service");
dotenv.config();

async function createUser(req, res, next) {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(200).json({ data: data, message: "Login successfull !" });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      const user = jsonwebtoken.verify(
        refreshToken,
        process.env.JWT_SECRET
      ).data;
      const accessToken = await generateAccessToken(user);
      res.status(200).json({ accessToken: accessToken });
    } else {
      res
        .status(404)
        .json({ message: "You must need token for generate access token" });
    }
  } catch (error) {
    next(error);
  }
}

const oauthCallback = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await UserService.handleOAuth(
      req.user
    );
    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(500).json({ message: "Authentication failed", error });
  }
};

// dashboard data access
const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await DashboardService.getDashboardData();
    res.status(200).json(dashboard);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createUser,
  oauthCallback,
  // getDashboard,
  loginUser,
  updateUser,
  getUser,
  deleteUser,
  refreshToken,
};
