import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { LoginHttpV1Controller } from './controllers/v1/login-http-v1.controller';
import { LoginNatsV1Controller } from './controllers/v1/login-nats-v1.controller';
import { UserRepository } from './repositories/user.repository';
import { LoginService } from './services/login.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
    ],
    providers: [
        LoginService,

        UserRepository
    ],
    controllers: [
        LoginNatsV1Controller,
        LoginHttpV1Controller,
    ],
    exports: [
        LoginService,
        
        UserRepository
    ],
})
export class LoginModule {}
