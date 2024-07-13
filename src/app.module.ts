import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionModule } from './modules/permission/permission.module';
import { OtpModule } from './modules/otp/otp.module';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { MainController } from './main.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './databases/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructures/jwt/jwt.strategy';

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
  controllers: [MainController],
  providers: [
    
  ],
  exports: [
    ClientsModule,
  ]
})
export class AppModule {}
