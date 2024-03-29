import { createTransport } from "nodemailer";
import logger from "../config/logger";
import dotEnv from "dotenv";
import Mail, { Attachment } from "nodemailer/lib/mailer";
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

type TMailData = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
};

const getMailData = ({ to, subject, text, html, attachments }: TMailData): Mail.Options => ({
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

const sendEmailPromise = (mailData: Mail.Options) =>
  new Promise((res, rej) => {
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        logger.error(error);
        rej(error);
      }
      logger.info("[ Email Sent ] to: %s subject: %s", mailData.to, mailData.subject);
      return res({
        success: `Message Sent Successsfully. ID: ${info.messageId}`,
      });
    });
  });

const sendEmail = async (data: TMailData, throwError = false) => {
  const mailData = getMailData(data);
  try {
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
  forgotPasswordEmail: (token: string) => ({
    subject: "You have requested to request password reset",
    text: `Your have requested to reset password. Please visit following link and reset your password: ${RESET_PASSWORD_URL}${token}`,
  }),
};

export const passwordUpdatedEmail = (userEmail: string) =>
  sendEmail({
    ...emailTemplates.passwordUpdated,
    to: userEmail,
  });

export const passwordUpdatedFailedEmail = (userEmail: string) =>
  sendEmail({
    ...emailTemplates.passwordUpdatedFailed,
    to: userEmail,
  });

export const sendPasswordResetEmail = (userEmail: string, token: string) =>
  sendEmail(
    {
      ...emailTemplates.forgotPasswordEmail(token),
      to: userEmail,
    },
    true,
  );

export default sendEmail;
