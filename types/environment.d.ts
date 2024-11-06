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
      BUCKET_NAME: string;
      BUCKET_REGION: string;
      ACCESS_KEY: string;
      SECRET_ACCESS_KEY: string;
      MODE: 'development' | 'production';
    }
  }
}

export {};
