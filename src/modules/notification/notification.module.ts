import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceClientEnum } from 'src/common/enums/service-client.enum';
import { config } from 'src/config';
import { EmailV1Service } from './services/v1/email-v1.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: ServiceClientEnum.NotificationService,
                transport: Transport.NATS,
                options: {
                    url: config.nats.url,
                },
            },
        ]),
    ],
    providers: [EmailV1Service],
    exports: [EmailV1Service],
})
export class NotificationModule {}
