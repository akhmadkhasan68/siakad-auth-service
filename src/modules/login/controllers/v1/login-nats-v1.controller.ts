import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, NatsContext, Payload } from "@nestjs/microservices";
import { LoginService } from "../../services/login.service";
import { VerifyUserByEmailAndPasswordResponseV1Dto } from "../../dto/v1/verify-user-by-email-and-password/verify-user-by-email-and-password-response-v1.dto";
import { VerifyUserByEmailAndPasswordPayloadV1Dto } from "../../dto/v1/verify-user-by-email-and-password/verify-user-by-email-and-password-payload-v1.dto";
import { UserResponseV1Dto } from "../../dto/v1/user/user-response-v1.dto";

@Controller({
    version: '1',
    path: 'login',
})
export class LoginNatsV1Controller {
    constructor(
        private readonly loginService: LoginService
    ) {}

    @MessagePattern('auth:login:verifyUserByEmailAndPassword')
    async verifyUserByEmailAndPassword(@Payload() data: VerifyUserByEmailAndPasswordPayloadV1Dto, @Ctx() context: NatsContext): Promise<VerifyUserByEmailAndPasswordResponseV1Dto> {
        const user = await this.loginService.verifyUserByEmailAndPassword(data);

        return VerifyUserByEmailAndPasswordResponseV1Dto.toResponseDto(user);
    }

    @MessagePattern('auth:login:getUserByEmail')
    async getUserByEmail(@Payload() data: string, @Ctx() context: NatsContext): Promise<UserResponseV1Dto> {
        const user = await this.loginService.getUserByEmail(data);

        return UserResponseV1Dto.toResponseDto(user);
    }

    @MessagePattern('auth:login:getUserById')
    async getUserById(@Payload() data: string, @Ctx() context: NatsContext): Promise<UserResponseV1Dto> {
        const user = await this.loginService.getUserById(data);

        return UserResponseV1Dto.toResponseDto(user);
    }
}
