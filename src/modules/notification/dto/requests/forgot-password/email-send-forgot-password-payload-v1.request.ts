import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { EmailSendForgotPasswordDataPayloadV1Request } from './email-send-forgot-password-data-payload-v1.request';

export class EmailSendForgotPasswordPayloadV1Request {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Type(() => EmailSendForgotPasswordDataPayloadV1Request)
    data: EmailSendForgotPasswordDataPayloadV1Request;
}
