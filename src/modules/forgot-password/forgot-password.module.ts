import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from 'src/databases/entities/password-reset-token.entity';
import { LoginModule } from '../login/login.module';
import { NotificationModule } from '../notification/notification.module';
import { ForgotPasswordNatsV1Controller } from './controller/v1/forgot-password-nats-v1.controller';
import { PasswordResetTokenRepository } from './repositories/password-reset-token.repository';
import { ForgotPasswordService } from './services/forgot-password.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PasswordResetToken]),
        LoginModule,
        NotificationModule,
    ],
    controllers: [ForgotPasswordNatsV1Controller],
    providers: [PasswordResetTokenRepository, ForgotPasswordService],
})
export class ForgotPasswordModule {}
