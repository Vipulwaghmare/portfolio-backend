import { createTransport } from "nodemailer";
import logger from "../config/logger";
import dotEnv from "dotenv";
dotEnv.config();

const RESET_PASSWORD_URL = process.env.RESET_PASSWORD_URL;

const transporter = createTransport({
  port: parseInt(process.env.SMTP_PORT),
  host: process.env.SMTP_SERVER,
  secure: false,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
});

const getMailData = ({ to, subject, text, html, attachment }) => ({
  from: process.env.SMTP_SENDER,
  to,
  subject,
  text,
  html,
  attachment,
});

// ! Send mail
// const data = {
//   to: 'test@gmail.com',
//   subject: 'Test',
//   text: 'Text whre will this be',
//   html: '<h1>Hello this is h1 tag</h1>'
// }
// sendEmail(data)

const sendEmailPromise = (mailData) =>
  new Promise((res, rej) => {
    transporter.sendEmail(mailData, (error, info) => {
      if (error) {
        logger.error(error);
        rej(error);
      }
      logger.info("[ Email Sent ] to: %s subject: %s", data.to, data.subject);
      return res({
        success: `Message Sent Successsfully. ID: ${info.messageId}`,
      });
    });
  });

const sendEmail = async (data, throwError = false) => {
  const mailData = getMailData(data);
  // transporter.sendEmail(mailData, (error, info) => {
  //   if (error) {
  //     logger.error(error);
  //     return { error };
  //   }
  //   logger.info("[ Email Sent ] to: %s subject: %s", data.to, data.subject);
  //   return { success: `Message Sent Successsfully. ID: ${info.messageId}` };
  // });
  try {
    console.log({ mailData });
    await sendEmailPromise(mailData);
  } catch (e) {
    if (throwError) throw new Error("Failed to send the email");
  }
};

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

export const passwordUpdatedEmail = (userEmail) =>
  sendEmail({
    ...emailTemplates.passwordUpdated,
    to: userEmail,
  });

export const passwordUpdatedFailedEmail = (userEmail) =>
  sendEmail({
    ...emailTemplates.passwordUpdatedFailed,
    to: userEmail,
  });

export const sendPasswordResetEmail = (userEmail, token) =>
  sendEmail(
    {
      ...emailTemplates.forgotPasswordEmail(token),
      to: userEmail,
    },
    true,
  );

export default sendEmail;
