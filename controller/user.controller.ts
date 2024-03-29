import authServices from "../services/auth.services.js";
import { TRequest } from './types';

type TUserController = {
  getUser: TRequest;
  updateUser: TRequest;
};

const userControllers: TUserController = {
  getUser: async (req, res) => {
    const user = await authServices.getUserById(req.body.userId);
    return res.send({ user });
  },
  updateUser: async (req, res) => {
    const userId = req.body.userId;
    const updatedData = req.body.data;
    const newUser = await authServices.updateUser(userId, updatedData);
    return res.send({ user: newUser });
  },
};

export default userControllers;
