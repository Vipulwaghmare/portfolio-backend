declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      // TODO: Fix later
      MONGODB_URL: string;
    }
  }
}