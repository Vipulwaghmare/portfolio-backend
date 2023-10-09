import User from "../models/User.model.js";

const authServices = {
  getUserByEmail: (email) => User.findOne({ email }, "password"),
  createUser: (data) => User.create(data),
  validatePassword: (user, password) => user.isValidatedPassword(password),
  getAccessToken: (user) => user.getAccessToken(),
  getRefreshToken: (user) => user.getRefreshToken(),
  async updateUserPassword(email, password) {
    const user = await User.findOne({ email });
    user.password = password;
    await user.save();
    return user;
  },
  updateUserPasswordResetData: async (email, passwordResetData) => {
    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          "passwordResetData.expiryTime": passwordResetData.expiryTime,
          "passwordResetData.token": passwordResetData.token,
        },
      },
      { new: true },
    );
  },
  getUserByForgotPasswordToken: (token) =>
    User.findOne({ "passwordResetData.token": token }),
};

export default authServices;
