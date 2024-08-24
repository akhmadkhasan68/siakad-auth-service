import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { IOtp } from 'src/databases/interaces/otp.interface';
import { OtpService } from '../../services/otp.service';

@Controller({
    version: '1',
    path: 'otp',
})
export class OtpNatsV1Controller {
    constructor(private readonly otpService: OtpService) {}

    @MessagePattern(ServiceCommands.AuthService.V1.Otp.RequestOtp)
    async requestOtp(@Payload() data: any): Promise<IOtp> {
        const otp = await this.otpService.requestOtp(data);

        return otp;
    }
}
