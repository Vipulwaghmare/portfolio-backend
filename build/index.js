"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const socket_io_1 = require("socket.io");
const request_ip_1 = __importDefault(require("request-ip"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const yamljs_1 = __importDefault(require("yamljs"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = __importDefault(require("./config/database"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
const index_1 = __importDefault(require("./services/socket/index"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const swaggerDocument = yamljs_1.default.load('./swagger/main.yaml');
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Socket IO
const io = new socket_io_1.Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: '*', // 'http://localhost:3000/'
        credentials: true,
    },
});
app.set('io', io); // using set method to mount the `io` instance on the app to avoid usage of `global`
(0, database_1.default)();
(0, index_1.default)(io);
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(request_ip_1.default.mw());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((0, cookie_parser_1.default)());
app.use(rateLimiter_1.default);
// Routes
app.get('/', (_, res) => res.send('Welcome to API'));
app.get('/env', (_, res) => res.send(process.env));
app.use('/api/v1', auth_routes_1.default);
app.use('/api/v1/user', user_routes_1.default);
app.use('/api/v1', product_routes_1.default);
app.use('/api/v1/todo', todo_routes_1.default);
app.use('/api/v1/chat', chat_routes_1.default);
app.use('/api/v1/upload', upload_routes_1.default);
// Error Handling
app.use(ErrorHandler_1.notFound);
app.use(ErrorHandler_1.convertError);
const PORT = process.env.PORT || 1000;
// mongoose.connection.once('open', () => {
//   httpServer.listen(PORT, () => {
//     console.log(`App is running at ${PORT}`);
//   });
// });
httpServer.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
//# sourceMappingURL=index.js.map