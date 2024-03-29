import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const CHAT_EVENTS = {
  JOIN_CHAT: "JOIN_CHAT",
  START_TYPING: "START_TYPING",
  STOP_TYPING: "STOP_TYPING",
  DISCONNECT: "DISCONNECT",
  SOCKET_ERROR: "SOCKET_ERROR",
} as const;

const mountEvents = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  // Join chat
  socket.on(CHAT_EVENTS.JOIN_CHAT, (chatId) => {
    socket.join(chatId);
  });
  // Start Typing
  socket.on(CHAT_EVENTS.START_TYPING, (chatId) => {
    socket.in(chatId).emit(CHAT_EVENTS.START_TYPING, chatId);
  });
  // Stop Typing
  socket.on(CHAT_EVENTS.STOP_TYPING, (chatId) => {
    socket.in(chatId).emit(CHAT_EVENTS.STOP_TYPING, chatId);
  });
  // Disconnect User
  socket.on(CHAT_EVENTS.DISCONNECT, () => {
    if (socket.user?._id) {
      socket.leave(socket.user._id);
    }
  });
};

const initializeSocketIO = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  return io.on("connection", async (socket) => {
    try {
      // // parse the cookies from the handshake headers (This is only possible if client has `withCredentials: true`)
      // const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

      // let token = cookies?.accessToken; // get the accessToken

      // if (!token) {
      //   // If there is no access token in cookies. Check inside the handshake auth
      //   token = socket.handshake.auth?.token;
      // }

      // if (!token) {
      //   // Token is required for the socket to work
      //   throw new ApiError(401, "Un-authorized handshake. Token is missing");
      // }

      // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // decode the token

      // const user = await User.findById(decodedToken?._id).select(
      //   "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
      // );

      // // retrieve the user
      // if (!user) {
      //   throw new ApiError(401, "Un-authorized handshake. Token is invalid");
      // }
      // socket.user = user; // mount te user object to the socket

      // // We are creating a room with user id so that if user is joined but does not have any active chat going on.
      // // still we want to emit some socket events to the user.
      // // so that the client can catch the event and show the notifications.
      // socket.join(user._id.toString());
      // socket.emit('User Connected');

      mountEvents(socket);
    } catch (error) {
      socket.emit(
        CHAT_EVENTS.SOCKET_ERROR,
        error?.message ||
        "Something went wrong while connecting to the socket.",
      );
    }
  });
};

export default initializeSocketIO;
