import Chat from "../models/Chat.model";
import User from "../models/User.model";

const chatCommonAggregation = () => {
  return [
    {
      // lookup for the participants present
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "participants",
        as: "participants",
        pipeline: [
          {
            $project: {
              password: 0,
              refreshToken: 0,
              forgotPasswordToken: 0,
              forgotPasswordExpiry: 0,
              emailVerificationToken: 0,
              emailVerificationExpiry: 0,
            },
          },
        ],
      },
    },
    {
      // lookup for the group chats
      $lookup: {
        from: "chatmessages",
        foreignField: "_id",
        localField: "lastMessage",
        as: "lastMessage",
        pipeline: [
          {
            // get details of the sender
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "sender",
              as: "sender",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    avatar: 1,
                    email: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              sender: { $first: "$sender" },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        lastMessage: { $first: "$lastMessage" },
      },
    },
  ];
};

const chatServices = {
  getAllUserChats(userId) {
    return Chat.aggregate([
      {
        $match: {
          participants: { $elemMatch: { $eq: userId } },
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      ...chatCommonAggregation(),
    ]);
  },
  searchUser(userId) {
    return User.aggregate([
      {
        $match: {
          _id: {
            $ne: userId, // avoid logged in user
          },
        },
      },
      {
        $project: {
          avatar: 1,
          username: 1,
          email: 1,
        },
      },
    ]);
  },
};

export default chatServices;
