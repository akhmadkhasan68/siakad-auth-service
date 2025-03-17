import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    app: {
        env: process.env.APP_ENV || 'development',
        port: parseInt(process.env.APP_PORT) || 3001,
        urlPrefix: process.env.APP_URL_PREFIX || 'auth',
    },
    timezone: process.env.TIMEZONE || 'Asia/Jakarta',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        name: process.env.DB_NAME || 'postgres',
    },
    nats: {
        url: process.env.NATS_URL || 'nats://localhost:4222',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresInMilisecond: +process.env.JWT_EXPIRES_IN_MILISECOND || 3600000,
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        refreshExpiresInMilisecond:
            +process.env.JWT_REFRESH_EXPIRES_IN_MILISECOND || 86400000,
    },
    failedLoginMaxAttempts:
        parseInt(process.env.FAILED_LOGIN_MAX_ATTEMPTS) || 3,
    otp: {
        numberOfDigits: parseInt(process.env.OTP_NUMBER_OF_DIGITS) || 6,
        expirationTimeInMinutes:
            parseInt(process.env.OTP_EXPIRATION_TIME_IN_MINUTES) || 5,
        delayRequestInMinutes:
            parseInt(process.env.OTP_DELAY_REQUEST_IN_MINUTES) || 1,
    },
    forgotPassword: {
        expirationTimeInMinutes:
            parseInt(process.env.FORGOT_PASSWORD_EXPIRATION_TIME_IN_MINUTES) ||
            5,
    },
    dateFormat: process.env.DATE_FORMAT || 'YYYY-MM-DD HH:mm:ss',
};
