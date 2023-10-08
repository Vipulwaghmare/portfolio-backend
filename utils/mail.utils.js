import { createTransport } from "nodemailer";
import logger from "../config/logger/index.js";

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

const sendEmail = (data) => {
  const mailData = getMailData(data);
  transporter.sendEmail(mailData, (error, info) => {
    if (error) {
      logger.error(error);
      return { error };
    }
    logger.info("[ Email Sent ] to: %s subject: %s", data.to, data.subject);
    return { success: `Message Sent Successsfully. ID: ${info.messageId}` };
  });
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

export default sendEmail;
