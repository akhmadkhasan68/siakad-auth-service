import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { databaseConfig } from './databases/config';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { LoginModule } from './modules/login/login.module';
import { OtpModule } from './modules/otp/otp.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RegisterModule } from './modules/register/register.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        ClientsModule.register([
            {
                name: 'NATS_SERVICE',
                transport: Transport.NATS,
                options: {
                    url: config.nats.url,
                },
            },
        ]),
        LoginModule,
        RegisterModule,
        RolesModule,
        PermissionModule,
        OtpModule,
        ForgotPasswordModule,
    ],
    controllers: [],
    providers: [],
    exports: [ClientsModule],
})
export class AppModule {}
