import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/databases/entities/otp.entity';
import { LoginModule } from '../login/login.module';
import { NotificationService } from '../notification/notification.module';
import { OtpNatsV1Controller } from './controllers/v1/otp-nats-v1.controller';
import { OtpRepository } from './repositories/otp.repository';
import { OtpService } from './services/otp.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Otp]),
        LoginModule,
        NotificationService,
    ],
    controllers: [OtpNatsV1Controller],
    providers: [
        // Repositories
        OtpRepository,

        // Services
        OtpService,
    ],
    exports: [],
})
export class OtpModule {}
