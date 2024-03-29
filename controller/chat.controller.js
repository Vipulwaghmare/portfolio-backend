import chatServices from "../services/chat.services.js";

const getAllChats = async (req, res) => {
  const chats = await chatServices.getAllUserChats(req.body.userId);
  return res.json({
    message: "User chats fetched successfully!",
    chats,
  });
};

const searchUsers = async (req, res) => {
  const users = await chatServices.searchUser(req.body.userId);
  return res.json({
    users,
  });
};

const chatControllers = {
  getAllChats,
  searchUsers,
};

export default chatControllers;
