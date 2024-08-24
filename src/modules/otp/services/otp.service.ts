import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as crypto from 'crypto';
import dayjs from 'dayjs';
import { config } from 'src/config';
import { Otp } from 'src/databases/entities/otp.entity';
import { IOtp } from 'src/databases/interaces/otp.interface';
import { UserRepository } from 'src/modules/login/repositories/user.repository';
import { RequestOtpPayloadV1Dto } from '../dto/v1/request-otp/request-otp-payload-v1.dto';
import { OtpRepository } from '../repositories/otp.repository';

@Injectable()
export class OtpService {
    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async requestOtp(data: RequestOtpPayloadV1Dto): Promise<IOtp> {
        const today = dayjs();
        const delayRequestInMinutes = config.otp.delayRequestInMinutes;

        // check if email is already exist
        const checkEmailIsRegistered = await this.userRepository.findByEmail(
            data.email,
        );

        if (!checkEmailIsRegistered) {
            throw new UnprocessableEntityException('Email is not registered');
        }

        // check if email is already requested
        const currentRequest = await this.otpRepository.findOneByEmail(
            data.email,
        );

        if (currentRequest) {
            // check delay request
            const expiredAt = dayjs(currentRequest.expiredAt);
            const diffInMinutes = expiredAt.diff(today, 'minute');
            if (diffInMinutes > delayRequestInMinutes) {
                throw new UnprocessableEntityException(
                    `Please wait ${diffInMinutes} minutes before requesting OTP`,
                );
            }
        }

        // Generate code and expiration time
        const code = await this.generateCode();
        const expiredAt = await this.setExpirationTime();

        // data
        const otp = currentRequest || new Otp();
        otp.code = code;
        otp.email = data.email;
        otp.expiredAt = expiredAt;
        otp.retries = currentRequest ? currentRequest.retries + 1 : 1;

        // Save to database
        return await this.otpRepository.create(otp);
    }

    private async generateCode(): Promise<string> {
        const numberOfDigits = config.otp.numberOfDigits || 6;

        const otp = crypto.randomBytes(numberOfDigits).toString('hex');

        return otp;
    }

    private async setExpirationTime(): Promise<Date> {
        const today = dayjs();
        const expirationTimeInMinutes = config.otp.expirationTimeInMinutes;

        return today.add(expirationTimeInMinutes, 'minute').toDate();
    }
}
