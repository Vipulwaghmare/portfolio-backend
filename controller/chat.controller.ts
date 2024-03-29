import chatServices from "../services/chat.services.js";
import { TRequest } from "./types.js";

type TChatControllers = {
  getAllChats: TRequest;
  searchUsers: TRequest;
}

const chatControllers: TChatControllers = {
  getAllChats: async (req, res) => {
    const chats = await chatServices.getAllUserChats(req.body.userId);
    return res.json({
      message: "User chats fetched successfully!",
      chats,
    });
  },
  searchUsers: async (req, res) => {
    const users = await chatServices.searchUser(req.body.userId);
    return res.json({
      users,
    });
  },
};

export default chatControllers;
