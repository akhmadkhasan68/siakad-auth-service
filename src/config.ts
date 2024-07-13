import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  app: {
    env: process.env.APP_ENV || 'development',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process
      .env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'postgres',
  },
  nats: {
    url:  process.env.NATS_URL || 'nats://localhost:4222',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  failedLoginMaxAttempts: parseInt(process.env.FAILED_LOGIN_MAX_ATTEMPTS) || 3,
};
