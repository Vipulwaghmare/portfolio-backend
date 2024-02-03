// Import the necessary modules
const User = require("./models/User.model.js");

// Function to create a new user
exports.createUser = async function (userData) {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

// Function to delete a user by ID
exports.deleteUser = async function (userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

// Function to update a user by ID
exports.updateUser = async function (userId, userData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};
