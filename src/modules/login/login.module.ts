import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/config';
import { JwtModule as JwtCustomModule } from 'src/infrastructures/jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { LoginHttpV1Controller } from './controllers/v1/login-http-v1.controller';
import { LoginNATsV1Controller } from './controllers/v1/login-nats-v1.controller';
import { LoginService } from './services/login.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: config.jwt.secret,
            signOptions: { expiresIn: config.jwt.expiresInMilisecond },
        }),
        UserModule,
        JwtCustomModule,
    ],
    providers: [
        LoginService,
    ],
    controllers: [
        LoginNATsV1Controller,
        LoginHttpV1Controller,
    ],
    exports: [
        PassportModule,

        LoginService,
    ],
})
export class LoginModule {}
