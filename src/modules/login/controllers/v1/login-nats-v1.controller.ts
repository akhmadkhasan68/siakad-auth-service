import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { UserResponseV1Dto } from '../../dto/v1/user/user-response-v1.dto';
import { VerifyUserByEmailAndPasswordPayloadV1Dto } from '../../dto/v1/verify-user-by-email-and-password/verify-user-by-email-and-password-payload-v1.dto';
import { VerifyUserByEmailAndPasswordResponseV1Dto } from '../../dto/v1/verify-user-by-email-and-password/verify-user-by-email-and-password-response-v1.dto';
import { LoginService } from '../../services/login.service';

@Controller({
    version: '1',
    path: 'login',
})
export class LoginNatsV1Controller {
    constructor(private readonly loginService: LoginService) {}

    @MessagePattern(
        ServiceCommands.AuthService.V1.Login.VerifyUserByEmailAndPassword,
    )
    async verifyUserByEmailAndPassword(
        @Payload() data: VerifyUserByEmailAndPasswordPayloadV1Dto,
    ): Promise<VerifyUserByEmailAndPasswordResponseV1Dto> {
        const user = await this.loginService.verifyUserByEmailAndPassword(data);

        return VerifyUserByEmailAndPasswordResponseV1Dto.toResponseDto(user);
    }

    @MessagePattern(ServiceCommands.AuthService.V1.Login.GetUserByEmail)
    async getUserByEmail(@Payload() data: string): Promise<UserResponseV1Dto> {
        const user = await this.loginService.getUserByEmail(data);

        return UserResponseV1Dto.toResponseDto(user);
    }

    @MessagePattern(ServiceCommands.AuthService.V1.Login.GetUserById)
    async getUserById(@Payload() data: string): Promise<UserResponseV1Dto> {
        const user = await this.loginService.getUserById(data);

        return UserResponseV1Dto.toResponseDto(user);
    }
}
