"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] - [${level}] : ${message}`;
});
const devLogger = () => {
    return (0, winston_1.createLogger)({
        level: "debug",
        format: combine(
        // colorize(),
        // label({ label: 'right meow!' }),
        winston_1.format.splat(), winston_1.format.simple(), timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), myFormat),
        // defaultMeta: { service: 'user-service' },
        transports: [
            //
            // - Write all logs with importance level of `error` or less to `error.log`
            // - Write all logs with importance level of `info` or less to `combined.log`
            //
            new winston_1.transports.Console(),
            new winston_1.transports.File({
                filename: "./logs/devLogs/error.log",
                level: "error",
                maxsize: 5242880,
            }), // 0
            new winston_1.transports.File({
                filename: "./logs/devLogs/warnings.log",
                level: "warn",
                maxsize: 5242880,
            }), // 1
            new winston_1.transports.File({
                filename: "./logs/devLogs/info.log",
                level: "info",
                maxsize: 5242880,
            }), // 2
            new winston_1.transports.File({
                filename: "./logs/devLogs/debug.log",
                level: "debug",
                maxsize: 5242880,
            }), // 5
            new winston_1.transports.File({
                filename: "./logs/devLogs/combined.log",
                maxsize: 5242880,
            }), // 5
        ],
        exceptionHandlers: [
            new winston_1.transports.File({ filename: "./logs/devLogs/exceptions.log" }),
        ],
    });
};
exports.default = devLogger;
//# sourceMappingURL=devLogger.js.map