import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { config } from './config';
import { GlobalExceptionFilter } from './infrastructures/filters/exception.filter';
import { ExceptionFilter } from './infrastructures/filters/rpc-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/auth');
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

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(
        new ExceptionFilter(),
        new GlobalExceptionFilter(),
        new ExceptionFilter(),
    );

    app.startAllMicroservices();
    app.listen(config.app.port);
}
bootstrap();
