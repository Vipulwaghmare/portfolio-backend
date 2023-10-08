import logger from "../config/logger/index.js";
import APIError from "../middlewares/ErrorHandler.js";
import authServices from "../services/auth.services.js";
import { verifyRefreshToken } from "../utils/jwt.utils.js";
import {
  passwordUpdatedEmail,
  passwordUpdatedFailedEmail,
} from "../utils/mail.utils.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  logger.info("[Logging In] email: %s", email);
  if (!email || !password) {
    throw new APIError({
      message: "Email and Password are required",
      status: 400,
    });
  }
  const user = await authServices.getUserByEmail(email);

  if (!user) {
    throw new APIError({
      message: "User not found",
      status: 400,
    });
  }

  const isMatched = await authServices.validatePassword(user, password);
  if (!isMatched) {
    throw new APIError({
      message: "Email and Password doesn't match",
      status: 400,
    });
  }
  const accessToken = await authServices.getAccessToken(user);
  const refreshToken = await authServices.getRefreshToken(user);
  return res.json({
    success: `User is logged in with email: ${email}`,
    accessToken,
    refreshToken,
  });
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  logger.info("[Sign Up] email: %s", email);

  if (!email || !password) {
    throw new APIError({
      message: "Email and Password are required",
      status: 400,
    });
  }
  const isExisting = await authServices.getUserByEmail(email);

  if (isExisting) {
    throw new APIError({
      message: "Email is already in use",
      status: 409,
    });
  }
  const payload = {
    email,
    password,
    name,
  };
  const user = await authServices.createUser(payload);
  logger.info("[Sign Up] [user created successfully] email: %s", email);
  return res.status(201).json({
    success: "User is successfully created",
    user,
  });
};

const getAccessTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  const isVerified = await verifyRefreshToken(refreshToken);
  if (!isVerified) {
    throw new APIError({
      message: "Invalid refresh token provided",
      status: 400,
    });
  }
  const user = await authServices.getUserByEmail(req.userEmail);
  const accessToken = await authServices.getAccessToken(user);
  const newRefreshToken = await authServices.getRefreshToken(user);
  return res.json({
    accessToken,
    refreshToken: newRefreshToken,
  });
};

const updatePasswordController = async (req, res) => {
  const { userEmail, oldPassword, newPassword } = req.body;
  logger.info("[Updating password] email: %s", userEmail);
  if (!userEmail || !oldPassword || !newPassword) {
    throw new APIError({
      message: "Invalid request",
      status: 400,
    });
  }
  const user = await authServices.getUserByEmail(userEmail);

  if (!user) {
    throw new APIError({
      message: "User not found",
      status: 400,
    });
  }
  const isMatched = await authServices.validatePassword(user, password);

  if (!isMatched) {
    passwordUpdatedFailedEmail(userEmail);
    throw new APIError({
      message: "Email and Password doesn't match",
      status: 400,
    });
  }

  const updatedUser = await authServices.updateUserPassword(
    userEmail,
    newPassword,
  );
  passwordUpdatedEmail(userEmail);
  logger.info("[Password Updated] email: %s", userEmail);
  return res.json(updatedUser);
};

const forgotPasswordController = async (req, res) => {};
const resetPasswordController = async (req, res) => {};

const authControllers = {
  login: loginController,
  register: registerController,
  getAccessToken: getAccessTokenController,
  forgotPassword: forgotPasswordController,
  resetPassword: resetPasswordController,
  updatePassword: updatePasswordController,
};

export default authControllers;
