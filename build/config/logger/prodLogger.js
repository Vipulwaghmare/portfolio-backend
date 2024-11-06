"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] - [${level}] : ${message}`;
});
// const options = {
//   to: "vipulwaghmare2202@gmail.com",
//   from: process.env.SMTP_SENDER,
//   host: process.env.SMTP_SERVER,
//   subject: "Backend broke",
//   username: process.env.SMTP_LOGIN,
//   password: process.env.SMTP_PASSWORD,
//   ssl: true,
// };
const prodLogger = () => {
    return (0, winston_1.createLogger)({
        level: 'debug',
        format: combine(winston_1.format.splat(), winston_1.format.simple(), timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), myFormat),
        handleExceptions: true,
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({
                filename: './logs/prodLogs/error.log',
                level: 'error',
                maxsize: 5242880,
            }),
            new winston_1.transports.File({
                filename: './logs/prodLogs/warnings.log',
                level: 'warn',
                maxsize: 5242880,
            }),
            new winston_1.transports.File({
                filename: './logs/prodLogs/info.log',
                level: 'info',
                maxsize: 5242880,
            }),
            new winston_1.transports.File({
                filename: './logs/prodLogs/debug.log',
                level: 'debug',
                maxsize: 5242880,
            }),
            new winston_1.transports.File({
                filename: './logs/prodLogs/combined.log',
                maxsize: 5242880,
            }),
            // new transports.Mail(options), // TODO: Uncomment for email errors
        ],
        exceptionHandlers: [
            new winston_1.transports.File({ filename: './logs/prodLogs/exceptions.log' }),
            // new transports.Mail(options), // TODO: Uncomment for email errors
        ],
    });
};
exports.default = prodLogger;
//# sourceMappingURL=prodLogger.js.map