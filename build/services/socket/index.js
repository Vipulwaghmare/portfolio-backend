"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAT_EVENTS = void 0;
exports.CHAT_EVENTS = {
    JOIN_CHAT: 'JOIN_CHAT',
    START_TYPING: 'START_TYPING',
    STOP_TYPING: 'STOP_TYPING',
    DISCONNECT: 'DISCONNECT',
    SOCKET_ERROR: 'SOCKET_ERROR',
};
const mountEvents = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
socket) => {
    // Join chat
    socket.on(exports.CHAT_EVENTS.JOIN_CHAT, chatId => {
        socket.join(chatId);
    });
    // Start Typing
    socket.on(exports.CHAT_EVENTS.START_TYPING, chatId => {
        socket.in(chatId).emit(exports.CHAT_EVENTS.START_TYPING, chatId);
    });
    // Stop Typing
    socket.on(exports.CHAT_EVENTS.STOP_TYPING, chatId => {
        socket.in(chatId).emit(exports.CHAT_EVENTS.STOP_TYPING, chatId);
    });
    // Disconnect User
    socket.on(exports.CHAT_EVENTS.DISCONNECT, () => {
        // if (socket.user?._id) {
        //   socket.leave(socket.user._id);
        // }
    });
};
const initializeSocketIO = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
io) => {
    return io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        catch (error) {
            socket.emit(exports.CHAT_EVENTS.SOCKET_ERROR, 
            // error?.message ||
            'Something went wrong while connecting to the socket.');
        }
    }));
};
exports.default = initializeSocketIO;
//# sourceMappingURL=index.js.map