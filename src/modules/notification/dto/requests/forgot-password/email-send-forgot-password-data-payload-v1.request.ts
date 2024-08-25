import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EmailSendForgotPasswordDataPayloadV1Request {
    @IsString()
    @IsNotEmpty()
    resetPasswordToken: string;

    @IsNumber()
    @IsNotEmpty()
    resetPasswordTokenExpiryInMinutes: number;
}
