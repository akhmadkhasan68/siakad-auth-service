import { Module } from '@nestjs/common';
import { EmailV1Service } from './services/v1/email-v1.service';

@Module({
    providers: [EmailV1Service],
    exports: [EmailV1Service],
})
export class NotificationService {}
