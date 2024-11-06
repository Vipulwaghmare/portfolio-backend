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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.passwordUpdatedFailedEmail = exports.passwordUpdatedEmail = void 0;
const nodemailer_1 = require("nodemailer");
const logger_1 = __importDefault(require("../config/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RESET_PASSWORD_URL = process.env.RESET_PASSWORD_URL;
const transporter = (0, nodemailer_1.createTransport)({
    port: parseInt(process.env.SMTP_PORT),
    host: process.env.SMTP_SERVER,
    secure: false,
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
    },
});
const getMailData = ({ to, subject, text, html, attachments }) => ({
    from: process.env.SMTP_SENDER,
    to,
    subject,
    text,
    html,
    attachments,
});
// ! Send mail
// const data = {
//   to: 'test@gmail.com',
//   subject: 'Test',
//   text: 'Text whre will this be',
//   html: '<h1>Hello this is h1 tag</h1>'
// }
// sendEmail(data)
const sendEmailPromise = (mailData) => new Promise((res, rej) => {
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            logger_1.default.error(error);
            rej(error);
        }
        logger_1.default.info("[ Email Sent ] to: %s subject: %s", mailData.to, mailData.subject);
        return res({
            success: `Message Sent Successsfully. ID: ${info.messageId}`,
        });
    });
});
const sendEmail = (data_1, ...args_1) => __awaiter(void 0, [data_1, ...args_1], void 0, function* (data, throwError = false) {
    const mailData = getMailData(data);
    try {
        yield sendEmailPromise(mailData);
    }
    catch (e) {
        if (throwError)
            throw new Error("Failed to send the email");
    }
});
const emailTemplates = {
    passwordUpdated: {
        subject: "You have updated your password for APPICATION NAME",
        text: "You have successfully updated your password",
    },
    passwordUpdatedFailed: {
        subject: "You have tried updating your password for APPICATION NAME",
        text: "You have tried updating your password but failed. If not your DO THE FOLLOWING",
    },
    forgotPasswordEmail: (token) => ({
        subject: "You have requested to request password reset",
        text: `Your have requested to reset password. Please visit following link and reset your password: ${RESET_PASSWORD_URL}${token}`,
    }),
};
const passwordUpdatedEmail = (userEmail) => sendEmail(Object.assign(Object.assign({}, emailTemplates.passwordUpdated), { to: userEmail }));
exports.passwordUpdatedEmail = passwordUpdatedEmail;
const passwordUpdatedFailedEmail = (userEmail) => sendEmail(Object.assign(Object.assign({}, emailTemplates.passwordUpdatedFailed), { to: userEmail }));
exports.passwordUpdatedFailedEmail = passwordUpdatedFailedEmail;
const sendPasswordResetEmail = (userEmail, token) => sendEmail(Object.assign(Object.assign({}, emailTemplates.forgotPasswordEmail(token)), { to: userEmail }), true);
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.default = sendEmail;
//# sourceMappingURL=mail.utils.js.map