import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { config } from './config';
import { GlobalExceptionFilter } from './infrastructures/filters/exception.filter';
import { ExceptionFilter } from './infrastructures/filters/rpc-exception.filter';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
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

    app.listen();
}
bootstrap();
