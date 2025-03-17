import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(config.app.urlPrefix);
    
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.connectMicroservice<MicroserviceOptions>({
            transport: Transport.NATS,
            options: {
                url: config.nats.url,
            },
        },
    );

    app.startAllMicroservices();
    app.listen(config.app.port);
}
bootstrap();
