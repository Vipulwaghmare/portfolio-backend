import User from "../models/User.model.js";

const authServices = {
  getUserByEmail: (email) => User.findOne({ email }, "password"),
  createUser: (data) => User.create(data),
  validatePassword: (user, password) => user.validatePassword(password),
  getAccessToken: (user) => user.getAccessToken(),
  getRefreshToken: (user) => user.getRefreshToken(),
  updateUserPassword: (email, password) =>
    User.findOneAndUpdate({ email }, { password }, { new: true }),
};

export default authServices;
