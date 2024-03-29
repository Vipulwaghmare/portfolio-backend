
import logger from "../config/logger";
import APIError from "../middlewares/ErrorHandler";
import { accessTokenSchema, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, updatePasswordSchema } from "../schemas/auth.schema";
import authServices from "../services/auth.services";
import { genRandomString } from "../utils/crypto.utils";
import { verifyRefreshToken } from "../utils/jwt.utils";
import {
  passwordUpdatedEmail,
  passwordUpdatedFailedEmail,
  sendPasswordResetEmail,
} from "../utils/mail.utils";
import { TRequest } from './types';


type TAuthController = {
  login: TRequest;
  register: TRequest;
  getAccessToken: TRequest;
  forgotPassword: TRequest;
  resetPassword: TRequest;
  updatePassword: TRequest;
};

const authControllers: TAuthController = {
  login: async (req, res) => {
    const requestBody = loginSchema.parse(req.body);
    const { email, password } = requestBody;
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
  },
  register: async (req, res) => {
    const requestBody = registerSchema.parse(req.body);
    const { name, email, password } = requestBody;
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
  },
  getAccessToken: async (req, res) => {
    const body = accessTokenSchema.parse(req.body);
    const { refreshToken, userEmail } = body;
    const isVerified = await verifyRefreshToken(refreshToken);
    if (!isVerified) {
      throw new APIError({
        message: "Invalid refresh token provided",
        status: 400,
      });
    }
    const user = await authServices.getUserByEmail(userEmail);
    const accessToken = await authServices.getAccessToken(user);
    const newRefreshToken = await authServices.getRefreshToken(user);
    return res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  },
  updatePassword: async (req, res) => {
    const body = updatePasswordSchema.parse(req.body);
    const { userId, oldPassword, newPassword } = body;
    logger.info("[Updating password] UserId: %s", userId);
    if (!oldPassword || !newPassword) {
      throw new APIError({
        message: "Invalid request",
        status: 400,
      });
    }
    const user = await authServices.getUserById(userId);

    if (!user) {
      throw new APIError({
        message: "User not found",
        status: 400,
      });
    }
    const isMatched = await authServices.validatePassword(user, oldPassword);
    const userEmail = user.email;
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
  },
  forgotPassword: async (req, res) => {
    const body = forgotPasswordSchema.parse(req.body);
    const { email } = body;
    logger.info("[Forgot Password Request] email: %s", email);
    if (!email) {
      throw new APIError({
        message: "Invalid request. Please provide email.",
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

    const token = genRandomString();

    const currentDate = new Date();
    const expiryTime = new Date(currentDate.getTime() + 15 * 60 * 1000);
    const passwordResetData = {
      token,
      expiryTime,
    };

    await authServices.updateUserPasswordResetData(email, passwordResetData);
    await sendPasswordResetEmail(email, token);

    return res.json({
      message: "Successfully send password reset email to your email",
    });
  },
  resetPassword: async (req, res) => {
    const body = resetPasswordSchema.parse(req.body);
    const { password, token } = body;
    if (!password || !token) {
      throw new APIError({
        message: "Invalid request",
        status: 400,
      });
    }
    const user = await authServices.getUserByForgotPasswordToken(token);
    if (!user?.passwordResetData?.expiryTime) {
      throw new APIError({
        message: "You have not requested to reset password",
        status: 400,
      });
    }

    if (user.passwordResetData.expiryTime <= new Date()) {
      throw new APIError({
        message: "Your password reset link is expired. Please try again.",
        status: 400,
      });
    }
    await authServices.updateUserPassword(user.email, password);
    return res.json({
      message: "Successfully updated user password",
    });
  }
};


export default authControllers;
