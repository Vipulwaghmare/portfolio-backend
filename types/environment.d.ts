declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      SMTP_PORT: string;
      SMTP_LOGIN: string;
      SMTP_PASSWORD: string;
      RESET_PASSWORD_URL: string;
    }
  }
}

export { }