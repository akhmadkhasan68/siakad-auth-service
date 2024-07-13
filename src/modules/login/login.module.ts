import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { LoginNatsV1Controller } from './controllers/v1/login-nats-v1.controller';
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
        LoginNatsV1Controller
    ],
    exports: [
        LoginService,
        
        UserRepository
    ],
})
export class LoginModule {}
