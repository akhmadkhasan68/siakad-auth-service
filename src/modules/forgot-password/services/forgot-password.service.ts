import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { config } from 'src/config';
import { PasswordResetToken } from 'src/databases/entities/password-reset-token.entity';
import { IPasswordResetToken } from 'src/databases/interaces/password-reset-token.interface';
import { UserRepository } from 'src/modules/login/repositories/user.repository';
import { EmailSendForgotPasswordPayloadV1Request } from 'src/modules/notification/dto/requests/forgot-password/email-send-forgot-password-payload-v1.request';
import { EmailV1Service } from 'src/modules/notification/services/v1/email-v1.service';
import { ForgotPasswordRequestV1Request } from '../dto/v1/forgot-password-request-v1.request';
import { ForgotPasswordResetV1Request } from '../dto/v1/forgot-password-reset-v1.request';
import { ForgotPasswordVerifyV1Request } from '../dto/v1/forgot-password-verify-v1.request';
import { PasswordResetTokenRepository } from '../repositories/password-reset-token.repository';

@Injectable()
export class ForgotPasswordService {
    constructor(
        private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailV1Service,
    ) {}

    async requestForgotPassword(
        data: ForgotPasswordRequestV1Request,
    ): Promise<void> {
        // Check if the email is already in the database
        const user = await this.userRepository.findByEmail(data.email);

        // If the email is not in the database, throw an error
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Delete All Available Password Reset Token
        await this.passwordResetTokenRepository.deleteAllByEmail(data.email);

        // Create a new password reset token
        const passwordResetTokenData = new PasswordResetToken();
        passwordResetTokenData.email = data.email;
        passwordResetTokenData.token = this.generateToken(data.email);
        passwordResetTokenData.expiredAt = this.setExpiredAt();

        const passwordResetToken =
            await this.passwordResetTokenRepository.create(
                passwordResetTokenData,
            );

        // Send an email to the user with the password reset token
        await this.sendEmail(passwordResetToken);

        return;
    }

    async verifyForgotPassword(
        data: ForgotPasswordVerifyV1Request,
    ): Promise<IPasswordResetToken> {
        // Check if the email is already in the database
        const user = await this.userRepository.findByEmail(data.email);

        // If the email is not in the database, throw an error
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Find the password reset token in the database
        const passwordResetToken =
            await this.passwordResetTokenRepository.findOneByEmail(data.email);

        // If the password reset token is not in the database, throw an error
        if (!passwordResetToken) {
            throw new NotFoundException('Password reset token not found');
        }

        // Check if the token is expired
        if (passwordResetToken.expiredAt < new Date()) {
            throw new NotFoundException('Password reset token is expired');
        }

        return passwordResetToken;
    }

    async resetPassword(data: ForgotPasswordResetV1Request): Promise<void> {
        // Check if the email is already in the database
        const user = await this.userRepository.findByEmail(data.email);

        // If the email is not in the database, throw an error
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Find the password reset token in the database
        const passwordResetToken =
            await this.passwordResetTokenRepository.findOneByEmail(data.email);

        // If the password reset token is not in the database, throw an error
        if (!passwordResetToken) {
            throw new NotFoundException('Password reset token not found');
        }

        // Check if the token is expired
        if (passwordResetToken.expiredAt < new Date()) {
            throw new NotFoundException('Password reset token is expired');
        }

        // Update the user's password
        await this.userRepository.updatePassword(user.id, data.password);

        // Delete the password reset token
        await this.passwordResetTokenRepository.deleteAllByEmail(data.email);

        return;
    }

    private async sendEmail(data: IPasswordResetToken): Promise<void> {
        // Send an email to the user with the password reset token
        const emailData = new EmailSendForgotPasswordPayloadV1Request();
        emailData.email = data.email;
        emailData.data = {
            resetPasswordToken: data.token,
            resetPasswordTokenExpiryInMinutes:
                config.forgotPassword.expirationTimeInMinutes,
        };
        await this.emailService.sendEmailForgotPassword(emailData);
    }

    private generateToken(data: string): string {
        return bcrypt.hash(data, 10);
    }

    private setExpiredAt(): Date {
        const today = new Date();
        const expirationTimeInMinutes =
            config.forgotPassword.expirationTimeInMinutes;

        return new Date(today.getTime() + expirationTimeInMinutes * 60 * 1000);
    }
}
