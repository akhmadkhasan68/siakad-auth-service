import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { IUser } from "src/databases/interaces/user.interface";
import { RpcException } from "@nestjs/microservices";
import * as bcrypt from 'bcrypt';
import { VerifyUserByEmailAndPasswordPayloadV1Dto } from "../dto/v1/verify-user-by-email-and-password/verify-user-by-email-and-password-payload-v1.dto";
import { config } from "src/config";

@Injectable()
export class LoginService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async verifyUserByEmailAndPassword(
        data: VerifyUserByEmailAndPasswordPayloadV1Dto,
    ): Promise<IUser> {
        const user = await this.userRepository.findByEmail(data.email, true);
        if (!user) {
            throw new RpcException(new UnauthorizedException('E-mail & password you entered did not match any account'));
        }

        if (user.isLocked) {
            throw new RpcException(new UnauthorizedException('Your account has been locked due to multiple failed login attempts'));
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            // Increment failed login attempts
            user.loggedFailedRetries += 1;
            user.isLocked = user.loggedFailedRetries >= config.failedLoginMaxAttempts;
            await this.userRepository.update(user.id, user);

            const attemptsLeft = config.failedLoginMaxAttempts - user.loggedFailedRetries;
            const passwordUnmatchBaseMessage = 'E-mail & password you entered did not match any account';
            let passwordUnmatchMessage = `${passwordUnmatchBaseMessage}. You have ${attemptsLeft} attempts left before your account is locked.`;
            if (attemptsLeft === 0) {
                passwordUnmatchMessage = `${passwordUnmatchBaseMessage}. Your account has been locked due to multiple failed login attempts`;
            }

            // Throw exception
            throw new RpcException(new UnauthorizedException(passwordUnmatchMessage));
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<IUser> {
        return this.userRepository.findByEmail(email, true);
    }

    async getUserById(id: string): Promise<IUser> {
        return this.userRepository.findById(id, true);
    }
}
