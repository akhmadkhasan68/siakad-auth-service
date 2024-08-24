import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    app: {
        env: process.env.APP_ENV || 'development',
    },
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
    failedLoginMaxAttempts:
        parseInt(process.env.FAILED_LOGIN_MAX_ATTEMPTS) || 3,
    otp: {
        numberOfDigits: parseInt(process.env.OTP_NUMBER_OF_DIGITS) || 6,
        expirationTimeInMinutes:
            parseInt(process.env.OTP_EXPIRATION_TIME_IN_MINUTES) || 5,
        delayRequestInMinutes:
            parseInt(process.env.OTP_DELAY_REQUEST_IN_MINUTES) || 1,
    },
};
