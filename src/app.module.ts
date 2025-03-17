import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ClientsModule, RpcException, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceClientEnum } from './common/enums/service-client.enum';
import { config } from './config';
import { databaseConfig } from './databases/config';
import { EntityNotFoundExceptionFilter, HttpExceptionFilter } from './infrastructures/filters/http-exception.filter';
import { ResponseInterceptor } from './infrastructures/interceptors/response.interceptor';
import { TransformInterceptor } from './infrastructures/interceptors/transform.interceptor';
import { SnakeToCamelPipe } from './infrastructures/pipes/snake-to-camel.pipe';
import { ValidationPipe } from './infrastructures/pipes/validation.pipe';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { HealthModule } from './modules/health/health.module';
import { LoginModule } from './modules/login/login.module';
import { NotificationModule } from './modules/notification/notification.module';
import { OtpModule } from './modules/otp/otp.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RegisterModule } from './modules/register/register.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        ClientsModule.register([
            {
                name: ServiceClientEnum.NotificationService,
                transport: Transport.NATS,
                options: {
                    url: config.nats.url,
                },
            },
        ]),
        HealthModule,
        LoginModule,
        RegisterModule,
        RolesModule,
        PermissionModule,
        OtpModule,
        ForgotPasswordModule,
        NotificationModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: RpcException
        },
        {
            provide: APP_FILTER,
            useClass: EntityNotFoundExceptionFilter
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_PIPE,
            useClass: SnakeToCamelPipe,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        }
    ],
    exports: [ClientsModule],
})
export class AppModule {}
