import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { IApiResponse } from "src/common/interfaces/response.interface";
import { LoginV1Request } from "../../dto/v1/login/login-v1.request";
import { LoginV1Response } from "../../dto/v1/login/login-v1.response";
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
    async login(
        @Body() data: LoginV1Request,
    ): Promise<IApiResponse<LoginV1Response>> {
        const {
            user,
            token
        } = await this.loginService.login(data);

        return {
            message: 'Login success',
            data: LoginV1Response.toResponse(user, token)
        };
    }
}