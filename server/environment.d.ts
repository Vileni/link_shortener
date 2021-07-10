import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DB: string;
      SECRET_KEY: Secret | string;
      BASE_URL: string;
      IP: string;
    }
  }
}

export {};
