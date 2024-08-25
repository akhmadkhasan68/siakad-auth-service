import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { IPasswordResetToken } from 'src/databases/interaces/password-reset-token.interface';
import { ForgotPasswordRequestV1Request } from '../../dto/v1/forgot-password-request-v1.request';
import { ForgotPasswordResetV1Request } from '../../dto/v1/forgot-password-reset-v1.request';
import { ForgotPasswordVerifyV1Request } from '../../dto/v1/forgot-password-verify-v1.request';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Controller({
    version: '1',
    path: 'forgot-password',
})
export class ForgotPasswordNatsV1Controller {
    constructor(
        private readonly forgotPasswordService: ForgotPasswordService,
    ) {}

    @EventPattern(
        ServiceCommands.AuthService.V1.ForgotPassword.RequestForgotPassword,
    )
    async requestForgotPassword(
        @Payload() data: ForgotPasswordRequestV1Request,
    ): Promise<void> {
        return await this.forgotPasswordService.requestForgotPassword(data);
    }

    @MessagePattern(
        ServiceCommands.AuthService.V1.ForgotPassword.VerifyForgotPassword,
    )
    async verifyForgotPassword(
        @Payload() data: ForgotPasswordVerifyV1Request,
    ): Promise<IPasswordResetToken> {
        return await this.forgotPasswordService.verifyForgotPassword(data);
    }

    @MessagePattern(ServiceCommands.AuthService.V1.ForgotPassword.ResetPassword)
    async resetPassword(
        @Payload() data: ForgotPasswordResetV1Request,
    ): Promise<void> {
        return await this.forgotPasswordService.resetPassword(data);
    }
}
