import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { IApiResponse } from "src/common/interfaces/response.interface";
import { VerifyUserByEmailAndPasswordPayloadV1Dto } from "../../dto/v1/verify-user-by-email-and-password/verify-user-by-email-and-password-payload-v1.dto";
import { VerifyUserByEmailAndPasswordResponseV1Dto } from "../../dto/v1/verify-user-by-email-and-password/verify-user-by-email-and-password-response-v1.dto";
import { LoginService } from "../../services/login.service";

@Controller({
    version: '1',
    path: 'login',
})
export class LoginHttpV1Controller {
    constructor(
        private readonly loginService: LoginService
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async verifyUserByEmailAndPassword(
        @Body() data: VerifyUserByEmailAndPasswordPayloadV1Dto,
    ): Promise<IApiResponse<VerifyUserByEmailAndPasswordResponseV1Dto>> {
        const user = await this.loginService.verifyUserByEmailAndPassword(data);

        return {
            message: 'User verified successfully',
            data: VerifyUserByEmailAndPasswordResponseV1Dto.toResponseDto(user)
        };
    }
}