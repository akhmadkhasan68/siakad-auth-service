import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/databases/entities/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
        ])
    ],
    controllers: [],
    providers: [
        UserRepository,
        UserService
    ],
    exports: [
        UserRepository,
        UserService
    ]
})
export class UserModule {}