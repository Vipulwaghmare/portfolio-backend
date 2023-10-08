import logger from "../config/logger/index.js";
import APIError from "../middlewares/ErrorHandler.js";
import authServices from "../services/auth.services.js";

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
  const accessToken = await authServices.getAccessToken();
  const refreshToken = await authServices.getRefreshToken();
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

const authControllers = {
  login: loginController,
  register: registerController,
};

export default authControllers;
