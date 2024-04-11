/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../models/User.model';

const skippableUserFields = '-__v -passwordResetData';

// TODO: Add types
const authServices = {
  getUserByEmail: (email: string) => User.findOne({ email }, 'password'),
  getUserById: (userId: string) =>
    User.findOne({ _id: userId }, skippableUserFields),
  createUser: (data: unknown) => User.create(data),
  updateUser: (userId: string, data: any) =>
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: data,
      },
      { new: true, fields: skippableUserFields },
    ),
  validatePassword: (user: any, password: string) =>
    user.isValidatedPassword(password),
  getAccessToken: (user: any) => user.getAccessToken(),
  getRefreshToken: (user: any) => user.getRefreshToken(),
  async updateUserPassword(email: string, password: string) {
    const user = await User.findOne({ email });
    if (user === null) throw new Error('User not found');
    user.password = password;
    await user.save();
    return user;
  },
  updateUserPasswordResetData: async (
    email: string,
    passwordResetData: any,
  ) => {
    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          'passwordResetData.expiryTime': passwordResetData.expiryTime,
          'passwordResetData.token': passwordResetData.token,
        },
      },
      { new: true },
    );
  },
  getUserByForgotPasswordToken: (token: string) =>
    User.findOne({ 'passwordResetData.token': token }),
};

export default authServices;
