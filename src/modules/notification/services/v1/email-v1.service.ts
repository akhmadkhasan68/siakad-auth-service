import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { ServiceClientEnum } from 'src/common/enums/service-client.enum';
import { EmailSendOTPPayloadV1Request } from '../../dto/requests/email-send-otp-payload-v1.request';

@Injectable()
export class EmailV1Service {
    constructor(
        @Inject(ServiceClientEnum.NotificationService)
        private client: ClientProxy,
    ) {}

    async SendEmailOTP(data: EmailSendOTPPayloadV1Request): Promise<void> {
        try {
            this.client.emit<EmailSendOTPPayloadV1Request>(
                ServiceCommands.NotificationService.V1.Email.SendEmailOTP,
                data,
            );

            return;
        } catch (error) {
            throw error;
        }
    }
}
