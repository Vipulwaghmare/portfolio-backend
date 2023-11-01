import authServices from "../services/auth.services.js";

const getUserController = async (req, res) => {
  const user = await authServices.getUserById(req.body.userId);
  return res.send({ user });
};

const updateUserController = async (req, res) => {
  const userId = req.body.userId;
  const updatedData = req.body.data;
  const newUser = await authServices.updateUser(userId, updatedData);
  return res.send({ user: newUser });
};

const userControllers = {
  getUser: getUserController,
  updateUser: updateUserController,
};

export default userControllers;
